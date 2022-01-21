export interface IStory {
    id?: number,
    title: string,
    url: string,
    time: string,
    score: string
    author: string,
    comments: number[]
    authorKarma?: number
}