import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// const fetch = require('node-fetch')

const initialState = {
  feeds: [],
  status: 'idle',
  error: null,
  currentFeedIndex: 0
}

const localStorage = window.localStorage
export const fetchFeedsFromLocalStorage = createAsyncThunk('feeds/fetchFeedsFromLocalStorage', async () => {
  // for each url saved in LS, add it to our feedPromises array
  let feedPromises = []
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i)
    if (key !== 'theme') {
      feedPromises.push(fetch(`/.netlify/functions/fetchfeed?url=${key}&offset=0`).then((response) => response.json()))
    }
  }

  let feedResults = []
  /* results of Promise.allSettled() will be an array of {status: "fulfilled", value: . . . } objects
     We need to extract object.value for the actual RSS feeds of each link */
  await Promise.allSettled(feedPromises).then((results) => results.forEach((result) => feedResults.push(result.value)))

  return feedResults
})

export const feedLoadMore = createAsyncThunk('feeds/feedLoadMore', async (targetBtn, thunkAPI) => {
  const state = thunkAPI.getState()
  // console.log(state)

  const currentDisplayedFeed = state.feeds.feeds[state.feeds.currentFeedIndex]
  // console.log(currentDisplayedFeed)
  const url = currentDisplayedFeed.feed.url
  const currentFeedLength = currentDisplayedFeed.items.length

  const newFeeds = await fetch(`/.netlify/functions/fetchfeed?url=${url}&offset=${currentFeedLength}`).then((response) => response.json())

  return newFeeds
})

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    feedAdded: (state, action) => {
      const newFeed = action.payload
      state.feeds.push(newFeed)
    },
    feedRemoved: (state, action) => {
      const urlToRemove = action.payload
      // filter all Feeds with URL marked to remove
      state.feeds = state.feeds.filter((feed) => feed.feed.url !== urlToRemove)
    },
    setFeedIndex: (state, action) => {
      state.currentFeedIndex = action.payload
      return state
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedsFromLocalStorage.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchFeedsFromLocalStorage.fulfilled, (state, action) => {
        state.status = 'idle'
        state.feeds = action.payload
      })
      .addCase(feedLoadMore.pending, (state, action) => {
        // console.log(action)
      })
      .addCase(feedLoadMore.fulfilled, (state, action) => {
        const payloadItems = [...action.payload.items]
        console.log(payloadItems)
        state.feeds[state.currentFeedIndex].items.push(...payloadItems)

        if (payloadItems.length === 0) {
          console.log('NO MORE FEEDS TO LOAD')
          state.feeds[state.currentFeedIndex].feed.isComplete = true
        }
        return state
      })
  }
})

export const { feedAdded, feedRemoved, setFeedIndex } = feedsSlice.actions

export const selectFeeds = (state) => state.feeds.feeds
export const selectFeedIndex = (state) => state.feeds.currentFeedIndex

export default feedsSlice.reducer
