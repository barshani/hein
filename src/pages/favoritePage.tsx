import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, deleteCartProduct, deleteFavProduct, getCartProducts, getCarts, getFavProducts } from "../services/apiService";
import Title from "../components/Title";
import { getUserID } from "../auth/TokenManager";
import { Cart, Product } from "./home";
interface Props{
    background:string
    textColor:string
}
function FavProductsPage({background,textColor}:Props){
   const [products, setProducts] = useState<Array<Product>>([]);
   const [cartProducts, setCartProducts] = useState<Array<Product>>([]);
   const [cart, setCart] = useState<Array<Cart>>([]);
   const [favProducts, setFavProducts] = useState<Array<Product>>([]);
   const [total,setTotal]=useState(1);
   const [category, setCategory] = useState('');
   const [quantity,setQuantity]=useState(1);
   const [shoppingList,setShoppingList]=useState<Array<Product>>([]);
   const [search, setSearch] = useState('');
   const [show,setShow] = useState(true);
   const [searchProducts, setSearchProducts] = useState<Array<Product>>([]);
   const [categoryProducts, setCategoryProducts] = useState<Array<Product>>([]);
    const navigate=useNavigate()
    useEffect(() => {
        const userID=getUserID();
        getFavProducts(userID)
            .then(json => {
                setProducts(json)
                setSearchProducts(json)
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
         getCartProducts(userID)
            .then(json => {
                setCartProducts(json);
                var sum=0;
                json.map(product=>{
               sum+=Number(product.price);
                })
                setTotal(sum);
            })
    }, []);
    async function onDelete(productID: string) {
        const userID=getUserID();
        const res =await deleteFavProduct({userID,productID});
        
        const updated = [...products].filter(
            favorites => favorites._id !== productID
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
    }
       async function deleteProductFromCart(productID:string,price:String){
         const userID=getUserID()
        const res =await deleteCartProduct({userID,productID});
         const updated = [...cartProducts].filter(
            cart => cart._id !== productID
        )
        setTotal(total-Number(price))
        setCartProducts(updated)
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
         {show&&cartProducts.length>0&&<div className="list me-2" style={{
                position: 'fixed',
                right: 0,
                zIndex:100,
                width: '300px',
                border: '1px solid black',
                background:background
                }}>
                    <div className="w-100">
            <h4 className="ms-2 w-75"><i onClick={()=>setShow(false)} className="bi bi-arrow-right"></i><i className="bi bi-cart"></i> shopping cart</h4>
            
            </div>
             <ul>
                    <li className="list-group-item">items:{cartProducts.length}</li>
                    <li className="list-group-item">total:{total}</li>
            </ul>
            <button className={background=='grey'?"btn btn-dark w-100":"btn btn-outline-success w-100"} onClick={
                ()=>{
                    navigate('../cart')
                }}>buy</button>
        </div>}
            {!show&&cartProducts.length>0&&<div className="list me-2" style={{
                position: 'fixed',
                right: 0,
                zIndex:100,
                width: '80px',
                border: '1px solid black',
                background:background
                }}>
            <h4 className="ms-2"><i onClick={()=>setShow(true)} className="bi bi-arrow-left"></i><i className="bi bi-cart"></i></h4>
            <div className="ms-2 mb-3">
                     <li className="list-group-item">items:{cartProducts.length}</li>
                    <li className="list-group-item">total:{total}</li>
             </div>
            <button className={background=='grey'?"btn btn-dark w-100":"btn btn-outline-success w-100"} onClick={
                ()=>{
                    navigate('../cart')
                }}>buy</button>
        </div>}
        <div className="w-75 mx-auto" style={{paddingTop:'15vh'}}>
        <Title mainText="Favorites"></Title>
          <input
                        className="form-control mx-3 mb-3 w-25"
                        placeholder="Search"
                        value={search}
                        onChange={handleSearch}
                    />
                           <div className="d-flex flex-wrap justify-content-between ms-3 pb-5 gap-3">
                    {
                        searchProducts.map(product =>
                           <div className="card" key={product._id}style={{width:"22rem",height:"45rem",background:background,color:textColor}}>
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
                            <div className="row">
                            <div className="col">
                            </div>
                            <div className="d-flex justify-content-center">
                             <button
                             className="btn btn-default"
                             onClick={()=>onDelete(product._id)}
                                 >
                            <i className="bi bi-heart-fill" style={{color:"red"}}/>
                            </button>
                            </div>
                            </div>
                            {!isCartProduct(product._id)&&<button 
                            className={background=='grey'?"btn btn-dark w-100":"btn btn-outline-success w-100"}
                            onClick={()=>{
                                addCartProduct(product)
                            }}
                            >add to cart</button>}
                            {isCartProduct(product._id)&&<button 
                            className={background=='grey'?"btn btn-danger w-100":"btn btn-outline-danger w-100"}
                            onClick={()=>{
                                deleteProductFromCart(product._id,product.price)
                            }}
                            >remove form cart</button>}
                            </div>
            
            
               </div>  
                )}
                </div>
                </div>
               
               
        </>
        );
}
export default FavProductsPage;