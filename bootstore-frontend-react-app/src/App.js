import React from "react";
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from "./screens/ProductScreen";

function App() {
    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <a className="brand" href="/">BookStore</a>
                    </div>
                    <div >
                        <a href="cart.html">Cart</a>
                        <a href="sign-in.html">Sign-In</a>
                    </div>
                </header>
                <main>
                    <Route path="/product/:id" component={ProductScreen}></Route>
                    <Route path="/" component={HomeScreen} exact></Route>
                </main>
                <footer className="row center">All rights reserved.</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
