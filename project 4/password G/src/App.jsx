// import { useState, useCallback, useEffect } from "react";

// // Custom hook for local storage
// function useLocalStorage(key, initialValue) {
//   const [storedValue, setStoredValue] = useState(() => {
//     try {
//       const item = window.localStorage.getItem(key);
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.error(error);
//       return initialValue;
//     }
//   });

//   const setValue = (value) => {
//     try {
//       setStoredValue(value);
//       window.localStorage.setItem(key, JSON.stringify(value));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return [storedValue, setValue];
// }

// function App() {
//   const [length, setLength] = useState(8);
//   const [numberAllowed, setNumberAllowed] = useState(false);
//   const [charAllowed, setCharAllowed] = useState(false);
//   const [password, setPassword] = useState("");
//   const [heading, setHeading] = useState("");
//   const [notebook, setNotebook] = useLocalStorage("notebook", []);

//   const passwordGenerator = useCallback(() => {
//     let pass = "";
//     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
//     if (numberAllowed) str += "0123456789";
//     if (charAllowed) str += "!@#$%^&*";

//     for (let i = 1; i <= length; i++) {
//       let char = Math.floor(Math.random() * str.length);
//       pass += str.charAt(char);
//     }

//     setPassword(pass);
//   }, [length, numberAllowed, charAllowed]);

//   useEffect(() => {
//     passwordGenerator();
//   }, [length, numberAllowed, charAllowed, passwordGenerator]);

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(password).then(() => {
//       const newEntry = { heading, password };
//       setNotebook([...notebook, newEntry]);
//       setHeading("");
//     });
//   };

//   return (
//     <>
//       <div className="w-full max-w-md mx-auto shadow-2xl rounded-lg px-8 py-6 my-10 text-orange-500 bg-gray-900">
//         <h1 className="text-white text-center text-3xl font-extrabold mb-6">
//           Password Generator
//         </h1>
//         <div className="flex items-center shadow-inner rounded-lg overflow-hidden mb-6 bg-gray-800">
//           <input
//             type="text"
//             value={password}
//             className="outline-none w-full py-3 px-5 bg-gray-800 text-white text-lg"
//             placeholder="password"
//             readOnly
//           />
//           <button
//             className="py-3 px-5 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition duration-300"
//             onClick={copyToClipboard}
//           >
//             Copy
//           </button>
//         </div>
//         <div className="flex flex-col text-sm gap-y-4">
//           <div className="flex items-center gap-x-2">
//             <input
//               type="range"
//               min={6}
//               max={100}
//               value={length}
//               className="cursor-pointer w-full"
//               onChange={(e) => {
//                 setLength(e.target.value);
//               }}
//             />
//             <label className="text-white">Length: {length}</label>
//           </div>
//           <div className="flex items-center gap-x-2">
//             <input
//               type="checkbox"
//               defaultChecked={numberAllowed}
//               id="numberInput"
//               className="cursor-pointer"
//               onChange={() => {
//                 setNumberAllowed((prev) => !prev);
//               }}
//             />
//             <label htmlFor="numberInput" className="text-white">
//               Numbers
//             </label>
//           </div>
//           <div className="flex items-center gap-x-2">
//             <input
//               type="checkbox"
//               defaultChecked={charAllowed}
//               id="characterInput"
//               className="cursor-pointer"
//               onChange={() => {
//                 setCharAllowed((prev) => !prev);
//               }}
//             />
//             <label htmlFor="characterInput" className="text-white">
//               Characters
//             </label>
//           </div>
//           <div className="flex items-center gap-x-2">
//             <input
//               type="text"
//               value={heading}
//               className="outline-none w-full py-3 px-5 bg-gray-800 text-white text-lg"
//               placeholder="Heading"
//               onChange={(e) => setHeading(e.target.value)}
//             />
//           </div>
//         </div>
//         <button
//           className="w-full py-3 px-5 mt-6 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
//           onClick={passwordGenerator}
//         >
//           Generate Password
//         </button>
//         <div className="mt-6">
//           <h2 className="text-white text-center text-2xl font-bold mb-4">Passbook</h2>
//           {notebook.map((entry, index) => (
//             <div key={index} className="mb-4">
//               <h3 className="text-white font-bold">{entry.heading}</h3>
//               <p className="text-white">{entry.password}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;



import { useState, useCallback, useEffect } from "react";

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [heading, setHeading] = useState("");
  const [notebook, setNotebook] = useLocalStorage("notebook", []);
  const [editIndex, setEditIndex] = useState(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyToClipboard = () => {
    if (heading.trim() === "") {
      alert("Please enter a Purpose of the Password.");
      return;
    }
    const currentDate = new Date().toLocaleDateString();
    navigator.clipboard.writeText(password).then(() => {
      if (editIndex !== null) {
        const updatedNotebook = notebook.map((entry, index) =>
          index === editIndex ? { ...entry, password, heading, date: currentDate } : entry
        );
        setNotebook(updatedNotebook);
        setEditIndex(null);
      } else {
        const newEntry = { password, heading, date: currentDate };
        setNotebook([...notebook, newEntry]);
      }
      setHeading("");
    });
  };

  const handleEdit = (index) => {
    setPassword(notebook[index].password);
    setHeading(notebook[index].heading || "");
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedNotebook = notebook.filter((_, i) => i !== index);
    setNotebook(updatedNotebook);
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-2xl rounded-lg px-8 py-6 my-10 text-orange-500 bg-gray-900">
        <h1 className="text-white text-center text-3xl font-extrabold mb-6">
          Password Generator
        </h1>
        <div className="flex items-center shadow-inner rounded-lg overflow-hidden mb-6 bg-gray-800">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-5 bg-gray-800 text-white text-lg"
            placeholder="password"
            readOnly
            aria-label="Generated password"
          />
          <button
            className="py-3 px-5 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition duration-300"
            onClick={copyToClipboard}
            aria-label="Copy password to clipboard"
          >
            {editIndex !== null ? "Update" : "Copy"}
          </button>
        </div>
        <div className="flex flex-col text-sm gap-y-4">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer w-full"
              onChange={(e) => {
                setLength(e.target.value);
              }}
              aria-label={`Password length: ${length}`}
            />
            <label className="text-white">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              className="cursor-pointer"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              aria-label="Include numbers"
            />
            <label htmlFor="numberInput" className="text-white">
              Numbers
            </label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              className="cursor-pointer"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              aria-label="Include special characters"
            />
            <label htmlFor="characterInput" className="text-white">
              Characters
            </label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="outline-none w-full py-3 px-5 bg-gray-800 text-white text-lg"
              placeholder="Purpose of the Password"
              aria-label="Password heading"
            />
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-white text-xl font-bold mb-4">Passbook</h2>
          <ul className="text-white">
            {notebook.map((entry, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <div>
                  <span>{entry.password}</span>
                  {entry.heading && (
                    <p className="text-gray-400 text-sm">{entry.heading}</p>
                  )}
                  {entry.date && (
                    <p className="text-gray-400 text-sm">{entry.date}</p>
                  )}
                </div>
                <div>
                  <button
                    className="mr-2 py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
