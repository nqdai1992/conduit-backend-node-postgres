import { assert } from 'chai';
import TagList from './TagList';

describe ('TagList', () => {
    describe('constructor', () => {
        it('should remove the invalid tag', () => {
            const tagList = new TagList([ '#react', 'react so good', 'react'])

            assert.equal(tagList.tags.length, 1)
        })
    })
    describe('.add', () => {
        it('should add more a tag', () => {
            const tagList = new TagList()
            const tag = '#react'

            tagList.add(tag)

            assert.equal(tagList.tags.length, 1)
        })

        it ('should not add the tag that does not start with hash symbol', () => {
            const tagList = new TagList()
            const tag = 'react'

            tagList.add(tag)

            assert.equal(tagList.tags.length, 0)
        })

        it ('should not add the tag that has space between the words', () => {
            const tagList = new TagList()
            const tag = '#react so good'

            tagList.add(tag)

            assert.equal(tagList.tags.length, 0)
        })
    })

    describe('.remove', () => {
        it ('should remove the tag', () => {
            const tagList = new TagList([ '#react' ])

            tagList.remove('#react')

            assert.equal(tagList.tags.length, 0)
        })
    })
})