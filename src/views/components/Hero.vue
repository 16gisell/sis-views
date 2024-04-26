<template>
    <section class="section-hero section-shaped my-0">
        <div class="shape shape-style-1 bg-gradient-defaulto">
            <span class="span-150"></span>
            <span class="span-50"></span>
            <span class="span-50"></span>
            <span class="span-75"></span>
            <span class="span-100"></span>
            <span class="span-75"></span>
            <span class="span-50"></span>
            <span class="span-100"></span>
            <span class="span-50"></span>
            <span class="span-100"></span>
        </div>       
        <div class="container shape-container d-flex align-items-center">
            <div class="col px-0">
                <div class="row justify-content-center align-items-center">
                    <div class="col-lg-12 text-center pt-lg">
                        <!-- <img src="img/brand/m1.png" style="width: 300px;" class="img-fluid"> -->
                        <div class="carga"></div>
                        <h2 class="text-white mt-4 mb-5">Sisco Bank C.A.</h2>
                        <h3 style="font-family: initial; font-weight: bold;">Gestion de informacion de nuestros usuarios</h3>   

                        <div class="">
                            <button class="btn btn-successTow btn-lg btn-block btnG" @click="comprobar">Registrar</button>
                        </div>                          
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import UserService from "../../services/UserService";

    const userService = new UserService();

    export default {
        components: {  },
        data() {
            return { 
                UserLogtoken:"",
                totalDiponible:0,
                claseActiva:false,
                clasePreocupa:false,
                spiner: true
            };
        },
        created(){   
        },
    methods: {
        comprobar() {
            this.getUser()
        },
            getUser(){
                const user = userService.getCurrenUser()
                const UserLogtoken = userService.getToken();
                if(user === null && UserLogtoken === null){
                    this.$router.push('/login')
                }else{
                    this.$router.push('/consultar')
                }                
            },
            get_Users(){
                this.UserLogtoken = userService.getToken();
            },
        }
    };
</script>
<style>

.carga {
  width: 40px;
  height: 60px;
  position: relative;
  left: 31rem;
  right: 31rem;
}
.carga::before,
.carga::after {
  content: "";
  position: absolute;
  inset: 0;
  background: #566379;
  clip-path: polygon(0 0,100% 0, 100% 67%,50% 67%,50% 34%,0 34%);
  animation: sp7 5s infinite;
  border-color: #eff900;
    border-width: 2px;
    border-style: dashed;
}
.carga::after {
  --s:-1,-1;
}
@keyframes sp7 {
    0%,
    10%  {transform:scale(var(--s,1)) translate(0,0)        rotate(0deg)}
    33%  {transform:scale(var(--s,1)) translate(0,-20px)    rotate(0deg)}
    66%  {transform:scale(var(--s,1)) translate(10px,-20px) rotate(-90deg)}
    90%,
    100% {transform:scale(var(--s,1)) translate(10px,-10px) rotate(-90deg)}
}
@media (max-width: 1250px) {
  .carga{
    left: 10rem;
    right: 10rem;
  }
}

.bg-gradient-defaulto{
    background: linear-gradient(87deg, #7d8189 0, #cdb92e 100%) !important;
}
</style>