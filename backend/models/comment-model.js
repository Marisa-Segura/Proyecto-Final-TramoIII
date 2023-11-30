import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";


const CommentSchema = new Schema({
    
    blog_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'blogs'
    },
    blog_author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'blogs',
    },
    comment: {
        type: String,
        required: true
    },
    children: {
        type: [Schema.Types.ObjectId],
        ref: 'comments'
    },
    commented_by: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'users'
    },
    isReply: {
        type: Boolean,
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }

},
{
    timestamps: {
        createdAt: 'commentedAt'
    }
})

const CommentModel = model("comments", CommentSchema)
 const createNewComment = async () => {
    const newComment = new CommentModel({
        blog_id: blog_id,
        blog_author: blog_author,
        comment: comment,
        children: children,
        commented_by: commented_by,
        isReply: isReply,
        parent: parent
    })

    const comment = await CommentModel.create(newComment)
    return comment
}

const getOneComment = async ({ id }) => {
    const comment = await CommentModel.findById(id)
    return comment
}
export const updateComent = async (id) => {
    const comment = await CommentModel.findByIdAndUpdate(id, datos, { new: true })
    return comment;

} 

export const deleteComent = async (id) => {
    const comment = await CommentModel.findByIdAndDelete(id)
    return comment;
}

export const commentModel = {
    createNewComment,
    getOneComment,
    updateComent,
    deleteComent
}; 








