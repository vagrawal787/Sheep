
import './App.css';
import React, {useReducer, useState} from 'react';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
}

function App() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
    }, 3000);
  }

  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }

  return (
    <div className="wrapper">
      <h1>sheep</h1>
      {submitting &&
       <div>
         You are submitting the following:
         <ul>
           {Object.entries(formData).map(([name, value]) => (
             <li key={name}><strong>{name}</strong>:{value.toString()}</li>
           ))}
         </ul>
       </div>
      }
      <form onSubmit = {handleSubmit}>
        <fieldset class = "form">
         <label>
           <p className = "code">Enter Code:</p>
           <div className = "input">
            <input className = "in" name="name" onChange = {handleChange}/>
           </div>
         </label>
        </fieldset>
        <div className = "buttongo">
          <button type="submit">Go!</button>
        </div>
        <div className = "buttonadmin">
          <button type="link">Admin Portal</button>
        </div>
      </form>
    </div>
  )
}

export default App;
