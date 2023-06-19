<template>
    <div>
      <div id="advertisement-container">
        <img src="../assets/anounce.png" alt="">
      </div>
      <div id="products-container">
        <router-link
          v-for="product in filteredProducts"
          :key="product.id"
          :to="{
            name: 'ProductDetails',
            params: { id: product.id },
          }"
          class="card"
          @click="selectProduct(product.id)"
        >
          <div class="image-container">
            <div class="stars-container">
              <ion-icon v-for="index in 5" :key="index" :name="getStarIcon(product.rating.rate, index)" class="star"></ion-icon>
            </div>
            <h3 class="product-price">${{ product.price }}</h3>
            <img :src="product.image" class="card-img-top" alt="...">
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
          </div>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted, watch } from 'vue';
  import ProductDetail from '../views/ProductDetail.vue';
  
  export default {
    props: {
      searchQuery: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        arrayProducts: [],
        selectedProductId: null,
      };
    },
    computed: {
      product() {
        if (this.arrayProducts && this.arrayProducts.length > 0) {
          return this.arrayProducts.find(product => product.id === this.selectedProductId);
        }
        return null;
      },
      filteredProducts() {
        return this.arrayProducts.filter(product =>
          product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      getStarIcon(rating, index) {
        if (index <= rating) {
          return 'star';
        } else {
          return 'star-outline';
        }
      },
      fetchProducts() {
        fetch('https://fakestoreapi.com/products')
          .then(res => res.json())
          .then(json => {
            this.arrayProducts = json;
            console.log(this.arrayProducts);
          });
      },
      selectProduct(productId) {
        this.selectedProductId = productId;
      },
    },
    mounted() {
      this.fetchProducts();
    },
    watch: {
      searchQuery() {
        this.filteredProducts();
      },
    },
    components: {
      ProductDetail,
    },
  };
  </script>
  

<style >
.stars-container {
  position: absolute;
  top:10px;
  left: 10px;
  display: flex;
  margin-bottom: 10px;
}
.star {
  font-size: 15px !important;
  color: #f1ac33;
  font-size: 20px;
}
#products-container{
  width: 100%;
  height: 100%;
  padding: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  /* display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 50px;
  grid-auto-rows: minmax(100px, auto); */
}
.card-body{
  display: flex;
  flex-direction: column;
  margin-top: auto;
  text-decoration: none !important;
}
.card-title{
  font-size: 16px !important;
  margin-bottom: 20px !important;
  text-decoration: none !important;
}
.card-text{
  margin-bottom: 20px !important;
}
@media(max-width: 1500px){
  .card{
    width: calc(25% - 10px) !important;
    transition: 1s ease;
  }
}
@media(max-width: 1040px){
  .card{
    width: calc(33% - 10px) !important;
    transition: 1s ease;
  }
}
@media(max-width: 825px){
  .card{
    width: calc(50% - 10px) !important;
    transition: 1s ease;
  }
}
@media(max-width: 580px){
  .card{
    width: calc(100% - 10px) !important;
    transition: 1s ease;
  }
}
.card{
  background-color: white !important;
  width: calc(20% - 10px);
  margin: 0px 5px 5px 0px;
  box-sizing: border-box;
  padding: 0px !important;
  display: flex;
  justify-content: center;
  cursor: pointer;
  border: none !important;
  text-decoration: none !important;
  border-radius: 10px !important;
}
.image-container{
  background-color: #eceff1;
  padding: 50px;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  justify-content: center;
}
.image-container img{
  width: 150px;
  height: 150px;
  transition: transform 0.4s ease;
}
.card:hover .image-container img {
  transform: scale(1.1);
  transition: transform 0.3s ease; 
}

.card:hover .stars-container{
  margin-left: 4px;
  transform: scale(1.1);
  transition: .3s ease; 
}
.card:hover{
  border: 1px solid #000 !important;
  transition: transform 3s ease !important;
}
.product-price{
  font-size: 16px;
  background-color: white;
  width: fit-content;
  text-align: start;
  padding: 5px;
  z-index: 1000;
  border-radius: 5px;
  position: absolute;
  margin: 10px;
  top: 198px;
  left: 5px;
  font-weight: 400;
}
.card-img-top{
  filter: brightness(1.1) !important;
  mix-blend-mode: multiply !important;
}
#product-square{
  width: 100%;
  height: 400px;
  background-color: white;
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
    .star{
        font-size: 24px;
        margin-right: 5px;
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
        margin-right: 70px !important;
    }
    a{
        padding: 10px !important;
        border-radius: 10px;
    }
    li a{
        padding: 10px !important;
        display: flex !important;
        border-radius: 10px;
        align-items: center;
    }
    li button{
        padding: 10px !important;
        display: flex !important;
        width: 200px;
        align-items: center;
    }
    /* li button:hover{
        background-color: rgb(51, 55, 62) !important;
    } */
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
        .star{
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
        form input{
            width: 150px !important;
        }
    }
</style>