<template>
    <section class="section section-shaped section-lg my-0">
        <Estilos/>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="border-0">
                        <template>
                            <div class="text-muted text-center mb-3">
                                <h4 class="mb-1">Actualizar password!!</h4>
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
                                <small>Indica token enviado al correo y nuevo pasword!!</small>
                            </div>
                            <form @submit.prevent="LoginUser">
                                <base-input alternative type="email" class="mb-3" placeholder="Token" addon-left-icon="ni ni-email-83" required v-model="correo"></base-input>
                                <base-input alternative type="password" placeholder="Contraseña" addon-left-icon="ni ni-lock-circle-open" required v-model="password"></base-input>
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
                dataUser:"",

                correo:"",
                password: "",

                activeload: false
            };
        },
        created(){   

        },
        methods:{
            
        }
    };
</script>
// 