<template>
    <div>
        <div :class="(message.user_id == userId) ? 'msg_cotainer_send' : 'msg_cotainer' ">
            {{message.message}}  
            <span class="msg_time_send">8:55 AM, Today</span>
          </div>  
    </div>
</template>


<script>
export default {
    props:['message', 'userId', 'idChatRoom', 'nodNumber'],
}
</script>