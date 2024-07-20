import React, { useState } from 'react';

const Task = ({ task, editTask, deleteTask, toggleStatus }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(task.dueDate);
    const [status, setStatus] = useState(task.status || 'in-progress');

    const handleEdit = () => {
        if (isEditing) {
            const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
            if (title && dueDate && dateRegex.test(dueDate)) {
                editTask(task.id, title, description, dueDate, status);
            } else {
                alert('Заголовок и дата завершения обязательны. Убедитесь, что дата в формате дд.мм.гггг.');
                return;
            }
        }
        setIsEditing(!isEditing);
    };

    const handleToggleStatus = () => {
        const newStatus = status === 'in-progress' ? 'completed' : 'in-progress';
        toggleStatus(task.id, newStatus);
        setStatus(newStatus);
    };

    return (
        <div className="task">
            {isEditing ? (
                <>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input type="text" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                    {/* <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="in-progress">В работе</option>
                        <option value="completed">Выполнено</option>
                    </select> */}
                </>
            ) : (
                <>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>{task.dueDate}</p>
                    <p>{task.status === 'completed' ? 'Выполнено ✅' : 'В работе 🛠️'}</p>
                </>
            )}
            <button onClick={handleToggleStatus}>{status === 'completed' ? 'Вернуть в работу' : 'Отметить выполненным'}</button>
            <button onClick={handleEdit}>{isEditing ? 'Сохранить' : 'Редактировать'}</button>
            <button onClick={() => deleteTask(task.id)}>Удалить</button>
            {isEditing && <button onClick={() => setIsEditing(false)}>Отмена</button>}
        </div>
    );
};

export default Task;
