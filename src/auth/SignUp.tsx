import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signup } from "../services/apiService";
import validator from 'validator'
import Title from "../components/Title";
export interface User {
    id?: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    phone:String;
    email: string;
    password: string;
    imageURL?: string;
    imageALT?: string;
    state?: string;
    country: string;
    city: string;
    street: string;
    houseNum: string;
    zip?: string;
    token?: string;
    isAdmin?: boolean;


}
interface Props{
    background:string;
    textColor:string;
}
function SignUp({background,textColor}:Props){
     const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [imageALT, setImageALT] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNum, setHouseNum] = useState('');
    const [zip, setZip] = useState('');
    const [isBusiness, setIsBusiness] = useState(false);
    const [error, setError] = useState('');
    const [disable, setdisable] = useState(true);
    function validate(): boolean {
        if (!firstName) {
            setError('*name is required');
            return false;
        }
        if (firstName.length<2) {
            setError('*name is too short');
            return false;
        }
        if (!lastName) {
            setError('*last name is required');
            return false;
        }
        if (lastName.length<2) {
            setError('*last name is too short');
            return false;
        }
        if (!phone) {
            setError('*phone is required');
            return false;
        }
        if (phone.length<10||phone.length>13) {
            setError('*invalid phone number');
            return false;
        }
        if (!password) {
            setError('*password is required');
            return false;
        }
        if (!validator.isStrongPassword(password, {minLength: 6, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1})) {
            setError('*password not strong enough: minimum 6 letters, 1 lower case letter and upper case letter, 1 number, 1 symbol ');
            return false;
        }
        if (!email) {
            setError('*email is required');
            return false;
        }
        if (email.length<10||!validator.isEmail(email)) {
            setError('*invalid mail');
            return false;
        }
        if (!country) {
            setError('*country name is required');
            return false;
        }
        if (country.length<3) {
            setError('*country too short');
            return false;
        }
        if (!city) {
            setError('*city name is required');
            return false;
        }
        if (city.length<3) {
            setError('*city too short');
            return false;
        }
        if (!street) {
            setError('*street name is required');
            return false;
        }
        if (street.length<3) {
            setError('*street name is too short');
            return false;
        }
        if (!validator.isNumeric(houseNum)) {
            setError('*house number is required');
            return false;
        }
        setError('');
        setdisable(false);
        return true;
    }

    function handleClick() {
        if (!validate()) {
            return;
        }
        function onAdd(user: User) {
        signup(user)
            .then(json => {
                toast.success(`user ${json.firstName} has been added successfully`);
                navigate('/login')

            })
    }

        onAdd({
            firstName,
            middleName,
            lastName,
            phone,
            email,
            password,
            imageURL,
            imageALT,
            state,
            country,
            city,
            street,
            houseNum,
            zip
        })
        setFirstName('')
        setMiddleName('')
        setLastName('')
        setPhone('')
        setEmail('')
        setPassword('')
        setImageURL('')
        setImageALT('')
        setState('')
        setCountry('')
        setCity('')
        setStreet('')
        setHouseNum('')
        setZip('')
    }
return(
<>
<div style={{paddingTop:'15vh'}}>
  <Title mainText="sign up"/>
 <div className="w-75 mx-auto">
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="first name*"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="middle name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
            />
            </div>
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="last name*"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Phone*"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            </div>
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="form-control me-3 col"
                type="password"
                placeholder="password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Image url"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Image alt"
                value={imageALT}
                onChange={(e) => setImageALT(e.target.value)}
            />
            </div>
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Country*"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />
            </div>
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="City*"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Street*"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
            />
            </div>
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Housenumber*"
                value={houseNum}
                onChange={(e) => setHouseNum(e.target.value)}
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Zip*"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
            />
            </div>
             <div className="row mx-auto w-50 pb-3 gap-1">
            <div className="text-center text-danger">{error}</div>
            <button
                className={background=='grey'?"btn btn-dark col w-50":"btn btn-outline-success col w-50"}
            >
                <Link
                    to="/login"
                    className="nav-link"
                >
                    Cancel
                </Link>
            </button>
            <button
                className={background=='grey'?"btn btn-dark col w-50":"btn btn-outline-success col w-50"}
                onClick={handleClick}
            >
            add
            </button>
        </div>
        </div>
        </div>
        </>
)
}
export default SignUp;