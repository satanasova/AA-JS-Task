function todo(elementID) {
    const todoContainer = document.querySelector(elementID);
    const btnAdd = todoContainer.querySelector('#btn-add');
    const userInput = todoContainer.querySelector('.user-input');
    const itemsContainer = todoContainer.querySelector('.items-container');

    const taskItemTemp = todoContainer.querySelector('[data-template="task-item"]');
    taskItemTemp.removeAttribute('data-template');
    // taskItemTemp.classList.remove('d-none');
    taskItemTemp.remove();

    todoContainer.addEventListener('click', e => {
        const target = e.target;

        if(target === btnAdd){
            if(userInput.value){
                const newTaskItem = taskItemTemp.cloneNode(true);
                const newTaskTitle = newTaskItem.querySelector('.task-title');
                newTaskTitle.innerText = userInput.value;
                userInput.value = '';
                itemsContainer.append(newTaskItem);                
            }
        } else if(target.classList.contains('btn-del')) {
            target.closest('.task-item').remove();
        }  else if(target.classList.contains('btn-done')) {
            target.closest('.task-item').style.opacity = 0.5;
        }  
        
    })
}
