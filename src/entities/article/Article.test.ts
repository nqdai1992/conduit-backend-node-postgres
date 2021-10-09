import { assert } from 'chai'
import User from '../user/User'
import Article from './Article'
describe('Article', () => {
    describe('.createArticleWithoutId', () => {
        it ('returns a new article has id', () => {
            const title = 'New article'
            const content = 'New content'
            const description = 'New description'
            const status = 'draft'
            const author = User.createUserWithoutId('author1', 'author1@mail.com')

            const newArticle = Article.createArticleWithoutId(title, content, description, author, status)

            assert.isNotNull(newArticle.id)    
        })
    })

    describe('.createArticleWithId', () => {
        it('returns a valid article', () => {
            const title = 'New article'
            const content = 'New content'
            const description = 'New description'
            const status = 'draft'
            const articleId = 'fake-id'
            const author = User.createUserWithoutId('author1', 'author1@mail.com')

            const article = Article.createArticleWithId(articleId, title, content, description, author, status)

            assert.equal(article.id, articleId)    
        })
    })
})