import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../core/Card';
import { isAuthenticated } from '../auth';
import {
    getProducts,
    getBraintreeClientToken,
    processPayment
} from './apiCart';
import { createOrder } from '../orders/apiOrders';
import { emptyCart } from './helpers/cartHelpers';
import DropIn from 'braintree-web-drop-in-react';
import 'braintree-web';

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {}, // for drop-in UI
        address: ''
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const setClientToken = (userId, token) => {
      // make API request
        getBraintreeClientToken(userId, token)
        .then(data => {
            if (data.error) {
                setData({ ...data, error: data.error });
            } else {
                setData({ clientToken: data.clientToken });
            }
        });
    };

    useEffect(() => {
        setClientToken(userId, token);
    }, []);

    const getTotal = () => {
        return products.reduce((acc, curr) => {
            return acc + curr.count * curr.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <>
              {showDropIn()}
            </>
        ) : (
            <Link to='/signin'>
                <button className='btn btn-primary'>
                  Sign in to checkout
                  </button>
            </Link>
        );
    };

    let deliveryAddress = data.address;

    const purchaseItems = () => {
        setData( { loading: true } );
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance
            .requestPaymentMethod()
            .then(data => {
                // console.log(data);
                nonce = data.nonce;
                // once you have nonce (card type, #), send as paymentMethod nonce with total tbp
                // console.log('nonce and total', nonce, getTotal(products));

                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };

                // make API request
                processPayment(userId, token, paymentData)
                    .then(response => {
                        // console.log(response);
                        const orderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress
                        };

                        // make API request
                        createOrder(userId, token, orderData);
                        setData({ ...data, success: response.success });
                        emptyCart(()=> {
                          setRun(!run); // update parent state to show cart empty
                          console.log('payment successful, cart empty');
                          setData( { loading: false, success: true } );

                        })
                    })
                    .catch(error => {
                      console.log(error);
                      setData( { loading: false } );
                    });
            })
            .catch(error => {
                console.log('dropin error: ', error);
                setData({ ...data, error: error.message });
            });
    };

     const showError = error => (
        <div
            className='alert alert-danger'
            style={{ display: error ? '' : 'none' }}
        >
            {error}
        </div>
    );

    const handleAddress = event => {
        setData({ ...data, address: event.target.value})
    };

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className='form-group mb-3'>
                        <label className='text-muted' htmlFor='address'> Delivery address:</label>
                        <textarea //TODO update address object to use individual fields for Street,City,Country, Zip
                            className='form-control'
                            id='address'
                            onChange={handleAddress}
                            value={data.address}
                            placeholder='Type delivery address here...'
                        />
                    </div>
                    <DropIn
                        options={{
                            authorization: data.clientToken,
                            paypal: {
                              flow: 'vault'
                            }
                        }}
                        onInstance={instance => (data.instance = instance)}
                    />
                    <button onClick={purchaseItems} className='btn btn-success btn-block'>
                        Pay Now
                    </button>
                </div>
            ) : null}
        </div>
    );

    const showSuccess = success => (
        <div
            className='alert alert-info'
            style={{ display: success ? '' : 'none' }}
        >
            Thank You for your Purchase! Your payment was successful!
        </div>
    );

    const showLoading = loading => loading && <h2>Loading...</h2>;

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    );
};

export default Checkout;