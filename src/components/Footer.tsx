import { NavLink } from "react-router-dom"
interface Props {
    background: string;
    color: string;
}
function Footer({background,color}:Props){
return(
<div className="p-2 d-flex text-center justify-content-evenly" style={{background:background}}>
    <div className="col">
      right resorve
    </div>
  </div>
)
}
export default Footer