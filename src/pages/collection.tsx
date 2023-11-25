import { useContext, useEffect, useState } from "react";
import { addToCart, addToFavorites, deleteCartProduct, deleteFavProduct, deleteProduct, editCartProduct, getCartProducts, getCarts, getFavProducts, getProduct, getProductPrice, getProducts } from "../services/apiService";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate} from "react-router-dom";
import Title from "../components/Title";
import {getUserID} from "../auth/TokenManager";
import { Cart, Product } from "./home";
import { updateSourceFile } from "typescript";
import validator from "validator";
import { Category } from "../components/addForm";
import { AppContext } from "../App";
interface Props{
    background:string
    textColor:string
}

function CollectionPage({background,textColor}:Props){    
   const context = useContext(AppContext);
   const [products, setProducts] = useState<Array<Product>>([]);
   const [cartProducts, setCartProducts] = useState<Array<Product>>([]);
   const [cart, setCart] = useState<Array<Cart>>([]);
   const [favProducts, setFavProducts] = useState<Array<Product>>([]);
   const [total,setTotal]=useState(1);
   const [category, setCategory] = useState('');
   const [number,setNumber]=useState('');
   const [shoppingList,setShoppingList]=useState<Array<Product>>([]);
   const [search, setSearch] = useState('');
   const [show,setShow] = useState(true);
   const [searchProducts, setSearchProducts] = useState<Array<Product>>([]);
   const [categoryProducts, setCategoryProducts] = useState<Array<Product>>([]);
   const navigate=useNavigate()
       useEffect(() => {
        getProducts()
            .then(json => {
                const sorted=json.sort((a,b)=> a.name > b.name ? 1 : -1)
                setProducts(sorted);
                setCategoryProducts(sorted);
                setSearchProducts(sorted);
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
        const updated2 = [...searchProducts].filter(
            product => product._id !== productID
        )
        setProducts(updated)
        setSearchProducts(updated2)
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
    }
     async function addCartProduct(product:Product) {
        const userID=getUserID()
        const productID=product._id
        const quantity=Number(number)
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
    async function deleteFavorite(productID:string){
         const userID=getUserID()
        const res =await deleteFavProduct({userID,productID});
         const updated = [...favProducts].filter(
            favorites => favorites._id !== productID
        )
        setFavProducts(updated)
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
     function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearch(value);
        const normalizedValue = value.trim().toLowerCase();
        const updated = [...categoryProducts].filter(
            product =>product.name.toLowerCase().startsWith(normalizedValue)&&
            product.category.toLowerCase().startsWith(category)
        );
        setSearchProducts(updated);
        }
     function handleCategory(category:string) {
        setSearch('');
        if(category!=''){
        const updated = [...products].filter(
            product =>product.category===category
            );
            setCategoryProducts(updated);
            setSearchProducts(updated);
        }
        else{
            setCategoryProducts(products);
            setSearchProducts(products);
        }
        }
    return (
        <>
        <div className="w-75 mx-auto col-12 gap-5">
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
            <button className={background=='black'?"btn btn-dark w-100":"btn btn-outline-success w-100"}  onClick={
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
            <button className={background=='black'?"btn btn-dark w-100":"btn btn-outline-success w-100"}  onClick={
                ()=>{
                    navigate('../cart')
                }}>buy</button>
        </div>}
        <div className="mx-auto" style={{paddingTop:'10vh'}}>
        <div className="d-flex row justify-content-center mb-3 w-75 mx-auto">
            <button className={background=='black'?"btn btn-dark col":"btn btn-outline-success col"}  onClick={()=>handleCategory('')}>all<br/><i className=""></i></button>
            <button className={background=='black'?"btn btn-dark col":"btn btn-outline-success col"} onClick={()=>handleCategory('clothes')}>clothes<br/><i className="bi bi-handbag-fill"></i></button>
            <button className={background=='black'?"btn btn-dark col":"btn btn-outline-success col"}  onClick={()=>handleCategory('shoes&eccesories')}>shoes&<br/>eccesories<br/></button>
            <button className={background=='black'?"btn btn-dark col":"btn btn-outline-success col"} onClick={()=>handleCategory('electricity')}>electricity<br/><i className="bi bi-lightning"></i></button>
            <button className={background=='black'?"btn btn-dark col":"btn btn-outline-success col"}  onClick={()=>handleCategory('games')}>games<br/><i className="bi bi-joystick"></i></button>
            <button className={background=='black'?"btn btn-dark col":"btn btn-outline-success col"} onClick={()=>handleCategory('sports')}>sports<br/><i className="bi bi-trophy-fill"></i></button>
            <button className={background=='black'?"btn btn-dark col":"btn btn-outline-success col"} onClick={()=>handleCategory('home')}>home<br/><i className="bi bi-house-fill"></i></button>
        </div>
        <div className="d-flex pb-3 me-5 gap-5 justify-content-center">
          <input
                        className="form-control mx-3 mb-3 w-25"
                        placeholder="Search"
                        value={search}
                        onChange={handleSearch}
                    />
            </div>
                           <div className="d-flex flex-wrap justify-content-start ms-3 gap-4 pb-5">
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
                            <div className="col">
                            </div>
                            <div className="d-flex justify-content-around col">
                            {context?.admin&&<button
                             className="btn btn-default"
                             onClick={()=>onDelete(product._id)}
                                 >
                            <i className="bi bi-trash" style={{color:textColor}}/>
                            </button>}
                            {context?.admin&&<button
                             className="btn btn-default"
                                 >
                            <Link to={`/editPage/${product._id}`}>
                            <i className="bi bi-pencil-fill" style={{color:textColor}}/>
                            </Link>
                            </button>}
                                 {!isFavorite(product._id)&&<button
                             className="btn btn-default"
                             onClick={()=>{
                                addFavorites(product)
                             }
                            }
                                 >
                            <i className="bi bi-heart" style={{color:textColor}}/>
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
                            </div>
                            {!isCartProduct(product._id)&&<button 
                            className={background=='black'?"btn btn-dark mt-5 w-100":"btn btn-outline-success mt-5 w-100"} 
                            onClick={()=>{
                                addCartProduct(product)
                            }}
                            >add to cart</button>
                            }
                            {isCartProduct(product._id)&&<button 
                            className={background=='black'?"btn btn-danger w-100 mt-5":"btn btn-outline-danger w-100 mt-5"} 
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