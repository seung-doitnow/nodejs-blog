import express from 'express';
import { prisma } from '../utils/prisma.js';
import { PostRepository } from '../repositories/post.js';
import { PostService } from '../services/post.js';
import { PostController } from '../controllers/post.js';
import validator from '../middlewares/validator.js';
import authorizator from '../middlewares/authorizator.js';

const router = express.Router();

const postRepository = new PostRepository(prisma);
const postService = new PostService(postRepository);
const postController = new PostController(postService);

// 전체 게시글 목록 조회
router.get('/', postController.getAllPosts);

// 게시글 상세 조회
router.get('/:postId', postController.getOnePost);

// 게시글 작성
router.post('/', validator('createPost'), authorizator, postController.createPost);

// 게시글 수정
router.put('/:postId', validator('updatePost'), authorizator, postController.updatePost);

// 게시글 삭제
router.delete('/:postId', authorizator, postController.deletePost);

export default router;