export interface ITag {
    label: string;
}

export interface TagEntity {
    toObject: () => ITag,
    update: (newTag: ITag) => TagEntity
}

const Tag = (initTag: ITag): TagEntity => ({
  toObject: () => initTag,
  update: (newTag: ITag) => Tag(newTag)
})

export default Tag;