import React, { useEffect, useState } from 'react';
import { getTopStoryIds, getTenRandomStories } from '../../services/hnApi';
import { IStory } from '../../types/storyModels';
import { HNStoryItem } from '../hn_story_item/HNStoryItem';
import { mapTime } from '../../mappers/timeMapper';
import { BouncingDotsLoader } from '../../BouncingDotsLoader'

export const HNBody = () => {
    const [storyIds, setStoryIds] = useState<number[]>([]);
    const [stories, setStories] = useState<IStory[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // wait until all promises resolve at once before displaying any data
    const loadStories = () => {        
        getTopStoryIds()
            .then(respIds => {
                setStoryIds(respIds)
                return respIds
            })
            .then(storyIds => getTenRandomStories(storyIds))
            .then(respRandomStories => {
                setStories(respRandomStories)
                setIsLoading(false)
                return
            })
    }

    useEffect(() => {
        loadStories();
    }, [])

    return (
        <React.Fragment>
            {
                isLoading
                ? <BouncingDotsLoader />
                : <div className='body'>
                    { 
                        stories.map((story: any, index: number) => (
                            <HNStoryItem
                            key={ index } 
                            title={ story.title } 
                            author={ story.author } 
                            authorKarma={ story.authorKarma.toLocaleString() }
                            score={ story.score.toLocaleString() }
                            comments={ story.comments ? story.comments.length.toLocaleString() : 0 }
                            time={ mapTime(story.time) } 
                            url={ story.url } 
                            />
                        ))
                    }
                </div>
            }
        </React.Fragment>
    );
}