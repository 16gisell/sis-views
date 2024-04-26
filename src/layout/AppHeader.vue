<template>
    <header class="header-global">
        <base-nav class="navbar-main" transparent type="" effect="light" expand>
            <router-link slot="brand" class="navbar-brand mr-lg-5" to="#/inicio">
              <div class="load"></div> 
            </router-link>
  
            <div class="row" slot="content-header" slot-scope="{closeMenu}">
                <div class="col-6 collapse-brand">
                  Sisco Banck C.A
                </div>
                <div class="col-6 collapse-close">
                    <close-button @click="closeMenu"></close-button>
                </div>
            </div>
            <ul class="navbar-nav align-items-lg-center ml-lg-2" slot="brand">
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="#/" rel="noopener">
                        <span class="nav-link-inner--text">Sisco Banck C.A</span>
                    </a>
                </li>
            </ul>
            <ul class="navbar-nav align-items-lg-center ml-lg-auto">
              <a slot="title" href="#/" class="nav-link" data-toggle="dropdown" role="button">
                    <i class="ni ni-ui-04 d-lg-none"></i>
                    <span class="nav-link-inner--text">Inicio</span>
                </a>
                <a slot="title" href="#/consultar" class="nav-link" data-toggle="dropdown" role="button">
                    <i class="ni ni-collection d-lg-none"></i>
                    <span class="nav-link-inner--text">Consultar</span>
                </a>
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" rel="noopener" 
                        data-toggle="tooltip" title="Like us on Facebook">
                        <span class="nav-link-inner--text" @click="logout()">Salir</span>
                    </a>
                </li>
            </ul>
        </base-nav>
    </header>
  </template>
  <script>
    import BaseNav from "@/components/BaseNav";
    import BaseDropdown from "@/components/BaseDropdown";
    import CloseButton from "@/components/CloseButton";
    import UserService from "../services/UserService";
    const userService = new UserService();
  
    export default {
        components: {
            BaseNav,
            CloseButton,
            BaseDropdown
          },
        data() {
            return { 
                mostrar:true
            };
        },
        created(){     
        },
      methods: {
            logout(){
                const UserLog = userService.Salir();
                  UserLog.then(res => {
                    if(res === null){
                        this.$router.push('/login')
                    } 
                })         
            }
        }
    };
  </script>
  