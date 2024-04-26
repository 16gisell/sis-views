<template>
    <!-- Modals -->
    <div class="row">
        <div class="col-md-12">
            <button type="button" rel="tooltip" class="btn btn-success btn-icon btn-sm m-2" data-original-title="Editar usuario" title="Editar usuario" @click="modals.modal = true">
                <i class="ni ni-settings-gear-65 pt-1"></i>
            </button>

            <modal :show.sync="modals.modal" body-classes="p-0" modal-classes="modal-dialog-centered modal-lg">
                <card type="secondary" shadow
                      header-classes="bg-white pb-5"
                      body-classes="px-lg-5 py-lg-5"
                      class="border-0">
                    <button type="button" class="close" @click="closeModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <template>
                        <div class="text-muted text-center mb-3">
                            <h6>Informacion del usuario {{ num_documento }}</h6>
                        </div>
                    </template>
                    <template>
                        <div class="text-center text-muted mb-4">
                            <small>Datos de usuario, editar datos requeridos</small>
                        </div>
                        <div class="alert alert-success" role="alert" v-if="send === true">
                            {{messagesTrue}} <i class='bx bxs-wink-smile'></i>.
                        </div>
                        <div class="alert alert-danger" role="alert" v-if="Notsend === true">
                            {{messagesFalse}} 
                            <i class='bx bxs-wink-smile'></i>.
                        </div>
                        <form role="form"  @submit.prevent="validarSubmit" >
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="text-dark" for="tipo_persona">Seleccione Tipo de persona</label>
                                        <div class="input-group input-group-alternative mb-4">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="ni ni-active-40"></i></span>
                                            </div>
                                            <select :class="['form-control form-control-alternative',{'error-input': tipo_personaError}]" :v-model=tipo_persona>
                                                <option value=1>Natural</option>
                                                <option value=2>Juridico</option>
                                            </select>                                             
                                        </div>
                                        <small class="text_error" v-if="errors.tipo_persona">{{ errors.tipo_persona }}</small>
                                    </div>
                                </div>

                                <div class="col-md-6" v-if="tipo_persona">
                                    <div class="form-group">
                                        <label class="text-dark" for="tipo_documento">Seleccione Tipo de documento</label>
                                        <div class="input-group input-group-alternative mb-4">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="ni ni-active-40"></i></span>
                                            </div>                                            
                                            <select :class="['form-control form-control-alternative',{'error-input': tipo_documentoError}]" :v-model=tipo_documento required>
                                                <option value=1>Rif</option>
                                                <option value=2>CI</option>
                                                <option value=3>Pasaporte</option>
                                            </select>                                             
                                        </div>
                                        <small class="text_error" v-if="errors.tipo_documento">{{ errors.tipo_documento }}</small>
                                    </div>
                                </div>
                            </div>


                            <div class="row" v-if="tipo_documento">                                
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <div class="input-group input-group-alternative mb-4">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="ni ni-paper-diploma"></i></span>
                                            </div>
                                            <input v-if="tipo_documento == 1" type="text" :class="['form-control form-control-alternative',{'error-input': numero_DocError}]" id="numero_documento" placeholder="Numero RIF (J000000011)" v-model="num_documento" required>
                                            <input v-if="tipo_documento == 2" type="text" :class="['form-control form-control-alternative',{'error-input': numero_DocError}]" id="numero_documento" placeholder="Numero CI (V12345678)" v-model="num_documento" required>
                                            <input v-if="tipo_documento == 3" type="text" :class="['form-control form-control-alternative',{'error-input': numero_DocError}]" id="numero_documento" placeholder="Numero Pasaporte (FRA12345678)" v-model="num_documento" required>                                            
                                        </div>
                                        <small class="text_error" v-if="errors.num_documento">{{ errors.num_documento }}</small>
                                    </div>
                                </div>
                                
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <div class="input-group input-group-alternative mb-4">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="ni ni-circle-08"></i></span>
                                            </div>
                                            <input v-if="tipo_persona == 1" type="text"  :class="['form-control form-control-alternative',{'error-input': nombreError}]"  id="nombre" placeholder="Nombre completo del usuario" v-model="nombre" required>                                           
                                            <input v-if="tipo_persona == 2" type="text" :class="['form-control form-control-alternative',{'error-input': razonError}]" id="razon_social" placeholder="Razon social o Nombre de la empresa" v-model="razon_social" required>                                            
                                        </div>
                                        <small class="text_error" v-if="errors.nombre && tipo_persona == 1">{{ errors.nombre }}</small>
                                        <small class="text_error" v-if="errors.razon_social && tipo_persona == 2">{{ errors.razon_social }}</small>
                                    </div>
                                </div>
                            </div>


                            <div class="row" v-if="tipo_documento">                                
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="input-group input-group-alternative mb-4">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                                            </div>
                                            <input type="email" :class="['form-control form-control-alternative',{'error-input': correoError}]" id="correo" placeholder="Correo Electronico (giss.doe123@company.org)" v-model="correo" required>                                            
                                        </div>
                                        <small class="text_error" v-if="errors.correo">{{ errors.correo }}</small>
                                    </div>
                                </div>
                            </div>


                            <div class="row" v-if="tipo_documento">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="text-dark" for="fecha_emi">Fecha de emision del documento</label>
                                        <div class="input-group input-group-alternative mb-4">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="ni ni-calendar-grid-58"></i></span>
                                            </div>                                            
                                            <input type="date" :class="['form-control form-control-alternative',{'error-input': fecha_emiError}]" id="fecha_emi" v-model="fecha_emi" required>                                            
                                        </div>
                                        <small class="text_error" v-if="errors.fecha_emi">{{ errors.fecha_emi }}</small>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="text-dark" for="fecha_ven">Fecha de vencimiento del documento</label>
                                        <div class="input-group input-group-alternative mb-4">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="ni ni-calendar-grid-58"></i></span>
                                            </div>                                            
                                            <input type="date" :class="['form-control form-control-alternative',{'error-input': fecha_venError}]" id="fecha_ven" v-model="fecha_ven" required>                                            
                                        </div>
                                        <small class="text_error" v-if="errors.fecha_ven">{{ errors.fecha_ven }}</small>
                                    </div>
                                </div>
                            </div>


                            <div class="row" v-if="tipo_documento">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <div class="input-group input-group-alternative mb-4">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="ni ni-mobile-button"></i></span>
                                            </div>  
                                            <input type="number" :class="['form-control form-control-alternative',{'error-input': tlf_principalError}]" id="tlf_principal" placeholder="Telefono principal (0212-1234567)" v-model="tlf_principal" required>                                            
                                        </div>
                                        <small class="text_error" v-if="errors.tlf_principal">{{ errors.tlf_principal }}</small>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <div class="input-group input-group-alternative mb-4">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="ni ni-mobile-button"></i></span>
                                            </div>  
                                            <input type="number" :class="['form-control form-control-alternative',{'error-input': tlf_secundarioError}]" id="tlf_secundario" placeholder="Telefono secundario (02121234567)" v-model="tlf_secundario">                                            
                                        </div>
                                        <small class="text_error" v-if="errors.tlf_secundario">{{ errors.tlf_secundario }}</small>
                                    </div>
                                </div>
                            </div>
                            
                            <button v-if="!activeload" class="btn btn-successTow btn-lg btn-block btnG">Editar usuario</button>
                            <button class="btn btn-successTow btn-lg btn-block btnG" type="button" disabled v-if="activeload">
                                <span class="spinner-border spinner-border-sm fa fa-spinner" role="status" aria-hidden="true"></span>
                                <span class="sr-only">Loading...</span>
                            </button>
                        </form>
                    </template>
                </card>
            </modal>
        </div>
    </div>
