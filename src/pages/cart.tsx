import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { deleteCartProduct, deleteFavProduct, getCartProducts, getFavProducts } from "../services/apiService";
import Title from "../components/Title";
import { getUserID } from "../auth/TokenManager";
import { Product } from "./home";
interface Props{
    background:string
    color:string
}
function CartPage({background,color}:Props){
   const [products, setProducts] = useState<Array<Product>>([]);
   const [searchProducts, setSearchProducts] = useState<Array<Product>>([]);
   const [total,setTotal]=useState(1)
   const [search, setSearch] = useState('');
   const navigate=useNavigate()
    useEffect(() => {
        const userID=getUserID();
        getCartProducts(userID)
            .then(json => {
                setProducts(json)
                setSearchProducts(json)
                var sum=0;
                json.map(product=>{
               sum+=Number(product.price);
                })
                setTotal(sum);
            })
    }, []);
    async function onDelete(productID: string) {
        const userID=getUserID();
        const res =await deleteCartProduct({userID,productID});
        const updated = [...products].filter(
            cartProduct => cartProduct._id !== productID
        )
        
        setSearchProducts(updated);
         setProducts(updated);
        toast.success('product has been deleted from favorite');
    }
      function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearch(value);
        const normalizedValue = value.trim().toLowerCase();
        const updated = [...products].filter(
            product =>product.name.toLowerCase().includes(normalizedValue)
        );
        setSearchProducts(updated);
    }
         async function deleteProductFromCart(productID:string,price:String){
         const userID=getUserID()
        const res =await deleteCartProduct({userID,productID});
         const updated = [...products].filter(
            cart => cart._id !== productID
        )
        setTotal(total-Number(price))
        setProducts(updated)
          toast.success('product has deleted from your cart');
    }

    return (
        <>
        <ToastContainer/>
        <div className="w-75 mx-auto" style={{paddingTop:'15vh'}}>
        <Title mainText="Shopping cart"></Title>
          <input
                        className="form-control mx-3 mb-3 w-25"
                        placeholder="Search"
                        value={search}
                        onChange={handleSearch}
                    />
                           <div className="d-flex flex-wrap justify-content-between ms-3 pb-5 gap-3">
                    {
                        products.map(product =>
                           <div className="card" key={product._id}style={{width:"22rem",height:"35rem",background:background,color:color}}>
                            {product.imageURL&&product.imageALT&&<img src={product.imageURL} alt={product.imageALT} className="card-img-top h-50"/>}
                            {product.imageURL&&!product.imageALT&&<img src={product.imageURL} className="card-img-top h-50"/>}
                            {!product.imageURL&& <img src={'https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_1280.jpg'} className="card-img-top h-50" alt="Logo" />}
                           
                            <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.description}</p>
                            <hr />
                            <p className="card-text">{product.price}$</p>
                            <p className="card-text">{product.category}</p>
                            <div className="row">
                            <div className="col">
                            </div>
                            </div>
                            <button 
                            className="btn w-100 mt-3" 
                            style={{backgroundColor:background==='grey'?'black':'grey', color:color}}
                            onClick={()=>{
                                deleteProductFromCart(product._id,product.price)
                            }}
                            >remove form cart</button>
                            </div>
                           </div>
                        )
                        
                    }
                </div>
                <p>your total is:{total}</p>
                <button onClick={()=>navigate('/purchase')}>buy now</button>
                </div>
               
               
        </>
        );
}
export default CartPage;