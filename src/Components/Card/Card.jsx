import React from 'react'
import "./card.css"
import Tag from "../tags/Tag"
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BiSolidAlarmExclamation, BiDotsHorizontal } from "react-icons/bi";
import { BsCircle, BsFillExclamationSquareFill } from "react-icons/bs";
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { MdCancel,MdSignalCellularAlt1Bar,MdSignalCellularAlt2Bar,MdSignalCellularAlt } from "react-icons/md";


const Card = (props) => {
  
  function iconSelectorpriority(){
    if(props.priority === 0) return < BiDotsHorizontal  className='icon11'/>
    else if(props.priority === 1) return < MdSignalCellularAlt1Bar className='icon15'/>
    else if(props.priority === 2) return < MdSignalCellularAlt2Bar className='icon13'/>
    else if(props.priority === 3) return < MdSignalCellularAlt className='icon14'/>
    else return < BsFillExclamationSquareFill className='icon12'/>
  }

  function iconSelectorstatus(){
    if(props.status === "Backlog") return < BiSolidAlarmExclamation  className='icon1'/>
    else if(props.status === "Todo") return < BsCircle className='icon2'/>
    else if(props.status === "In progress") return < FaRegCirclePlay className='icon3'/>
    else if(props.status === "Done") return < IoCheckmarkDoneCircleSharp className='icon4'/>
    else return < MdCancel className='icon5'/>
  }

  return (
    <div className='card'>
        <div className='card_top'>
            <p className='card_id'>{props.id}</p>
        </div>
        <div className='card_title'>
        {props.grouping!=="Status" && iconSelectorstatus()}
          <p>{(props.title.length>50) ? props.title.slice(0,50)+'...' : props.title }</p>
        </div>
        <div className='card_tag'>
            {props.grouping!=="Priority" && iconSelectorpriority()}
            <Tag text={props.tag}/>
        </div>
    </div>
  )
}

export default Card