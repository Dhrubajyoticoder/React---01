import { useState } from "react";
import "./App.css";

function App() {
  let [counter, setCounter] = useState(15);

  const addCounter = () => {
    if (counter < 20) {
      setCounter(counter++);
    }
  };

  const removeCounter = () => {
    if (counter > 10) {
      setCounter(counter--);
    }
  };

  return (
    <>
      <h1>PRESS TO COUNT {counter}</h1>
      <button onClick={addCounter}>Add</button>
      <br />
      <button onClick={removeCounter}>Remove</button>
      
    </>
  );
}

export default App;
