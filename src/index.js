import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const formEl = useRef();
  const counterRef = useRef(0);
  const [submitted, setSubmitted] = useState([]);

  const handleSubmit = event => {
    event.preventDefault();
    counterRef.current += 1;
    if (counterRef.current % 2 !== 0) {
      const formInputs = [...formEl.current.elements].filter(
        element => element.type === "text"
      );
      const newSubmitted = formInputs.reduce(
        (acc, input) => {
          return {
            ...acc,
            [input.name]: input.value
          };
        },
        { number: counterRef.current }
      );
      setSubmitted(prevSubmitted => [...prevSubmitted, newSubmitted]);
    }
  };
  return (
    <div className="App">
      <h1>useRef</h1>
      <h2>
        You can use <code>useRef</code> to point to a DOM node
      </h2>
      <p>The values of the inputs are accessed through a ref on the form tag</p>
      <h2>
        You can also use <code>useRef</code> to point to a value that is NOT a
        DOM node
      </h2>
      <p>
        A <code>counterRef</code> starts at 0 and increments every time the form
        is submitted. The list below will only update if that counter is an odd
        number.
      </p>
      <form ref={formEl} onSubmit={handleSubmit}>
        <label htmlFor="name-input">Name</label>
        <input id="name-input" name="name" placeholder="Daniel Ricciardo" />
        <label htmlFor="team-input">Team</label>
        <input id="team-input" name="team" placeholder="Renault" />
        <button type="submit">SUBMIT</button>
      </form>
      <div>
        <h3 id="list-title">Submitted values</h3>
        <ol aria-labelledby="list-title">
          {submitted.map((input, i) => (
            <li key={`pretendThisIsNotAnIndex${i}`}>
              <ul>
                <li>counterRef: {input.number}</li>
                <li>name: {input.name} </li>
                <li>team: {input.team}</li>
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
