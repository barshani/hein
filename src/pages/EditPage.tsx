import { ToastContainer, toast } from "react-toastify";
import {editProduct } from "../services/apiService";
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import { Product } from "./home";
import EditForm from "../components/editForm";
interface Props{
    background:string;
    textColor:string;
}
function EditPage({background,textColor}:Props){
    const [cards, setCards] = useState<Array<Product>>([]);
    const navigate=useNavigate()
 function onEdit(card: Product) {
        editProduct(card)
            .then(json => {
            toast.success('you update product successfully', {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
            })
            })
    }
    return (
        <>
           <ToastContainer/>
           <EditForm 
           onEdit={onEdit}
           background={background}
           textColor={textColor}
           />
        </>
           )
    }
    export default EditPage;