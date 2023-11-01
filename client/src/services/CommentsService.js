import { AppState } from "../AppState"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class CommentsService{

    async createComment(comment){
        const res = await api.post('api/comments', comment)
        logger.log('creating comments', res.data)
        const newComment = new Comment(res.data)
        AppState.comments.push(newComment)
        return newComment
    }
    async deleteComment(commentId){
        const res = await api.delete(`api/comments/${commentId}`)
        logger.log('delete comment', res.data)
        
        const filteredArray = AppState.comments.filter(comment => comment.id != commentId)
        AppState.comments = filteredArray
        return filteredArray

    }
}

export const commentsService = new CommentsService()