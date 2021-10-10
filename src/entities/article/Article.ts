import { formmatDateOnSlug } from '@/utils/date';
import { v4 as uuidv4 } from 'uuid';
import TagList from '../tagList/TagList';
import User from '../user/User';

export default class Article {
  #id: string;
  #title: string;
  #content: string;
  #description: string;
  #author: User;
  #status: string;
  #slug: string;
  #tags: TagList;
  #createdAt: Date;
  #updateAt: Date;

  constructor(
    id: string,
    title: string,
    content: string,
    description: string,
    author: User,
    status: string,
    slug: string,
    tags?: string[],
    createdAt?: string,
    updatedAt?: string,
  ) {
    this.#id = id;
    this.#title = title;
    this.#content = content || '';
    this.#description = description || '';
    this.#author = author;
    this.#status = status;
    this.#slug = slug;
    this.#tags = new TagList(tags);
    this.#createdAt = createdAt ? new Date(createdAt) : null;
    this.#updateAt = updatedAt ? new Date(updatedAt) : null;
  }

  static createSlug(title: string): string {
    title = title.replace(/^\s+|\s+$/g, ''); // trim
    title = title.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
    const to = 'aaaaeeeeiiiioooouuuunc------';

    for (let i = 0; i < from.length; i++) {
      title = title.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    title = title
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return `${title}-${ formmatDateOnSlug(Date.now())}`;
  }

  static createArticleWithoutId(
    title: string,
    content: string,
    description: string,
    author: User,
    status: string,
    tags?: string[],
  ) {
    return new Article(
      uuidv4(),
      title,
      content,
      description,
      author,
      status,
      this.createSlug(title),
      tags,
    );
  }

  static createArticleWithId(
    id: string,
    title: string,
    content: string,
    description: string,
    author: User,
    status: string,
    slug: string,
    tags?: string[],
    createdAt?: string,
    updatedAt?: string,
  ) {
    return new Article(
      id,
      title,
      content,
      description,
      author,
      status,
      slug,
      tags,
      createdAt,
      updatedAt,
    );
  }

  get id(): string {
    return this.#id;
  }

  get title(): string {
    return this.#title;
  }

  get content(): string {
    return this.#content;
  }

  set content(newContent: string) {
    this.#content = newContent;
  }

  get description(): string {
    return this.#description;
  }

  set description(newDescription: string) {
    this.#description = newDescription;
  }

  get author(): User {
    return this.#author;
  }

  get status(): string {
    return this.#status;
  }

  set status(newStatus: string) {
    this.#status = newStatus;
  }

  get slug() {
    return this.#slug;
  }

  get tags(): TagList {
    return this.#tags;
  }

  get createdAt(): Date {
    return this.#createdAt;
  }

  get updatedAt(): Date {
    return this.#updateAt;
  }
}
