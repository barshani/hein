import { getToken, getUserID, isAdmin } from "../auth/TokenManager";
import { User } from "../auth/SignUp";
import { loginUser } from "../auth/Login";
import { Favorite, Product, Cart } from "../pages/home";
const serverUrl = 'http://localhost:3001/';

const productsUrl = `${serverUrl}products/`;
const usersUrl = `${serverUrl}users/`;
const favUrl = `${serverUrl}favorites/`;
const cartUrl = `${serverUrl}carts/`;
export async function addProduct(product: Product): Promise<Product> {
    const res = await fetch(`${productsUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    return res.json();
}
export async function editProduct(product: Product): Promise<Product> {
    const res = await fetch(`${productsUrl}${product._id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': getToken()
        },
        body: JSON.stringify(product)
    });
    return res.json();
}
export async function editCartProduct(cart: Cart): Promise<Cart> {
    const res = await fetch(`${cartUrl}${cart.userID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': getToken()
        },
        body: JSON.stringify(cart)
    });
    return res.json();
}
export async function deleteProduct(_id: string): Promise<Product> {
    const res = await fetch(`${productsUrl}${_id}`, {
        method: 'DELETE',
        headers: {
            'x-auth-token': getToken()
        },
    })
    return res.json()
}
export async function deleteFavProduct(favorite:Favorite): Promise<Favorite> {
    const res = await fetch(`${favUrl}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(favorite)
    })
    return res.json()
}
export async function deleteCartProduct(cart:Cart): Promise<Cart> {
    const res = await fetch(`${cartUrl}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart)
    })
    return res.json()
}
export async function deleteAllCartProduct(){
    const userID=getUserID()
  const res=await getCartProducts(userID);
  res.map(product=>{
     const productID=product._id;
    deleteCartProduct({userID,productID})
  })
}
export async function addToFavorites(userID:string,productID:string): Promise<Favorite> {
    const res = await fetch(`${favUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userID,productID})
    })
    return res.json()
}
export async function addToCart(cart:Cart): Promise<Cart> {
    const res = await fetch(`${cartUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart)
    })
    return res.json()
}
export async function getProducts(): Promise<Array<Product>> {
    const res = await fetch(`${productsUrl}`);
    return res.json();
}

export async function getProduct(_id:string): Promise<Product> {
    const res = await fetch(`${productsUrl}${_id}`);
    return res.json();
}
export async function getProductPrice(_id:string): Promise<Number> {
    const res= await getProduct(_id);
    return Number(res.price);
}
export async function getFavorites(userID:string): Promise<Array<Favorite>> {
    const res= await fetch(`${favUrl}${userID}`);
    return res.json();
}
export async function getCarts(userID:string): Promise<Array<Cart>> {
    const res= await fetch(`${cartUrl}${userID}`);
    return res.json();
}
export async function getFavProducts(userID:string):Promise<Array<Product>> {
    const res=await getFavorites(userID)
    const res2=await getProducts()
    const filter=res2.filter(product=>{
         let bol=false
        res.map((favorite=>{
        if(product._id===favorite.productID)
           bol=true;
    }))
    return bol;
    
})
    return filter;
}
export async function getCartProducts(userID:string):Promise<Array<Product>> {
    const res=await getCarts(userID)
    const res2=await getProducts()
    const filter=res2.filter(product=>{
         let bol=false
        res.map((cart=>{
        if(product._id===cart.productID)
           bol=true;
    }))
    return bol;  
})
    return filter;
}
export async function getNotFavProducts(userID:string):Promise<Array<Product>> {
    const res=await getFavorites(userID)
    const res2=await getProducts()
    const filter=res2.filter(product=>{
         let bol=true
        res.map((favorite=>{
        if(product._id===favorite.productID)
           bol=false;
    }))
    return bol;
    
})
    return filter;
}
export async function getNotCartProducts(userID:string):Promise<Array<Product>> {
    const res=await getCarts(userID)
    const res2=await getProducts()
    const filter=res2.filter(product=>{
         let bol=true
        res.map((cart=>{
        if(product._id===cart.productID)
           bol=false;
    }))
    return bol;
    
})
    return filter;
}
export async function signup(user: User): Promise<User> {
    const res = await fetch(`${usersUrl}signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return res.json();
}
export async function login(user:loginUser): Promise<loginUser> {
    const res = await fetch(`${usersUrl}login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return res.json();
}