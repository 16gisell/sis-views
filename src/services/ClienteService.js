import CredentialsENV from "../../credentialsENV"

// TODO: entiendase como cliente al usuario que se desea registrar

class ClienteService{
    constructor(){
        this.URI = CredentialsENV.URL_SERVICE_API;

        let accessToken = localStorage.getItem('accessToken')
        this.headers = {
            'content-type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'multipart/form-data',
            'API-KEY': CredentialsENV.API_KEY,
            'AUTH-TOKEN': accessToken
        }
    }

    async getClientes(page, per_page, filter) {
        let accessToken = localStorage.getItem('accessToken')
        const respuesta = await fetch(`${this.URI}/usuarios?page=${page}&per_page=${per_page}&filter=${filter}`, {
            method:'GET',
            headers:{
                'API-KEY': CredentialsENV.API_KEY,
                'AUTH-TOKEN': accessToken
            }
        });
        const resultado =respuesta.json();
        return resultado;
    }

    async getClienteId(id){
        const respuesta= await fetch(`${this.URI}/${id}`);
        const resultado =respuesta.json();
        return resultado;
    }

    async postCliente(datos){ 
        
        const res = await fetch(this.URI+'/usuarios', {
            method:'POST',
            body:datos,
            headers:this.headers
        });
       const data = await res.json();
        return data
    }

    async putCliente(id, datos){
        const dele = await fetch(this.URI+'/usuarios/'+id,{
            method:'PUT',
            body:datos,
            headers:this.headers         
        })
        const data = await dele.json();
        return data;
    }

    async deleteCliente(id){
        const dele = await fetch(this.URI+'/usuarios/'+id,{
            method:'DELETE',
            headers:this.headers          
        })
        const data = await dele.json();
        return data;
    }
}

export default ClienteService
