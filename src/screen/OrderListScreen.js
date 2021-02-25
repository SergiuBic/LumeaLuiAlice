/* eslint-disable no-underscore-dangle */
import {  deleteOrder, getAllOrders, getAllUsers } from "../api.js";
import DashboardMenu from "../components/DashboardMenu.js";
import { hideLoading, showLoading } from "../utils.js";

const OrderListScreen ={
    after_render: async ()=>{
      if(document.querySelectorAll(".delete-button").length > 0){
      document.querySelectorAll(".delete-button").forEach((button)=>{
        button.addEventListener('click', async (e)=>{
          e.preventDefault();
          showLoading();
          document.getElementById("prompt-overlay").classList.add("active");
          document.getElementById("button-yes").addEventListener('click', async ()=>{
            e.preventDefault();
            await deleteOrder(e.target.id);
            hideLoading();
            document.getElementById("prompt-overlay").classList.remove("active");
            document.location.hash = '/dashboard'
          })
          document.getElementById("button-no").addEventListener('click', ()=>{
            e.preventDefault();
            hideLoading();
            document.getElementById("prompt-overlay").classList.remove("active");
          })
          
    
      })
      })
  }

  if(document.querySelectorAll(".edit-button").length > 0){
    document.querySelectorAll(".edit-button").forEach((button)=>{
      button.addEventListener('click',(e)=>{
        e.preventDefault();
        document.location.hash = `/editorder/${e.target.id}`
      })
    })
  }
    },
    render: async ()=>{
    const orders = await getAllOrders()
    const users = await getAllUsers();
    
    
    return `
    <div class="prompt" id="prompt-overlay">
        <h2> Do you want to perform this action?</h2>
        <div>
        <button class="primary" id="button-yes">Yes</button>
        <button class="primary" id="button-no">No</button>
    </div>
    </div>
    <div class="dashboard">
    ${DashboardMenu.render({selected:'orders'})}
    <div class="dashboard-content">
   
    <h1>Orders List</h2>
    <div class="product-list">
     <table>
      <thead>
      <tr>
      <th> ID </th>
      <th> DATE </th>
      <th> TOTAL </th>
      <th> USER</th>
      <th> PAID</th>
      <th> DELIVERED</th>
      <th class="tr-action"> Action </th>
      </tr>
      </thead>
      <tbody>
       ${orders.length === 0 ? `<tr><td colspan="7"> Nu s-au efectuat comenzi </td></tr>` : Array.from(orders).map( (order) => `
       
        <tr>
        <td>${order._id}</td>
        <td>${new Date(order.createdAt).toLocaleString('ro-RO')}</td>
        <td>${order.totalPrice} RON</td>
        <td>${users.filter(x=> x._id === order.user)[0].email}</td>
        <td>${order.isPaid ? "Yes": "No"}</td>
        <td>${order.isDelivered ? "Yes":"No"}</td>
        <td><button id="${order._id}" class="edit-button">Edit</button>
        <button id="${order._id}" class="delete-button">Delete</button></td>
       `).join("\n")}
      </tbody>
      </table>
    </div>
  
    </div>
    </div>
    `},
}
export default OrderListScreen;