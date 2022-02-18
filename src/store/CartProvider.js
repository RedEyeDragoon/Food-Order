import React, { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCart = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if(action.type === 'ADD') {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
    const existingItem = state.items[existingItemIndex];
    let updatedItem;
    let updatedItems;

    if (existingItem) {
      updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount
      };
      updatedItems=[...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItem = {...action.item};
      updatedItems = state.items.concat(action.item);
    };

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }

  if (action.type === 'REMOVE') {
    const existingItemIndex = state.items.findIndex(item => item.id === item.id);
    const existingItem = state.items[existingItemIndex];
    const updatedAmount = state.totalAmount - existingItem.price;
    let updateItems;
    if (existingItem.amount === 1) {
      updateItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = {...existingItem, amount: existingItem.amount - 1}
      updateItems = [...state.items];
      updateItems[existingItemIndex] = updatedItem;
    }
    return {
      items: updateItems,
      totalAmount: updatedAmount
    };
  }
  return defaultCart;
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCart);
  
  const addItemHandler = item => {
    dispatchCart({type: 'ADD', item});
  };

  const removeItemHandler = id => {
    dispatchCart({type: 'REMOVE', id});
  };
  
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };
  
  return(
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
};

export default CartProvider;