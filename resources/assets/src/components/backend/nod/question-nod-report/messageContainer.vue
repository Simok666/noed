<template>
  <div class="card-body msg_card_body">
    <div v-for="(messages, index) in messages" :key="index">
      <div :class="(messages.user_id == userId) ? 'd-flex justify-content-end mb-4' : 'd-flex justify-content-start mb-4' ">
          
          <message-item :userId="userId" :message="messages" :idChatRoom="idChatRoom" :nodNumber="nodNumber"/> 

          <div class="img_cont_msg">
              <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" class="rounded-circle user_img_msg">
          </div>
      </div>
    </div>
  </div>

</template>

<script> 
import messageItem from './messageItem.vue'

export default {
    components: {
        messageItem
    },
    props: ['messages','userId','idChatRoom','nodNumber'],
}

</script>