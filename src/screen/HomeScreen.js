/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
import { getProducts } from '../api.js';
import Rating from '../components/Rating.js';
import { hideLoading, showLoading } from '../utils.js';

const HomeScreen = {
    async render() {
        showLoading();
        const products = await getProducts();
        hideLoading();
        return `
        <ul class="products">
        ${products.map((product) => `
        <li>
            <div class="product">
                <a href="/#/product/${product._id}">
                <img src="${product.image}" alt="${product.name}"/>
                </a>
            <div class="product-name">
                <a href="/#/product/${product._id}">
                ${product.name}
                </a>
            </div>
            <div class="product-rating">
                ${Rating.render({value: product.rating, text: `${product.numReviews  } ${product.numReviews === 1 ? 'recenzie':'recenzii' }`})}
            </div>
            <div class="product-desc">
                ${product.desc}
            </div>
            <div class="product-price">
                ${product.price} RON
            </div>
            </div>
        </li>
        `).join('\n')}
        `;
    },
};
export default HomeScreen;
