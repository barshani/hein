import { ToastContainer, toast } from "react-toastify";
import {editProduct } from "../services/apiService";
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import { Product } from "./home";
import EditForm from "../components/editForm";
interface Props{
    background:string;
    color:string;
}
function EditPage({background,color}:Props){
    const [cards, setCards] = useState<Array<Product>>([]);
    const navigate=useNavigate()
 function onEdit(card: Product) {
        editProduct(card)
            .then(json => {
                toast.success(`product name ${json.name} has been edited successfully`);
            })
    }
    return (
        <>
           <EditForm 
           onEdit={onEdit}
           background={background}
           color={color}
           />
        </>
           )
    }
    export default EditPage;