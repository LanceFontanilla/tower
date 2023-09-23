<template>

<div class="bg-light-purple text-light">
  
    <div class="row p-0 m-0 p-2">
      <div class="col-12 col-md-3 p-1 me d-flex justify-content-center"><img class="profile-pic mx-2" :src="comment.creator.picture" alt=""> 
      </div>
      <div class="col-12 col-md-8 card  ">
        <div class="col-12 fs-4 fw-bold">
        {{ comment.creator.name }}
        </div>
        <div class="col-12 fs-5 mb-4">
        {{ comment.body }}
        </div>
        <div class="col-12 fs-5 mb-4 text-end">
        <button v-if="comment.creatorId == account.id" @click="deleteComment(comment.id)" title="Delete Comment" class="btn btn-danger"><i class="mdi mdi-delete-forever"></i></button>
        </div>
      </div>

    </div>
  </div>



</template>

<script>
import { computed, ref } from 'vue';
import { Comment } from '../models/Comment.js'
import { AppState } from '../AppState.js';
import { commentsService } from '../services/CommentsService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';




export default {
  props: {comment: {type: Comment, required: true }},
setup() {

  return {

    user: computed(() => AppState.user),
    account: computed(() => AppState.account),
   
      async deleteComment(commentId) {
        try {
          if(await Pop.confirm('Are you sure you want to delete this comment?')){
          logger.log(' this is the commentId', commentId)
          await commentsService.deleteComment(commentId)
          
          Pop.toast('You have deleted this comment.', 'success', 'center')
          }
          
        } catch (error) {
          Pop.error(error)
        }
      },

  };
},
};
</script>


<style lang="scss" scoped>
.profile-pic{
    height: 100px;
    width: 100px;
    object-fit: cover;
    object-position: center;
    border-radius: 50em;
}


</style>