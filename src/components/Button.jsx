import React from 'react';
import "./button.css"

const Button = (props) => {
	return (
		<button
			name={props.label}
			value= {props.value}
			disabled = {props.disabled}
			style={props.style}
			className={props.type == 'primary' ? 'btn btn-primary' : 'btn btn-secondary'}
			onClick={props.action} >
			{props.title}
		</button>)
}


export default Button;