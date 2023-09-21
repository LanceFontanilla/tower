
<template>
        <div class="convo-text">
            <p>
                What people are saying
            </p>
        </div>
        <div class="col-12 mt-4 bg-light-purple text-light">
            <div class="comment-card p-4">
                <div class="convo-box text-end">
                    <p>
                        Join the Conversation 
                    </p>
                </div>
            <form @submit.prevent="createComment" >
                <div class="my-3">
                    <textarea v-model="commentData.body"  placeholder="Tell the people..." class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div class="text-end">
                    <button class="btn submit-button">Submit</button>
                </div>
            </form>
            </div>
        </div>

</template>

<script>
import { ref } from 'vue';
import Pop from '../utils/Pop';
import { commentsService } from '../services/CommentsService'
import { useRoute } from 'vue-router';


export default {
setup() {
    const commentData = ref({})
    const route = useRoute()
    return {
        commentData,
        async createComment(){
            try {
                commentData.value.eventId = route.params.eventId
                await commentsService.createComment(commentData.value)
                Pop.toast('Thank you for commenting!', 'success', 'center')
            } catch (error) {
                Pop.error(error)
            }
        }
    };
},
};
</script>


<style scoped lang="scss">

.img-card{
    height:100%
}

.bg-light-purple{
    background-color: rgba(71, 76, 97, 1) 
}

.convo-text{
    color:  rgb(127, 158, 225) 
}

.convo-box{
    color: rgb(180, 192, 242); 
}

.submit-button{
    background-color: rgb(180, 192, 242); 
    color: black
}

.profile-pic{
    height: 50px;
    width: 50px;
    object-fit: cover;
    object-position: center;
    border-radius: 50em;
}

</style>