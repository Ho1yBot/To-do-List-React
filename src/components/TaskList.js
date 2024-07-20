import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Task from './Task';
import './TaskList.css';

const TaskList = ({ tasks, editTask, deleteTask, toggleStatus }) => {
    return (
        <div className="task-list">
            <TransitionGroup>
                {tasks.map((task) => (
                    <CSSTransition key={task.id} timeout={500} classNames="task">
                        <Task 
                            key={task.id} 
                            task={task} 
                            editTask={editTask} 
                            deleteTask={deleteTask} 
                            toggleStatus={toggleStatus} 
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    );
};

export default TaskList;
