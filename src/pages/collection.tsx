import { useContext, useEffect, useState } from "react";
import { addToCart, addToFavorites, deleteCartProduct, deleteFavProduct, deleteProduct, editCartProduct, getCartProducts, getCarts, getFavProducts, getProduct, getProductPrice, getProducts } from "../services/apiService";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate} from "react-router-dom";
import Title from "../components/Title";
import {getUserID, isAdmin} from "../auth/TokenManager";
import { Cart, Product } from "./home";
import { updateSourceFile } from "typescript";
import validator from "validator";
interface Props{
    background:string
    color:string
}

function CollectionPage({background,color}:Props){
   const [products, setProducts] = useState<Array<Product>>([]);
   const [cartProducts, setCartProducts] = useState<Array<Product>>([]);
   const [cart, setCart] = useState<Array<Cart>>([]);
   const [favProducts, setFavProducts] = useState<Array<Product>>([]);
   const [total,setTotal]=useState(1);
   const [quantity,setQuantity]=useState(1);
   const [shoppingList,setShoppingList]=useState<Array<Product>>([]);
   const [search, setSearch] = useState('');
   const navigate=useNavigate()
       useEffect(() => {
        getProducts()
            .then(json => {
                setProducts(json);
            })
    }, []);
       useEffect(() => {
         const userID=getUserID();
        getCarts(userID)
            .then(json => {
                setCart(json);
            })
    }, []);
     useEffect(() => {
        const userID=getUserID();
        getFavProducts(userID)
            .then(json => {
                setFavProducts(json);
            })
    }, []);
     useEffect(() => {
        const userID=getUserID();
         getCartProducts(userID)
            .then(json => {
                console.log("hii")
                setCartProducts(json);
                var sum=0;
                json.map(product=>{
               sum+=Number(product.price);
                })
                setTotal(sum);
            })
    }, []);
    async function onDelete(_id: string) {
        const res = await deleteProduct(_id);
        const userID=getUserID()
        const productID=_id
        const updated = [...products].filter(
            product => product._id !== productID
        )
        setProducts(updated)
        toast.success('product has been deleted');
    }
     async function addFavorites(product:Product) {
        const userID=getUserID()
        const productID=product._id
        addToFavorites(
            userID,
            productID
        );
        const newFav=products.map(product=>product._id===productID)
        setFavProducts([...favProducts,product])
        toast.success('product has added to your favorites');
    }
     async function addCartProduct(product:Product) {
        const userID=getUserID()
        const productID=product._id
        addToCart(
           { userID,
            productID,
            quantity}
        );
        const newCart=products.map(product=>product._id===productID)
        setCartProducts([...cartProducts,product])
        if(total==1){
          setTotal(Number(product.price))
        }
        else
           setTotal(total+Number(product.price))
        toast.success('product has added to your cart');
    }
    async function deleteFavorite(productID:string){
         const userID=getUserID()
        const res =await deleteFavProduct({userID,productID});
         const updated = [...favProducts].filter(
            favorites => favorites._id !== productID
        )
        setFavProducts(updated)
          toast.success('product has deleted from your favorites');
    }
    async function deleteProductFromCart(productID:string,price:String){
         const userID=getUserID()
        const res =await deleteCartProduct({userID,productID});
         const updated = [...cartProducts].filter(
            cart => cart._id !== productID
        )
        setTotal(total-Number(price))
        setCartProducts(updated)
          toast.success('product has deleted from your cart');
    }
    function isFavorite(productID:string) {
        let bol=false;
        favProducts.map(product=>{
            if(product._id===productID)
               bol=true;
        })
        return bol
    }
    function isCartProduct(productID:string) {
        let bol=false;
        cartProducts.map(product=>{
            if(product._id===productID)
            {
               bol=true;
            }
        })
        return bol
    }
    return (
        <>
          <ToastContainer />
        <div className="w-75 mx-auto col-12 gap-5">
            {cartProducts.length&&<div className="list" style={{
                position: 'fixed',
                right: 0,
                zIndex:100,
                width: '300px',
                border: '3px solid black',
                background:background
                }}>
            <h3 className="ms-2"><i className="bi bi-cart"></i> shopping cart</h3>
             <ul>
                    <li className="list-group-item">items:{cartProducts.length}</li>
                    <li className="list-group-item">total:{total}</li>
            </ul>
            <button className="btn btn-success w-100" onClick={
                ()=>{
                    navigate('../cart')
                }}>buy</button>
        </div>}
        <div className="mx-auto" style={{paddingTop:'15vh'}}>
        <Title mainText="Cards" subText="Here you can find business cards from all categories"></Title>
        <div className="d-flex pb-3 me-5 gap-5 justify-content-center">
          <input
                        className="form-control mx-3 mb-3 w-25"
                        placeholder="Search"
                        // value={search}
                    />
                 {<button
                className="btn"
                style= 
    {{backgroundColor:background==='grey'?'black':'grey'}}
            >
             <Link
                    to="/addPage"
                    className="btn"
                    style={{color:color}}
                >
                    add product
                </Link>
            </button>}
            </div>
                           <div className="d-flex flex-wrap justify-content-between ms-3 gap-3">
                    {
                        products.map(product =>
                           <div className="card" key={product._id}style={{width:"22rem",height:"40rem",backgroundColor:background==='grey'?'black':'white',color:color}}>
                            {product.imageURL&&product.imageALT&&<img src={product.imageURL} alt={product.imageALT} className="card-img-top h-50"/>}
                            {product.imageURL&&!product.imageALT&&<img src={product.imageURL} className="card-img-top h-50"/>}
                            {!product.imageURL&& <img src={'https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_1280.jpg'} className="card-img-top h-50" alt="Logo" />}
                           
                            <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.description}</p>
                            <hr />
                            <p className="card-text">{product.category}</p>
                            <p className="card-text">{product.price}$</p>
                            <div className="col">
                            </div>
                            <div className="d-flex justify-content-around col">
                            {<button
                             className="btn btn-default"
                             onClick={()=>onDelete(product._id)}
                                 >
                            <i className="bi bi-trash" style={{color:color}}/>
                            </button>}
                            {<button
                             className="btn btn-default"
                                 >
                            <Link to={`/editPage/${product._id}`}>
                            <i className="bi bi-pencil-fill" style={{color:color}}/>
                            </Link>
                            </button>}
                                 {!isFavorite(product._id)&&<button
                             className="btn btn-default"
                             onClick={()=>{
                                addFavorites(product)
                             }
                            }
                                 >
                            <i className="bi bi-heart" style={{color:color}}/>
                           </button>}
                            {isFavorite(product._id)&&<button
                             className="btn btn-default"
                             style={{color:"red"}}
                             onClick={()=>{
                                deleteFavorite(product._id)
                             }}
                                 >
                            <i className="bi bi-heart-fill" />
                            </button>}
                             <button
                             className="btn btn-default"
                                 >
                            <Link to={``}>
                            <i className="bi bi-telephone-fill" style={{color:color}}/>
                            </Link>
                            </button>
                            </div>
                            {!isCartProduct(product._id)&&<button 
                            className="btn w-100 mt-3" 
                            style={{backgroundColor:background==='grey'?'black':'grey', color:color}}
                            onClick={()=>{
                                addCartProduct(product)
                            }}
                            >add to cart</button>}
                            {isCartProduct(product._id)&&<button 
                            className="btn w-100 mt-3" 
                            style={{backgroundColor:background==='grey'?'black':'grey', color:color}}
                            onClick={()=>{
                                deleteProductFromCart(product._id,product.price)
                            }}
                            >remove form cart</button>}
                            </div>
                            </div>
                     )
                    }
                    
                </div>
                </div>
                </div>
               
        </>
        );
}
export default CollectionPage;