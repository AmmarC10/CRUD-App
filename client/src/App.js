import './App.css';
import { useState } from "react";
import Axios from 'axios';
import axios from 'axios';


function App() {

  
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [cost, setCost] = useState("");

  const [itemList, setItemList] = useState([]);

  const [newCost, setNewCost] = useState(0);
  
  const addItem =() => {
    Axios.post('http://localhost:3001/create', 
    { name: name, date: date, cost: cost}).then(() => {
      setItemList(...itemList, {name: name, date: date, cost: cost})
    })
 };

 const getItems =() => {
  Axios.get('http://localhost:3001/items').then((response) => {
    setItemList(response.data);
 });
 }

 const updateItemCost = (name) => {
   Axios.put('http://localhost:3001/update', {cost: newCost, name: name}).then((response) => {
     alert('Updated! Refresh page to see changes!')
   })
 }

 const deleteItem = (name) => {
   axios.delete(`http://localhost:3001/delete/${name}`);
   alert('Deleted! Refresh page to see changes');
   }
 
  
  return (
    <div className="App">
      <div className="info">

        <label>Name:</label>
        <input type="text" onChange={(event) => {
           setName(event.target.value)}} />
        <label>Date:</label>
        <input type="date" onChange={(event) => {
          setDate(event.target.value)}} />
        <label>Cost:</label>
        <input type="number" step="0.1" onChange={(event) => {
          setCost(event.target.value)
        }}/>
        <button onClick={addItem}>Add Item</button>
      </div>
      <div className="showbtn">
      <button onClick={getItems}>Show Items</button>
      {itemList.map((item, key) => {
          return (<div className="item">
            <div>
            <h3>Name: {item.name}</h3>
            <h3>Item: {item.date}</h3>
            <h3>Cost: {item.cost}</h3>
            </div>
            <div>
              <input type="text" placeholder="new cost" onChange={(event) => { 
                setNewCost(event.target.value);
              }}/>
              <button onClick={() =>{
                updateItemCost(item.name)
              }}>Update</button>

              <button onClick={(name) => {
                deleteItem(item.name);
              }}>Delete This Item</button>
              </div>
               
            </div>)
      })}
      </div>
    
    </div>
  );
}

export default App;
