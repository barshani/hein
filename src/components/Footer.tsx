import { NavLink } from "react-router-dom"
interface Props {
    background: string;
    textColor: string;
}
function Footer({background,textColor}:Props){
return(
<div className="mx-auto justify-content-center" style={{background:background,color:textColor}}>
   <div className="text-center w-100">
    contect us: heinformen@yahoo.com
   </div>
    <div className="mx-auto text-center">
      all right resorved &#169;
    </div>
  </div>
)
}
export default Footer