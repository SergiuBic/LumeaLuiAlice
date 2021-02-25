/* eslint-disable no-underscore-dangle */
import { deleteOrder, editOrder, getOrder } from "../api.js";

import {  hideLoading, parseRequestUrl, showLoading, showMessage } from "../utils.js";


const EditOrderScreen = {
    after_render:  () =>{
      const request = parseRequestUrl();
       document.querySelectorAll("button.save-edit")[0].addEventListener('click', async (e)=>{
           e.preventDefault();
           showLoading();

           const data = await editOrder({
            address: document.getElementById("address").value,
            phone: document.getElementById("phone").value,
            city: document.getElementById("city").value,
            nameShipping: document.getElementById("nameShipping").value,
            id: request.id,
        })
        hideLoading();
        if(data.error){
            showMessage(data.error);

        }else{
            document.location.hash = "/orderlist"
        }
           hideLoading();
       })
       document.querySelectorAll("button.error")[0].addEventListener('click', async (e)=>{
        e.preventDefault();
        showLoading();
        await deleteOrder(e.target.id);
        document.location.hash = "/orderlist"
        hideLoading();
    })
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

        return `
        <div>
        <h1>Editeaza comanda #${_id}</h1>
            <div class="order">
                <div class="order-info">
                    <div>
                        <h2> Livrare </h2>
                        <div class="edit-delivery">
                        <label for="address">Adresa de livrare</label>
                        <input type="text" name="address" id="address" value="${shipping.address}"/>
                        <label for="city">Orasul</label>
                        <input type="text" name="city" id="city" value="${shipping.city}"/>
                        <label for="phone">Numarul de telefon</label>
                        <input type="text" name="phone" id="phone" value="${shipping.phone}"/>
                        <label for="nameShipping">Numele destinatarului</label>
                        <input type="text" name="nameShipping" id="nameShipping" value="${shipping.nameShipping}"/>
                        
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
                <h2> Actiuni comanda </h2>
            </li>
            <li>
            <div>Produse</div><div>${itemsPrice} RON</div></li>
            <li><div>Livrare <div class="shipping-extra-info">(Comenziile care depasesc 100 RON beneficieaza de livrare gratuita)</div></div><div>${shippingPrice} RON</div></li>
            <li><div>TVA</div><div>${taxPrice} RON/EUR</div></li>
            <li class="total"><div >Total </div><div>${totalPrice} RON</div></li>
            <li>
             <div id="save-button" class="fw"><button type="button" id="${_id}" class="primary save-edit">Salveaza modificariile</button></div>
             <div id="cancel-button" class="fw"><button type="button" id="${_id}" class="error">Anuleaza comanda</button></div>
            </li>
            </div>
    </div>
        `
    }
}
export default EditOrderScreen;