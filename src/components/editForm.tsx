import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Title from "./Title";
import { getProduct } from "../services/apiService";
import { getUserID } from "../auth/TokenManager";
import validator from "validator";

interface Props {
    onEdit: Function;
    background:string;
    color:string;
}

function EditForm({onEdit,background,color}:Props) {
     const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [imageALT, setImageALT] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [disable, setdisable] = useState(true);
    const [error, setError] = useState('')
    const {_id} =useParams();
      useEffect(() => {
        if (!_id) return;
        getProduct(_id)
            .then(product => {
               setName(product.name)
               setDescription(product.description)
               setImageURL(product.imageURL||'')
               setImageALT(product.imageALT||'')
               setPrice(product.price)
               setCategory(product.category||'')
            })
    }, [_id])
     function validate(): boolean {
        if (!name) {
            setError('*title is required')
            return false;
        }
        if (name.length<3) {
            setError('*title is too short');
            return false;
        }
        if (!description) {
           setError('*discription is required');
            return false;
        }
        if (description.length<3) {
            setError('*discription is too short');
            return false;
        }
        if(!validator.isURL(imageURL)){
           setError('*this isnt a URL');
            return false;
        }
        if (!price) {
           setError('*price is required');
            return false;
        }
        if (!validator.isNumeric(price)) {
            setError('*price must be number');
            return false;
        }
        if (!category) {
           setError('*category is required');
            return false;
        }
        setError('')
        setdisable(false)
        return true;
    }

    function handleClick() {
        onEdit({
            _id,
            name,
            description,
            imageURL,
            imageALT,
            price,
            category,
        })
        setdisable(true);
        
    }

    return (
        <>
        <ToastContainer/>
        <div style={{paddingTop:'15vh'}}>
        <Title mainText="UPDATE CARD"></Title>
        <div className="w-75 mx-auto">
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Name*"
                value={name}
                onChange={(e) => {
                    setName(e.target.value); 
                    setdisable(true);
                }}
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Description*"
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value);
                    setdisable(true);
                }}
            />
            </div>
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Image url"
                value={imageURL}
                onChange={(e) =>{
                    setImageURL(e.target.value);
                    setdisable(true);
                }}
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Image alt"
                value={imageALT}
                onChange={(e) => {
                    setImageALT(e.target.value)
                    setdisable(true);
                }}
            />
            </div>
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="string"
                placeholder="price"
                value={price}
                onChange={(e) => {
                    setPrice(e.target.value)
                    setdisable(true);
                }}
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="category*"
                value={category}
                onChange={(e) => {
                    setCategory(e.target.value);
                    setdisable(true);
                }}
            />
            </div>
            <div className="row mx-auto w-50 pb-3">
            <div className="text-center text-danger">{error}</div>
            <div className="row mx-auto gap-1">
            <button
                className="btn col mx-auto"
                onClick={()=>navigate(-1)}
                style={{background:background,color:color}}
            >
                    back
            </button>
            <button
                className="btn col mx-auto"
                onClick={validate}
                style={{background:background,color:color}}
            >
            <i className="bi bi-arrow-repeat"></i>
            </button>
            </div>
            <div className="row mx-auto mt-1">
            <button
                disabled={disable}
                className="btn"
                onClick={handleClick}
                style={{background:background,color:color}}
            >
            Update
            </button>
            </div>
            </div>
        </div>
        </div>
        </>
    );
}

export default EditForm;