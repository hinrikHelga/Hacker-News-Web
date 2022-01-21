import axios from 'axios';
import { randomizeStoryIds } from '../utils/utils';
import { IStory } from '../types/storyModels';
import { IAuthor } from '../types/authorModels';

export const baseURL = `https://hacker-news.firebaseio.com/v0/`;

// get the top 500 news ids
export const getTopStoryIds = async (): Promise<number[]> => {
    const topStoriesUrl = `${baseURL}topstories.json`;

    const topStories = await axios
        .get(topStoriesUrl)
        .then(({ data }) => randomizeStoryIds(data));
    return topStories;
}

export const getStory = async (id: number): Promise<IStory> => {
    const storyUrl = `${baseURL}item/`;

    const responseData = await axios
        .get(`${storyUrl + id}.json`)
        .then(({ data }) => data);

    const story: IStory = {
        id: id,
        title: responseData.title,
        url: responseData.url,
        time: responseData.time,
        score: responseData.score,
        comments: responseData.kids,
        author: responseData.by
    }
    
    return story;
}

export const getAuthor = async (id: string): Promise<IAuthor> => {
    const authorURL = `${baseURL}user/`

    const responseData = await axios
        .get(`${authorURL + id}.json`)
        .then(({ data }) => data);

    const author: IAuthor = {
        karma: responseData.karma
    }

    return author
}

// use the random ids to get necessary data on the stories and wait for all requests to complete.
export const getTenRandomStories = async (ids: number[]): Promise<IStory[]> => {
    const stories = await Promise.all(ids.map(getStory))

    const storyAuthors = stories.map((story) => story.author)
    const authorKarma = await Promise.all(storyAuthors.map(getAuthor))

    // map correct author karma to a story
    for (let i in stories) {
        stories[i].authorKarma = authorKarma[i].karma
    }

    return stories;
}