import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { verifyToken } from "../auth/TokenManager";
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
                    <h1 className="display-4">Welcome to hein</h1>
                    <h5>
                       the biggest shopping site for man in the world
                    </h5>
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
                </div>
            </div>
        </section>
         <div className="d-flex flex-wrap justify-content-center ms-3 pb-5 gap-3">
             {products.length==0&&
             <p className="fw-bold">not enought products to show preview</p>

             
             }
         {
                        products.map(product =>
                           <div className="card" key={product._id}style={{width:"22rem",height:"35rem",background:background,color:textColor}}>
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
                           </div>
                     )
                    }
         </div>
         </div>
         </div>
    </>
    );
}

export default Home;