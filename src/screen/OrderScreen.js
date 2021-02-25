/* eslint-disable no-underscore-dangle */
import { getOrder, getPaypalClientId, payOrder } from "../api.js";
import { hideLoading, parseRequestUrl, rerender, showLoading, showMessage } from "../utils.js";
import OrderScreen from "./PlaceOrderScreen.js";


const handlePayment = (clientId,totalPrice) => {
    window.paypal.Button.render({
        env: 'sandbox',
        client: {
            sandbox: clientId,
            production: ''
        },
        locales: 'en-RO',
        style: {
            size: 'responsive',
            color: 'gold',
            shape: 'pill'
        },
        commit: true,
        payment(data, actions){
            return actions.payment.create({
                tranzactions: [
                    {
                        amount: {
                            total: totalPrice,
                            currency: 'EUR',
                        }
                    }
                ]
            })
        },
        onAuthorize(data, actions){
            return actions.payment.execute().then(async()=>{
                showLoading();
                await payOrder(parseRequestUrl().id,{
                    orderID: data.orderID,
                    payerID: data.payerID,
                    paymentID: data.paymentID,
                });
                hideLoading();
                showMessage('Plata a fost inregistrata cu success!', ()=>{
                    rerender(OrderScreen);
                })
            })
        },
        
    }, '#paypal-button').then(()=>{
        hideLoading();
    })
}

const addPaypalSdk = async (totalPrice) => {
    
    const clientId = await getPaypalClientId();
    showLoading();
    if(!window.paypal){
        const script = document.createElement('script');
        script.type = 'text/javascript'
        script.src = 'https://www.paypalobjects.com/api/checkout.js'
        script.async = true;
        script.onLoad = () => handlePayment(clientId,totalPrice);

        document.body.appendChild(script);
    }else{
        handlePayment(clientId,totalPrice);
    }
    hideLoading();
}

const PlaceOrderScreen = {
    after_render:  () =>{

    },
    render: async () => {
        const request = parseRequestUrl();
        const {
            _id,
            shipping,
            payment,
            orderItems,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            isDelivered,
            deliveredAt,
            isPaid,
            paidAt,
        } = await getOrder(request.id);


        if(!isPaid){
            addPaypalSdk(totalPrice);
        }
        return `
        <div>
        <h1>Detalii comanda #${_id}</h1>
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
                    ${isDelivered? `<div class="success">S-a livrat in ${deliveredAt}</div>`:
                     `<div class="error">Se proceseaza livrarea</div>`}
                </div>
                <div>
                    <h2> Plata </h2>
                    <div>
                    Modalitatea de plata: ${payment.paymentMethod}
                    </div>
                    ${isPaid? `<div class="success">Platit in ${paidAt}</div>`:
                    `<div class="error">Plata in asteptare</div>`}
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
            <li><div>TVA</div><div>${taxPrice} RON/EUR</div></li>
            <li class="total"><div >Total </div><div>${totalPrice} RON</div></li>
            <li>
             <div id="paypal-button" class="fw"></div>
            </li>
            <li>
            <button id="place-order-button" class="primary fw" disabled="disabled">
            Pay2U (Credit/Debit Card)
            </button>
            </li>
            </div>
    </div>
        `
    }
}
export default PlaceOrderScreen;