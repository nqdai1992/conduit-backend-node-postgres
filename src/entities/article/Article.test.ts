import { formmatDateOnSlug } from '@/utils/date';
import { assert } from 'chai';
import User from '../user/User';
import Article from './Article';
describe('Article', () => {
  describe('.createArticleWithoutId', () => {
    it('returns a new article has id', async () => {
      const title = 'New article';
      const content = 'New content';
      const description = 'New description';
      const status = 'draft';
      const author = await User.createUserWithoutId('author1', 'author1@mail.com', 'test123');

      const newArticle = Article.createArticleWithoutId(
        title,
        content,
        description,
        author,
        status,
      );

      assert.isNotNull(newArticle.id);
    });

    it('returns a new article has slug', async () => {
      const title = 'New article';
      const content = 'New content';
      const description = 'New description';
      const status = 'draft';
      const author = await User.createUserWithoutId('author1', 'author1@mail.com', 'test123');

      const newArticle = Article.createArticleWithoutId(
        title,
        content,
        description,
        author,
        status,
      );

      assert.isNotNull(newArticle.slug);
    });
  });

  describe('.createArticleWithId', () => {
    it('returns a valid article', async () => {
      const title = 'New article';
      const content = 'New content';
      const description = 'New description';
      const status = 'draft';
      const articleId = 'fake-id';
      const slug = 'new-article';
      const author = await User.createUserWithoutId('author1', 'author1@mail.com', 'test123');
      const favorites = 10;

      const article = Article.createArticleWithId(
        articleId,
        title,
        content,
        description,
        author,
        status,
        slug,
        favorites,
      );

      assert.equal(article.id, articleId);
    });
  });

  describe('.createSlug', () => {
    it('should return a valid slug', async () => {
      const title = 'New article';
      const content = 'New content';
      const description = 'New description';
      const status = 'draft';
      const author = await User.createUserWithoutId('author1', 'author1@mail.com', 'test123');
      const today = Date.now();

      const article = Article.createArticleWithoutId(
        title,
        content,
        description,
        author,
        status,
      );

      assert.equal(article.slug, `new-article-${formmatDateOnSlug(today)}`);
    });
  });

  describe('.increaseFavorites', () => {
    it('should increase the favorites of the article by one', async () => {
      const title = 'New article';
      const content = 'New content';
      const description = 'New description';
      const status = 'draft';
      const articleId = 'fake-id';
      const slug = 'new-article';
      const author = await User.createUserWithoutId('author1', 'author1@mail.com', 'test123');
      const favorites = 10;
      const article = Article.createArticleWithId(
        articleId,
        title,
        content,
        description,
        author,
        status,
        slug,
        favorites,
      );

      article.increaseFavorite();

      assert.equal(article.favorites, 11);
    });
  });

  describe('.decreaseFavorites', () => {
    it('should decrease the favorites of the article by one', async () => {
      const title = 'New article';
      const content = 'New content';
      const description = 'New description';
      const status = 'draft';
      const articleId = 'fake-id';
      const slug = 'new-article';
      const author = await User.createUserWithoutId('author1', 'author1@mail.com', 'test123');
      const favorites = 10;
      const article = Article.createArticleWithId(
        articleId,
        title,
        content,
        description,
        author,
        status,
        slug,
        favorites,
      );

      article.decreaseFavorite();

      assert.equal(article.favorites, 9);
    });

    it('should not decrease the favorites of the article if the favorites equal 0', async () => {
        const title = 'New article';
        const content = 'New content';
        const description = 'New description';
        const status = 'draft';
        const articleId = 'fake-id';
        const slug = 'new-article';
        const author = await User.createUserWithoutId('author1', 'author1@mail.com', 'test123');
        const favorites = 0;
        const article = Article.createArticleWithId(
          articleId,
          title,
          content,
          description,
          author,
          status,
          slug,
          favorites,
        );
  
        article.decreaseFavorite();
  
        assert.equal(article.favorites, 0);
      });
  });
});
