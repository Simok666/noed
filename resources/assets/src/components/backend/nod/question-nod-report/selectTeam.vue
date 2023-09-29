<template>
    <div class="card-body contacts_body">
        <ul class="contacts">
            <div v-for="(team, index) in teams" :key="index">
                <!-- <li class="active"> -->
                    <div class="d-flex bd-highlight">
                        <div class="img_cont">
                            <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" class="rounded-circle user_img">
                            <span class="online_icon"></span>
                        </div>
                        <div class="user_info">
                            <span>{{team.namepublisher}}</span>
                            <p>Kalid is online</p>
                        </div>
                    </div>
                <!-- </li> -->
            </div>
            <!-- <li>
                <div class="d-flex bd-highlight">
                    <div class="img_cont">
                        <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" class="rounded-circle user_img">
                        <span class="online_icon offline"></span>
                    </div>
                    <div class="user_info">
                        <span>jassa</span>
                        <p>Taherah left 7 mins ago</p>
                    </div>
                </div>
            </li> -->
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['currentRoom'],
        data () {
            return {
                teams : []
            }
        },
        methods: {
            getTeam(id, numberNod) {
                axios.post('/AdminVue/nod-chat-teams', {
                    Id: id,
                    NumberNod: numberNod
                    })
                .then(response => {
                    this.teams = response.data.teams
                })
                .catch(error => {
                    console.log(error)
                })
            }
        },
        mounted () {
            this.getTeam(this.currentRoom.id, this.currentRoom.nod_number)
        }
    }
</script>