/* eslint-disable no-underscore-dangle */

import { getMyOrders, update } from "../api.js";
import { getUserInfo, setUserInfo, clearUser } from "../localStorage.js";
import { hideLoading, showLoading, showMessage } from "../utils.js";

const ProfileScreen = {
    after_render: ()=>{
        document.getElementById("signout-button")
        .addEventListener("click", () => {
            clearUser();
            document.location.hash = "/";
        })
        document.getElementById("profile-form")
        .addEventListener("submit", async (e) => {
            e.preventDefault();
            showLoading();
            const data = await update({
                email: document.getElementById("email").value,
                name: document.getElementById("name").value,
                password: document.getElementById("password").value,
            })
            hideLoading();
            if(data.error){
                showMessage(data.error);

            }else{
                setUserInfo(data);
                document.location.hash = "/"
            }
        })
    },
    render: async () =>{
        const {name, email} = getUserInfo();
        if(!name){
            document.location.hash = '/';
        }
        const orders = await getMyOrders();
        return `
        <div class="content profile">
            <div class="profile-info">
            <div class="form-container">
            <form id="profile-form">
               <ul class="form-items">
                   <li>
                       <h1>Profil</h1>
                   
                   </li>
                   <li>
                    <label for="name">Nume</label>
                    <input type="name" name="name" id="name" value="${name}"/>
                   </li>
                   <li>
                    <label for="email">E-mail:</label>
                    <input type="email" name="email" id="email" value="${email}"/>
                   </li>
                   <li>
                       <label for="password">Parola:</label>
                       <input type="password" name="password" id="password" />
                   </li>
                   <li>
                       <button type="submit" class="primary">Actualizeaza</button>
                   </li>
                   <li>
                   <button type="button" id="signout-button">Iesi din cont</button>
               </li>
                  
               </ul>
            </form>
           </div>
            </div>
            <div class="profile-orders">
            <h2>Istoric comenzi</h2>
            <table>
             <thead>
             <tr>
             <th> ID COMANDA </th>
             <th> DATA </th>
             <th> TOTAL </th>
             <th> ACHITAT </th>
             <th> LIVRAT </th>
             <th> ACTIUNI </th>
             </tr>
             </thead>
             <tbody>
             ${orders.length === 0 ? `<tr><td colspan='6'>Istoric comenzi (gol)</td></tr>`:
                orders.map((order) => 
                    `<tr>
                    <td>${order._id}</td>
                    <td>${new Date(order.createdAt).toLocaleString('ro-RO')}</td>
                    <td>${order.totalPrice} RON</td>
                    <td>${order.paidAt ? new Date(order.paidAt).toLocaleString('ro-ro') : 'Nu'}</td>
                    <td>${order.deliveredAt ? new Date(order.deliveredAt).toLocaleString('ro-ro') : 'Nu'}</td>
                    <td><a href='/#/order/${order._id}'>Detalii</a></td>
                    </tr>`
                ).join('\n')
            }
             </tbody>
             </table>
            </div>
        </div>
            `
    }
}
export default ProfileScreen;