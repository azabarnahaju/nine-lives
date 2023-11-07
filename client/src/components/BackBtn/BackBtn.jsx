import { Link } from "react-router-dom"
import "./BackBtn.css"
import {IoArrowBackCircle} from "react-icons/io5"

export default function BackBtn({path}) {
  return (
    <Link to={path}><IoArrowBackCircle className="back-btn-icon"/></Link>
  )
}
