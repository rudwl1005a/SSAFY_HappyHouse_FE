import axios from 'axios'
import store from "@/store/store.js";

async function getToken(user){
    let response = await instance.get("/security/create/token?subject="+ user.userId)
    let {data} = response;
    console.log(response);
    console.log(data.result);
    store.state.login.token = data.result;
}

const instance = axios.create({
    // baseURL: 'http://3.34.190.221:8080',
    baseURL: 'http://localhost:8080',
    headers: { 
        'Content-type': 'application/json', 
        
    },
    // withCredentials : true,
})

instance.interceptors.request.use(
    function (config) {
        config.headers["Authorization"] = store.state.login.token;
        
        console.error("================================")
        console.log("인터셉터 리퀘스트 : "+ config.url );
        
        console.log("Authorization = " + config.headers["Authorization"]);
        console.error("================================")
        return config;
    },
    function (error) {
        console.log(error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        console.error("================================")
        console.log("인터셉터 리스폰 : " + response.config.url);
        console.log(response)
        if(response.config.url == "/login" && response.status == 200){
            getToken(response.data)
        }
        console.error("================================")
        return response;
        
    },
    function (error) {
        errorController(error);
    }
);

  
export default instance;



// export default axios.create({
//     //baseURL: 'http://3.34.190.221:8080',
//     baseURL: 'http://localhost:8080',
//     headers: { 
//         'Content-type': 'application/json' ,
//         Authorization: token
//     },
//     //withCredentials : true,
// })
