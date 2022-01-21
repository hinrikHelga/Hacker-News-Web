// randomise story ids to get 10 ids from total ids
export const randomizeStoryIds = (ids: number[]) => ids.sort(() => 0.5 - Math.random()).slice(0,10)