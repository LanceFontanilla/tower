import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { commentsService } from "../services/CommentsService.js"



export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:id', this.deleteComment)

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
            let commentId = req.params.id
            commentId.accountId = req.userInfo.id
            const message = await commentsService.deleteComment(commentId)
            res.send(message)
        } catch (error) {
            next(error)
        }
    }

}