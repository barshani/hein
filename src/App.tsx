import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { createContext, useContext, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/home';
import CartPage from './pages/cart';
import CollectionPage from './pages/collection';
import SignUp from './auth/SignUp';
import Login from './auth/Login';
import RouteGuard from './auth/RouteGuard';
import { colors } from '@mui/material';
import AddPage from './pages/addPage';
import EditPage from './pages/EditPage';
import FavProductsPage from './pages/favoritePage';
import PurchasePage from './pages/purchasePage';
import { getAdmin, getMode, verifyToken } from './auth/TokenManager';
import { verify } from 'crypto';
import context from 'react-bootstrap/esm/AccordionContext';
interface Context {
    admin: boolean
    setAdmin: Function
    loggedIn: boolean
    setLoggedIn: Function
    mode: string
    setMode: Function
}
const initalState={
     admin:(getAdmin()==="yes"?true:false),
     setAdmin:()=>{},
     loggedIn:(verifyToken()),
     setLoggedIn:()=>{},
     mode:(getMode()),
     setMode:()=>{}
}
export const AppContext = createContext<Context | null>(initalState);
function App() {
   const [admin, setAdmin] = useState(initalState.admin);
   const [loggedIn, setLoggedIn] = useState(initalState.loggedIn);
   const [mode, setMode] = useState(initalState.mode);
  return (
    <>
     <AppContext.Provider value={{
                admin,
                setAdmin,
                loggedIn,
                setLoggedIn,
                mode,
                setMode
            }}>
       <Header
       background={mode==="dark"?"black":"white"}
       textColor={mode==="dark"?"white":"black"}
       />
      <div className='main-div' style={{backgroundColor:mode==='dark'?'grey':'white',color:mode==='dark'?'white':'black',paddingTop:'10vh'}}>
    <Routes>
      <Route path="/" element={
           <Home 
           background={mode==="dark"?"black":"white"}
           textColor={mode==="dark"?"white":"black"}
           />
      } />
      <Route path="/favorites" element={
      <RouteGuard>
           <FavProductsPage 
            background={mode==="dark"?"black":"white"}
           textColor={mode==="dark"?"white":"black"}
           />
      </RouteGuard>
      } />
      <Route path="/cart" element={
      <RouteGuard>
           <CartPage 
           background={mode==="dark"?"black":"white"}
           textColor={mode==="dark"?"white":"black"}
           />
      </RouteGuard>
      } />
      <Route path="/purchase" element={
      <RouteGuard>
           <PurchasePage 
            background={mode==="dark"?"grey":"white"}
           textColor={mode==="dark"?"white":"black"}
           />
      </RouteGuard>
      } />
      <Route path="/addPage" element={
      <RouteGuard>
           <AddPage 
            background={mode==="dark"?"grey":"white"}
           textColor={mode==="dark"?"white":"black"}           
           />
      </RouteGuard>
      } />
      <Route path="/editPage/:_id" element={
      <RouteGuard>
           <EditPage 
            background={mode==="dark"?"grey":"white"}
           textColor={mode==="dark"?"white":"black"}          
           />
      </RouteGuard>
      } />
      <Route path="/collection" element={
      <RouteGuard>
           <CollectionPage 
            background={mode==="dark"?"black":"white"}
           textColor={mode==="dark"?"white":"black"}
           />
      </RouteGuard>
      } />
      <Route path="/signup" element={
           <SignUp
             background={mode==="dark"?"grey":"white"}
           textColor={mode==="dark"?"white":"black"}
           />
      } />
      <Route path="/login" element={
           <Login
             background={mode==="dark"?"grey":"white"}
           textColor={mode==="dark"?"white":"black"}
           />
      } />

    </Routes>
    </div>
    <Footer
      background={mode==="dark"?"black":"grey"}
     textColor={mode==="dark"?"white":"black"}
    />
</AppContext.Provider>
    </>

  );
}

export default App;