import { assert } from 'chai'
import { createUserWithId, createUserWithoutId } from './User'

describe('User', () => {
  describe('createUserWithoutId', () => {
    it('create a new user', () => {
      const email = 'fakeemail@gmail.com'
      const username = 'fakeusername'

      const newUser = createUserWithoutId(username, email)

      assert.equal(newUser.getUsername(), username)
      assert.equal(newUser.getEmail(), email)
      assert.isNotNull(newUser.getId())
    })
  })

  describe('createUserWithId', () => {
    it('load from existed user', () => {
      const email = 'fakeemail@gmail.com'
      const username = 'fakeusername'
      const userId = 'fakeuserid'

      const newUser = createUserWithId(userId, username, email)

      assert.equal(newUser.getUsername(), username)
      assert.equal(newUser.getEmail(), email)
      assert.equal(newUser.getId(), userId)
    })
  })

  describe('.follow', () => {
    it('save the id of followed user ', () => {
      const user1 = createUserWithoutId('username1', 'user1@mail.com')
      const user2 = createUserWithoutId('username2', 'user2@mail.com')

      assert.include(user1.follow(user2).getFollowsUserIds(), user2.getId())
    })

    it ('can not follow themselves', () => {
      const user1 = createUserWithoutId('username1', 'user1@mail.com')

      assert.notInclude(user1.follow(user1).getFollowsUserIds(), user1.getId())
    })

    it ('can not follow duplicate user', () => {
      const user1 = createUserWithoutId('username1', 'user1@mail.com')
      const user2 = createUserWithoutId('username2', 'user2@mail.com')

      const followedUserIds = user1.follow(user2).follow(user2).getFollowsUserIds()

      assert.equal(followedUserIds.filter(id => id === user2.getId()).length, 1)
    })
  })

  describe('.unfollow', () => {
    it('remove the id of target user', () => {
      const user1 = createUserWithoutId('username1', 'user1@mail.com')
      const user2 = createUserWithoutId('username2', 'user2@mail.com')
      const followedUserIds = user1.follow(user2).unfollow(user2).getFollowsUserIds()

      assert.notInclude(followedUserIds, user2.getId())
    })

    it('can not remove the id that does not existed ', () => {
      const user1 = createUserWithoutId('username1', 'user1@mail.com')
      const user2 = createUserWithoutId('username2', 'user2@mail.com')

      const followedUserIds = user1.unfollow(user2).getFollowsUserIds()

      assert.equal(followedUserIds.length, 0)
    })
  })
})