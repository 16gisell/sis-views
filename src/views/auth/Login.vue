<template>
    <section class="section section-shaped section-lg my-0">
        <Estilos/>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="border-0">
                        <template>
                            <div class="text-muted text-center mb-3">
                                <h4 class="mb-1">Iniciemos Sesión!!</h4>
                            </div>
                            <div class="alert alert-success" role="alert" v-if="send === true">
                                {{messagesTrue}} <i class='bx bxs-wink-smile'></i>.
                            </div>
                            <div class="alert alert-danger" role="alert" v-if="Notsend === true">
                                {{messagesFalse}} <i class='bx bxs-wink-smile'></i>.
                            </div>
                        </template>
                        <template>
                            <div class="text-center text-muted mb-4">
                                <small>Requerimos de un usuario autorizado!</small>
                            </div>
                            <form @submit.prevent="validarSubmit">
                                <div class="row">                                
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="input-group input-group-alternative mb-4">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                                                </div>
                                                <input type="email"  :class="['form-control form-control-alternative',{'error-input': correoError}]"  id="correo" placeholder="Correo" v-model="correo" required>                                                
                                            </div>
                                            <small class="text_error" v-if="errors.correo">{{ errors.correo }}</small>
                                        </div>
                                    </div>
                                </div>

                                <div class="row"> 
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="input-group input-group-alternative mb-4">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                                                </div>
                                                <input type="password" :class="['form-control form-control-alternative',{'error-input': passwordError}]" id="password" placeholder="Password" v-model="password" required>
                                            </div>
                                            <small class="text_error" v-if="errors.password">{{ errors.password }}</small>
                                        </div>
                                    </div>                       
                                </div>
                                <button v-if="!activeload" class="btn btn-successTow btn-lg btn-block btnG">Inicio</button>
                                <button class="btn btn-successTow btn-lg btn-block btnG" type="button" disabled v-if="activeload">
                                    <span class="spinner-border spinner-border-sm fa fa-spinner" role="status" aria-hidden="true"></span>
                                    <span class="sr-only">Loading...</span>
                                </button>
                            </form>
                        </template>
                    </card>
                    <div class="row mt-3">
                        <div class="col-12 text-center mb-4">
                            <ul>
                                <li class="list-acccion">
                                    <a href="#/registrar">
                                        <small>Registrar?</small>
                                    </a>
                                </li>
                                <li class="list-acccion">
                                    <a href="#/restPassword">
                                        <small>Recuperar password?</small>
                                    </a>  
                                </li>
                            </ul>                                                      
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import Estilos from "../components/Estilos.vue";
    import UserService from "../../services/UserService";

    const userService = new UserService();

    export default {
        components: { Estilos },
        data() {
            return { 
                user:"",
                messagesTrue:"",
                messagesFalse:"",
                send:false,
                Notsend:false,
                dataUser: "",
                errors: {},

                correo:"admin@siscotelcloud.com",
                password: "123456789G",

                correoError: null,
                passwordError: null,

                activeload: false
            };
        },
        created(){   

        },
    methods: {
        validarForm() { // Metodo para validar cada campo
                this.activeload = true
                this.refrechError();
                const errors = {};
                const email = /^[\w-.]+@([\w-]+.)[a-zA-Z]{2,}$/

                
                if (!email.test(this.correo)) {                    
                    errors.correo = "Ingrese correo valido"
                    this.correoError = errors.correo
                } 
                
                if (!this.correo ) {                    
                    errors.correo = "El campo Correo es requerido"
                    this.correoError = errors.correo
                }

                if (!this.password) {
                    errors.password = "El campo password es requerido"
                    this.passwordError = errors.password                        
                }                

                this.errors = errors;
                return Object.keys(errors).length === 0; 
            },            

            validarSubmit() { //llamada principal submit
                this.activeload = true
                if (!this.validarForm()) {
                    this.Notsend = true
                    this.messagesFalse = "Formulario inválido, verifique los errores y Campos son obligatorios"    
                    setTimeout(() => {
                        this.Notsend = false
                    }, 3000); 
                    this.activeload = false
                    console.error('Formulario inválido, revise los errores.');
                    
                } else {
                    this.Notsend = false
                    const data = {
                        sign_in: {
                            email: this.correo,
                            password: this.password,
                        }
                    }
                    this.LoginUser(data)
                }
            },
            
            LoginUser(data){
                this.activeload = true
                var datos=JSON.stringify(data)
                const userPost = userService.postUserLogin(datos);
                userPost.then(data => {
                    if(data.status === 200){                       
                        setTimeout(function(){ window.location.href='/#/consultar'}, 1000); 
                    } else{     
                        this.Notsend = true,
                        this.messagesFalse = data.messages
                        this.activeload = false
                        setTimeout(() => {
                            this.Notsend = false
                        }, 5000); 
                    }                    
                })
                userPost.catch((err)=>{
                    return err
                })
            },
            refrechError() {
                 this.correoError = null,
                this.passwordError= null
            },
            
        }
    };
</script>
<style>
.list-acccion{
    display: block;
    color: black;
    font-size: 19px;
}
</style>