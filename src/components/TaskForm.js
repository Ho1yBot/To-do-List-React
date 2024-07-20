import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && dueDate) {
            const formattedDueDate = dueDate.split('-').reverse().join('.');
            addTask({ title, description, dueDate: formattedDueDate, status: 'in-progress' });
            setTitle('');
            setDescription('');
            setDueDate('');
        } else {
            alert('Заголовок и Дата завершения обязательны.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Заголовок"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label>
                Дата завершения:
                <input className='input-date'
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Добавить задачу</button>
        </form>
    );
};

export default TaskForm;
