import React from 'react';
import Task from './Task';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './TaskList.css';

const TaskList = ({ tasks, editTask, deleteTask, toggleStatus }) => {
    return (
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
    );
};

export default TaskList;
