/* eslint-disable import/extensions */
import Header from './components/Header.js';
import CartScreen from './screen/CartScreen.js';
import Error404Screen from './screen/Error404Screen.js';
import HomeScreen from './screen/HomeScreen.js';
import PaymentScreen from './screen/PaymentScreen.js';
import OrderScreen from './screen/OrderScreen.js';
import PlaceOrderScreen from './screen/PlaceOrderScreen.js';
import ProductScreen from './screen/ProductScreen.js';
import ProfileScreen from './screen/ProfileScreen.js';
import RegisterScreen from './screen/RegisterScreen.js';
import ShippingScreen from './screen/ShippingScreen.js';
import SigninScreen from './screen/SigninScreen.js';
import { hideLoading, parseRequestUrl, showLoading } from './utils.js';
import DashboardScreen from './screen/DashboardScreen.js';
import ProductListScreen from './screen/ProductListScreen.js';
import OrderListScreen from './screen/OrderListScreen.js';
import EditOrderScreen from './screen/EditOrderScreen.js';
import '../style.css';



const routes = {
    "/": HomeScreen,
    "/product/:id": ProductScreen,
    "/order/:id": OrderScreen,
    "/cos/:id": CartScreen,
    "/cos": CartScreen,
    "/signin": SigninScreen,
    '/register': RegisterScreen,
    '/profile': ProfileScreen,
    '/shipping': ShippingScreen,
    '/payment': PaymentScreen,
    '/placeorder': PlaceOrderScreen,
    '/dashboard': DashboardScreen,
    '/productlist': ProductListScreen,
    '/orderlist':OrderListScreen,
    '/editorder/:id':EditOrderScreen,
    
};
const router = async () => {
    showLoading()
    const request = parseRequestUrl();
    const parseUrl = (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id': '') +
    (request.verb ? `${request.verb}`:'');
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
    const header = document.getElementById("header-container");
    header.innerHTML = await Header.render();
    await Header.after_render();
    const main = document.getElementById("main-container");
    main.innerHTML = await screen.render();
    if (screen.after_render) {await screen.after_render();}
    hideLoading();
};

window.addEventListener("load",router);
window.addEventListener('hashchange',router);

