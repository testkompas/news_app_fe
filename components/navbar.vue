<template>
    <div class="navbar">
        <div class="wrapper">
            <div class="logo">
                <img src="~/assets/newspaper.png" alt="dashboard logo">
            </div>
            <div class="user">
                <p class="name" >{{ author }}</p>
                <div class="vl"></div>
                <p class="logout" @click="logout($event.target)">Logout</p>
            </div>
        </div>
    </div>
</template>
<script>
import { useStore, ref, useRouter, watch } from '@nuxtjs/composition-api'
import axios from 'axios'
export default {
    setup() {
        const store = useStore()
        const router = useRouter()
        const author = ref(store.state.authorName)

        const token = ref(null)

        watch(
            () => { return token.value},
            (newValue) => {
                checkToken(newValue)
            }
        )

        function checkToken(authToken) {
            if (authToken == null || authToken == "") {
                router.push("/login")
            }
        }

        function logout() {
            token.value = null
            localStorage.setItem("Authorization", "")
        }

        if (process.client) {
            token.value = localStorage.getItem("Authorization")
        }

        return {
            author,
            logout
        }
    }
}
</script>
<style lang="scss">

html, body, #__nuxt, #__layout {
    margin: 0;
    height: 100%;
}

.navbar {
    width: 100%;
    height: 100px;
    background-color: #0f4eab;
    .wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        max-width: 1480px;
        padding: 0 100px;
        margin: 0 auto;
        .logo {
            border-radius: 50%;
            width: 96px;
            height: 96px;
            background-color: #5797ff;
            float: left;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 64px;
                height: 64px;
            }
        }
        .user {
            display: flex;
            flex-direction: row;
            align-items: center;
            float: right;
            margin-left: auto;
            p {
                font-size: 24px;
                margin: 16px;
                color: white;
                &.logout:hover {
                    cursor: pointer;
                }
            }
            .vl {
                width: 1px;
                height: 64px;
                background-color: white;
            }
        }
    }
}

</style>