import mongoose, { Schema, model, models } from 'mongoose';

const CommentSchema = new Schema({
  ticketId: {
    type: Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
  },
}, { timestamps: true });

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;
