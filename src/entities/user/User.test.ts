import { assert } from 'chai'
import User from './User'

describe('User', () => {
  describe('.createUserWithoutId', () => {
    it('return a new user has id', async () => {
      const email = 'fakeemail@gmail.com'
      const username = 'fakeusername'
      const password = '123123'

      const newUser = await User.createUserWithoutId(username, email, password)

      assert.isNotNull(newUser.id)
    })
  })

  describe('.createUserWithId', () => {
    it('return a existed user', () => {
      const email = 'fakeemail@gmail.com'
      const username = 'fakeusername'
      const userId = 'fakeuserid'
      const password = '123123'

      const newUser = User.createUserWithId(userId, username, email, password)
      
      assert.equal(newUser.id, userId)
    })
  })

  describe('.follow', () => {
    it('save the id of followed user ', () => {
      const user1 = User.createUserWithId('user_id_1', 'username1', 'user1@mail.com', 'password1')
      const user2 = User.createUserWithId('user_id_2','username2', 'user2@mail.com', 'password2')

      user1.follow(user2)

      assert.include(user1.followedUserIds, user2.id)
    })

    it ('can not follow themselves', () => {
      const user1 = User.createUserWithId('user_id_1', 'username1', 'user1@mail.com', 'password1')
      user1.follow(user1)

      assert.notInclude(user1.followedUserIds, user1.id)
    })

    it ('can not follow duplicate user', () => {
      const user1 = User.createUserWithId('user_id_1', 'username1', 'user1@mail.com', 'password1')
      const user2 = User.createUserWithId('user_id_2','username2', 'user2@mail.com', 'password2')

      user1
      .follow(user2)
      .follow(user2)
      

      assert.equal(user1.followedUserIds.length, 1)
    })
  })

  describe('.unfollow', () => {
    it('remove the id of target user', () => {
      const user1 = User.createUserWithId('user_id_1', 'username1', 'user1@mail.com', 'password1')
      const user2 = User.createUserWithId('user_id_2','username2', 'user2@mail.com', 'password2')
      user1
      .follow(user2)
      .unfollow(user2)

      assert.notInclude(user1.followedUserIds, user2.id)
    })
  })

  describe('.isAuthenticated', () => {
    it('return true if input password and email match with user password and user email', async () => {
      const email = 'fakeemail@gmail.com'
      const username = 'fakeusername'
      const password = '123123'

      const newUser = await User.createUserWithoutId(username, email, password)

      assert.equal(await newUser.isAuthenticated(email, password), true)
    })
  })
})