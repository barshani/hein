import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAdmin, verifyToken } from "../auth/TokenManager";
import { getProducts } from "../services/apiService";
  export interface Product {
    _id: string;
    name: string;
    color: string;
    size: string;
    imageURL?: string;
    imageALT?: string;
    price: string;
    category: string;
}
export interface Favorite{
    _id?:string;
    userID:string;
    productID:string; 
}
export interface Cart{
    _id?:string;
    userID:string;
    productID:string;
    quantity?:Number
}
interface Props{
    background:string
    textColor:string
}
function Home({background,textColor}:Props){
      const [products, setProducts] = useState<Array<Product>>([]);
      const navigate = useNavigate();
       useEffect(() => {
        getProducts()
            .then(json => {
                const sorted=json.sort((a,b)=> 0.5 - Math.random())
                if(sorted.length>=3)
                    setProducts([sorted[0],sorted[1],sorted[2]]);
            })
    }, []);
    return(
    <>
     <div className="" style={{paddingTop:'15vh'}}>
    <div className="container">
        <section id="join-us">
            <div className="row">
                <div className="col-12 text-center mt-4">
                    <h1 className="display-4 fw-bold">Welcome to hein</h1>
                     {!verifyToken()&& <p>
                     <p>sign now to watch our colection and choose your favorites</p>
                        <button
                        className={background=='black'?"btn btn-dark":"btn btn-outline-success"}
                         onClick={()=>navigate('/signup')}
                         >Lets Start</button>
                    </p>}
                   {verifyToken()&& 
                   <p>
                        <button
                          className={background=='black'?"btn btn-dark":"btn btn-outline-success"}
                         onClick={()=>navigate('/collection')}
                         >watch our collection</button>
                    </p>
                    }
                    <div className="d-flex flex-wrap justify-content-center ms-3 pb-5 gap-3">
             {products.length==0&&
             <p className="fw-bold">not enough products to show preview</p>

             
             }
         {
                        products.map(product =>
                           <div className="card text-start" key={product._id}style={{width:"22rem",height:"35rem",background:background,color:textColor}}>
                            {product.imageURL&&product.imageALT&&<img src={product.imageURL} alt={product.imageALT} className="card-img-top h-50"/>}
                            {product.imageURL&&!product.imageALT&&<img src={product.imageURL} className="card-img-top h-50"/>}
                            {!product.imageURL&& <img src={'https://cdn.pixabay.com/photo/2013/07/13/10/13/bag-156780_1280.png'} className="card-img-top h-50" alt="Logo" />}
                           
                            <div className="card-body">
                            <h5 className="card-title fw-bold">{product.name}</h5>
                            <p className="card-text"><span className="fw-bold">color:</span>{product.color}</p>
                            <p className="card-text"><span className="fw-bold">size:</span>{product.size}</p>
                            <hr />
                            <p className="card-text"><span className="fw-bold">price:</span>{product.price}$</p>
                            <p className="card-text"><span className="fw-bold">category:</span>{product.category}</p>
                            </div>
                           </div>
                     )
                    }
         </div>
                    <div className="w-3/5">
        <div className="w-3/5">
          <h1 className="text-2xl">About Us</h1>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><p className="font-serif"><i className="bi bi-check"></i>the biggest shopping site for man in the world</p></li>
            <li className="list-group-item"><p className="font-serif"><i className="bi bi-check"></i>best prices</p></li>
            <li className="list-group-item"><p className="font-serif"><i className="bi bi-check"></i>fastest delevery</p></li>
          </ul>
        </div>
        <div className="w-4/5 pt-20">
          <div>
            <h1 className="bold text-2xl">What can you do</h1>
            <ul className="list-group list-group-flush mb-5">
              <li className="list-group-item"><p className="font-serif"><i className="bi bi-check"></i>Like your favorite products</p></li>
              <li className="list-group-item"><p className="font-serif"><i className="bi bi-check"></i>add to your carts product that you would like to buy</p></li>
              <li className="list-group-item"><p className="font-serif"><i className="bi bi-check"></i>purchase the items in the cart</p></li>
              {isAdmin()&&<li className="list-group-item"><p className="font-serif"><i className="bi bi-check"></i>Add a new product</p></li>}
              {isAdmin()&&<li className="list-group-item"><p className="font-serif"><i className="bi bi-check"></i>Update a product</p></li>}
              {isAdmin()&&<li className="list-group-item"><p className="font-serif"><i className="bi bi-check"></i>Delete a product</p></li>}
            </ul>
          </div>
          </div>
          </div>
                </div>
            </div>
        </section>
         </div>
         </div>
    </>
    );
}

export default Home;