import React, {useState, useEffect, useCallback} from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import Card from '../core/Card';
import Checkout from './Checkout';
import { getCart } from './helpers/cartHelpers';


const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

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
              showCartButton={false}
              cartUpdate={true}
              showRemoveProductButton={true}
              setRun={setRun}
              run={run}
            />
          ))
        }
      </div>
    )
  };

  const cartEmpty = items => {
    if(!items) {
      return (
        <h2>
          You have no items in the cart. <br />
          <Link to='/shop'> Continue Shopping now!</Link>
        </h2>
      )
    }
  };

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
          <h2 className='mb-4'> Your Cart Summary</h2>
          <hr/>
          <Checkout setRun={setRun} products={items} />
        </div>

      </div>

    </Layout>

  );
};

export default Cart;