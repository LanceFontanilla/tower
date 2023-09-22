import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class CommentsService{

    async createComment(comment){
        const res = await api.post('api/comments', comment)
        logger.log('creating posts', res.data)
        const newComment = new Comment(res.data)
        AppState.comments.push(newComment)
        return newComment
    }
    async deleteComment(commentId){
        const res = await api.delete(`api/comment/${commentId}`)
        logger.log('delete comment', res.data)
        let indexToRemove = AppState.activeEventComment.findIndex(comment => comment.id == commentId)
        AppState.activeEventComment.splice(indexToRemove, 1)
    }
}

export const commentsService = new CommentsService()