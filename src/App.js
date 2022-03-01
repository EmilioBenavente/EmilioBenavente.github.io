import Todo from './components/Todo.js';
import Form from './components/Form.js'
import FilterButton from './components/FilterButton.js'
import React, {useRef, useEffect, useState} from 'react';
import {nanoid} from 'nanoid';

function usePrevious(value)
{
    const REF = useRef();
    useEffect(() => {
	REF.current = value;
    });
    return REF.current;
}

const FILTER_MAP =
      {
	  All: () => true,
	  Active: task => !task.completed,
	  Completed: task => task.completed
      };
const FILTER_NAMES = Object.keys(FILTER_MAP);


function App(props) {
    const [TASKS, SET_TASKS] = useState(props.tasks);
    const [FILTER, SET_FILTER] = useState('All');
    
    function DeleteTask(id)
    {
	const REMAINING_TASKS = TASKS.filter(task => id !== task.id);
	SET_TASKS(REMAINING_TASKS);
    }

    function EditTask(id, NewName)
    {
	const EDITED_TASK_LIST = TASKS.map(task => {
	    if(id === task.id)
	    {
		return {...task, name: NewName};
	    }
	    return task;
	});
	SET_TASKS(EDITED_TASK_LIST);
    }
    
    function ToggleTaskCompleted(id)
    {
	const UPDATED_TASKS = TASKS.map(task => {
	    if(id === task.id)
	    {
		return {...task, completed: !task.completed}
	    }
	    return task;
	});
	SET_TASKS(UPDATED_TASKS);
    }
    
    const TASK_LIST = TASKS.filter(FILTER_MAP[FILTER]).map(task => (
	<Todo id={task.id} name={task.name} completed={task.completed} key={task.id} ToggleTaskCompleted={ToggleTaskCompleted} DeleteTask={DeleteTask} EditTask={EditTask} />)
			       );    

    function AddTask(name)
    {
	const NEW_TASK = { id: "todo-" + nanoid(), name: name, completed: false};
	SET_TASKS([...TASKS, NEW_TASK]);
    }
    
    const TASKS_NOUN = TASK_LIST.length !== 1 ? 'tasks' : 'task';
    const HEADING_TEXT = `${TASK_LIST.length} ${TASKS_NOUN} remaining`;    

    const FILTER_LIST = FILTER_NAMES.map(name => (
	<FilterButton key={name} name={name} isPressed={name === FILTER} setFilter={SET_FILTER} />
    ));

    const PREV_TASK_LENGTH = usePrevious(TASKS.length);
    const LIST_HEADING_REF = useRef(null);

    useEffect(() => {
	if(TASKS.length - PREV_TASK_LENGTH === -1)
	{
	    LIST_HEADING_REF.current.focus();
	    console.log('umm');
	}
    }, [TASKS.length, PREV_TASK_LENGTH]);
    
    return (
	    <div className="todoapp stack-large">
	      <h1>TodoMatic</h1>
	    <Form AddTask={AddTask} />
	      <div className="filters btn-group stack-exception">
		  {FILTER_LIST}
	      </div>
              <h2 id="list-heading" tabIndex="-1" ref={LIST_HEADING_REF}>{HEADING_TEXT}</h2>
	      <ul role="list"
		  className="todo-list stack-large stack-exception"
		  aria-labelledby="list-heading">
	        {TASK_LIST}
	      </ul>
	    </div>
    );
}

export default App;
