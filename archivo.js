// Lógica para agregar tareas nuevas a la lista
// Programador 3

const inputTarea = document.getElementById('input-tarea');
const inputFecha = document.getElementById('fecha-vencimiento');
const btnAgregar = document.getElementById('btn-agregar');
const listaTareas = document.getElementById('lista-tareas');
const contadorTerminadas = document.getElementById('contador-terminadas');
let tareaEnEdicion = null;

// Actualiza el número de tareas que el usuario marcó como terminadas.
function actualizarContador() {
    const tareasTerminadas = listaTareas.querySelectorAll('.tarea.terminada').length;
    contadorTerminadas.textContent = tareasTerminadas;
}

// Convierte la fecha del formulario a un formato fácil de leer.
function formatearFecha(fecha) {
    const fechaLocal = new Date(`${fecha}T00:00:00`);

    return new Intl.DateTimeFormat('es-MX', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(fechaLocal);
}

// Crea, actualiza o retira la fecha visible de una tarea.
function actualizarFecha(item, fechaVencimiento) {
    let fecha = item.querySelector('.fecha-vencimiento');

    if (fechaVencimiento === '') {
        if (fecha !== null) {
            fecha.remove();
        }
        return;
    }

    if (fecha === null) {
        fecha = document.createElement('time');
        fecha.classList.add('fecha-vencimiento');
        item.querySelector('.acciones-tarea').before(fecha);
    }

    fecha.dateTime = fechaVencimiento;
    fecha.textContent = `Vence: ${formatearFecha(fechaVencimiento)}`;
}

// Devuelve el formulario a su estado inicial después de agregar o editar.
function reiniciarFormulario() {
    tareaEnEdicion = null;
    inputTarea.value = '';
    inputFecha.value = '';
    btnAgregar.textContent = 'Agregar';
    btnAgregar.classList.remove('modo-edicion');
    inputTarea.focus();
}

function crearBotonAccion(texto, clase, etiqueta) {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.classList.add('btn-accion', clase);
    boton.textContent = texto;
    boton.setAttribute('aria-label', etiqueta);
    return boton;
}

// Función que crea una tarea nueva y la agrega a la lista
function agregarTarea() {
    const texto = inputTarea.value.trim();
    const fechaVencimiento = inputFecha.value;

    // No agregar tareas vacías
    if (texto === '') {
        inputTarea.focus();
        return;
    }

    if (tareaEnEdicion !== null) {
        tareaEnEdicion.querySelector('.texto-tarea').textContent = texto;
        tareaEnEdicion.querySelector('.marcar-tarea')
            .setAttribute('aria-label', `Marcar "${texto}" como terminada`);
        actualizarFecha(tareaEnEdicion, fechaVencimiento);
        reiniciarFormulario();
        return;
    }

    // Crear el elemento de la lista
    const item = document.createElement('li');
    item.classList.add('tarea');

    const casillaTerminada = document.createElement('input');
    casillaTerminada.type = 'checkbox';
    casillaTerminada.classList.add('marcar-tarea');
    casillaTerminada.setAttribute('aria-label', `Marcar "${texto}" como terminada`);

    const descripcion = document.createElement('span');
    descripcion.classList.add('texto-tarea');
    descripcion.textContent = texto;

    const acciones = document.createElement('div');
    acciones.classList.add('acciones-tarea');
    acciones.appendChild(crearBotonAccion('Editar', 'btn-editar', `Editar "${texto}"`));
    acciones.appendChild(crearBotonAccion('Eliminar', 'btn-eliminar', `Eliminar "${texto}"`));

    item.appendChild(casillaTerminada);
    item.appendChild(descripcion);
    item.appendChild(acciones);
    actualizarFecha(item, fechaVencimiento);

    listaTareas.appendChild(item);

    // Limpiar el formulario para la siguiente tarea.
    reiniciarFormulario();
}

// Agregar tarea al hacer clic en el botón
btnAgregar.addEventListener('click', agregarTarea);

// Agregar tarea al presionar Enter dentro del input
inputTarea.addEventListener('keydown', function (evento) {
    if (evento.key === 'Enter') {
        agregarTarea();
    }
});

// Permite marcar o desmarcar cualquier tarea y mantener el contador al día.
listaTareas.addEventListener('change', function (evento) {
    if (!evento.target.classList.contains('marcar-tarea')) {
        return;
    }

    const item = evento.target.closest('.tarea');
    item.classList.toggle('terminada', evento.target.checked);
    actualizarContador();
});

// Carga una tarea en el formulario para editarla o la elimina de la lista.
listaTareas.addEventListener('click', function (evento) {
    const boton = evento.target.closest('.btn-accion');

    if (boton === null) {
        return;
    }

    const item = boton.closest('.tarea');

    if (boton.classList.contains('btn-eliminar')) {
        if (item === tareaEnEdicion) {
            reiniciarFormulario();
        }
        item.remove();
        actualizarContador();
        return;
    }

    tareaEnEdicion = item;
    inputTarea.value = item.querySelector('.texto-tarea').textContent;
    inputFecha.value = item.querySelector('.fecha-vencimiento')?.dateTime ?? '';
    btnAgregar.textContent = 'Guardar cambios';
    btnAgregar.classList.add('modo-edicion');
    inputTarea.focus();
});
