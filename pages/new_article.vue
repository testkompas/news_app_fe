<template>
    <div class="add_article">
        <Navbar/>

        <div class="form">
            <button class="btn-back" @click="backToDashboard($event.target)"> Back</button>
            <h2>Add Article</h2>
            <div class="title input">
                <p>Title</p>
                <input type="text" placeholder="Title" v-model="formData.title">
            </div>
            <div class="content input">
                <p>Content</p>
                <ckeditor :editor="editor.editor" v-model="formData.editorData" :config="editor.editorConfig" @input="onEditorInput($event.target)"/>
            </div>
            <div class="status input">
                <p>Status</p>
                <select id="status" v-model="formData.status">
                    <option disabled value="">Select Status</option>
                    <option :value="pageData.statusList[0]">{{ pageData.statusList[0] }}</option>
                    <option :value="pageData.statusList[1]">{{ pageData.statusList[1] }}</option>
                </select>
            </div>
            <p ref="message" class="message hide"></p>
            <button class="btn-submit" @click="addArticle($event.target)">Submit</button>
        </div>
    </div>
</template>

<script>
import { reactive, ref, useRouter } from '@nuxtjs/composition-api'
import Navbar from '../components/navbar.vue'
import axios from 'axios'
import url from '../assets/env_var'

let ClassicEditor
let CKEditor
if (process.client) {
    ClassicEditor = require('@ckeditor/ckeditor5-build-classic')
    CKEditor = require('@ckeditor/ckeditor5-vue2')
} else {
    CKEditor = { component : {template:'<div></div>'}}
}

export default {
    setup() {
        const router = useRouter()
        const pageData = reactive({
            author: "Penulis 1",
            statusList: [
                "PUBLISHED",
                "UNPUBLISHED"
            ]
        })

        const editor = reactive({
            editor: ClassicEditor,
            editorConfig: {
                toolbar: [ 'heading' , '|' , 'bold', 'italic', 'link', 'numberedList', 'bulletedList', '|' , 'blockQuote', 'undo', 'redo' ]
            }
        })
        
        const formData = reactive({
            title: "",
            editorData: "",
            status: ""
        })

        const message = ref(null)

        function addArticle() {
            if (formData.title == "" || formData.editorData == "" || formData.status == "") {
                showMessage("All field must not be empty")
            } else {
                axios.post(
                    url + "/article",
                    {
                        title: formData.title,
                        body: formData.editorData,
                        status: formData.status
                    },
                    {
                        headers :{
                            "Authorization" : localStorage.getItem("Authorization")
                        }
                    }
                )
            }
        }

        function showMessage(data) {
            console.log(pageData.message)
            message.value.innerHTML = data
            message.value.classList.remove("hide")
        }

        function backToDashboard() {
            router.push("/dashboard")
        }

        function onEditorInput() {
            
        }
        
        return {
            editor,
            formData,
            pageData,
            message,
            addArticle,
            onEditorInput,
            backToDashboard
        }
    },
    components: {
        ckeditor: CKEditor.component,
        Navbar
    },
};

</script>
<style lang="scss">

html, body, #__nuxt, #__layout {
    margin: 0;
    background-color: #fffed1;
}

.add_article {
    height: 100%;
    display: block;

    .btn-back {
        font-size: 16px;
        padding: 8px 16px;
        border-radius: 8px;
        border: 2px solid black;
        display: flex;
        align-items: center;
        margin-bottom: 50px;
        &::before{
            font-size: 20px;
            content: "< ";
        }
    }
    .form {
        width: 1000px;
        margin: auto;
        margin-top: 50px;
        h2 {
            margin-top: 0;
            margin-bottom: 24px;
        }
        .input {
            margin-bottom: 24px;
            p {
                font-size: 16px;
                margin-bottom: 4px;
            }
        }
        .title {
            input {
                font-size: 16px;
                height: 20px;
                padding: 4px;
                width: 500px;
                border: 1px solid black;
                border-radius: 4px;
            }
        }
        .content {
            .ck-editor {
                .ck-editor__editable {
                    height: 200px;
                    overflow-y: scroll;
                    font-size: 16px;
                    padding: 4px;
                }
            }
        }
        .status {
            select {
                border: 1px solid black;
                height: 20px;
                width: 160px;
            }
        }
        .btn-submit {
            font-size: 16px;
            color: white;
            background-color: #217aff;
            border-radius: 8px;
            border: none;
            padding: 8px 20px;
            margin-top: 24px;
            &:hover{
                cursor: pointer;
            }
            &:active{
                background-color: #0758ed;
            }
        }
        .message {
            font-size: 14px;
            color: red;
            max-width: 500px;
            margin: 0;
            &.hide {
                display: none;
            }
        }
    }
}
</style>