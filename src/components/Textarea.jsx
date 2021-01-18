import React from 'react';
import './textarea.css'

const Textarea = (props) => {
    console.log(props.style);
    return (
        <div className="form-group">
            <label htmlFor={props.id} className="form-label"> {props.name} </label>
            <textarea
                className="form-control"
                style={props.style}
                cols= '30'
                id={props.id}
                name={props.name}
                onInput={props.handleChange}
                placeholder={props.placeholder}
                {...props} />
        </div>
    )
}


export default Textarea;