<template>
    <div id="app" style="overflow-x: hidden">
        <side-bar></side-bar>
        <router-view/>
        <div class="chat-div">
            <textarea v-model="chatMesseges" style="height:300px;"></textarea>
            <textarea class="form-control" placeholder="Leave a comment here" v-model="chatMessege"></textarea>
            <button @click="send" @keydown.enter="send">전송</button>
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
                "sender" : "zzzz",
                "message" : "ㅎㅇ"
                }
        }
    },
    mounted(){
        this.webSocket = new WebSocket("ws://localhost:8080/ws/chat");
        this.webSocket.onopen = this.onOpen;
        this.webSocket.onclose = this.onClose;
        this.webSocket.onmessage = this.onMessage;
    },
    methods: {
        onOpen : function(){
            
            this.webSocket.send(JSON.stringify(this.sendMessege));
            console.log("웹소캣 연결");
            console.log(this.webSocket);
        },
        onClose : function(){

        },
        onMessage : function(e){
            console.log(e)
            this.chatMesseges.push(e.data);
        },
        send : function(){
            this.sendMessege.message = this.chatMessege;
            this.webSocket.send(JSON.stringify(this.sendMessege));
            console.log("전송");
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

.chat-div {
    position : absolute;
    top : 10%;
    left : 20%;
    width:  200px;
    height: 400px;
    background-color: antiquewhite;
    z-index: 10;
}
</style>
