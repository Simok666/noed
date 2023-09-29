<template>
    <b-card header="Chat" header-tag="h4" class="mb-4">
        <div class="py-12">
            <!-- <h2 class = "font-semibold text-xl leading-tight">
                <chat-room-selection 
                    v-if="currentRoom.id"
                    :rooms="chatRooms"
                    :currentRoom="currentRoom"
                    v-on:roomChanged="setRoom($event)"
                />
            </h2> -->
            <div class="container-fluid ">
                <div class="row justify-content-center ">
                <div class="col-md-4 col-xl-3 chat"><div class="card mb-sm-3 mb-md-0 contacts_card">
                    <div class="card-header">
                    <div class="input-group">
                        <input type="text" placeholder="Search..." name="" class="form-control search">
                        <div class="input-group-prepend">
                        <span class="input-group-text search_btn"><i class="fas fa-search"></i></span>
                        </div>
                    </div>
                    </div>

                    <select-team 
                    v-if="currentRoom.id" 
                    :currentRoom="currentRoom"
                    />
                    
                    <div class="card-footer"></div>
                </div></div>
                <div class="col-md-8 col-xl-6 chat">
                    <div class="card message">
                    <div class="card-header msg_head">
                        <div class="d-flex bd-highlight">
                        <div class="img_cont">
                            <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" class="rounded-circle user_img">
                            <span class="online_icon"></span>
                        </div>
                        <div class="user_info">
                            <span>Chat with jassa</span>
                            <p>1767 Messages</p>
                        </div>
                        <div class="video_cam">
                            <span><i class="fas fa-video"></i></span>
                            <span><i class="fas fa-phone"></i></span>
                        </div>
                        </div>
                        <span id="action_menu_btn"><i class="fas fa-ellipsis-v"></i></span>
                        <div class="action_menu">
                        <ul>
                            <li><i class="fas fa-user-circle"></i> View profile</li>
                            <li><i class="fas fa-users"></i> Add to close friends</li>
                            <li><i class="fas fa-plus"></i> Add to group</li>
                            <li><i class="fas fa-ban"></i> Block</li>
                        </ul>
                        </div>
                    </div>
                    
                        <message-container :userId="userId" :messages="messages" :idChatRoom="idChatRoom" :nodNumber="nodNumber" />
                        <input-message v-on:messagesent="getMessages()" :room = "currentRoom" />
                    
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </b-card>
</template>

