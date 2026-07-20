// Lógica para agregar tareas nuevas a la lista
// Programador 3

const inputTarea = document.getElementById('input-tarea');
const btnAgregar = document.getElementById('btn-agregar');
const listaTareas = document.getElementById('lista-tareas');

// Función que crea una tarea nueva y la agrega a la lista
function agregarTarea() {
    const texto = inputTarea.value.trim();

    // No agregar tareas vacías
    if (texto === '') {
        return;
    }

    // Crear el elemento de la lista
    const item = document.createElement('li');
    item.textContent = texto;
    item.classList.add('tarea');

    listaTareas.appendChild(item);

    // Limpiar el input para la siguiente tarea
    inputTarea.value = '';
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
