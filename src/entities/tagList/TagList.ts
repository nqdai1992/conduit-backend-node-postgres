export default class TagList {
    #tags: string[]

    constructor (tags?: string[]) {
        this.#tags = tags ? tags.filter(this.isValidTag) : []
    }

    get tags (): string[] {
        return this.#tags
    }

    private isValidTag (tag: string): boolean {
        const startsWithHashSymbol = tag.startsWith('#')
        const hashSpace = /\s/g.test(tag)

        return startsWithHashSymbol && !hashSpace
    }

    add (tag: string) {
        if (this.isValidTag(tag)) {
            this.#tags.push(tag)
        }
    }

    remove (tag: string) {
       this.#tags = this.#tags.filter(item => item !== tag) 
    }
}