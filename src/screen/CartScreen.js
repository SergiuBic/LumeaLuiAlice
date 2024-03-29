/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { getProduct } from "../api.js";
import { getCartItems, setCartItems } from "../localStorage.js";
import { parseRequestUrl, rerender } from "../utils.js";

const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find(x => x.product === item.product);
    if(existItem){
        if(forceUpdate){
            cartItems = cartItems.map((x) => x.product === existItem.product ? item: x);
        }
       
    }else{
        cartItems = [...cartItems, item];
    }
    setCartItems(cartItems);
    if(forceUpdate){
        // eslint-disable-next-line no-use-before-define
        rerender(CartScreen);
    }
    
};
const removeFromCart = (id) => {
    setCartItems(getCartItems().filter((x) => x.product !== id))
    if(id === parseRequestUrl().id){
        document.location.hash = '/cos';
    }else{
        rerender(CartScreen);
    }
}
const CartScreen = {
    after_render: () => {
      const qtySelects = document.getElementsByClassName("qty-select")
      Array.from(qtySelects).forEach( qtySelect => {
        qtySelect.addEventListener('change',
        (e)=>{
            const item = getCartItems().find(x => x.product === qtySelect.id);
            addToCart({...item, qty: Number(e.target.value)}, true);
        })
      })
      const deleteButtons = document.getElementsByClassName("delete-button");
      Array.from(deleteButtons).forEach(deleteButton =>{
          deleteButton.addEventListener('click', ()=>{
              removeFromCart(deleteButton.id);
          })
      })
      document.getElementById("checkout-button").addEventListener('click', () => {
          document.location.hash = '/signin'
      })
    },
    render: async () =>{
        const request = parseRequestUrl();
        if(request.id){
            const product = await getProduct(request.id);
            addToCart({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty: 1,
            })
        }
        const cartItems = getCartItems();
        return `
        <div class="cart content">
            <div class="cart-list">
                <ul class="cart-list-container">
                    <li>
                    <h3>Cos de cumparaturi</h3>
                    <div>Pret</div>
                    </li>
                    ${
                        cartItems.length === 0?
                        '<div>Cosul este gol, <a href="/#/">Inapoi la cumparaturi</a>':
                        cartItems.map(item => `
                        <li>
                        <div class="cart-image">
                        <img src="${item.image}" alt="${item.name}"/>
                        </div>
                        <div class="cart-name">
                         <div>
                           <a href="/#/product/${item.product}" >${item.name}</a>
                           </div>
                           <div>
                            Cantitate: <select class="qty-select" id="${item.product}">
                            ${
                                [...Array(item.countInStock).keys()].map(x => item.qty === x+1 ?
                                    `<option selected value="${x+1}">${x+1}</option>`:
                                    `<option value="${x+1}">${x+1}</option>`
                                    )
                            }
                            </select>
                           <button type="button" class="delete-button" id="${item.product}">
                           Sterge
                           </button>
                           </div>
                        </div>
                        <div class="cart-price ${item.qty > 1 ? 'cart-price-updated' : ''}">
                        ${item.qty === 1 ? item.price : item.price * item.qty} RON 
                        </div>
                        </li>
                        `).join('\n')
                    }
                </ul>
            </div>
            <div class="cart-action">
             <h3>
             Sumar comanda <br/>
             Total (${cartItems.reduce((a,c) => a + c.qty, 0)} produse)
             :
             ${cartItems.reduce((a,c) => a + c.price*c.qty, 0)} RON
             </h3>
             <button id="checkout-button" class="primary fw">
              Continua
             </button>
            </div>
        </div>
        `
    }
}
export default CartScreen;