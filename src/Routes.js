import React from 'react';
// ability to grab route params, routes in Switch Component, browser router makes props available
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from '../src/user/Signup';
import Signin from '../src/user/Signin';
import Home from '../src/core/Home';
import Shop from '../src/core/Shop';
import Cart from '../src/cart/Cart';
import Product from '../src/core/Product';
import PrivateRoute from './auth/PrivateRoute';
import UserDashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Orders from '../src/admin/Orders';
import Profile from './user/Profile';


const Routes = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/product/:productId" exact component={Product} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;