import React, { useState, useEffect } from 'react'
import { Droppable, DroppableProps } from 'react-beautiful-dnd';
import "./styles.css"

import SingleTodo from '../SingleTodo/SingleTodo';

import { Todo } from '../../utils/model'

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
    const [enabled, setEnabled] = useState(false);
    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));
        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);
    if (!enabled) {
        return null;
    }
    return <Droppable {...props}>{children}</Droppable>;
};

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
    return (
        <div className="container">
            <StrictModeDroppable droppableId='TodosList'>
                {(provided, snapshot) => (
                    <div
                        className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <span className="todos__heading">
                            Active Tasks
                        </span>
                        {todos.map((todo, index) =>
                            <SingleTodo
                                index={index}
                                todo={todo}
                                key={todo.id}
                                todos={todos}
                                setTodos={setTodos}
                            />
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </StrictModeDroppable>
            <StrictModeDroppable droppableId='TodosRemove'>
                {(provided, snapshot) => (
                    <div
                        className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete" : ""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <span className="todos__heading">
                            Completed Tasks
                        </span>
                        {completedTodos.map((todo, index) =>
                            <SingleTodo
                                index={index}
                                todo={todo}
                                key={todo.id}
                                todos={completedTodos}
                                setTodos={setCompletedTodos}
                            />
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </StrictModeDroppable>

        </div>
    )
}

export default TodoList
