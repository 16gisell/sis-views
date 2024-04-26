<template>
    <section class="section section-shaped section-lg my-0">
       <Estilos />
        <div v-if="spiner" body-classes="p-0" modal-classes="modal-dialog-centered modal-sm" class="spase">
            <div class="loader"></div> 
        </div>
        <h1 class="display-3  text-white"></h1>
           
        <div class="mb-3 modelo_table">
            <div class="col-lg-12 text-center">
                <form>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <div class="input-group input-group-alternative mb-4">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"></span>
                                </div>
                                <input class="form-control form-control-alternative" placeholder="Filtar" type="text" v-model="filter">
                                <div class="input-group-prepend">
                                    <button  class="form-control form-control-alternative btn btn-successTow" @click="buscar"><i class="ni ni-zoom-split-in"></i></button>
                                </div>
                                
                                </div>
                            </div>
                        </div>
                        <div class="col-md-7">
                            
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <Modals :accionModalData="accionModalData"></Modals>
                            </div>
                        </div>
                    </div>
                </form>   
                <div class="alert alert-success" role="alert" v-if="send === true">
                    {{messagesTrue}} <i class='bx bxs-wink-smile'></i>.
                </div>
                <div class="alert alert-danger" role="alert" v-if="Notsend === true">
                    {{messagesFalse}} 
                    <i class='bx bxs-wink-smile'></i>.
                </div>
                <table class="table table_data">
                    <thead class="head_table">
                        <tr>
                            <th>Tipo Persona</th>
                            <th>Numero documentoe</th>
                            <th>Correo</th>
                            <th>Nombre</th>
                            <th>Razon social</th>
                            <th>Telefono</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in table_data" :key="item.id">
                            <td class="text-center">{{ nametipoP(item.tipo_usuario_id) }}</td>
                            <td class="text-center">{{ item.numero_documento }}</td>
                            <td>{{ item.correo }}</td>
                            <td>{{ item.nombre }}</td>
                            <td>{{ item.razon_social }}</td>
                            <td>{{ item.telefono_principal }}</td>
                            <td class="td-actions text-right">
                                <ModalsComent :idDato="item.id"
                                :tipo_documento="item.tipo_documento_id"
                                :tipo_persona="item.tipo_usuario_id"
                                :nombre="item.nombre"
                                :correo="item.correo"
                                :num_documento="item.numero_documento"
                                :fecha_emi="item.fecha_emicion_doc"
                                :fecha_ven="item.fecha_vencimiento_doc"
                                :tlf_secundario="item.telefono_secundario" 
                                :tlf_principal="item.telefono_principal"
                                :razon_social="item.razon_social" 
                                :accionModalData="accionModalData"
                                ></ModalsComent>

                                <ModalInformativa 
                                :tipo_documento="item.tipo_documento_id"
                                :tipo_persona="item.tipo_usuario_id"
                                :nombre="item.nombre"
                                :correo="item.correo"
                                :num_documento="item.numero_documento"
                                :fecha_emi="item.fecha_emicion_doc"
                                :fecha_ven="item.fecha_vencimiento_doc"
                                :tlf_secundario="item.telefono_secundario" 
                                :tlf_principal="item.telefono_principal"
                                :razon_social="item.razon_social"></ModalInformativa>
                                
                                <button type="button" rel="tooltip" class="btn btn-danger btn-icon btn-sm m-2" data-original-title="" title="Eliminar usuario"  @click="eliminar(item.id )">
                                    <i class="ni ni-fat-remove pt-1"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>   
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-end">
                        <li class="page-item">
                        <a class="page-link" href="#"  @click="previus">
                            <i class="fa fa-angle-left"></i>
                            <span class="sr-only">Previous</span>
                        </a>
                        </li>
                        <li class="page-item active"><a class="page-link" href="#">{{ page }}</a></li>
                        <li class="page-item">
                        <a class="page-link" href="#" @click="next">
                            <i class="fa fa-angle-right"></i>
                            <span class="sr-only">Next</span>
                        </a>
                        </li>
                        <li class="page-item">
                            <select class="select_page" v-model="perPage" @change="listado">
                                <option value="5">5</option>
                                <option>10</option>
                                <option>15</option>
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                            </select>                        
                        </li>
                    </ul>
                    <p class="pagination justify-content-end"> <strong>Total page:  </strong>  {{ totalPage }}</p>
                    
                </nav>        
            </div>               
        </div>
    </section>
    
