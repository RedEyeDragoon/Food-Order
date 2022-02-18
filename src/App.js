import React, { useState } from "react";

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import "./style.css";

export default function App() {
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <CartProvider>
      {showModal && <Cart closeModal={closeModal}/>}
      <Header showModal={showModalHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}
