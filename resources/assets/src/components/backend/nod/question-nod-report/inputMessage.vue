<template>
     <div class="card-footer">
        <div class="input-group">
            <div class="input-group-append">
                <span class="input-group-text attach_btn"><i class="fas fa-paperclip"></i></span>
            </div>
                <!-- <textarea name="" class="form-control type_msg" placeholder="Type your message..."></textarea> -->
            <textarea name="" v-model="message" @keyup.enter="sendMessage()" class="form-control type_msg" placeholder="Type your message..."></textarea>
            <div class="input-group-append">
                <span class="input-group-text send_btn" @click="sendMessage()"><i class="fas fa-location-arrow"></i></span>
            </div>        
        </div>
    </div>
    
            <!-- <b-input
            style="border:none" 
            type="text" 
            v-model="message" 
            @keyup.enter="sendMessage()" 
            placeholder="Say Something ..." 
            class="col-span-5 outline-none p-1" 
            />
            <button 
                type="button" 
                @click="sendMessage()"  
                class="place-self-end bg-gray-500 hover:bg-blue-700 p-1 mt-1 rounded text-white">
                Send
            </button> -->
        
</template>

<script>
export default {
    props : ['room'],
    data: function () {
        return {
            message: ''
        }
    },
    methods: {
        sendMessage () {
            if (this.message == ' ' )
            {
                return;
            }
            
            axios.post('/AdminVue/nod-chat-rooms/' + this.room.id + '/message',{
                message: this.message
            }).
            then( response => {
                if (response.status == 201 ) {
                    this.message = ''
                    this.$emit('messagesent')
                }
            })
            .catch( error => {
                console.log(error)
            })
        }
    }
}
</script>