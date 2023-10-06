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
    textColor:string;
}

function EditForm({onEdit,background,textColor}:Props) {
     const navigate = useNavigate();
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [imageALT, setImageALT] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('')
    const {_id} =useParams();
      useEffect(() => {
        if (!_id) return;
        getProduct(_id)
            .then(product => {
               setName(product.name)
               setColor(product.color)
               setSize(product.size)
               setImageURL(product.imageURL||'')
               setImageALT(product.imageALT||'')
               setPrice(product.price)
               setCategory(product.category||'')
            })
    }, [_id])
    function handleClick() {
        if (!name) {
            setError('*title is required')
            return false;
        }
        if (name.length<3) {
            setError('*title is too short');
            return false;
        }
        if (!color) {
           setError('*color is required');
            return false;
        }
        if (color.length<3) {
            setError('*color is too short');
            return false;
        }
        if (!size) {
           setError('*size is required');
            return false;
        }
        if (size.length<3) {
            setError('*size is too short');
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
        if (!Number(price)) {
            setError('*price must be number');
            return false;
        }
        if (!category) {
           setError('*category is required');
            return false;
        }
        else{
           onEdit({
              _id,
              name,
              color,
              size,
              imageURL,
              imageALT,
              price,
              category,
           })
        }
        setError('')
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
                }}
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Color*"
                value={color}
                onChange={(e) => {
                    setColor(e.target.value);
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
                }}
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Image alt"
                value={imageALT}
                onChange={(e) => {
                    setImageALT(e.target.value)
                }}
            />
            </div>
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => {
                    setPrice(e.target.value)
                }}
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Category*"
                value={category}
                onChange={(e) => {
                    setCategory(e.target.value);
                }}
            />
            </div>
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Size"
                value={size}
                onChange={(e) => {
                    setSize(e.target.value)
                }}
            />
            </div>
            <div className="row mx-auto w-50 pb-3">
            <div className="text-center text-danger">{error}</div>
            <div className="row mx-auto gap-1">
            <button
                className={background=='grey'?"btn btn-dark col":"btn btn-outline-success col"}
                onClick={()=>navigate(-1)}
                style={{background:background,color:color}}
            >
                    back
            </button>
            <button
                className={background=='grey'?"btn btn-dark col":"btn btn-outline-success col"}
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