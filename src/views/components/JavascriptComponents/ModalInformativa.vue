<template>
    <!-- Modals -->
    <div class="row">
        <div class="col-md-12">

            <button type="button" rel="tooltip" class="btn btn-info btn-icon btn-sm " data-original-title="" title="Detalle de usuario" @click="modals.modal2 = true">
                <i class="ni ni-circle-08 pt-1"></i>  
            </button>

            <modal :show.sync="modals.modal2" body-classes="p-0" modal-classes="modal-dialog-centered modal-lg">
                <card type="secondary" shadow
                      header-classes="bg-white pb-5"
                      body-classes="px-lg-5 py-lg-5"
                      class="border-0">
                    <button type="button" class="close" @click="closeModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <template>
                        <div class="text-muted text-center mb-3">
                            <h6> <strong>Detalle del usuario {{ id }}</strong> </h6>
                        </div>
                    </template>
                    <template>
                        <div class="text-center text-muted mb-4">
                            <small>Informacion complementaria del usuario</small>
                        </div>
                        <div class="row text-dark text-center">
                            <div class="col-md-6">
                                <img src="../../../../public/img/icons/common/jefe.png" class=" img-thumbnailrounded float-left imagen_user" alt="" width="250vw">
                            </div>
                            <div class="col-md-6">
                                <div class="row"> 
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="text-dark" for="tipo_persona">Tipo de persona</label>
                                            <div class="input-group input-group-alternative mb-4">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="ni ni-active-40"></i></span>
                                                </div>
                                                <input type="text" disabled class="form-control form-control-alternative" :placeholder=nametipoP(tipo_persona)>                                         
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="text-dark" for="tipo_documento">Tipo de documento</label>
                                            <div class="input-group input-group-alternative mb-4">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="ni ni-active-40"></i></span>
                                                </div>     
                                                <input type="text" disabled class="form-control form-control-alternative" :placeholder=nametipoD(tipo_documento)>    
                                            </div>                                        
                                        </div>
                                    </div>
                                </div>

                                <div class="row">                                
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="text-dark">Numero de documento</label>
                                            <div class="input-group input-group-alternative mb-4">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="ni ni-paper-diploma"></i></span>
                                                </div>
                                                <input type="text" disabled class="form-control form-control-alternative" :placeholder=num_documento>   
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">                                        
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label v-if="tipo_persona == 1" class="text-dark">Nombre usuario</label>
                                            <label v-if="tipo_persona == 2" class="text-dark">Razon social</label>
                                            <div class="input-group input-group-alternative mb-4">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="ni ni-circle-08"></i></span>
                                                </div>
                                                <input v-if="tipo_persona == 1" type="text"  class="form-control form-control-alternative" disabled  :placeholder=nombre v-model="nombre" >                                           
                                                <input v-if="tipo_persona == 2" type="text" class="form-control form-control-alternative" disabled :placeholder=razon_social v-model="razon_social" >                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">                                
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="text-dark">Correo Electronico</label>
                                            <div class="input-group input-group-alternative mb-4">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                                                </div>
                                                <input type="text" disabled class="form-control form-control-alternative" :placeholder=correo>                                             
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="text-dark" for="fecha_emi">Fecha de emision del documento</label>
                                            <div class="input-group input-group-alternative mb-4">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="ni ni-calendar-grid-58"></i></span>
                                                </div>                                            
                                                <input type="text" disabled class="form-control form-control-alternative" :placeholder=fecha_emi>  
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="text-dark" for="fecha_ven">Fecha de vencimiento del documento</label>
                                            <div class="input-group input-group-alternative mb-4">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="ni ni-calendar-grid-58"></i></span>
                                                </div>                                            
                                                <input type="text" disabled class="form-control form-control-alternative" :placeholder=fecha_ven>                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="text-dark">Telefono principal</label>
                                            <div class="input-group input-group-alternative mb-4">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="ni ni-mobile-button"></i></span>
                                                </div>  
                                                <input type="text" disabled class="form-control form-control-alternative" :placeholder=tlf_principal>  
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="text-dark">Telefono secundario</label>
                                            <div class="input-group input-group-alternative mb-4">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="ni ni-mobile-button"></i></span>
                                                </div>  
                                                <input type="text" disabled class="form-control form-control-alternative" :placeholder=tlf_secundario>                 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>                           
                        </div>
                    </template>
                </card>
            </modal>
        </div>
    </div>
</template>
<script>
    import Modal from "@/components/Modal.vue";
    
    export default {
        props: {
            id: String,
            tipo_documento: Number,
            tipo_persona: Number,
            nombre: String,
            correo: String,
            num_documento: String,
            fecha_emi: String,
            fecha_ven: String,
            tlf_secundario: String,
            tlf_principal: String,
            razon_social: String,
        },
        components: {
            Modal
        },
        data() {
            return {
                modals: {
                    modal2: false,
                },
            };
        },
    created() {   
        },
    methods: {  
        closeModal() {
            this.modals.modal2= false
        }, 
        nametipoP(id) {
            switch (id) {
                case 1:
                    return "Natural"
                    break;
                case 2:
                    return "Juridico"
                    break
                default:
                    break;
            }
        },
        nametipoD(id) {
            switch (id) {
                case 1:
                    return "RIF"
                    break;
                case 2:
                    return "Cedula identidad"
                    break
                case 3:
                    return "Pasaporte"
                    break
                default:
                    break;
            }
        }

    }
};
</script>
<style>
.imagen_user{
    margin-top: 17vh;
}
@media (max-width: 1250px) {
    .imagen_user{
        margin-top: 0;
        margin-bottom: 5vh;
    }
}

</style>
