<script>
import Home from '../src/views/Home.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import router from './router';

export default {
  components: {
    Home,
  },
  setup(){
    const isLoggedIn = ref(false);
    const auth = getAuth();

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        isLoggedIn.value = !!user;
      });
    });

    const acceptTerms = () => {
      const modal = document.getElementById('staticBackdrop');
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
    };

    const handleSignOut = () => {
      const confirmed = window.confirm('¿Estás seguro de que deseas cerrar sesión?');

      if (confirmed) {
        signOut(auth)
          .then(() => {
            router.push("/");
          })
      }
    };

    const searchProducts = ()=> {
      this.$emit('search', this.searchQuery);
    };

    return {
      isLoggedIn,
      acceptTerms,
      handleSignOut,
      searchProducts,
    };
  },
};
</script>

<template>
  <div>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" tabindex="-1"  aria-hidden="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Términos y Condiciones</h1>
          </div>
          <div class="modal-body">
            <p>1. Los productos mostrados en esta tienda online son proporcionados por la API de FakeStore y tienen fines ilustrativos y de demostración. No se realiza ninguna transacción de compra real.</p>
            <p>2. La información de los productos, incluyendo precios, descripciones y disponibilidad, puede variar y no representa necesariamente la información actualizada.</p>
            <p>3. No nos hacemos responsables por la exactitud de la información proporcionada por la API de FakeStore.</p>
            <p>4. Cualquier información personal que se solicite en esta tienda online, como nombres, direcciones y detalles de pago, es utilizada únicamente con fines demostrativos y no se almacena ni se utiliza para transacciones reales.</p>
            <p>5. Esta tienda online no se hace responsable por cualquier pérdida, daño o inconveniente causado por el uso de la API de FakeStore o cualquier otro servicio relacionado.</p>
            <p>6. Al utilizar esta tienda online, aceptas estos términos y condiciones en su totalidad.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Entendido</button>
          </div>
        </div>
      </div>
    </div>
    <div class="sticky">
      <Navbar @search="searchProducts"></Navbar>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">FakeStore</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <button class="logout" v-if="isLoggedIn" @click="handleSignOut"><ion-icon name="log-out" class="icons-navbar"></ion-icon>Cerrar sesión</button>
                <router-link
                  v-else
                  to="/login"
                  class="router"
                  :class="{'active-button': $route.path === '/login' || $route.path === '/register' }"
                >
                  <ion-icon class="icons-navbar" name="person-circle-outline"></ion-icon>Iniciar sesión
                </router-link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <ion-icon class="icons-navbar" name="share-social-sharp"></ion-icon>Ayuda
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="https://www.instagram.com"><ion-icon name="logo-instagram"></ion-icon>Instagram</a></li>
                  <li><a class="dropdown-item" href="https://www.facebook.com"><ion-icon name="logo-facebook"></ion-icon>Facebook</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-dismiss="modal" data-bs-target="#staticBackdrop">
                      Términos y condiciones
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
            <form role="search" class="d-flex" @submit.prevent="searchProducts">
              <input v-model="searchQuery" class="form-control me-2 primary" type="search" placeholder="Search" aria-label="Search">
            </form>
            <router-link to="/cart" class="cart"><ion-icon name="cart" class="cart-icon"></ion-icon></router-link>
          </div>
        </div>
      </nav>
      <!-- <div>
        <router-link to="/register">REgistro</router-link>
      </div> -->
    </div>
    <router-view @loginSuccess="isLoggedIn = true" class="router"></router-view>
  </div>
</template>

<style scoped>
.cart{
  background-color: transparent !important;
  color: black;
}
.cart-icon{
  border-radius: 30px;
  margin: 0px 10px 0px 10px;
  padding: 10px;
  font-size: 30px;
  cursor: pointer;
}
.logout{
  background-color: transparent;
  border: none;
  color: #575757;
  margin-right: 30px;
}
  .active-button {
    /* Estilos del botón cuando está activo */
    background-color: #c6ede1;
  }
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.modal{
        z-index: 100000 !important;
    }
    #advertisement-container{
        width: 100%;
        height: auto;
        background-color: #eceff1 !important;
    }
    img{
        filter: brightness(1.1) !important;
        mix-blend-mode: multiply !important;
        width: 100%;
        height: 350px;
    }
    nav{
        width: 100% !important;
    }
    .sticky{
        height: fit-content !important;
        position: sticky;
        top: 0;
        width: 100% !important;
        z-index: 10000 !important;
    }
    .icons-navbar{
        font-size: 24px;
        margin-right: 5px;
        color: #323232;
        /* position: absolute;
        top: 23px;
        left: 190px; */
    }
    form{
        width: 50%;
    }
    form input{
        width: 100% !important;
    }
    .navbar-brand{
        font-size: 30px !important;
        font-weight: 600 !important;
        margin-right: 70px !important;
    }
    a{
        padding: 10px !important;
        border-radius: 10px;
    }
    a:hover{
      background-color: #c6ede1;
    }
    li a{
      margin-right: 20px;
        padding: 10px !important;
        display: flex !important;
        border-radius: 10px;
        align-items: center;
    }
    li a:hover{
      background-color: #c6ede1;
    }
    li .router{
      color: #575757;
      font-weight: 400;
      text-decoration: none;
      padding: 10px !important;
      display: flex !important;
      border-radius: 10px;
      align-items: center;
    }
    li .router:hover{
      color: #323232;
    }
    li button{
        padding: 10px !important;
        display: flex !important;
        width: 100%;
        align-items: center;
        border-radius: 10px;
    }
    li button:hover{
        background-color: #c6ede1 !important;
    }
    li{
        width: auto;
    }
    nav{
        height: auto;
        width: 100vw;
    }
    @media(max-width: 990px){
        form{
            width: 100%;
        }
        form input{
            width: 100% !important;
            margin-bottom: 8px;
        }
        img{
            height: 250px;
            transition: 1s;
        }
        .icons-navbar{
            font-size: 24px;
        }
        li{
            margin-top: 10px;
        }
        li a{
            padding: 10px !important;
        }
    }
    @media(max-width: 750px){
        img{
            height: 150px;
            transition: 1s;
        }
    }
    @media(max-width: 450px){
        img{
            height: 100px;
            transition: 1s;
        }
    }
    @media(max-width: 325px){
        img{
            height: 50px;
            transition: 1s;
        }
    }
</style>