</template>
<script>
    import Modal from "@/components/Modal.vue";
    import ClienteService from "../../../services/ClienteService"
    const clienteService = new ClienteService
    
export default {
    props: {
        idDato: Number,
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
        accionModalData: Function,
    },
    components: {
        Modal
    },
    data() {
        return {
            modals: {
                modal: false,
            },
            messagesTrue: "",
            messagesFalse: "",
            send: false,
            Notsend: false,
            activ: false,
            errors: {},
            activeload: false,

            numInput: 1,
            inputValues: [],

            nombreError: null,
            razonError: null,
            correoError: null,
            tipo_documentoError: null,
            tipo_personaError: null,
            numero_DocError: null,
            fecha_emiError: null,
            fecha_venError: null,
            tlf_principalError: null,
            tlf_secundarioError: null,
            editData:null
        };
    },
    created() {
    },
    methods: {
        closeModal() {
            this.send = false            
            this.modals.modal = false
            this.$emit('modal-closed', this.newData);
            this.accionModalData(this.newData);
        },
        validarForm() { // Metodo para validar cada campo
            this.activeload = true
            this.refrechError();
            const errors = {};
            const email = /^[\w-.]+@([\w-]+.)[a-zA-Z]{2,}$/
            const rif = /^(J|P|G)\d{8}\d{1}$/
            const ci = /^([VE]){1}(\d{7,8})$/
            const pass = /^[A-Z]{2,4}\d{7,9}$/
            const tlf = /^0(\d{3})(\d{7})$/

            if (!this.tipo_persona) {
                errors.tipo_persona = 'El campo tipo de persona es requerido';
                this.tipo_personaError = errors.tipo_persona
            }
            if (!this.tipo_documento) {
                errors.tipo_documento = 'El campo tipo de documento es requerido';
                this.tipo_documentoError = errors.tipo_documento
            }

            if (!this.num_documento) {
                errors.num_documento = "El capo numero de docuemnto es requerido"
                this.numero_DocError = errors.num_documento
            }

            if (this.tipo_persona == 2 && this.tipo_documento != 1) {
                errors.tipo_documento = "El tipo de documento no pertenece a persona juridica, debe ser RIF"
                this.tipo_documentoError = errors.tipo_documento
            }

            if (this.tipo_documento == 1 && !rif.test(this.num_documento)) {
                errors.num_documento = "El dato ingesado no pertenecea un rif juridico, (No utilice simbolos(- .) J000000011)"
                this.numero_DocError = errors.num_documento
            }

            if (this.tipo_documento == 2 && !ci.test(this.num_documento)) {
                errors.num_documento = "El numero de identidad no es correcto (No utilice simbolos(- .) V12345678)"
                this.numero_DocError = errors.num_documento
            }

            if (this.tipo_documento == 3 && !pass.test(this.num_documento)) {
                errors.num_documento = "El dato ingesado no pertenece a un dato de pasaporte correcto, (No utilice simbolos(- .) FRA12345678)"
                this.numero_DocError = errors.num_documento
            }

            if (this.tipo_persona === 1) {
                if (!this.nombre || this.nombre.length < 3) {
                    errors.nombre = 'El nombre es requerido y debe tener al menos 3 caracteres.';
                    this.nombreError = errors.nombre;
                }
            }

            if (this.tipo_persona === 2) {
                if (!this.razon_social || this.razon_social.length < 3) {
                    errors.razon_social = 'El razon social es requerido y debe tener al menos 3 caracteres.';
                    this.razonError = errors.razon_social;
                }
            }

            if (!email.test(this.correo)) {
                errors.correo = "Ingrese correo valido"
                this.correoError = errors.correo
            }

            if (!this.correo) {
                errors.correo = "El campo Correo es requerido"
                this.correoError = errors.correo
            }

            if (!this.fecha_emi) {
                errors.fecha_emi = "El campo fecha emision es requerido"
                this.fecha_emiError = errors.fecha_emi
            }

            if (!this.fecha_ven) {
                errors.fecha_ven = "El campo fecha vencimiento es requerido"
                this.fecha_venError = errors.fecha_ven
            }

            if (!tlf.test(this.tlf_principal)) {
                errors.tlf_principal = "El campo telefono principal es requerido, el numero numero tlf no valido"
                this.tlf_principalError = errors.tlf_principal
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
                }, 2000);
                this.activeload = false
                console.error('Formulario inválido, revise los errores.');

            } else {
                this.Notsend = false
                const data = {
                    usuario: {
                        nombre: this.nombre,
                        razon_social: this.razon_social,
                        correo: this.correo,
                        telefono_principal: this.tlf_principal,
                        telefono_secundario: this.tlf_secundario,
                        numero_documento: this.num_documento,
                        fecha_emicion_doc: this.fecha_emi,
                        fecha_vencimiento_doc: this.fecha_ven,
                        tipo_usuario_id: this.tipo_persona,
                        tipo_documento_id: this.tipo_documento
                    }
                }
                this.editar(data)
            }
        },

        editar(data) {
            this.activeload = true                
            var datos=JSON.stringify(data)
            const editar = clienteService.putCliente(this.idDato, datos);
            editar.then(data => {                                 
                if(data.status == 200){
                    this.send = true,
                    this.messagesTrue = data.messages 
                    this.editData = data
                    setTimeout(() => {
                        this.send = false
                        this.refrechTotalData()                        
                    }, 3000);
                    
                }
                else{
                    this.Notsend = true,
                    this.messagesFalse = data.messages
                    this.activeload = false
                    setTimeout(() => {
                        this.Notsend = false
                    }, 3000); 
                }
            })
            editar.catch((err)=>{
                return err
            })          
        },

        refrechError() {
            this.nombreError = null
            this.razonError = null
            this.correoError = null
            this.tipo_documentoError = null
            this.tipo_personaError = null
            this.numero_DocError = null
            this.fecha_emiError = null
            this.fecha_venError = null
            this.tlf_principalError = null
            this.tlf_secundarioError = null
        },
        refrechTotalData() {
            this.refrechError()
            this.id = null
            this.closeModal()
        }

    },
};
</script>
<style>
</style>
