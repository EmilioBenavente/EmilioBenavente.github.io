import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const TODO_DATA = [
    {id: "todo-0", name: "Eat", completed: true},
    {id: "todo-1", name: "Sleep", completed: false},
    {id: "todo-2", name: "Repeat", completed: false}
];

ReactDOM.render(<App Info="Hello, World" tasks={TODO_DATA} />,document.getElementById('root'));

