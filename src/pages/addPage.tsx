import { toast } from "react-toastify";
import { addProduct } from "../services/apiService";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Product } from "./home";
import AddForm from "../components/addForm";
interface Props{
    background:string;
    color:string;
}
function AddPage({background,color}:Props){
    const [cards, setCards] = useState<Array<Product>>([]);
    const navigate=useNavigate()
 function onAdd(product: Product) {
        addProduct(product)
            .then(json => {
                toast.success(`product named ${json.name} has been added successfully`);
           
            })
    }
    return (
        <>
           <AddForm 
           onAdd={onAdd}
           background={background}
           color={color}
           />
        </>
           )
    }
    export default AddPage;