import React, {useEffect, useRef, useState} from "react";

function usePrevious(value)
{
    const REF = useRef();
    useEffect(() => {
	REF.current = value;
    });
    return REF.current;
}

export default function Todo(props)
{
    const [IS_EDITING, SET_EDITING] = useState(false);

    const [NEW_NAME, SET_NEW_NAME] = useState('');

    const WAS_EDITING = usePrevious(IS_EDITING);
    const EDIT_FIELD_REF = useRef(null);
    const EDIT_BUTTON_REF = useRef(null);

    function HandleChange(e)
    {
	SET_NEW_NAME(e.target.value);
    }

    function HandleSubmit(e)
    {
	e.preventDefault();
	props.EditTask(props.id, NEW_NAME);
	SET_NEW_NAME('');
	SET_EDITING(false);
    }

    const EDITING_TEMPLATE = (
      <form className="stack-small" onSubmit={HandleSubmit}>
	<div className="form-group">
	  <label className="todo-label" htmlFor={props.id}>
	    New name for {props.name}
	  </label>
          <input id={props.id} className="todo-text" type="text" onChange={HandleChange} ref={EDIT_FIELD_REF} />
	</div>
	<div className="btn-group">
	  <button type="button" className="btn todo-cancel" onClick={() => SET_EDITING(false)}>
	    Cancel
	    <span className="visually-hidden">renaming {props.name}</span>
	  </button>
	  <button type="submit" className="btn btn__primary todo-edit">
	    Save
	    <span className="visually-hidden">new name for {props.name}</span>
	  </button>
	</div>
      </form>
    );

    const VIEW_TEMPLATE = (
      <div className="stack-small">
	<div className="c-cb">
	  <input
	    id={props.id}
	    type="checkbox"
	    defaultChecked={props.completed}
	    onChange={() => props.ToggleTaskCompleted(props.id)} />
	  <label className="todo-label" htmlFor={props.id}>
	    {props.name}
	  </label>
	</div>
	<div className="btn-group">
	  <button type="button" className="btn" onClick={() => SET_EDITING(true)} ref={EDIT_BUTTON_REF}>
	    Edit <span className="visually-hidden">{props.name}</span>
	  </button>
	  <button
	    type="button"
	    className="btn btn__danger"
	    onClick={() => props.DeleteTask(props.id)}>
	    Delete <span className="visually-hidden">{props.name}</span>
	  </button>
	</div>
      </div>
    );

    useEffect(() => {
	if(!WAS_EDITING && IS_EDITING)
	{
	    EDIT_FIELD_REF.current.focus();
	}
	if(WAS_EDITING && !IS_EDITING)
	{
	    EDIT_BUTTON_REF.current.focus();
	}
    }, [WAS_EDITING, IS_EDITING]);

    return <li className="todo">{IS_EDITING ? EDITING_TEMPLATE : VIEW_TEMPLATE}</li>;
	      
}

