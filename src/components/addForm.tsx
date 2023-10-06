import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Title from "./Title";
import { } from "../auth/TokenManager";
import validator from "validator";

interface Props {
    onAdd: Function;
    background:string;
    textColor:string;
}
export enum Category {
    clothes = 'clothes',
    shoes = 'shoes&eccesories',
    electricity = 'electricity',
    games = 'games',
    sports='sports',
    home='home'
}

function AddForm({ onAdd,background,textColor }: Props) {
    // const categories = ['shoes&eccesories','clothes','electricity','games','sports','home'];
    const categories: Array<Category> = Object.values(Category);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [imageALT, setImageALT] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
     const [categoryId, setCategoryId] = useState(0);
    const [error, setError] = useState('')

    function handleClick() {
         if (!name) {
            setError('*name is required')
            return false;
        }
        if (name.length<3) {
            setError('*name is too short');
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
        if (size.length<2) {
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
        if (!validator.isNumeric(price)) {
            setError('*price must be number');
            return false;
        }
        if (!category) {
           setError('*category is required');
            return false;
        }
        setError('')
        onAdd({
            name,
            color,
            size,
            imageURL,
            imageALT,
            price,
            category
            
        })
        setName('')
        setColor('')
        setSize('')
        setImageURL('')
        setImageALT('')
        setPrice('')
        setCategory('')
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
                placeholder="Color*"
                value={color}
                onChange={(e) => setColor(e.target.value)}
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
            <div className="col me-3">
                    <label
                        className="form-label"
                    >
                        Category:
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value={''}></option>
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
            <input
                className="form-control row w-50"
                type="text"
                placeholder="Size"
                value={size}
                onChange={(e) => {
                    setSize(e.target.value)
                }}
            />
            <div className="row mx-auto w-50">
            <div className="text-center text-danger">{error}</div>
            <div className="row mx-auto gap-1">
            <button
                className={background=='grey'?"btn btn-dark col":"btn btn-outline-success col"}
                onClick={()=>navigate(-1)}
                style={{background:background,color:textColor}}
            >
                    back
            </button>
            <button
                className={background=='grey'?"btn btn-dark col":"btn btn-outline-success col"} 
                onClick={handleClick}
                style={{background:background,color:textColor}}
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