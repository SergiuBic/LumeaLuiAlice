import { getProduct } from '../api.js';
import Rating from '../components/Rating.js';
import {hideLoading, parseRequestUrl, showLoading} from '../utils.js';

const ProductScreen = {
    after_render: () => {
        const request = parseRequestUrl();
        document.getElementById("add-button").addEventListener('click',
        () =>{
            document.location.hash = `/cos/${request.id}`;
        }
        )
    },
    render: async ()=>{
       const request = parseRequestUrl();
       showLoading();
       const product = await getProduct(request.id);
       if(product.error){
        return `<div>${product.error}</div>`;
    }
        hideLoading();
       return `
       <div class="content">
        <div class="back-to-result">
        <a href="/#/">Inapoi</a>
        <div class="details">
            <div class="details-image">
              <img src="${product.image}" alt="${product.name}" />
            </div>
            <div class="details-info">
                <ul>
                  <li>
                    <h1>${product.name}</li>
                  </li>
                  <li>
                  ${Rating.render({value: product.rating, text: `${product.numReviews  } ${product.numReviews === 1 ? 'recenzie':'recenzii' }`})}
                  </li>
                  <li>
                    Pret: <strong>${product.price} RON </strong>
                  </li>
                  <li>
                  Descriere:
                   <div>
                   ${product.desc}
                   </div>
                   </li>
                </ul>
            </div>
        <div class="details-action">
            <ul>
              <li>
              Pret: ${product.price}
              </li>
              <li> Disponibilitate:
               ${product.countInStock > 0 ? `<span class="success">In stoc</span>` : `<span class="error">Stoc epuizat</span>`}
               </li>
               <li>
                 <button id="add-button" class="fw primary">Adauga in cos</button>
               </li>
                 </ul>
        </div>
       </div>`;
      
    },
}
export default ProductScreen;