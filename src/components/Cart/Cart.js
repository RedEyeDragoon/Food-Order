import React, { useContext } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import classes from './Cart.module.css';

const Cart = props => {
  const cartContext = useContext(CartContext);
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`
  const hasItems = cartContext.items.length > 0;

  const itemAdd = (item) => {
    cartContext.addItem({...item, amount: 1});
  };

  const itemRemove = (id) => {
    cartContext.removeItem(id);
  };

  const cartItems = cartContext.items.map(item => {
    return <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price}
      onRemove={itemRemove.bind(null, item.id)} onAdd={itemAdd.bind(null, item)}
    />
  })

  return(
    <Modal closeModal={props.closeModal}>
      <ul className={classes['cart-items']}>
        {cartItems}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.closeModal} className={classes['button-alt']}>Close</button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  )
};

export default Cart;