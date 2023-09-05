const selector = {
    viewPostList: {
        postId: true,
        userId: true,
        nickname: true,
        title: true,
        likeCount: true,
        createdAt: true,
        updatedAt: true,
    },

    viewPost: {
        postId: true,
        userId: true,
        nickname: true,
        title: true,
        content: true,
        likeCount: true,
        createdAt: true,
        updatedAt: true,
    },

    viewCommentList: {
        commentId: true,
        userId: true,
        nickname: true,
        content: true,
        createdAt: true,
        updatedAt: true,
    }
}

export default selector;