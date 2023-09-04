import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { login, signup } from "../services/apiService";
import { setToken, setAdmin, isAdmin, setUserID } from "./TokenManager";
import Title from "../components/Title";

export interface loginUser {
    id?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    phone?:String;
    email: string;
    password: string;
    imageURL?: string;
    imageALT?: string;
    state?: string;
    country?: string;
    city?: string;
    street?: string;
    houseNum?: string;
    zip?: string;
    isBusiness?: boolean;
    token?: string;
    isAdmin?: boolean;
}
interface Props{
    background:string;
    color:string;
}
function Login({background,color}:Props){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    function validate(): boolean {
        if (!password) {
           setError('password is required');
           return false;
        }
        if (!email) 
        {
            setError('email is required');
            return false;
        }

        setError('');
        return true;
    }

    function handleClick() {
        if (!validate()) {
            return;
        }
         login({
            email,
            password
         })
            .then((user) => {
                setUserID(user.id)
                setToken(user.token)
                setAdmin(user.isAdmin===true? "yes":"no")
                navigate('/');
                window.location.reload()
            }).catch(()=>setError('invalid password or email'))
        setEmail('')
        setPassword('')
    }
return(
<>
<ToastContainer/>
<div className="row w-75 mx-auto pb-5" style={{paddingTop:'15vh'}}>
    <Title mainText="login"/>
<div className="col-6"><img className="col-12 opacity-75" src="https://cdn.pixabay.com/photo/2017/01/28/02/24/japan-2014616_1280.jpg" alt="shopping" /></div>
<div className="col-6">
 <div className="w-75 mx-auto">
            <div className="row mb-3">
            <input
                className="form-control me-3 mb-3"
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="form-control me-3"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <div className="row">
             <div className="col w-50 mb-1">
            <div className="row text-center text-danger">{error}</div>
            <button
                className="btn btn-info"
                onClick={handleClick}
                style={{background:background,color:color}}
            >
            login
            </button>
            </div>
             <div className="col w-50">
            <button
                className="btn btn-info"
                onClick={()=>navigate('/signup')}
                style={{background:background,color:color}}
            >
            signup
            </button>
            </div>
            </div>
        </div>
        </div>
        </div>
        </>
)
}
export default Login;