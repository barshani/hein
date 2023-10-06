import { toast } from "react-toastify";
import { addProduct } from "../services/apiService";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Product } from "./home";
import AddForm from "../components/addForm";
interface Props{
    background:string;
    textColor:string;
}
function AddPage({background,textColor}:Props){
    const [cards, setCards] = useState<Array<Product>>([]);
    const navigate=useNavigate()
 function onAdd(product: Product) {
        addProduct(product)
            .then(json => {
                navigate(-1)
           
            })
    }
    return (
        <>
           <AddForm 
           onAdd={onAdd}
           background={background}
           textColor={textColor}
           />
        </>
           )
    }
    export default AddPage;