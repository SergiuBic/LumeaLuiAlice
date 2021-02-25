import { apiUrl } from "./config.js";
import { getUserInfo } from "./localStorage.js";

export const getProduct = async (id) => {
    try{
        const response = await axios({
            url: `${apiUrl}/api/products/${id}`,
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json',
            }
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
};

export const getProducts = async () => {
    try{
        const response = await axios({
            url: `${apiUrl}/api/products/show`,
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json',
            }
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err){
        console.log(err);
        return {error:  err.message};
    }
};

export const createProduct = async({name,category,Brand,image,price,desc,countInStock}) => {
    
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/products/create`,
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: {
                name, category,Brand,image,price,desc,countInStock,
            }
        })
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        return response.data;
    }catch(err){
        console.log(err);
        return {error: err.message};
    }
}
export const deleteProduct = async (id) => {
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/products/${id}`,
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
    if (response.statusText !== 'OK'){
        throw new Error(response.data.message);
    }
    return response.data;
    }catch(err){
        return {error: err.message};
    }
}
export const editProduct = async({_id,name,category,Brand,image,price,desc,countInStock}) => {
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/products/${_id}`,
            method: 'PUT',
            headers: {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`,
            },
            data: {
                name,category,Brand,image,price,desc,countInStock
            }
        })
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        return response.data;
    }catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
}
export const signin = async({email,password}) => {
    try{
        const response = await axios({
            url: `${apiUrl}/api/users/signin`,
            method: 'POST',
            header: {
                "Content-Type" : "application/json",
            },
            data: {
                email,
                password,
            }
        })
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        return response.data;
    }catch(err){
        return {error: err.response.data.message || err.message};
    }
}

export const register = async({name, email,password}) => {
    try{
        const response = await axios({
            url: `${apiUrl}/api/users/register`,
            method: 'POST',
            header: {
                "Content-Type" : "application/json",
            },
            data: {
                name,
                email,
                password,
            }
        })
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        return response.data;
    }catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
}

export const update = async({name, email,password}) => {
    try{
        const {_id, token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/users/${_id}`,
            method: 'PUT',
            headers: {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`,
            },
            data: {
                name,
                email,
                password,
            }
        })
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        return response.data;
    }catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
}
export const editOrder = async({id,address, city,phone,nameShipping}) => {
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/${id}`,
            method: 'PUT',
            headers: {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`,
            },
            data: {
                address,
                city,
                phone,
                nameShipping,
            }
        })
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        return response.data;
    }catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
}

export const createOrder = async (order) =>{
    const {token} = getUserInfo();
    try{
        const response = await axios({
            url: `${apiUrl}/api/orders`,
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`,
    
            },
            data: order,
        })
        if( response.statusText !== 'Created')
        {throw new Error(response.data.message);}
        else{
            return  response.data;
        }
    }catch(err){
        return {error: (err.response ? err.response.data.message:err.message)}
    }
   
}

export const getOrder = async (id) => {
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/${id}`,
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
    if (response.statusText !== 'OK'){
        throw new Error(response.data.message);
    }
    return response.data;
    }catch(err){
        return {error: err.message};
    }
}

export const deleteOrder = async (id) => {
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/${id}`,  
            method: 'delete',
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
    if (response.statusText !== 'OK'){
        throw new Error(response.data.message);
    }
    return response.data;
    }catch(err){
        return {error: err.message};
    }
}

export const getAllOrders = async () => {
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/orders`,
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
    if (response.statusText !== 'OK'){
        throw new Error(response.data.message);
    }
    return response.data;
    }catch(err){
        return {error: err.message};
    }
}

export const getAllUsers = async () => {
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/users/`,
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
    if (response.statusText !== 'OK'){
        throw new Error(response.data.message);
    }
    return response.data;
    }catch(err){
        return {error: err.message};
    }
}

export const getMyOrders = async() => {
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/mine`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err){
        return {error: (err.response ? err.response.data.message:err.message)}
    }
  
}

export const getPaypalClientId = async () => {
    const response = await axios({
        url: `${apiUrl}/api/paypal/clientId`,
        headers:{
            'Content-Type':'application/json',
        }
    });
    if(response.statusText !== 'OK'){
        throw new Error(response.data.message);
    }
    return response.data.clientId;
}

export const payOrder = async (orderId, paymentResult)=>{
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/${orderId}/pay`,
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data: paymentResult,
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err){
        return {error: (err.response ? err.response.data.message:err.message)}
    }
   
}