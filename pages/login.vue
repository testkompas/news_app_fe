<template>
    <div class="login">
        <div class="form">
            <h2>NEWS APP</h2>
            <input class="input" type="text" placeholder="Username" required v-model="username">
            <input class="input" type="password" placeholder="Password" required v-model="password">
            <p ref="message" class="message hide"></p>
        </div>
        <button class="btn-login" @click="login($event.target)">Login</button>
    </div>
</template>
<script>
import { ref, useRouter } from '@nuxtjs/composition-api'
import url from '../assets/env_var'
export default {
    setup() {
        const router = useRouter()

        const username = ref('')
        const password = ref('')
        const message = ref(null)

        function login() {
            if (username.value == "" || password.value == "") {
                showMessage("Username and Password field is required.")
            } else {
                this.$axios.post(url + '/login', {
                    username: username.value,
                    password: password.value
                })
                .then(function (response) {
                    if (response.data.result != null) {
                        console.log(response.data);
                        localStorage.setItem("Authorization", response.data.result)
                        router.push("/dashboard")
                    }
                })
                .catch(function (error) {
                    console.log(error.response.data);
                    showMessage(error.response.data.error)
                });
            }
        }

        function showMessage(data) {
            message.value.innerHTML = data
            message.value.classList.remove("hide")
        }

        return {
            login,
            username,
            password,
            message
        }
    }
}
</script>
<style lang="scss">
@import "include-media";
html, body, #__nuxt, #__layout {
    margin: 0;
    background-color: #fffed1;
}

.login {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .form {
        border: 1px solid black;
        border-radius: 20px;
        background-color: #fcfbae;
        padding: 15px 30px;
        width: auto;
        display: flex;
        flex-direction: column;
        h2 {
            margin-bottom: 24px;
            text-align: center;
        }
        .input {
            border: 1px solid black;
            border-radius: 4px;
            margin: auto;
            width: 150px;
            height: 20px;
            font-size: 16px;
            background-color: white;
            margin-bottom: 16px;
        }
        .message {
            font-size: 12px;
            color: red;
            text-align: center;
            max-width: 150px;
            margin: 0;
            &.hide {
                display: none;
            }
        }
    }
    .btn-login {
        margin-top: 16px;
        border-radius: 8px;
        padding: 8px 16px;
        font-size: 16px;
        font-weight: bold;
        color: white;
        border: none;
        background-color: #217aff;
    }
}
</style>