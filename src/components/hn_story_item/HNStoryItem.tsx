import { IStory } from '../../types/storyModels';

export const HNStoryItem = ({ title, url, time, score, author, authorKarma, comments }: IStory) => {
    return (
        <div className='item'>
            <a href={ url as string }>
                <h3>{ title }</h3>
            </a>
            <div>
                <span>{ score } points by { author } ({ authorKarma } karma) | { time } ago </span>
                <span> | { comments } Comments </span>
            </div>
        </div>
    );
}