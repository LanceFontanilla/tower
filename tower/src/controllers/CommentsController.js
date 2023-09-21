import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { commentsService } from "../services/CommentsService.js"



export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:commentId', this.deleteComment)

    }

    async createComment(req, res, next) {
        try {
            const commentBody = req.body
            commentBody.creatorId = req.userInfo.id
            const comment = await commentsService.createComment(commentBody)
            res.send(comment)
        } catch (error) {
            next(error)
        }
    }
    async deleteComment(req, res, next) {
        try {
            const commentId = req.params.commentId
            const message = await commentsService.deleteComment(commentId, req.userInfo.id)
            res.send(message)
        } catch (error) {
            next(error)
        }
    }

}