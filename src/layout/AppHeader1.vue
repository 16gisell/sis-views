<template>
    <header class="header-global">
        <base-nav class="navbar-main" transparent type="" effect="light" expand>
            <router-link slot="brand" class="navbar-brand mr-lg-5" to="#/">
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
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="#/login" rel="noopener"
                       data-toggle="tooltip" title="Like us on Facebook">
                        <!-- <i class="fa fa-facebook-square"></i> -->
                        <span class="nav-link-inner--text">Login</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="#/registrar" rel="noopener"
                       data-toggle="tooltip" title="Like us on Facebook">
                        <!-- <i class="fa fa-facebook-square"></i> -->
                        <span class="nav-link-inner--text">Registrar</span>
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

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
    },
};
</script>
<style>
.load {
  width: 30px;
  height: 50px;
  position: relative;
}
.load::before,
.load::after {
  content: "";
  position: absolute;
  inset: 0;
  background: #566379;
  clip-path: polygon(0 0,100% 0, 100% 67%,50% 67%,50% 34%,0 34%);
  animation: sp8 5s infinite;
  border-color: #eff900;
    border-width: 2px;
    border-style: dashed;
}
.load::after {
  --s:-1,-1;
}
@keyframes sp8 {
    0%,
    10%  {transform:scale(var(--s,1)) translate(0,0)        rotate(0deg)}
    33%  {transform:scale(var(--s,1)) translate(0,-20px)    rotate(0deg)}
    66%  {transform:scale(var(--s,1)) translate(10px,-20px) rotate(-90deg)}
    90%,
    100% {transform:scale(var(--s,1)) translate(10px,-10px) rotate(-90deg)}
}
</style>
