
import React from 'react';
import Home from './Pages/Home';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Address from './Pages/Address';
import Checkout from './Pages/Checkout';
// import TestCheckout from './Pages/testCheckout';
import Wishlist from './Pages/Wishlist';
import ForgotPass from './Pages/ForgotPass';
import Accountedit from './Pages/Accountedit';
import AddressEdit from './Pages/AddressEdit';

const App = () => {

  return(
    <Router>
      <Switch>
        <Route path = "/" exact component = {Home} />
        <Route path = "/product/:id" component = {Product} />
        <Route path = "/cart" component = {Cart} />
        <Route path = "/login" component = {Login} />
        <Route path = "/register" component = {Register} />
        <Route path = "/address" component = {Address} />
        <Route path = "/checkout" component={Checkout} />
        <Route path = "/wishlist" component={Wishlist} />
        <Route path = "/forgotPass" component={ForgotPass} />
        {/* <Route path = "/test-checkout" component={TestCheckout} /> */}
        <Route path = "/accountedit" component={Accountedit} />
        <Route path = "/addressedit" component={AddressEdit} />
      </Switch>
    </Router>

  )
};

export default App;