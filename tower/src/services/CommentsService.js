import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"



class CommentsService {
    async createComment(commentBody) {
        const comment = await dbContext.Comments.create(commentBody)
        await comment.populate('creator')
        return comment
    }
    async getCommentsByEvent(eventId) {
        const comment = await dbContext.Comments.find({ eventId }).sort('-createdAt').populate('creator event')
        return comment
    }

    async deleteComment(commentId) {
        const foundComment = await dbContext.Comments.findById(commentId)
        if (!foundComment) {
            throw new BadRequest("No comment to delete at id:" + commentId)
        }
        if (commentId.creatorId != commentId.userInfo.id) throw new Forbidden("This is not your comment, you cannot delete it.")
        await foundComment.remove()
        return `Your comment has been removed.`
    }
}

export const commentsService = new CommentsService()