<style>
    .chat{
    margin-top: auto;
    margin-bottom: auto;
  }
  .card .message{
    height: 550px;
    border-radius: 15px !important;
    background-color: rgba(0,0,0,0.4) !important;
  }
  .contacts_body{
    padding:  0.75rem 0 !important;
    overflow-y: auto;
    white-space: nowrap;
    background-color: rgba(0,0,0,0.4) !important;
  }
  .msg_card_body{
    overflow-y: auto;
  }
  .card-header{
    border-radius: 15px 15px 0 0 !important;
    border-bottom: 0 !important;
  }
  .card-footer{
    border-radius: 0 0 15px 15px !important;
    border-top: 0 !important;
  }
  .container{
    align-content: center;
  }
  .search{
    border-radius: 15px 0 0 15px !important;
    background-color: rgba(0,0,0,0.3) !important;
    border:0 !important;
    color:white !important;
  }
  .search:focus{
     box-shadow:none !important;
   outline:0px !important;
  }
  .type_msg{
    background-color: rgba(0,0,0,0.3) !important;
    border:0 !important;
    color:white !important;
    height: 60px !important;
    overflow-y: auto;
  }
    .type_msg:focus{
     box-shadow:none !important;
   outline:0px !important;
  }
  .attach_btn{
  border-radius: 15px 0 0 15px !important;
  background-color: rgba(0,0,0,0.3) !important;
    border:0 !important;
    color: white !important;
    cursor: pointer;
  }
  .send_btn{
  border-radius: 0 15px 15px 0 !important;
  background-color: rgba(0,0,0,0.3) !important;
    border:0 !important;
    color: white !important;
    cursor: pointer;
  }
  .search_btn{
    border-radius: 0 15px 15px 0 !important;
    background-color: rgba(0,0,0,0.3) !important;
    border:0 !important;
    color: white !important;
    cursor: pointer;
  }
  .contacts{
    list-style: none;
    padding: 0;
  }
  .contacts li{
    width: 100% !important;
    padding: 5px 10px;
    margin-bottom: 15px !important;
  }
  .active{
    background-color: rgba(0,0,0,0.3);
  }
  .user_img{
    height: 70px;
    width: 70px;
    border:1.5px solid #f5f6fa;
  
  }
  .user_img_msg{
    height: 40px;
    width: 40px;
    border:1.5px solid #f5f6fa;
  
  }
  .img_cont{
    position: relative;
    height: 70px;
    width: 70px;
  }
  .img_cont_msg{
    height: 40px;
    width: 40px;
  }
  .online_icon{
  position: absolute;
  height: 15px;
  width:15px;
  background-color: #4cd137;
  border-radius: 50%;
  bottom: 0.2em;
  right: 0.4em;
  border:1.5px solid white;
  }
  .offline{
  background-color: #c23616 !important;
  }
  .user_info{
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 15px;
  }
  .user_info span{
  font-size: 20px;
  color: white;
  }
  .user_info p{
  font-size: 10px;
  color: rgba(255,255,255,0.6);
  }
  .video_cam{
  margin-left: 50px;
  margin-top: 5px;
  }
  .video_cam span{
  color: white;
  font-size: 20px;
  cursor: pointer;
  margin-right: 20px;
  }
  .msg_cotainer{
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 10px;
  border-radius: 25px;
  background-color: #82ccdd;
  padding: 10px;
  position: relative;
  }
  .msg_cotainer_send{
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
  border-radius: 25px;
  background-color: #78e08f;
  padding: 10px;
  position: relative;
  }
  .msg_time{
  position: absolute;
  left: 0;
  bottom: -15px;
  color: rgba(255,255,255,0.5);
  font-size: 10px;
  }
  .msg_time_send{
  position: absolute;
  right:0;
  bottom: -15px;
  color: rgba(255,255,255,0.5);
  font-size: 10px;
  }
  .msg_head{
  position: relative;
  }
  #action_menu_btn{
  position: absolute;
  right: 10px;
  top: 10px;
  color: white;
  cursor: pointer;
  font-size: 20px;
  }
  .action_menu{
  z-index: 1;
  position: absolute;
  padding: 15px 0;
  background-color: rgba(0,0,0,0.5);
  color: white;
  border-radius: 15px;
  top: 30px;
  right: 15px;
  display: none;
  }
  .action_menu ul{
  list-style: none;
  padding: 0;
  margin: 0;
  }
  .action_menu ul li{
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 5px;
  }
  .action_menu ul li i{
  padding-right: 10px;
  
  }
  .action_menu ul li:hover{
  cursor: pointer;
  background-color: rgba(0,0,0,0.2);
  }
  @media(max-width: 576px){
  .contacts_card{
  margin-bottom: 15px !important;
  }
  }

  /* width */
  ::-webkit-scrollbar {
  width: 10px;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
  background: #7F7FD5; 
  border-radius: 10px;
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
  background: #5454b6; 
  }
   
</style>

<script>

import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import $ from 'jquery';
import MessageContainer from './messageContainer.vue'
import inputMessage from './inputMessage.vue'
import ChatRoomSelection from './chatRoomSelection.vue'
import SelectTeam from './selectTeam.vue'

export default {
    components: {
        MessageContainer,
        inputMessage,
        ChatRoomSelection,
        SelectTeam
    },
    data () {
        return {
            chatRooms: [],
            currentRoom: [],
            messages: [],
            userId: 0,
            idChatRoom: 0,
            nodNumber:0,
            formattedTime: ''
        }
    },
    watch: {
        
        currentRoom(val, oldVal) {
            if(oldVal.id) {
                this.disconnect(oldVal)
            }
            this.connect()
        }
    },
    methods: {
        connect () {  
            if(this.currentRoom.id) {
                let vm = this
                this.getMessages()
                window.Echo.private("chat." + this.currentRoom.id)
                .listen("NewChatMessage", e => {
                    vm.getMessages()
                })
            }
        },
        disconnect (room) {
            window.Echo.leave("chat." + room.id)
        },
        getRooms() {
            axios.get('/AdminVue/nod-chat-rooms')
            .then (response => {
                this.chatRooms = response.data
                this.setRoom(response.data[0])
            })
            .catch(error => {
                console.log(error)
            })
        },
        setRoom (room) {
            this.currentRoom = room
        },
        getMessages() {
            axios.get('/AdminVue/nod-chat-rooms/' + this.currentRoom.id + '/messages')
            .then(response => {
                this.messages = response.data.data
                this.userId = response.data.userId
            })
            .catch(error => {
                console.log(error)
            })
        }
    },
    created() {
        this.getRooms();
    },
    mounted() {
        this.idChatRoom = this.$route.params.Id 
        this.nodNumber = this.$route.params.NodNumber
    }
}
</script>