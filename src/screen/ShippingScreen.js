/* eslint-disable no-alert */
import CheckoutSteps from "../components/CheckoutSteps.js";
import { getUserInfo, getShipping, setShipping } from "../localStorage.js";


const ShippingScreen = {
    after_render: ()=>{
    
        document.getElementById("shipping-form")
        .addEventListener("submit", async (e) => {
            e.preventDefault();
            setShipping({
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                phone: document.getElementById("phone").value,
                nameShipping: document.getElementById("nameshipping").value,
            });
            document.location.hash = '/payment';
            
            
        })
    },
    render: () =>{
        const {name} = getUserInfo();
        if(!name){
            document.location.hash = '/';
        }
        const {address, city, phone, nameShipping} = getShipping();
        return `
        ${CheckoutSteps.render({step1: true, step2: true})}
        <div class="form-container">
         <form id="shipping-form">
            <ul class="form-items">
                <li>
                    <h1>Livrare Comanda</h1>
                
                </li>
                <li>
                <label for="address">Adresa de livrare</label>
                <input type="text" name="address" id="address" value="${address}"/>
               </li>
                <li>
                 <label for="city">Oras</label>
                 <input type="text" name="city" id="city" value="${city}"/>
                </li>

                <li>
                 <label for="phone">Numar de telefon</label>
                 <input type="tel" name="phone" id="phone" value="${phone}"/>
                </li>
                <li>
                 <label for="nameshipping">Numele complet</label>
                 <input type="text" name="nameshipping" id="nameshipping" value="${nameShipping}"/>
                </li>
  
                <li>
                    <button type="submit" class="primary">Continua</button>
                </li>
              
               
            </ul>
         </form>
        </div>
        `
    }
}
export default ShippingScreen;