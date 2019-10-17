import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem } from '../cart/helpers/cartHelpers';


const Card = ({
    product,
    showViewProductButton = true,
    showCartButton = true,
    cartUpdate = false
  }) => {

  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count); // product quantity from local storage

  const showStock = quantity => {
    return quantity > 0 ? (
        <span className='badge badge-primary badge-pill'>In Stock</span>
      ) : (
            <span className='badge badge-primary badge-pill'>OUT OF STOCK</span>
          )
  }

  const showViewButton = showViewProductButton => {

    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`}>
          <button className='btn btn-outline-primary mb-2 mt-2 mr-4'>
              View Product
          </button>
        </Link>
      )
    )
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    })
  };

  const shouldRedirectToCart = redirect => {
    if(redirect) {
      return <Redirect to='cart' />
    }
  };

  const showAddToCartButton = showCartButton => {
    return ( showCartButton && (

       <Link to='/'>
          <button onClick={addToCart} className='btn btn-outline-warning mb-2 mt-2'>
            Add to Cart
          </button>
        </Link>
      )
    );
  };

  const handleCountChange = productId => event => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value)
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return cartUpdate && <>
      <div className='input-group mb-3'>
        <div className='input-group-prepend'>
          <span className='input-group-text'>Adjust quantity</span>
        </div>
        <input type='number' className='form-control' value={count} onChange={handleCountChange(product._id)}/>
      </div>
    </>
  };

  return (
      <div className='card'>
        {shouldRedirectToCart(redirect)}
        <div className='card-header name'>
          {product.name}
        </div>
        <div className='card-body'>
          <ShowImage item={product} url='product' />
          <p className='lead mt-2'> {product.description.substring(0,50)} </p>
          <p className='black-10'>${product.price} </p>
          <p className='black-9'>Category: {product.category && product.category.name}</p>
          <p className='black-8'>Added: {moment(product.createdAt).fromNow()}</p>

          {showStock(product.quantity)}
          <br/>

          {showViewButton(showViewProductButton)}
          {showAddToCartButton(showCartButton)}
          {showCartUpdateOptions(cartUpdate)}

        </div>

      </div>
  )
};

export default Card;