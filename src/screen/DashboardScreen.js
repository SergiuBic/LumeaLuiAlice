/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
import { getAllOrders, getAllUsers } from "../api.js";
import DashboardMenu from "../components/DashboardMenu.js";

const DashboardScreen = {
    after_render: async ()=>{
        const pieColors = ["#845ec2","#ffc75f","#f9f871","#ff5e78"]
        let ordersData = []
        let ordersQty = []
        let orderPrices = []
        const orders = await getAllOrders()
        orders.map((order) => ordersData.push(order.orderItems[0].name));
        orders.map((order) => ordersQty.push(order.orderItems[0].qty));
        orders.map((order) => orderPrices.push(order.totalPrice));
        console.log(ordersData)
        console.log(orderPrices)

        const labels = []
        const ctx1 = document.getElementById('myChart');
        const ctx2 = document.getElementById('myChart2');
let myChart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ordersData,
        datasets: [{
            label: 'Sales',
            data: orderPrices,
            backgroundColor: [],
        }]
    },
    options: {
        
    }
});
let myChart2 = new Chart(ctx2, {
    type: 'doughnut',
    data: {
        labels: ordersData,
        datasets: [{
            label: 'Top buyed product',
            data: ordersQty,
            backgroundColor: pieColors,
        
        }]
    },
    options: {
       
    }
});
    },
    render: async ()=>{
        const orders = await getAllOrders();
        const users = await getAllUsers();
        const totalSales = Math.round(orders.reduce((a, b) => +a + +b.totalPrice, 0));

    
        return `
        <div class="dashboard">
        ${DashboardMenu.render({selected:'dashboard'})}
        <div class="dashboard-content">
        <h1>Dashbord</h2>
        
        <div class="dashboard-info">
        <ul>
            <li><h3>Users</h3><div>${users.length}</div></li>
            <li><h3>Orders</h3><div>${orders.length}</div></li>
            <li><h3>Sales</h3><div>${totalSales <= 0 ? 0 : totalSales} RON</div></li>
        </ul>
        </div>
        <div class="dashboard-charts">
        <canvas id="myChart" width="50" height="50"></canvas>
        <canvas id="myChart2" width="50" height="50"></canvas>
        </div>
        </div>
        </div>
        </div>
        `;
    }
}
export default DashboardScreen;