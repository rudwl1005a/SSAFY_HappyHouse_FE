<template>
    <div id="app" style="overflow-x: hidden">
        <side-bar></side-bar>
        <router-view>
        </router-view>

        <div v-show="isLogin">
            <div v-if="isChatToggle" class="chat-icon-div" id ="chatIcon"> <font-awesome-icon icon="fa-solid fa-comments" style="cursor: pointer;font-size :30px;" @click="changeChat"/> </div>
            
            
            <div class="chat-div" v-if="!isChatToggle" id ="chatDiv">
            
                <div class="p-2" @click="changeChat" style="cursor: pointer; height: 35px;"> <font-awesome-icon icon="fa-solid fa-angles-down" style="float:right; color:white; font-size: 20px;"/> </div>
                <div class="chat-div-scroll m-1"  id="chatScrollDiv">
                    <div v-for="(message, index) in chatMesseges" :key="index" class="chat-div-message-item">
                        <div  class="chat-div-message-item">
                        <a v-if="$store.state.login.userInfo.userId != message.sender" class="chat-message m-1 p-2">{{message.sender}} : {{message.message}}</a>
                    
                        <a v-if="$store.state.login.userInfo.userId == message.sender" class="chat-message-me m-1 p-2">{{message.sender}} : {{message.message}}</a>
                        </div>
                    </div>
                </div>
                <div class="" style="position: absolute; top: 87%; left: 5px;">
                    <textarea class="form-control m-1" placeholder="내용을 입력하세요." v-model="chatMessege" @keyup.enter="send"
                            style="float: left; overflow: hidden; width: 73%; height: 30px; resize: none;"></textarea>
                    <button @click="send" @keydown.enter="send" class="btn btn-tertiary m-1">전송</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SideBar from "@/views/Sidebar.vue";

export default {
    name: "app",
    components: { SideBar },
    data() {
        return {
            webSocket : null,
            chatMesseges :[],
            chatMessege : "",
            sendMessege : {
                "type" : "ENTER",
                "sender" : "",
                "message" : ""
                },

            isChatToggle : false,
        }
    },
    watch: {
        mainDiv : function(){
            if(this.mainDiv){
                if(this.isChatToggle){
                    document.querySelector("#chatIcon").style.left = 320 +"px";
                }
                else{
                    document.querySelector("#chatDiv").style.left = 320 +"px";
                }
                
            }
            else{
                if(this.isChatToggle){
                    document.querySelector("#chatIcon").style.left = 110 +"px";
                }
                else{
                    document.querySelector("#chatDiv").style.left = 110 +"px";
                }
            }
        },
        isLogin : function(){
            if(this.isLogin){

                this.webSocket = new WebSocket("ws://localhost:8080/ws/chat");
                this.webSocket.onopen = this.onOpen;
                this.webSocket.onclose = this.onClose;
                this.webSocket.onmessage = this.onMessage;
            }
            else{
                if(this.webSocket!= null){} this.webSocket.close();
                this.chatMesseges = [];
            }
        }
    },
    mounted(){
        if(this.isLogin){
            this.webSocket = new WebSocket("ws://localhost:8080/ws/chat");
            this.webSocket.onopen = this.onOpen;
            this.webSocket.onclose = this.onClose;
            this.webSocket.onmessage = this.onMessage;
        }
        else{
            if(this.webSocket!= null) this.webSocket.close();
            this.chatMesseges = [];
        }
        
        if(this.isChatToggle){
            document.querySelector("#chatIcon").style.left = 110 +"px";
        }
        else{
            document.querySelector("#chatDiv").style.left = 110 +"px";
        }
    },
    computed:{
        mainDiv :{
            get(){
                return this.$store.state.mainDiv;
            }            
        },
        isLogin :{
            get(){
                return this.$store.state.login.isLogin;
            }            
        }
    },
    methods: {
        onOpen : function(){
            this.sendMessege.message = "나 입장";
            this.sendMessege.sender = this.$store.state.login.userInfo.userId;
            this.webSocket.send(JSON.stringify(this.sendMessege));
            
        },
        onClose : function(){
            
        },
        onMessage : function(e){
            console.log(e.data)
            let {sender, message} = JSON.parse(e.data);
            this.chatMesseges.push({sender, message});

            document.querySelector("#chatScrollDiv").scrollTop = document.querySelector("#chatScrollDiv").scrollHeight
        },
        send : function(){
            this.sendMessege.message = this.chatMessege;
            this.sendMessege.sender = this.$store.state.login.userInfo.userId;
            this.webSocket.send(JSON.stringify(this.sendMessege));

            this.chatMessege="";

        },
        changeChat : function(){
            this.isChatToggle = !this.isChatToggle
        }
    }
};
</script>

<style>
@import "@/css/volt.css";

.change-big {
    padding-left: 312px !important;
    transition-duration: 0.5s;
}
.change-small {
    padding-left: 102px !important;
    transition-duration: 0.5s;
}
.chat-icon-div {
    position : absolute;
    top : 90%;

    z-index: 10;
    transition-duration: 0.5s;
}
.chat-div {
    position : absolute;
    top : 55%;
    width:  300px;
    height: 400px;
    background-color: #1f273a;
    
    z-index: 10;
    transition-duration: 0.5s;
}
.chat-div-scroll{ 
    height: 300px;
    overflow:scroll; 
    border: 1px solid black;
    -ms-overflow-style: none;

    border: 1px solid #FFFFFF;
    border-radius: 10px;
    font-size: 12px;
}
.chat-div-scroll::-webkit-scrollbar {
    display: none;
}

.chat-div-message-item { 
    overflow:hidden;
    height : auto;
    width: 280px;
}


.chat-message
{
position: relative;
display:inline-block;
padding: 2px;
background: #FFFFFF;
color: #1f273a;
-webkit-border-radius: 10px;
-moz-border-radius: 10px;
border-radius: 10px;
left:10px;

max-width: 200px;
white-space: pre-line;
}

.chat-message:after
{
content: '';
position: absolute;
border-style: solid ;
border-width: 6px 11px 6px 0;
border-color: transparent #FFFFFF;

display: block;
width: 0;
z-index: 1;
left: -10px;
top: 10px;
}

.chat-message-me
{
position: relative;
display:inline-block;
padding: 2px;
background: #FFFFFF;
color: #1f273a;;
-webkit-border-radius: 10px;
-moz-border-radius: 10px;
border-radius: 10px;
float:right;
right: 6px;

max-width: 200px;
white-space: pre-line;

}

.chat-message-me:after
{
content: '';
position: absolute;
border-style: solid;
border-width: 6px 0 6px 11px;
border-color: transparent #FFFFFF;
display: block;
width: 0;
z-index: 1;
right: -10px;
top: 10px;
}

</style>
