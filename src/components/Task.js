import React from 'react';

const Task = ({ task, editTask, deleteTask, toggleStatus }) => {
    const handleStatusChange = () => {
        const newStatus = task.status === 'in-progress' ? 'completed' : 'in-progress';
        toggleStatus(task.id, newStatus);
    };

    return (
        <div className="task">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Дата завершения: {task.dueDate}</p>
            <p>Статус: {task.status === 'in-progress' ? 'В работе' : 'Выполнено ✅'}</p>
            <button onClick={handleStatusChange}>
                {task.status === 'in-progress' ? 'Отметить как выполнено' : 'Отметить как в работе'}
            </button>
            <button onClick={() => editTask(task.id)}>Редактировать</button>
            <button onClick={() => deleteTask(task.id)}>Удалить</button>
        </div>
    );
};

export default Task;
