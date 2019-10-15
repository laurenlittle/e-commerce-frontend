import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import Card from '../core/Card';
import { getCart } from './helpers/cartHelpers';


const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const showItems = items => {
    return (
      <div>
        <h2>You have {`${items.length}`} items in your cart.</h2>
        <hr />
        {
          items.map(item => (

            <Card
              key={item._id}
              product={item}
              showViewProductButton={true}
              // showViewProductButton={false}
            />
          ))
        }
      </div>
    )
  };

  const cartEmpty = () => {
    if(!items) {
      return (
        <h2>
          You have no items in the cart. <br />
          <Link to='/shop'> Continue Shopping now!</Link>
        </h2>
      )
    }
  }

  return(
    <Layout
      title='Shopping Cart'
      description='Manage your cart items'
      className='container-fluid'>

      <div className='row'>
        <div className='col-xs-12 col-sm-6'>
          {items.length > 0 ? showItems(items) : cartEmpty()}
        </div>
        <div className='col-xs-12 col-sm-6'>
          <p>
            TODO: checkout options, shipping, price etc.
          </p>
        </div>

      </div>

    </Layout>

  );
};

export default Cart;