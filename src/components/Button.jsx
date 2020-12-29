import React from 'react';


const Button = (props) => {
	console.log(props.style);
	return (
		<button
			name={props.label}
			style={props.style}
			className={props.type == 'primary' ? 'btn btn-primary' : 'btn btn-secondary'}
			onClick={props.action} >
			{props.title}
		</button>)
}


export default Button;