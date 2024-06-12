// import React, { useState } from "react";
// import TodoList from "./TodoList";

// const App = ()=>{
//   const [items, setitems]=useState("");
//   const [inputList, setinputList]=useState([]);

//   const itemEvents = (event)=>{
//     setitems(event.target.value);
//   };

//   // const listItems =()=> {
//   //   setinputList([...inputList,items])
//   //       setitems("");
//   // }
//   const listItems = ()=>{
//     setinputList((oldItems)=>{
//       return([...oldItems,items]);
//     });
//     setitems("");
    
//   };

//   const deleteItem=(id)=>{
//     setinputList(()=>{
//       return inputList.filter(
//         (arrelem,index)=>{
//         return index !==id;}
//       )
//     })
//   }

//   return(
//     <div className="main_div">
//       <div className="center_div">
//         <h1>ToDo List</h1>
//         <div className="input_item">

//         <input type="text" 
//         placeholder="Add a item" 
//         value={items}
//         onChange={itemEvents}
//         />

//         <button
//         onClick={listItems}>+</button>

//         </div>
//         <ol>
//           {inputList.map(
//             (newlist, index)=>{
//               return(<TodoList
//                       id  ={index}  
//                       key = {index}   
//                       prop= {newlist}
//                       onselect = {deleteItem}  
//                       />);
//             }
//             )}
//         </ol>
//       </div>
//     </div>
//   );
// }

// export default App;
// App.js
import React, { useState } from "react";
import TodoList from "./TodoList";
import axios from "axios";

const App = () => {
  const [items, setItems] = useState("");
  const [inputList, setInputList] = useState([]);
  const [gptResponse, setGptResponse] = useState("");

  const itemEvents = (event) => {
    setItems(event.target.value);
  };

  const listItems = () => {
    setInputList((oldItems) => {
      return [...oldItems, items];
    });
    setItems("");
  };

  const deleteItem = (id) => {
    setInputList(() => {
      return inputList.filter((_, index) => {
        return index !== id;
      });
    });
  };

  const askGPT = async () => {
    try {
      const response = await axios.post('http://0.0.0.0:8000/api/gpt', { todos: inputList });
      setGptResponse(response.data.response);
    } catch (error) {
      console.error('There was an error communicating with GPT!', error);
    }
  };

  return (
    <div className="main_div">
      <div className="center_div">
        <h1>ToDo List</h1>
        <div className="input_item">
          <input
            type="text"
            placeholder="Add a item"
            value={items}
            onChange={itemEvents}
          />
          <button onClick={listItems}>+</button>
        </div>
        <ol>
          {inputList.map((newlist, index) => {
            return (
              <TodoList
                key={index}
                id={index}
                prop={newlist}
                onDelete={deleteItem}
                onAskGPT={askGPT}
              />
            );
          })}
        </ol>
      </div>
      <div className="response_div">
        <h2>Response from GPT</h2>
        <p>{gptResponse}</p>
      </div>
    </div>
  );
};

export default App;
