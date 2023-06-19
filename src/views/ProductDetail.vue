<template>
    <div class="product-container" v-if="arrayProducts">  
        <router-link to="/"><ion-icon class="back-button" name="arrow-back-circle"></ion-icon></router-link>
        <div class="image-details-container">
            <img class="image-details" :src="arrayProducts.image" alt="">
        </div>
        <div class="details-container">
            <div class="details-letters-container">
                <h1 class="detail-title">{{arrayProducts.title}}</h1>
                <br>
                <h2>${{ arrayProducts.price }}</h2>
                <br>
                <p>{{ arrayProducts.description }}</p>
            </div>
            <div class="cart-button-container">
                <button class="add-to-cart" @click="addToCart(arrayProducts)">
                    <ion-icon @click="removeFromCart(product)" class="add-to-cart-icon" name="cart"></ion-icon>
                    Añadir al carrito
                </button>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref } from "vue";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const arrayProducts = ref([]);
    const cart = ref([]);

    const fetchProducts = () => {
      const productId = router.currentRoute.value.params.id;
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => res.json())
        .then(json => {
          arrayProducts.value = json;
          console.log(arrayProducts.value);
        });
    };

    const addToCart = async (product) => {
      if (!product) {
        console.log("El producto es inválido");
        return;
      }

    const { id, title, price, image } = product;
    console.log("Valores de los campos:", id, title, price, image);

      if (!id || !title || !price || !image) {
        console.log("El producto no tine los campos necesarios");
        return;
      }

      const productData = { id, title, price, image };

      try {
        const db = getFirestore();
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userDoc = doc(db, "users", user.email);

          await updateDoc(userDoc, {
            cart: arrayUnion(productData)
          });
          alert('Producto Agregado al carrito');
          console.log("Producto agregado al carrito en la base de datos");
          // Opcional: Mostrar una notificación o mensaje de éxito
        } else {
          console.log("El usuario no ha iniciado sesión");
          alert("Para añadir productos al carrito, debes iniciar sesión");
          router.push('/login');
        }
      } catch (error) {
        console.log("Error al agregar el producto al carrito en la base de datos:", error);
        // Opcional: Mostrar una notificación o mensaje de error
      }
    };

    fetchProducts();
    cart.value = JSON.parse(localStorage.getItem('cart')) || [];

    return {
      arrayProducts,
      cart,
      addToCart
    };
  }
}
</script>


<style>
.back-button{
    color: black;
    position: absolute;
    font-size: 40px;
    left: 30px;
    top: 110px;
}
.add-to-cart-icon{
    font-size: 30px;
    color: #6ac3a8;
    text-align: left;
    margin-right: 10px;
}
.details-letters-container{
    height: 50%;
}
.details-container div p{
    font-size: 20px;
}
.detail-title{
    font-size: 25px !important;
}
.details-container div h2{
    font-size: 20px;
}
.cart-button-container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
}
.add-to-cart{
    width: 300px;
    height: 50px;
    border: none;
    border-radius: 8px;
    text-align: center;
    font-size: 18px;
    align-items: center;
    justify-content: center;
    display: flex;
    margin-top: 30px;
}
.product-container{
    display: flex;
    width: 100%;
    height: 100%;
    padding: 50px;
    background-color: silver;
}
.image-details-container{
    width: 50%;
    margin-right: 50px;
}
.image-details{
    width: 40vw;
    height: 82vh;
}
.details-container{
    text-align: justify;
    height: fit-content;
    padding: 50px;
    display: flex;
    flex-direction: column;
}
@media(max-width:900px){
    .product-container{
        flex-direction: column;
    }
    .image-details-container{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .image-details{
        height: 40vh;
    }
    .details-letters-container{
        align-items: center;
        justify-content: start;
    }
}
@media(max-width:590px){
    .image-details{
        height: 25vh;
    }
}
</style>
  