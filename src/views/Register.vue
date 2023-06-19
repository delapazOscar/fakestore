<script>
import { ref, computed } from "vue";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendEmailVerification } from "firebase/auth";
import { useRouter } from 'vue-router';
import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const alertMessage = ref("");
    const alertType = ref(""); 

    const alertClass = computed(() => {
      switch (alertType.value) {
        case "success":
          return "alert alert-success d-flex align-items-center";
        case "warning":
          return "alert alert-warning d-flex align-items-center";
        case "error":
          return "alert alert-danger d-flex align-items-center";
        default:
          return "alert alert-primary d-flex align-items-center";
      }
    });

    const register = () => {
      createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then(async (userCredential) => {
          console.log("Registro exitoso!");
          showAlert("Registro exitoso!", "success");
          console.log(userCredential.user);
          email.value = "";
          password.value = "";
          await sendEmailVerification(userCredential.user);
          const db = getFirestore();
          const userCollection = collection(db, "users");
          const userDoc = doc(userCollection, userCredential.user.email);
          await setDoc(userDoc, {
            cart: [] // Inicialmente, el carrito está vacío
          });
          router.push('/');
        })
        .catch((error) => {
          console.log(error);
          showAlert(error.message, "error");
          password.value = "";
        });
    };

    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then(async (userCredential) => {
          const user = userCredential.user;
          console.log('Inicio de sesión exitoso con Google:', user);
          console.log(user.email);
          const db = getFirestore();
          const userCollection = collection(db, "users");
          const userDoc = doc(userCollection, user.email);
          await setDoc(userDoc, {
            cart: [] // Inicialmente, el carrito está vacío
          });
          router.push('/login');
        })
        .catch((error) => {
          console.log('Error en el inicio de sesión con Google:', error);
          showAlert(error.message, "error");
        });
    };

    const showAlert = (message, type) => {
      alertMessage.value = message;
      alertType.value = type;
      setTimeout(() => {
        alertMessage.value = "";
        alertType.value = "";
      }, 2000);
    };

    return {
      email,
      password,
      alertMessage,
      alertClass,
      register,
      signInWithGoogle
    };
  }
};
</script>

<template>
    <div class="login">
        <div v-if="alertMessage" class="alert" :class="alertClass" role="alert">
            <div>{{ alertMessage }}</div>
        </div>
        <div class="login-square">
            <div class="login-form">
                <ion-icon class="account-icon" name="person-circle-outline"></ion-icon>
                <h1>Registro</h1>
                <div class="form">
                    <input type="email" placeholder="Correo electrónico" v-model="email">
                    <input type="password" placeholder="Contraseña" v-model="password">
                    <div class="button-container">
                        <button @click="register">Registrarme</button>
                        <button class="google-register" @click="signInWithGoogle()"><ion-icon name="logo-google"></ion-icon></button>
                        <router-link to="/login" class="register-link" >¿Ya tienes cuenta? Inicia sesión!</router-link>
                    </div>
                </div>
            </div>
            <div class="img-register">
                <img class="register-img" src="../assets/loginImage.jpg" alt="">
            </div>
        </div>
        
        <div class="login-square-responsive">
            <ion-icon class="account-icon" name="person-circle-outline"></ion-icon>
            <h1>Registro</h1>
            <div class="form">
                <input type="email" v-model="email">
                <input type="password" v-model="password">
                <div class="button-container">
                    <button @click="register">Registrarme</button>
                    <button class="google-register" @click="signInWithGoogle()"><ion-icon name="logo-google"></ion-icon></button>
                    <router-link to="/login" class="register-link" >¿Ya tienes cuenta? Inicia sesión!</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.alert{
    position: absolute !important;
    top: 50px;
    z-index: 10000000;
    height: 50px;
    width: 400px;
    background-color: #f15252 !important;
    border: none !important;
    color: black !important;
    justify-content: center;
}
    .img-register{
        border-radius: 0px 15px 15px 0px;
        width: 45%;
        display: flex;
        align-items: center;
        background-color: #c6ede1;
        padding: 10px;
    }
    .form input {
        width: 100%;
    }
    .register-img{
        border-radius: 0px 20px 20px 0px !important;
    }
    .google-register{
        width: auto !important;
        height: auto !important;
        border: none !important;
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 40px !important;
        margin: 0px 0px 20px 0px !important;
        background-color: black !important;
    }
    .google-register ion-icon{
        font-size: 30px;
        color: white;
    }
</style>