import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem } from '../cart/helpers/cartHelpers';


const Card = ({product, showViewProductButton = true}) => {

  const [redirect, setRedirect] = useState(false);

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

  const showAddToCartButton = () => {
    return (
       <Link to='/'>
          <button onClick={addToCart} className='btn btn-outline-warning mb-2 mt-2'>
            Add to Cart
          </button>
        </Link>
    );
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
          {showAddToCartButton()}

        </div>

      </div>
  )
};

export default Card;