import { getUserInfo } from "../localStorage.js";


const Header = {
    render:()=>{
    const {name, isAdmin} = getUserInfo();

        return `
    <div class="brand">
        <a href="/#/"><img src="https://i.ibb.co/F34jkQm/Logo.png" alt="lumea lui alice"/></a>
    </div>
    
<div class="element-design"></div>

    <div>
    ${name ? `<a href="/#/profile">${name}</a>`:
`<a href="/#/signin">Autentificare</a>`}
        
        <a href="/#/cos">Cos<i class="fa fa-shopping-cart"></i></a>
        ${isAdmin ? `<a href="/#/dashboard">Dashboard</a>`:''}
    </div>
        `
    },
    after_render:()=>{}
}
export default Header;