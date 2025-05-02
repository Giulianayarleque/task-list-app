//constants delared for input button and task list area

const taskInput = document.querySelector('#newtask input'); // Input donde escribes la tarea.
const taskSection = document.querySelector('.tasks');  // Contenedor donde se muestran las tareas.

//listener for the Enter key. Used to add a new task
taskInput.addEventListener('keyup', (e) => { // Si la tecla presionada es "Enter".
  if(e.key == 'Enter') {  // Llama a la función que crea la tarea.
    createTask();
  }
})

//the onclick event for the 'Add' button
document.querySelector('#push').onclick = function () {
  createTask(); // Llama a la misma función cuando haces clic en el botón.
}

//the function that creates a task
function createTask() {
  if (taskInput.value.trim().length === 0) {
    // taskInput.value  obtiene el valor (el texto) del input de texto.
    // .trim()  elimina los espacios en blanco al principio y al final del texto.
    // .length  obtiene la cantidad de caracteres en el texto.
    // === 0  comprueba si la longitud es cero (es decir, si el input está vacío después de quitar los espacios).

    alert('The task field is blank. Enter a task name and try again.'); //Si el input está vacío, muestra una alerta.
  } else {
    // Si el input NO está vacío, se ejecuta este bloque:

    // Crea el HTML para una nueva tarea.  (Template literal: permite incrustar variables dentro de un string usando ${...} )
    const taskHTML = `
      <div class="task">
        <label id="taskname">
          <input type="checkbox" class="check-task">
          <p class="task-text">${taskInput.value}</p>
        </label>
        <div class="delete">
          <i class="uil uil-trash"></i>
        </div>
      </div>`;
    
    taskSection.insertAdjacentHTML('beforeend', taskHTML);
     // Agrega el HTML de la nueva tarea al final del div con la clase 'tasks' (taskSection).
    // 'beforeend'  inserta el HTML justo antes de la etiqueta de cierre del elemento.

    // checkbox: tachar texto si está marcado
    const checkboxes = taskSection.querySelectorAll(".check-task");
    checkboxes.forEach(checkbox => {
       // Agrega el HTML de la nueva tarea al final del div con la clase 'tasks' (taskSection).
    // 'beforeend'  inserta el HTML justo antes de la etiqueta de cierre del elemento.
    
      checkbox.onchange = function () {
        const taskText = this.nextElementSibling; // Obtiene el <p> que está después del checkbox.
        if (this.checked) {
          taskText.classList.add("checked");  // Añade clase para tachar texto.
        } else {
          taskText.classList.remove("checked"); // Quita la clase.
        }
      };
    });

    // eliminar solo si la tarea está completada (checkbox marcado)
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach(btn => {
      btn.onclick = function () {
        const checkbox = this.parentNode.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
          this.parentNode.remove(); // Elimina la tarea si está marcada.
        } else {
          alert("You can only delete a completed task.");
        }
      };
    });

    // limpiar input
    taskInput.value = "";  // Limpia el input después de agregar la tarea.

    // manejar overflow
    taskSection.offsetHeight >= 300
      ? taskSection.classList.add("overflow")
      : taskSection.classList.remove("overflow");
  }
}