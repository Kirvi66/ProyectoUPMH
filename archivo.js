// Lógica para agregar tareas nuevas a la lista
// Programador 3

const inputTarea = document.getElementById('input-tarea');
const inputFecha = document.getElementById('fecha-vencimiento');
const btnAgregar = document.getElementById('btn-agregar');
const listaTareas = document.getElementById('lista-tareas');
const contadorTerminadas = document.getElementById('contador-terminadas');

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

// Función que crea una tarea nueva y la agrega a la lista
function agregarTarea() {
    const texto = inputTarea.value.trim();
    const fechaVencimiento = inputFecha.value;

    // No agregar tareas vacías
    if (texto === '') {
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
    item.appendChild(casillaTerminada);
    item.appendChild(descripcion);

    if (fechaVencimiento !== '') {
        const fecha = document.createElement('time');
        fecha.classList.add('fecha-vencimiento');
        fecha.dateTime = fechaVencimiento;
        fecha.textContent = `Vence: ${formatearFecha(fechaVencimiento)}`;
        item.appendChild(fecha);
    }

    listaTareas.appendChild(item);

    // Limpiar el input para la siguiente tarea
    inputTarea.value = '';
    inputFecha.value = '';
    inputTarea.focus();
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
