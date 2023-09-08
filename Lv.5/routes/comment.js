import express from 'express';
import { prisma } from '../utils/prisma.js';
import { CommentRepository } from '../repositories/comment.js';
import { CommentService } from '../services/comment.js';
import { CommentController } from '../controllers/comment.js';
import validator from '../middlewares/validator.js';
import authorizator from '../middlewares/authorizator.js';

const router = express.Router({ mergeParams: true });

const commentRepository = new CommentRepository(prisma);
const commentService = new CommentService(commentRepository);
const commentController = new CommentController(commentService);

// 특정 게시글의 댓글 목록 조회
router.get('/', commentController.getAllComments);

// 댓글 작성
router.post('/', validator('createComment'), authorizator, commentController.createComment);

// 댓글 수정
router.put('/:commentId', validator('updateComment'), authorizator, commentController.updateComment);

// 댓글 삭제
router.delete('/:commentId', authorizator, commentController.deleteComment);

export default router;