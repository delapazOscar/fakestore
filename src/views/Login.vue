<template>
    <div class="login">
        <div v-if="alertMessage" class="alert" :class="alertClass" role="alert">
            <div>{{ alertMessage }}</div>
        </div>
        <div class="login-square">
            <div class="img-login">
                <img class="login-image" src="../assets/loginImage.jpg" alt="">
            </div>
            <div class="login-form">
                <div class="icon-container">
                    <ion-icon class="account-icon" name="person-circle-outline"></ion-icon>
                </div>
                <h1>Inicio de sesión</h1>
                <div class="form">
                    <input type="email" placeholder="Correo electrónico" v-model="email">
                    <input type="password" placeholder="Contraseña" v-model="password" >
                    <a href="" class="forgot-password">¿Olvidaste la contraseña?</a>
                    <div class="button-container">
                        <button @click="login()">Entrar</button>
                        <button class="google-register" @click="signInWithGoogle"><ion-icon name="logo-google"></ion-icon></button>
                    </div>
                </div>
                <router-link to="/register" class="register-link" >¿Aún no tienes cuenta? Registrate!</router-link>
            </div>
        </div>
        <div class="login-square-responsive">
            <ion-icon class="account-icon" name="person-circle-outline"></ion-icon>
                <h1>Inicio de sesión</h1>
                <div class="form">
                    <input type="email" placeholder="Correo electrónico" v-model="email">
                    <input type="password" placeholder="Contraseña" v-model="password">
                    <a href="" class="forgot-password">¿Olvidaste la contraseña?</a>
                    <div class="button-container">
                        <button @click="login()">Entrar</button>
                        <button class="google-register" @click="signInWithGoogle"><ion-icon name="logo-google"></ion-icon></button>
                    </div>
                </div>
                <router-link to="/register" class="register-link" >¿Aún no tienes cuenta? Registrate!</router-link>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const auth = getAuth();

    const login = () => {
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          console.log(auth.currentUser);
          router.push("/")
          alert("Inicio de sesión exitoso!");
          emit("loginSuccess");
          
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              alert("Email Inválido");
              break;

            case "auth/user-not-found":
              alert("No existe un usuario registrado con ese correo");
              break;

            case "auth/wrong-password":
              alert("Contraseña Incorrecta");
              break;

            // default:
            //   alert("Correo o contraseña incorrectos");
            //   break;
          }
        });
    };

    const signInWithGoogle = () => {
      const authInstance = getAuth(); // Obtain the auth instance
      const provider = new GoogleAuthProvider();

      signInWithPopup(authInstance, provider)
        .then((userCredential) => {
          // The user has successfully signed in
          const user = userCredential.user;
          console.log("Inicio de sesión exitoso con Google:", user);
          router.push("/");
        })
        .catch((error) => {
          console.log("Error en el inicio de sesión con Google:", error);
          alert(error.message);
        });
    };

    return {
      email,
      password,
      login,
      signInWithGoogle,
    };
  },
};
</script>

<style>
    @media(max-width:990px){
        .form{
            margin: 0 !important;
        }
        body{
            background-color: #b8d7ce !important;
        }
        .login-square{
            transition: 1s;
            display: none !important;
        }
        .login-square-responsive{
            display: flex !important;
            flex-direction: column;
            border-radius: 15px !important;
            margin: 50px !important;
            width: 100% !important;
            height: 600px !important;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background-color: #f8f9fa !important;
        }
        .account-icon{
            margin-bottom: 20px !important;
        }
        .form {
            margin-top: 40px;
        }
        h1{
            text-align: center;
            font-size: 20px !important;
        }
        .button-border button{
            font-size: 16px !important;
        }
    }
    .icon-container{
        display: flex;
        justify-content: center;
        width: 100% !important;
        height: 100px;
    }
    .icon-container ion-icon{
        font-size: 60px !important;
    }
    .login-square-responsive{
        display: none;
    }
    .login{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .login-square{
        transition: 1s;
        border-radius: 15px !important;
        display: flex;
        margin: 50px;
        width: 70%;
        height: 600px;
        background-color: #f8f9fa;
    }
    .img-login{
        border-radius: 15px 0px 0px 15px;
        width: 45%;
        display: flex;
        align-items: center;
        background-color: #c6ede1;
        padding: 10px;
    } 
    .login-image{
        filter: brightness(1) !important;
        mix-blend-mode: multiply !important;
    }
    .login-form{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        padding: 20px;
        width: 55%;
    }
    .account-icon{
        text-align: center;
        font-size: 60px !important;
        /* margin: 0px 0px 50px 0px; */
    }
    .login-form h1{
        text-align: center;
        font-size: 30px;
        margin-top: 10px;
        margin-bottom: 0px;
    }
    .form{
        width: 100%;
    }
    .form input{
        padding: 10px;
        background-color: #dedede;
        border-radius: 10px;
        border: none !important;
        box-shadow: none !important;
        margin-top: 50px;
        color: black;
        font-size: 16px;
    }
    .forgot-password{
        padding: 0 !important;
        font-size: 14px;
        color: #4f9a84;
        text-underline-offset: 2px;
    }
    .register-link{
        margin-bottom: 20px;
        padding: 0 !important;
        font-size: 14px;
        text-align: center;
        color: #000;
        font-weight: 600;
        text-underline-offset: 2px;
    }
    .form button{
        margin-top: 50px;
        margin-bottom: 30px;
        width: 200px;
        height: 50px;
        border-radius: 10px;
        background-color: #c6ede1;
        border: 2px solid #000;
        font-size: 20px;
        font-weight: 600;
        color: black;
    }
    .button-container{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
    }
    .form button:hover{
        background-color: #9acebe;
    }
    .form button:hover .button-border{
        transform: scale(.9);
        transition: transform 0.3s ease; 
    }
    @media(max-height: 750px){
        .login-square{
            height: 520px;
            width: 60%;
        }
        .login-form h1{
            margin: 10px 0px 0px 0px !important;
        }
        .form input{
            margin-top: 30px;
        }
        /* .account-icon{
            font-size: 45px !important;
        } */
        .button-container button {
            margin-top: 30px;
        }
    }
</style>