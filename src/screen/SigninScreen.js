/* eslint-disable no-alert */
import { signin } from "../api.js";
import { getUserInfo, setUserInfo } from "../localStorage.js";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils.js";

const SigninScreen = {
    after_render: ()=>{
        document.getElementById("signing-form")
        .addEventListener("submit", async (e) => {
            e.preventDefault();
            showLoading();
            const data = await signin({
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
            })
            
            if(data.error){
                showMessage(data.error);

            }else{
                setUserInfo(data);
                redirectUser();
            }
            hideLoading();
        })
    },
    render: () =>{
        if(getUserInfo().name){
            redirectUser();
        }
        return `
        <div class="form-container">
         <form id="signing-form">
            <ul class="form-items">
                <li>
                    <h1>Contul tau</h1>
                
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
                    <button type="submit" class="primary">Intra in cont</button>
                </li>
                <li>
                  <div>
                    Utilizator nou ?
                    <a href="/#/register"> Creaza un cont acum! </a>
                  </div>
                </li>
            </ul>
         </form>
        </div>
        `
    }
}
export default SigninScreen;