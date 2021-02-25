/* eslint-disable no-underscore-dangle */
import { createOrder } from "../api.js";
import CheckoutSteps from "../components/CheckoutSteps.js";
import { cleanCart, getCartItems, getPayment, getShipping } from "../localStorage.js";
import { showLoading, hideLoading, showMessage } from "../utils.js";

const convertCartToOrder = () => {
    const orderItems = getCartItems();
    if(orderItems.length === 0){
        document.location.hash = '/cos'
    }
    const shipping = getShipping();
    if(!shipping.address){
        document.location.hash = '/shipping'
    }
    const payment = getPayment();
    if(!payment.paymentMethod){
        document.location.hash = '/payment'
    }

    const itemsPrice = orderItems.reduce((a,c) => a + c.price*c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0: 5;
    const taxPrice = Math.round(0.22 * itemsPrice * 100) / 100; // TVA conversie euro paypal
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    return{
        orderItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    }
}
const OrderScreen = {
    after_render: async () =>{
        document.getElementById("place-order-button")
        .addEventListener("click", async ()=>{

            const order = convertCartToOrder();
            showLoading();
            const data = await createOrder(order);
            hideLoading();
            if(data.error){
                showMessage(data.error);
    
            }else{
                cleanCart();
                document.location.hash = `/order/${  data.order._id}`;
            }
        })
        
    },
    render: () => {
        const {
            orderItems,
            shipping,
            payment,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        } = convertCartToOrder();
        return `
        <div>
            ${CheckoutSteps.render({step1: true,step2:true,step3:true,step4:true})}
            <div class="order">
                <div class="order-info">
                    <div>
                        <h2> Livrare </h2>
                        <div>
                        ${shipping.address},
                        ${shipping.city},
                        ${shipping.phone},
                        ${shipping.nameShipping}
                    </div>
                </div>
                <div>
                    <h2> Plata </h2>
                    <div>
                    Modalitatea de plata: ${payment.paymentMethod}
                    </div>
                </div>
                <div>
                 <ul class="cart-list-container">
                   <li>
                    <h2> Cosul de cumparaturi </h2>
                    <div> Pret </div>
                   </li>
                   ${
                       orderItems.map(item => `
                       <li>
                          <div class="cart-image">
                          <img src="${item.image}" alt="${item.name}" />
                          </div>
                          <div class="cart-name">
                            <div>
                             <a href="/#/product/${item.product}">${item.name}</a>
                            </div>
                            <div> Cantitate: ${item.qty}</div>
                          </div>
                          <div class="cart-price">${item.price}</div>
                        </li>
                       `)
             
                   }
                 </ul>

            </div>
        </div>
        <div class="order-action">
           <ul>
            <li>
                <h2> Comanda ta </h2>
            </li>
            <li>
            <div>Produse</div><div>${itemsPrice} RON</div></li>
            <li><div>Livrare <div class="shipping-extra-info">(Comenziile care depasesc 100 RON beneficieaza de livrare gratuita)</div></div><div>${shippingPrice} RON</div></li>
            <li><div>TVA</div><div>${taxPrice} RON</div></li>
            <li class="total"><div >Total </div><div>${totalPrice} RON</div></li>
            <li>
            <button id="place-order-button" class="primary fw">
            Continua
            </button>
            </li>
            </div>
    </div>
        `
    }
}
export default OrderScreen;