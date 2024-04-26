import util from "util";
import CredentialsENV from "../../credentialsENV"
    
// TODO: entiendase como usuario al gestor o aquel que interactua con la aplicacion(admin)

class UserService{
    constructor(){
        this.URI = CredentialsENV.URL_SERVICE_API;
        const dataUser={
            nombreUsuario:"",
            documento:"",
            password:"",
            correo:"",
            telefono:"",
            token:""
        }
        // this.URI = "/api/gastos";
        let accessToken = localStorage.getItem('accessToken')
        this.headers = {
            'content-type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'multipart/form-data',
            'API-KEY': CredentialsENV.API_KEY,
            'AUTH-TOKEN': accessToken ? accessToken : ''
        }
    }

    async getUsers(){
        const respuesta= await fetch(this.URI);
        const usuarios =respuesta.json();
        return usuarios;
    }

    async getUserId(id){
        const respuesta= await fetch(`${this.URI}/${id}`);
        const usuario =respuesta.json();
        return usuario;
    }

    //creando el usuario
    async postUser(user){ 
        const res = await fetch(this.URI+"/sign_up", {
            method:'POST',
            body:user,
            headers:this.headers
        });
       const data = await res.json();
        return data
    }

    async postUserLogin(user) { 
        const datos = this.getFormData(user)
        console.log(datos)
        const res = await fetch(this.URI+"/sing_in", {
            method:'POST',
            body:user,
            headers:this.headers
        });      
        const result = await res.json();
        if (result.status === 200) {
            this.setUser(result.data.admin)
            this.setToken(result.data.admin.authentication_token)
            return result 
            
        }else{
            return result
        }       
    }

    async editUser(id, user){
        const dele = await fetch(this.URI+'/'+id,{
            method:'PUT',
            body:user,
            headers:headers           
        })
        const data = await dele.json();
        return data;
    }


    //seteamos usuario
    setUser(user){ //guarda el usuario
        let user_string =JSON.stringify(user);
        return localStorage.setItem('currenUser', user_string);        
    }

    setToken(token){ //una vez que elusuario este logiado guarda el token 
        return localStorage.setItem('accessToken', token);
        
    }
    
    getToken(){
        return localStorage.getItem('accessToken');
    }

    getCurrenUser(){//saber el usuario que este logado en ese momento 
        let user_string =localStorage.getItem('currenUser');
        if(!util.isNullOrUndefined(user_string)){
            let user =JSON.parse(user_string);
            return user;
        }else{
            return null;
        }
    }

    async Salir(){
        let accessToken = localStorage.getItem('accessToken')        
        const res = await fetch(this.URI+"/log_out", {
            method:'POST',
            headers:{
                'API-KEY': CredentialsENV.API_KEY,
                'AUTH-TOKEN': accessToken
            }
        });
        const result = await res.json();
        if (result.status === 200) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('currenUser')
            return localStorage.getItem('accessToken');
            
        }else{
            return {error: result.message, status: result.status}
        }        
    }

    getFormData(object) {
        const formData = new FormData();
        const jsonObject = JSON.parse(object);
        for (const key in jsonObject) {
            const value = jsonObject[key];
            formData.append(`data[${key}]`, value);
          }
        // Object.keys(object).forEach(key => formData.append(`sign_in[${key}]`, object[key]));
        return formData;
    }
}

export default UserService