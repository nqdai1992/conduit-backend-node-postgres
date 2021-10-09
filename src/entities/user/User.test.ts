import { assert } from 'chai'
import User from './User'

describe('User', () => {
  describe('createUserWithoutId', () => {
    it('return a new user has id', () => {
      const email = 'fakeemail@gmail.com'
      const username = 'fakeusername'

      const newUser = User.createUserWithoutId(username, email)

      assert.isNotNull(newUser.id)
    })
  })

  describe('createUserWithId', () => {
    it('return a existed user', () => {
      const email = 'fakeemail@gmail.com'
      const username = 'fakeusername'
      const userId = 'fakeuserid'

      const newUser = User.createUserWithId(userId, username, email)
      
      assert.equal(newUser.id, userId)
    })
  })

  describe('.follow', () => {
    it('save the id of followed user ', () => {
      const user1 = User.createUserWithoutId('username1', 'user1@mail.com')
      const user2 = User.createUserWithoutId('username2', 'user2@mail.com')

      user1.follow(user2)

      assert.include(user1.followedUserIds, user2.id)
    })

    it ('can not follow themselves', () => {
      const user1 = User.createUserWithoutId('username1', 'user1@mail.com')
      user1.follow(user1)

      assert.notInclude(user1.followedUserIds, user1.id)
    })

    it ('can not follow duplicate user', () => {
      const user1 = User.createUserWithoutId('username1', 'user1@mail.com')
      const user2 = User.createUserWithoutId('username2', 'user2@mail.com')

      user1
      .follow(user2)
      .follow(user2)
      

      assert.equal(user1.followedUserIds.length, 1)
    })
  })

  describe('.unfollow', () => {
    it('remove the id of target user', () => {
      const user1 = User.createUserWithoutId('username1', 'user1@mail.com')
      const user2 = User.createUserWithoutId('username2', 'user2@mail.com')
      user1
      .follow(user2)
      .unfollow(user2)

      assert.notInclude(user1.followedUserIds, user2.id)
    })
  })
})