import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../features/theme/themeSlice'
import feedsReducer from '../features/feedsApi/feedsSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    feeds: feedsReducer
  }
})
