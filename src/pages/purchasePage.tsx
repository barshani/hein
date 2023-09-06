import { Link, useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { deleteAllCartProduct } from "../services/apiService";

function PurchasePage(){
    const navigate=useNavigate()
    return(
    <div className="pb-5" style={{paddingTop:'15vh'}}>
        <Title mainText="PURCHASE"></Title>
    <div className="w-75 mx-auto">
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="name*"
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="id*"
            />
            </div>
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="credit card number"
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="3 digit"
            />
            </div>
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="price*"
            />
                </div>
                <button 
                onClick={()=>{
                deleteAllCartProduct().then(()=>
                navigate('/collection'))
                }}>purchase</button>
            </div>
            </div>
            )}
            export default PurchasePage;