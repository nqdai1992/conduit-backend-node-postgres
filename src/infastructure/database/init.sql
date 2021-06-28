DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE,
    bio TEXT,
    image TEXT,
    token VARCHAR(1000) UNIQUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS articles CASCADE;
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255),
    slug VARCHAR(255),
    description TEXT,
    body TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS tags CASCADE;
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    label VARCHAR(255) UNIQUE
);

DROP TABLE IF EXISTS following CASCADE;
CREATE TABLE following (
    follower_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    target_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (follower_id, target_id)
);

DROP TABLE IF EXISTS favorites CASCADE;
CREATE TABLE favorites (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
    PRIMARY KEY(user_id, article_id)
);

DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE comments (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
    content TEXT,
    PRIMARY KEY(user_id, article_id)
);

DROP TABLE IF EXISTS articles_tags CASCADE;
CREATE TABLE articles_tags (
    article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY(article_id, tag_id)
);

