<template>
    <div class="dashboard">
        <navbar/>

        <div class="blog">
            <button class="btn-create" @click="newArticle($event.target)">
                Add article
            </button>

            <div class="articles" v-if="articleLists.length > 0">
                <div class="writing" v-for="article in articleLists" :key="article.id">
                    <h1 class="title" @click="getDetail($event.target)">{{ article.title }}</h1>
                    <p class="date">On {{ article.released_date }}</p>
                    <p class="description">{{ article.content }}</p>
                    <p class="link" @click="getDetail($event.target)">Read more</p>
                    <div class="hl"></div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import { ref, useRouter } from '@nuxtjs/composition-api'
import navbar from '../components/navbar.vue'
import axios from 'axios'
import url from '../assets/env_var'

export default {
    components: { navbar },
    setup() {
        const router = useRouter()
        const articleLists = ref([])

        /* articleLists.value = [
            {
                title: "China reports 37 new COVID-19 cases among Olympic personnel",
                body: `<p>BEIJING (Reuters) - China detected 37 new cases of COVID-19 among Olympic Games related personnel on Jan 30, up from 34 a day earlier, the organising committee of the Beijing 2022 Winter Games said on Monday.</p><p>Eight of the total were athletes or team officials who tested positive after arriving at the airport on Sunday.</p><p>Of the total infections, 28 were among new airport arrivals, with the remaining nine already in the "closed loop" bubble that separates event personnel from the public, according to a notice on the Games' official website.</p>`,
                released_date: "16 Mar 2021"
            },
        ] */

        if (process.client) {
            axios.get(
                url + "/article", 
                {
                    headers :{
                        "Authorization" : localStorage.getItem("Authorization")
                    }
                }
            )
            .then(function (response) {
                if (response.data.result != null) {
                    console.log(response.data);
                    articleLists.value = response.data.result
                }
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
        }

        function getDetail() {

        }

        function newArticle() {
            router.push("/new_article")
        }

        return {
            articleLists,
            getDetail,
            newArticle
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

.dashboard {
    padding-bottom: 100px;
    .blog {
        margin: auto;
        width: 1000px;
        .btn-create {
            border-radius: 8px;
            border: 1px solid black;
            font-size: 20px;
            padding: 8px 16px;
            margin-top: 100px;
            margin-bottom: 16px;
            margin-left: 100px;
            background-color: transparent;
            display: flex;
            align-items: center;
            &::before{
                content: "+";
                font-size: 28px;
            }
            &:hover{
                cursor: pointer;
            }
        }
        .articles {
            margin: auto;
            width: 100%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            .writing {
                margin: auto;
                width: 800px;
                h1{
                    margin-bottom: 8px;
                    &:hover {
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }
                .date {
                    font-size: 16px;
                    color: rgba(70, 70, 70, 75%);
                    margin: 0;
                    margin-bottom: 20px;
                }
                .description {
                    font-size: 16px;
                    margin-bottom: 20px;
                    &::after{
                        content: "...";
                    }
                }
                .link {
                    font-size: 16px;
                    font-weight: 400;
                    color: #0D98BA;
                    text-decoration: none;
                    &:hover {
                        text-decoration: underline;
                        cursor: pointer;
                    }
                    &::after{
                        content: "...";
                    }
                }
                .hl {
                    margin: 20px 0;
                    height: 1px;
                    background-color: black;
                    width: 100%;
                }
            }
        }
    }
}
</style>