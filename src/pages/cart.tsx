import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { deleteCartProduct, deleteFavProduct, getCartProducts, getFavProducts } from "../services/apiService";
import Title from "../components/Title";
import { getUserID } from "../auth/TokenManager";
import { Product } from "./home";
interface Props{
    background:string
    textColor:string
}
function CartPage({background,textColor}:Props){
   const [products, setProducts] = useState<Array<Product>>([]);
   const [searchProducts, setSearchProducts] = useState<Array<Product>>([]);
   const [total,setTotal]=useState(1)
   const [search, setSearch] = useState('');
   const navigate=useNavigate()
    useEffect(() => {
        const userID=getUserID();
        getCartProducts(userID)
            .then(json => {
                const sorted=json.sort((a,b)=> a.name > b.name ? 1 : -1)
                setProducts(sorted)
                setSearchProducts(sorted)
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
    }
      function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearch(value);
        const normalizedValue = value.trim().toLowerCase();
        const updated = [...products].filter(
            product =>product.name.toLowerCase().startsWith(normalizedValue)
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
        setSearchProducts(updated)
        if(updated.length===0)
           navigate(-1);
    }
    return (
        <>
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
                        searchProducts.map(product =>
                           <div className="card" key={product._id}style={{width:"22rem",height:"35rem",backgroundColor:background==='grey'?'black':'white',color:textColor}}>
                            {product.imageURL&&product.imageALT&&<img src={product.imageURL} alt={product.imageALT} className="card-img-top h-50"/>}
                            {product.imageURL&&!product.imageALT&&<img src={product.imageURL} className="card-img-top h-50"/>}
                            {!product.imageURL&& <img src={'https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_1280.jpg'} className="card-img-top h-50" alt="Logo" />}
                           
                            <div className="card-body">
                            <h5 className="card-title fw-bold">{product.name}</h5>
                            <p className="card-text"><span className="fw-bold">color:</span>{product.color}</p>
                            <p className="card-text"><span className="fw-bold">size:</span>{product.size}</p>
                            <hr />
                            <p className="card-text"><span className="fw-bold">price:</span>{product.price}$</p>
                            <p className="card-text"><span className="fw-bold">category:</span>{product.category}</p>
                            </div>
                            <button 
                            className={background=='grey'?"btn btn-danger w-100 mt-5":"btn btn-outline-danger w-100 mt-5"} 
                            onClick={()=>{
                                deleteProductFromCart(product._id,product.price)
                            }}
                            >remove form cart</button>
                            </div>
                     )
                    }
                </div>
                <p>your total is:{" "+total}$</p>
               <button
                     className={background=='grey'?"btn btn-dark mb-5":"btn btn-outline-success mb-5"} 
                     onClick={()=>navigate('/purchase')}>buy now</button>
                </div>
               
               
        </>
        );
}
export default CartPage;