import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../core/Card';
import { isAuthenticated } from '../auth';
import {
    getProducts,
    getBraintreeClientToken,
    processPayment
} from './apiCart';
import DropIn from 'braintree-web-drop-in-react';
import 'braintree-web';

const Checkout = ({ products }) => {
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

    const purchaseItems = () => {
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

                processPayment(userId, token, paymentData)
                    .then(response => {
                        console.log(response)
                        // setData({ ...data, success: response.success });
                        // empty cart
                        // create order
                    })
                    .catch(error => console.log(error));
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

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <DropIn
                        options={{
                            authorization: data.clientToken
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

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    );
};

export default Checkout;