</template>
<script>
    import Estilos from "./components/Estilos.vue"
    import Modals from "./components/JavascriptComponents/Modals.vue"
    import ModalsComent from "./components/JavascriptComponents/ModalsComent.vue"
    import ModalInformativa from "./components/JavascriptComponents/ModalInformativa.vue"
    import UserService from "../services/UserService";
    const userService = new UserService();
    
    import ClienteService from "../services/ClienteService"
    const clienteService = new ClienteService

    export default {
        components: {  
            Modals,
            ModalsComent,
            ModalInformativa,
            Estilos
        },
        data() {
            return { 
                messagesTrue: "",
                messagesFalse: "",
                send: false,
                Notsend: false,
                spiner: true,

                activ: false,
                page: 1,
                perPage: 5,
                totalPage:0,
                filter: "",
                table_data: null,
                rango: false,
            };
    },
    mounted() {
        this.get_data(); // Llamada al servicio
    },

    created() { 
        
            this.getUser()
             
            this.listado()   
        },
    methods: {
        getUser(){
            const user = userService.getCurrenUser()
            const UserLog = userService.getToken();
                if(user === null && UserLog === null){
                    this.$router.push('/login')
                } else {
                    this.get_data()  
                    return user
                }                
            },
            //metodos de paginacion
            previus() {
                this.page < 1 ? this.page = 1 : this.page = this.page - 1
                this.get_data()
            },

            next() {
                this.page = this.page + 1
                this.get_data()
            },

            // //genera la data para la tabla
           get_data() {
                // this.table_data = []
                this.spiner = false
                clienteService.getClientes(this.page, this.perPage, this.filter).then((res) => {
                    try {
                        this.table_data = res.data.result.sort((a, b) => b.value - a.value)
                        this.totalPage = res.data.pagination.total
                        this.spiner = false
                    } catch (error) {
                        console.log(error)
                    }
                })
            }, 

            // //accion del buscador
            buscar() {
                this.table_data = []
                this.page = 1
                this.spiner = true
                this.get_data()
            },

            //lista filtrado de paginas
            listado() {
                this.get_data()
            },

            eliminar(id) {
                this.spiner = false
                clienteService.deleteCliente(id).then((res) => {
                    try {
                        if (res.status === 200) {
                            this.send = true
                            this.messagesTrue = res.messages
                            setTimeout(() => {
                                this.send = false
                            }, 3000);
                            this.get_data()
                        } else {
                            this.Notsend = true
                            this.messagesFalse = res.messages
                            setTimeout(() => {
                                this.Notsend = false
                            }, 3000);
                        }
                        
                    } catch (error) {
                        console.log(error)
                    }
                })
            },
            accionModalData(editData) {
                console.log(editData)
                this.get_data()
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
.modelo_table{
    background: #9e9e9e8a;
    padding: 20px;
    border-radius: 20px;
    color: white;
}
.table_data{
    background: #535655 !important;
    border-radius: 20px !important;
}
.select_page{
    margin: 6px;
    color: #787a7a;
    border-radius: 10px;
    border: none;
}

.head_table{
    background: white;
    color: black;
}

.spase{
    background: #a1a6a694;
    z-index: 22;
    width: 100vw;
    height: 120vh;
    position: absolute;
}

.page-item.active .page-link {
    background-color: #289467 !important;
    border-color: #289467 !important;
}

/* HTML: <div class="loader"></div> */
.loader {
    z-index: 30;
    width: auto;
    aspect-ratio: 1.154;
    clip-path: polygon(50% 0,100% 100%,0 100%);
    --c:no-repeat linear-gradient(#23004f80 0 0);
    background: var(--c),var(--c),var(--c),var(--c),var(--c);
    background-size: 100% calc(100%/5 + 1px);
    animation: l15 5s infinite;
}
@keyframes l15 {
  0%  {background-position: 0 calc(-2*100%/4),0 calc(-2*100%/4),0 calc(-2*100%/4),0 calc(-2*100%/4),0 calc(-2*100%/4)}
  20% {background-position: 0 calc(4*100%/4) ,0 calc(-2*100%/4),0 calc(-2*100%/4),0 calc(-2*100%/4),0 calc(-2*100%/4)}
  40% {background-position: 0 calc(4*100%/4) ,0 calc(3*100%/4) ,0 calc(-2*100%/4),0 calc(-2*100%/4),0 calc(-2*100%/4)}
  60% {background-position: 0 calc(4*100%/4) ,0 calc(3*100%/4) ,0 calc(2*100%/4) ,0 calc(-2*100%/4),0 calc(-2*100%/4)}
  80% {background-position: 0 calc(4*100%/4) ,0 calc(3*100%/4) ,0 calc(2*100%/4) ,0 calc(1*100%/4) ,0 calc(-2*100%/4)}
  100%{background-position: 0 calc(4*100%/4) ,0 calc(3*100%/4) ,0 calc(2*100%/4) ,0 calc(1*100%/4) ,0 calc(0*100%/4)}
}
</style>