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
function App() {
   const [mainColor, setMainColor] = useState('#33FF3C');
   const [secondaryColor, setSecondaryColor] = useState('white');
   const [cardColor, setCardColor] = useState('white');
   const [textColor, setTextColor] = useState('black');
  return (
    <>
       <Header
       background={mainColor}
       color={textColor}
       />
      <div className='main-div' style={{backgroundColor:secondaryColor,color:textColor,paddingTop:'10vh'}}>
       {mainColor=='#33FF3C' && <li className="nav-link">
                        <button
                        className="btn"
                        style={{backgroundColor:"blue",position:'fixed'}}
                        onClick={()=>{
                          setMainColor("black")
                          setSecondaryColor("grey")
                          setTextColor("white")
                          setCardColor("black")
                        }
                        }
                        >
                         <i className="bi bi-moon-fill nav-link text-light"></i>
                         </button>
                    </li>
}
                    {mainColor=='black'&&<li className="nav-link">
                        <button
                        className="btn"
                        style={{backgroundColor:"black",position:'fixed'}}
                        onClick={()=>{
                          setMainColor('#33FF3C')
                          setSecondaryColor("white")
                          setTextColor('black')
                          setCardColor("white")
                      }}
                        >
                         <i className="bi bi-sun-fill nav-link text-danger"></i>
                         </button>
                    </li> 
    }
    <Routes>
      <Route path="/" element={
           <Home 
           background={cardColor}
           color={textColor}
           />
      } />
      <Route path="/favorites" element={
      <RouteGuard>
           <FavProductsPage background={cardColor} color={textColor}/>
      </RouteGuard>
      } />
      <Route path="/cart" element={
      <RouteGuard>
           <CartPage background={cardColor} color={textColor}/>
      </RouteGuard>
      } />
      <Route path="/purchase" element={
      <RouteGuard>
           <PurchasePage />
      </RouteGuard>
      } />
      <Route path="/addPage" element={
      <RouteGuard>
           <AddPage 
           background={secondaryColor} 
           color={textColor}           
           />
      </RouteGuard>
      } />
      <Route path="/editPage/:_id" element={
      <RouteGuard>
           <EditPage 
           background={secondaryColor} 
           color={textColor}           
           />
      </RouteGuard>
      } />
      <Route path="/collection" element={
      <RouteGuard>
           <CollectionPage background={secondaryColor} color={textColor}/>
      </RouteGuard>
      } />
      <Route path="/signup" element={
           <SignUp
            background={secondaryColor}
           color={textColor}
           />
      } />
      <Route path="/login" element={
           <Login
            background={secondaryColor}
           color={textColor}
           />
      } />

    </Routes>
    </div>
    <Footer
     background={mainColor==="#33FF3C"?"grey":"black"}
     color={textColor}
    />

    </>

  );
}

export default App;