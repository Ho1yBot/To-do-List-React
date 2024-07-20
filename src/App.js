import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task) => {
        setTasks([...tasks, { ...task, id: Date.now() }]);
    };

    const editTask = (id) => {
        const taskToEdit = tasks.find((task) => task.id === id);
        const updatedTitle = prompt('Редактировать заголовок:', taskToEdit.title);
        const updatedDescription = prompt('Редактировать описание:', taskToEdit.description);
        const updatedDueDate = prompt('Редактировать дату завершения (дд.мм.гггг):', taskToEdit.dueDate);

        if (updatedTitle && updatedDueDate) {
            setTasks(tasks.map((task) => task.id === id ? { ...task, title: updatedTitle, description: updatedDescription, dueDate: updatedDueDate } : task));
        }
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const toggleStatus = (id, status) => {
        setTasks(tasks.map((task) => task.id === id ? { ...task, status } : task));
    };

    const [filter, setFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('asc');

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.status === 'completed';
        if (filter === 'in-progress') return task.status === 'in-progress';
        return true;
    });

    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sortOrder === 'asc') return new Date(a.dueDate.split('.').reverse().join('-')) - new Date(b.dueDate.split('.').reverse().join('-'));
        return new Date(b.dueDate.split('.').reverse().join('-')) - new Date(a.dueDate.split('.').reverse().join('-'));
    });

    return (
        <div className="App">
            <Header />
            <div className="filter-sort">
                <label className='filter'>Фильтр: </label>
                <select className='select-size' onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">Все</option>
                    <option value="completed">Выполненные</option>
                    <option value="in-progress">В работе</option>
                </select>
                <label className='sort'>Сортировка: </label>
                <select className='select-size' onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">По возрастанию</option>
                    <option value="desc">По убыванию</option>
                </select>
            </div>
            <TaskForm addTask={addTask} />
            <TaskList tasks={sortedTasks} editTask={editTask} deleteTask={deleteTask} toggleStatus={toggleStatus} />
        </div>
    );
};

export default App;
