import { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { feedAdded, setFeedIndex, selectFeeds } from '../features/feedsApi/feedsSlice'
import { fetchFeedFromUrl } from '../utils/fetchFeeds'

function AddFeedMenu() {
  const [url, setUrl] = useState('')

  const themeRedux = useSelector((state) => state.theme)
  const userFeeds = useSelector(selectFeeds)
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    if (!url) {
      alert('Please choose a URL to add to your RSS feed!')
      return
    }
    addFeed(url)
    // reset field to placeholder
    setUrl('')
  }

  // Add a feed to the App state (✨ passed down to AddFeedMenu)
  const addFeed = async (url) => {
    if (localStorage.getItem(url)) {
      alert('This feed is already on your display!')
      return
    }

    const response = await fetchFeedFromUrl(url)
    // If fetch failed, block below won't execute
    if (response) {
      dispatch(feedAdded(response))
      // set URL into local storage
      localStorage.setItem(url, 'RSSFeed')
      // Switch to newly added feed
      dispatch(setFeedIndex(userFeeds.length))
    }
  }

  return (
    <form className={`add-feed-menu br10 ${themeRedux.card1}`} onSubmit={onSubmit}>
      {/* <label>RSS URL:</label> */}
      <input type='text' placeholder='https://my-favorite-feed/rss' value={url} onChange={(e) => setUrl(e.target.value)} />

      <input type='submit' value='Add to Feed' className='btn accent add-feed-btn' />
    </form>
  )
}

export default AddFeedMenu
