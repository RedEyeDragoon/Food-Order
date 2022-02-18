import React, { useRef } from 'react';

import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const amountRef = useRef()

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountRef.current.value;
    const amountNum = +enteredAmount;
    props.onAdd(amountNum);
  }

  return(
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.input}>
        <label htmlFor='amount'>Amount</label>
        <input id='amount' type='number' min='1' max='5' defaultValue='1' ref={amountRef}/>
      </div>
      <button>+ Add</button>
    </form>
  )
};

export default MealItemForm; 