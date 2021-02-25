/* eslint-disable no-underscore-dangle */
import { createProduct, deleteProduct, editProduct, getProducts } from "../api.js";
import DashboardMenu from "../components/DashboardMenu.js";
import { hideLoading, showLoading, showMessage } from "../utils.js";

const ProductListScreen ={
    after_render: async ()=>{
      
      if(document.querySelectorAll(".delete-button").length > 0){
        document.querySelectorAll(".delete-button").forEach((button)=>{
          button.addEventListener('click', async (e)=>{
            e.preventDefault();
            showLoading();
            document.getElementById("prompt-overlay").classList.add("active");
            document.getElementById("button-yes").addEventListener('click', async ()=>{
              e.preventDefault();
              await deleteProduct(e.target.id);
              hideLoading();
              document.getElementById("prompt-overlay").classList.remove("active");
              
            })
            document.getElementById("button-no").addEventListener('click', ()=>{
              e.preventDefault();
              hideLoading();
              document.getElementById("prompt-overlay").classList.remove("active");
            })
            
      
        })
        })
    }

   
      document.getElementById("create-product-button").addEventListener('click',()=>{
      document.querySelectorAll(".prompt-create-product")[0].classList.add("active");
      document.getElementById("button-cancel").addEventListener('click',(e)=>{
        e.preventDefault();
        document.querySelectorAll(".prompt-create-product")[0].classList.remove("active");
      })
      })

     document.querySelectorAll(".edit-button").forEach(elem=>{
      elem.addEventListener('click',(e)=>{
            document.getElementById(`Edit${e.target.id}`).classList.add('active')
            // eslint-disable-next-line no-shadow
            document.getElementById("button-cancel").addEventListener('click', (e) => {
              e.target.parentElement.parentElement.parentElement.parentElement.classList.remove('active')
            })
      })
     })
      
     if(document.getElementById("edit-product") !== null){
      document.getElementById("edit-product")
        .addEventListener("submit", async (e) => {
            e.preventDefault();
            const targetProductId = e.target.querySelector("[type=submit]").id
            document.querySelectorAll(".prompt-edit-product")[0].classList.remove("active");
            showLoading();
            const data = await editProduct({
                _id: targetProductId,
                name: document.getElementById("updatedname").value,
                category: document.getElementById("updatedcategory").value,
                Brand: document.getElementById("updatedBrand").value,
                image: document.getElementById("updatedimage").value,
                price: document.getElementById("updatedprice").value,
                desc: document.getElementById("updateddesc").value,
                countInStock: document.getElementById("updatedcountInStock").value,
            })
            hideLoading();
            
            if(data.error){
                showMessage(data.error);
                hideLoading();

            }else{
              hideLoading();
                document.location.hash = '/dashboard'
            }
        })
      }
      if(document.getElementById("create-product") !== null){
        document.getElementById("create-product")
        .addEventListener("submit", async (e) => {
            e.preventDefault();
            document.querySelectorAll(".prompt-create-product")[0].classList.remove("active");
            showLoading();
            const data = await createProduct({
    
                name: document.getElementById("name").value,
                category: document.getElementById("category").value,
                Brand: document.getElementById("Brand").value,
                image: document.getElementById("image").value,
                price: document.getElementById("price").value,
                desc: document.getElementById("desc").value,
                countInStock: document.getElementById("countInStock").value,
            })
            hideLoading();
            
            if(data.error){
                showMessage(data.error);
                hideLoading();

            }else{
              hideLoading();
                document.location.hash = '/dashboard'
            }
        })

      }


    },
    render: async ()=>{
    const products = await getProducts()
    return `
    <div class="prompt" id="prompt-overlay">
    <h2> Do you want to perform this action?</h2>
    <div>
    <button class="primary" id="button-yes">Yes</button>
    <button class="primary" id="button-no">No</button>
</div>
</div>
    <div class="prompt-create-product" id="create-product-overlay">
    <h2> Create Product</h2>
    <div>
    <form id="create-product">
    <ul>
    <li>
    <label for="name">Name</label>
    <input type="text" name="name" id="name" />
    </li>
    <li>
    <label for="category">Category</label>
    <input type="text" name="category" id="category" />
    </li>
    <li>
    <label for="Brand">Brand</label>
    <input type="text" name="Brand" id="Brand" />
    </li>
    <li>
    <label for="image">Image URL</label>
    <input type="text" name="image" id="image" />
    </li>
    <li>
    <label for="price">Price</label>
    <input type="number" name="price" id="price" />
    </li>
    <li>
    <label for="desc">Description</label>
    <input type="text" name="desc" id="desc" />
    </li>
    <li>
    <label for="countInStock">Quantity</label>
    <input type="number" name="countInStock" id="countInStock" />
    </li>
    <li>
    <button class="primary" type="submit" id="button-create">Create</button>
    <button class="primary" id="button-cancel">Cancel</button>
    </li>
    </ul>
   

    </form>
    </div>
    </div>

    
    ${products.map((product)=> `
    <div class="prompt-edit-product" id="Edit${product._id}">
    <h2> Create Product</h2>
    <div>
    <form id="edit-product">
    <ul>
    <li>
    <label for="updatedname">Name</label>
    <input type="text" name="updatedname" id="updatedname" value="${product.name}" />
    </li>
    <li>
    <label for="updatedcategory">Category</label>
    <input type="text" name="updatedcategory" id="updatedcategory" value="${product.category}"/>
    </li>
    <li>
    <label for="updatedBrand">Brand</label>
    <input type="text" name="updatedBrand" id="updatedBrand" value="${product.Brand}" />
    </li>
    <li>
    <label for="updatedimage">Image URL</label>
    <input type="text" name="updatedimage" id="updatedimage" value="${product.image}"/>
    </li>
    <li>
    <label for="updatedprice">Price</label>
    <input type="number" name="updatedprice" id="updatedprice" value="${product.price}"/>
    </li>
    <li>
    <label for="updateddesc">Description</label>
    <input type="text" name="updateddesc" id="updateddesc" value="${product.desc}"/>
    </li>
    <li>
    <label for="updatedcountInStock">Quantity</label>
    <input type="number" name="updatedcountInStock" id="updatedcountInStock" value="${product.countInStock}"/>
    </li>
    <li>
    <button class="primary button-edit" type="submit" id="${product._id}">Update</button>
    <button class="primary" id="button-cancel">Cancel</button>
    </li>
    </ul>
    </form>
    </div>
    </div>
`)}
    

    
    <div class="dashboard">
    ${DashboardMenu.render({selected:'products'})}
   
    <div class="dashboard-content">
    
    <h1>Products List</h2>
    <button id="create-product-button" class="primary">Create Product</button>
    <div class="product-list">
     <table>
      <thead>
      <tr>
      <th> ID </th>
      <th> Name </th>
      <th> Price </th>
      <th> Category</th>
      <th> Brand </th>
      <th class="tr-action"> Action </th>
      </tr>
      </thead>
      <tbody>
       ${products.length === 0 ? `<tr><td colspan="7"> Lista de produse este goala, adaugati un produs! </td></tr>` : products.map(product => `
        <tr>
        <td>${product._id}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.category}</td>
        <td>${product.Brand}</td>
        <td><button id="${product._id}" class="edit-button">Edit</button>
        <button id="${product._id}" class="delete-button">Delete</button></td>
       `).join("\n")}
      </tbody>
      </table>
    </div>
  
    </div>
    </div>
    `},
}
export default ProductListScreen;