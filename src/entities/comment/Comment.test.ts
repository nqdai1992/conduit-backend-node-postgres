import { assert } from 'chai'
import User from '../user/User'
import Comment from './Comment'

describe('Comment', () => {
    describe('.createCommentWithoutId', () => {
        it('should return a new comment has id', async () => {
            const author = await User.createUserWithoutId('author1', 'author1@gmail.com', 'test123')
            const comment = Comment.createCommentWithoutId('Comment content', 'article-id', author)

            assert.isNotNull(comment.id)
        })
    })

    describe('.createCommentWithId', () => {
        it('should return a new comment has id', async () => {
            const author = await User.createUserWithoutId('author1', 'author1@gmail.com', 'test123')
            const comment = Comment.createCommentWithId('123', 'Comment content', 'article-id', author)

            assert.equal(comment.id, '123')
        })
    })
})