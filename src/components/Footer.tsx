import { NavLink } from "react-router-dom"
interface Props {
    background: string;
    textColor: string;
}
function Footer({background,textColor}:Props){
return(
<div className="p-2 d-flex text-center justify-content-evenly" style={{background:background}}>
    <div className="col">
      right resorve
    </div>
  </div>
)
}
export default Footer