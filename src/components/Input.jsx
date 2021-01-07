import React from 'react';
import './input.css'

const Input = (props) => {
	//console.log(props.value);
	return (  
<div className="form-group">
    <label htmlFor={props.name} className="form-label">{props.title}</label>
    <input
    className="form-control"
    style={props.style}
    id={props.name}
    name={props.name}
    type={props.inputType}
    value={props.value}
    defaultValue={props.defaultValue}
    onChange={props.handleChange}
    placeholder={props.placeholder} 
    {...props} />
</div>
)
}

export default Input;