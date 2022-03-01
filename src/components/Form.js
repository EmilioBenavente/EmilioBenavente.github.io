import React, {useState} from 'react';

export default function Form(props)
{
    const [NAME, SET_NAME] = useState('');
    
    function HandleSubmit(e)
    {
	e.preventDefault();
	if(NAME === '')
	{
	    alert("Please enter...Something!");
	    return;
	}
	props.AddTask(NAME);	
	SET_NAME('');
    }

    function HandleChange(e)
    {
	SET_NAME(e.target.value);
    }

    return (
	<form onSubmit={HandleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input type="text"
      	 id="new-todo-input"
      	 className="input input__lg"
      	 name="text"
         autoComplete="off"
         value={NAME}
	 onChange={HandleChange}/>
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
      );
}
