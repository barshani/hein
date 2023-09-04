import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Title from "./Title";
import { } from "../auth/TokenManager";
import validator from "validator";

interface Props {
    onAdd: Function;
    background:string;
    color:string;
}
export enum Category {
    clothes = 'clothes',
    shoes = 'shoes&eccesories',
    electricity = 'electricity',
    games = 'games',
    sports='sports',
    home='home'
}

function AddForm({ onAdd,background,color }: Props) {
    // const categories = ['shoes&eccesories','clothes','electricity','games','sports','home'];
    const categories: Array<Category> = Object.values(Category);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [imageALT, setImageALT] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [disable, setdisable] = useState(true);
     const [categoryId, setCategoryId] = useState(0);
    const [error, setError] = useState('')
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
        onAdd({
            name,
            description,
            imageURL,
            imageALT,
            price,
            category
            
        })
        setName('')
        setDescription('')
        setImageURL('')
        setImageALT('')
        setPrice('')
        setCategory('')
        setdisable(true)
        
    }

    return (
        <>
        <ToastContainer/>
        <div className="pb-5" style={{paddingTop:'15vh'}}>
        <Title mainText="CREATE CARD"></Title>
        <div className="w-75 mx-auto">
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="name*"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Description*"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                placeholder="price*"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
              <div className="mb-3">
                    <label
                        className="form-label"
                    >
                        Category
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories &&
                            categories.map(category =>
                                <option
                                    value={category}
                                >{category}</option>
                            )
                        }
                    </select>
                </div>
            </div>
            <div className="row mx-auto w-50">
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
            add
            </button>
            </div>
            </div>
            </div>
        </div>
        </>
    );
}

export default AddForm;