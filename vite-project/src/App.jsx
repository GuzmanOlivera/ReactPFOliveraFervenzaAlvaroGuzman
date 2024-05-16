import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemCardContainer from './components/ItemCardContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Footer from './components/Footer';
import { CartProvider } from './context/CartProvider';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <NavBar />
        <main className="main">
          <Routes>
            <Route path="/" element={<ItemCardContainer />} />
            <Route path="/category/:category" element={<ItemCardContainer />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<div>Contenido no encontrado</div>} />
          </Routes>
        </main>
        <Footer />
      </CartProvider>
      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
