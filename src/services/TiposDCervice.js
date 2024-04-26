class ConfigService{
    constructor(){
        this.URI = "https://billeteragfglobal-production.up.railway.app/api/config";
    }

    async getConfig(){
        const respuesta= await fetch(this.URI);
        const recargas =respuesta.json();
        return recargas;
    }

    async getConfigId(codigoenviado_email){
        const respuesta= await fetch(`${this.URI}/${codigoenviado_email}`);
        const recargas =respuesta.json();
        return recargas;
    }

    async postConfig(datos){ 
        
        const res = await fetch(this.URI, {
            method:'POST',
            body:datos,
            headers:{
                'content-type': 'application/json'
            }
        });
       const data = await res.json();
        return data
    }

    async putConfig(codigoenviado_email, datos){
        const dele = await fetch(this.URI+'/'+codigoenviado_email,{
            method:'PUT',
            body:datos,
            headers:{
                'content-type': 'application/json'
            }            
        })
        const data = await dele.json();
        return data;
    }
}

export default ConfigService
