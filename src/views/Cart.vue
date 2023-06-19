<template>
    <div class="cart-body-container">
      <div class="left-cart-container">
        <h1>Tu carrito</h1>
        <div class="card-cart" v-for="product in cart" :key="product.id">
          <div class="image-cart-container">
            <img class="img-card-cart" :src="product.image" alt="" />
          </div>
          <div class="details-cart-card">
            <h2>{{ product.title }}</h2>
            <p>Precio: ${{ product.price }}</p>
            <ion-icon class="delete-product-cart" @click="removeFromCart(product)" name="trash-outline"></ion-icon>
          </div>
        </div>
      </div>
      <div class="right-cart-container">
        <h2 style="text-transform: uppercase;">Resumen del pedido:</h2>
        <h3>Subtotal: ${{ subtotal.toFixed(2) }}</h3>
        <h3>Iva: ${{ iva.toFixed(2) }}</h3>
        <h2 class="total-cart">Total: ${{ total.toFixed(2) }}</h2>
        <div class="buy-cart-container">
          <stripe-checkout
          ref="checkoutRef"
          mode="subscription"
          :pk="publishablekey"
          :line-items="lineItems"
          :success-url="succesURL"
          :cancel-url="cancelURL"
          @loading="v =>loading = v"
          />
          <button @click="submit">Realizar pedido</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from "vue";
  import { getFirestore, doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
  import { getAuth } from "firebase/auth";
  import { StripeCheckout } from "@vue-stripe/vue-stripe";
  
  export default {
    components:{
      StripeCheckout
    },
    data(){
      this.publishablekey = 'pk_test_51NKVnIAYxoiNRRAdob7Ajb6fFWEBZ5TisphCMZEz6K1ogcTFKpnhJIJvJHqyhOCC5t3GqjQJIMZSbfSxKZtnQdKM007NIeoFve'
      return{
        loading: false,
        lineItems:[
          {
            price:'price_1NKWIqAYxoiNRRAdUqMZsKnu',
            quantity:1
          }
        ],
        succesURL:'http://localhost:5173/success',
        cancelURL:'http://localhost:5173/cancel',
      }
    },
    methods:{
      submit(){
        //stripe checkout page
        this.$refs.checkoutRef.redirectToCheckout();
      }
    },
    setup() {
      const cart = ref([]);
      const subtotal = computed(() => {
        return cart.value.reduce((total, product) => total + product.price, 0);
      });
      const iva = computed(() => {
        return subtotal.value * 0.16; // Suponiendo un IVA del 16%
      });
      const total = computed(() => {
        return subtotal.value + iva.value;
      });
  
      onMounted(async () => {
        const auth = getAuth();
        const user = auth.currentUser;
  
        if (user) {
          try {
            const db = getFirestore();
            const userDoc = doc(db, "users", user.email);
            const userSnapshot = await getDoc(userDoc);
  
            if (userSnapshot.exists()) {
              const userData = userSnapshot.data();
              cart.value = userData.cart || [];
            } else {
              console.log("No se encontró el documento del usuario");
            }
          } catch (error) {
            console.log("Error al obtener los datos del carrito:", error);
          }
        } else {
          console.log("El usuario no ha iniciado sesión");
        }
      });
  
      const removeFromCart = async (product) => {
        try {
          const auth = getAuth();
          const user = auth.currentUser;
  
          if (user) {
            const db = getFirestore();
            const userDoc = doc(db, "users", user.email);
  
            await updateDoc(userDoc, {
              cart: arrayRemove(product),
            });
  
            cart.value = cart.value.filter((p) => p.id !== product.id);
            console.log("Producto eliminado del carrito en la base de datos");
          } else {
            console.log("El usuario no ha iniciado sesión");
          }
        } catch (error) {
          console.log("Error al eliminar el producto del carrito en la base de datos:", error);
        }
      };

      return {
        cart,
        subtotal,
        iva,
        total,
        removeFromCart,
      };
    },
  };
  </script>
  

<style>
.delete-product-cart{
    font-size: 40px;
    background-color: rgb(229, 96, 96);
    border-radius: 40px;
    padding: 10px;
    cursor: pointer;
    align-self: center;
}
.total-cart{
    margin-top: 20px;
    background-color: #c6ede1;
    width: fit-content;
    padding: 10px 10px 10px 10px;
    border-radius: 5px;
}
.cart-body-container{
    display: flex;
    padding: 40px;
}
.left-cart-container{
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.right-cart-container{
    padding: 50px 0px 50px 50px;
    width: 50%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.right-cart-container h2{
    font-size: 20px;
}
.right-cart-container h3{
    font-size: 16px;
}
.buy-cart-container{
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
}
.buy-cart-container button{
    font-size: 20px;
    text-transform: uppercase;
    border: none;
    height: 50px;
    width: 60%;
    border-radius: 10px;
    background-color: #757575;
}
.card-cart{
    background-color: #e9e9e9;
    border-radius: 10px;
    width: 100%;
    height: fit-content;
    padding: 5px;
    margin-bottom: 30px;
    display: flex;
}
.image-cart-container{
    width: 40%;
    padding: 20px;
    display: flex;
    justify-content: center;
    height: 100%;
}
.details-cart-card{
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
}
.card-cart h2{
    font-size: 20px;
}
.card-cart p{
    font-size: 18px;
}
.img-card-cart{
    width: 100%;
    height: 100%;
}

</style>
  