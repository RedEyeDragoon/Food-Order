import React, { useContext } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
  const cartContext = useContext(CartContext);

  const cartNumber = cartContext.items.reduce((num, item) => {
    return num + item.amount; 
  }, 0)

  return(
    <button onClick={props.onClick} className={classes.button}>
      <span className={classes.icon}><CartIcon /></span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartNumber}</span>
    </button>
  )
}

export default HeaderCartButton;