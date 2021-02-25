/* eslint-disable no-alert */
import { register } from "../api.js";
import { getUserInfo, setUserInfo } from "../localStorage.js";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils.js";

const RegisterScreen = {
    after_render: ()=>{
        document.getElementById("register-form")
        .addEventListener("submit", async (e) => {
            e.preventDefault();
            showLoading();
            const data = await register({
                email: document.getElementById("email").value,
                name: document.getElementById("name").value,
                password: document.getElementById("password").value,
            })
            hideLoading();
            if(data.error){
                showMessage(data.error);

            }else{
                setUserInfo(data);
                redirectUser();
            }
        })
    },
    render: () =>{
        if(getUserInfo().name){
            redirectUser();
        }
        return `
        <div class="form-container">
         <form id="register-form">
            <ul class="form-items">
                <li>
                    <h1>Inregistreaza-te in ${document.title}</h1>
                
                </li>
                <li>
                 <label for="name">Nume</label>
                 <input type="name" name="name" id="name" />
                </li>
                <li>
                 <label for="email">E-mail:</label>
                 <input type="email" name="email" id="email" />
                </li>
                <li>
                    <label for="password">Parola:</label>
                    <input type="password" name="password" id="password" />
                </li>
                <li>
                    <label for="repassword">Confirma parola:</label>
                    <input type="password" name="repassword" id="repassword" />
                </li>
                <li>
                    <button type="submit" class="primary">Creeaza cont</button>
                </li>
                <li>
                  <div>
                    Ai deja un cont ?
                    <a href="/#/signin"> Intra in cont ! </a>
                  </div>
                </li>
            </ul>
         </form>
        </div>
        `
    }
}
export default RegisterScreen;