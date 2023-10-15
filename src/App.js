import React, { useState, useEffect } from "react";
import './App.css';
import Board from "./Components/Board/Board";
import Dropmenu from "./Components/Dropmenu/Dropmenu";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BiSolidAlarmExclamation, BiDotsHorizontal } from "react-icons/bi";
import { BsCircle, BsFillExclamationSquareFill } from "react-icons/bs";
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { MdCancel,MdSignalCellularAlt1Bar,MdSignalCellularAlt2Bar,MdSignalCellularAlt } from "react-icons/md";

const url = "https://api.quicksell.co/v1/internal/frontend-assignment";

// Defining async function
var getapidata = async function (url) {
  
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();
  return data;
}

var allTickets = [];
var allUsers = [];

getapidata(url).then((data)=>{
  allTickets = data.tickets;
  allUsers = data.users;
});

function App() {
  
  const [groupCurrent, setGroupCurrent] = useState("Status");
  const [orderCurrent, setOrderCurrent] = useState("Priority");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(()=>{
    const data1 = window.localStorage.getItem("grouping");
    const data2 = window.localStorage.getItem("ordering");
    if(data1 !== null) setGroupCurrent(JSON.parse(data1));
    if(data2 !== null) setOrderCurrent(JSON.parse(data2));
  },[])

  useEffect(()=>{
    window.localStorage.setItem("grouping",JSON.stringify(groupCurrent));
    window.localStorage.setItem("ordering",JSON.stringify(orderCurrent));
  },[]);

  return (

    <div className="app" onClick={console.log(groupCurrent)}>
      <div className="app_navbar" >
        <div className="dropdown_container" >
          <button className="app_displaybutton" onClick={()=>{setShowDropdown((prev)=>!prev);}}> <HiAdjustmentsHorizontal className="svg1"/> <p>Display</p> <RiArrowDropDownLine className="svg2"/> </button>
            {showDropdown && <Dropmenu show={setShowDropdown} group={groupCurrent} order={orderCurrent} setgroup={setGroupCurrent} setorder={setOrderCurrent}/>} 
        </div>
      </div>

      <div className="app_outer">
        {groupCurrent==="Status" && (<div className="app_boards">
            <Board name="Backlog" type={groupCurrent} sort={orderCurrent} icon=< BiSolidAlarmExclamation className="icon1" />/>
            <Board name="Todo" type={groupCurrent} sort={orderCurrent} icon=< BsCircle className="icon2" />/>
            <Board name="In progress" type={groupCurrent} sort={orderCurrent} icon=<FaRegCirclePlay className="icon3"/>/>
            <Board name="Done" type={groupCurrent} sort={orderCurrent} icon=<IoCheckmarkDoneCircleSharp className="icon4"/>/>
            <Board name="Canceled" type={groupCurrent} sort={orderCurrent} icon=<MdCancel className="icon5"/>/>
        </div>)}

        {groupCurrent==="Priority" && (<div className="app_boards">
            <Board name="No Priority" level="0" type={groupCurrent} sort={orderCurrent} icon=<BiDotsHorizontal className="icon11"/>/>
            <Board name="Urgent" level="4" type={groupCurrent} sort={orderCurrent} icon=<BsFillExclamationSquareFill className="icon12"/>/>
            <Board name="High" level="3" type={groupCurrent} sort={orderCurrent} icon=<MdSignalCellularAlt className="icon13"/>/>
            <Board name="Medium" level="2" type={groupCurrent} sort={orderCurrent} icon=<MdSignalCellularAlt2Bar className="icon14"/>/>
            <Board name="Low" level="1" type={groupCurrent} sort={orderCurrent} icon=<MdSignalCellularAlt1Bar className="icon15"/>/>
        </div>)}

        {groupCurrent==="User" && (
          <div className="app_boards">
          {allUsers.map((user)=><Board name={user.name} id={user.id} type={groupCurrent} sort={orderCurrent}/>)}  
          </div>)}
      </div>
    </div>
  );
}

export default App;
export {allTickets, allUsers};
