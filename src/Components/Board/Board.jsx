import React from 'react'
import "./Board.css"
import { HiDotsHorizontal, HiPlus } from "react-icons/hi";
import { allTickets } from '../../App';
import Card from '../Card/Card';


const Board = (props) => {
  
  var validTickets = [];
  if(props.type === "Status")
  validTickets = allTickets.filter((ticket)=>ticket.status===props.name)
  else if(props.type === "Priority")
  validTickets = allTickets.filter((ticket)=>ticket.priority===Number(props.level)) 
  else if(props.type === "User")
  validTickets = allTickets.filter((ticket)=>ticket.userId===props.id)


  if(props.sort === "Priority")
  validTickets.sort((a, b) => b.priority-a.priority);
  else if(props.sort === "Title")
  validTickets.sort((a, b) => a.title - b.title);

  
  return (
    <div className='board'>
        <div className='board_top'>
            {props.icon}
            <p className='board_top_title'>{props.name} <span>{validTickets.length}</span></p>
            <HiPlus />
            <HiDotsHorizontal />
        </div>
        <div className='board_cards'>
            {validTickets.map((ticket)=><Card id={ticket.id} title={ticket.title} tag={ticket.tag} priority={ticket.priority} grouping={props.type} status={ticket.status}/>)}
        </div>
    </div>
  )
}

export default Board