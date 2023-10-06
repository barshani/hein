import { Link, useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { deleteAllCartProduct } from "../services/apiService";
import { useState } from "react";
interface Props{
    background:string
    textColor:string
}
function PurchasePage({background,textColor}:Props){
    const navigate=useNavigate()
    const [name,setName]=useState('');
    const [id,setId]=useState('');
    const [cardNum,setCardNum]=useState('');
    const [digit,setDigit]=useState('');
    const [error,setError]=useState('');
    function handleClick() {
        if (!name) {
            setError('*name is required')
            return false;
        }
        if (name.length<3) {
            setError('*name is too short');
            return false;
        }
        if (!id) {
           setError('*id is required');
            return false;
        }
        if (id.length<3) {
            setError('*id is too short');
            return false;
        }
        if (!cardNum) {
           setError('*card number is required');
            return false;
        }
        if (cardNum.length<3) {
            setError('*card number is too short');
            return false;
        }
        if(!Number(cardNum)){
           setError('*this isnt a card number');
            return false;
        }
        if (!digit) {
           setError('*3 digit in the beck of te card is required');
            return false;
        }
        if (digit.length!==3) {
           setError('*must be 3 digit');
            return false;
        }
        else{
          setError('')
          deleteAllCartProduct().then(()=>
          navigate('/collection'))
        }
        
    }
    return(
    <div className="pb-5" style={{paddingTop:'15vh'}}>
        <Title mainText="PURCHASE"></Title>
    <div className="w-75 mx-auto">
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="name*"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="id*"
                value={id}
                onChange={(e)=>setId(e.target.value)}
            />
            </div>
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="credit card number"
                value={cardNum}
                onChange={(e)=>setCardNum(e.target.value)}
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="3 digit"
                value={digit}
                onChange={(e)=>setDigit(e.target.value)}
            />
            </div>
                <div className="row justify-content-center text-danger">{error}</div>
                <div className="row justify-content-center">
                <button
                className={background=='grey'?"btn btn-dark w-25":"btn btn-outline-success w-25"}
                onClick={
                handleClick}
                >purchase</button>
            </div>
            </div>
            </div>
            )}
            export default PurchasePage;