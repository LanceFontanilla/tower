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
}

export const commentsService = new CommentsService()