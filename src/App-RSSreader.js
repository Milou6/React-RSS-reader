import { useState, useEffect } from 'react'
import AddFeedMenu from './components-reader/AddFeedMenu'
import FeedDisplay from './components-reader/FeedDisplay'
import UserFeeds from './components-reader/UserFeeds'
import SettingsMenu from './components-reader/SettingsMenu'
import { MyContext } from './components-reader/Context'
// Redux imports
import { useSelector, useDispatch } from 'react-redux'
import { feedAdded, feedRemoved, setFeedIndex, selectFeeds, selectFeedIndex } from './features/feedsApi/feedsSlice'
import { setThemeTo } from './features/theme/themeSlice'

// Local Storage is used to keep track of a user's saved feeds
const localStorage = window.localStorage

function App() {
  const userFeeds = useSelector(selectFeeds)
  const currentFeedIndex = useSelector(selectFeedIndex)
  const themeRedux = useSelector((state) => state.theme)

  const dispatch = useDispatch()

  useEffect(() => {
    let currentTheme = localStorage.getItem('theme')
    if (currentTheme === 'dark' || currentTheme === 'light') {
      dispatch(setThemeTo(currentTheme))
    }
  }, [dispatch])

  // Activate a netlify function to get an RSS feed (using rss2json as a proxy)
  async function fetchFeedFromUrl(url) {
    try {
      // 💯 USING NETLIFY FUNCTIONS TO FETCH RSS FEED WITHOUT LEAKING API KEY
      const request = await fetch(`/.netlify/functions/fetchfeed?url=${url}&offset=0`)
      // console.log(request);

      // If request failed, we do an early return!
      if (request.status !== 200) {
        alert("Couldn't fetch feed from the URL provided. \n\nPlease check whether inputting the URL on https://rss2json.com gives a valid JSON.")
        throw new Error(request.statusText)
      }

      const json = await request.json()
      return json
    } catch (err) {
      console.log(err)
    }
  }

  // Add a feed to the App state (✨ passed down to AddFeedMenu)
  const addFeed = async (url) => {
    if (!localStorage.getItem(url)) {
      const response = await fetchFeedFromUrl(url)

      // If fetch failed, block below won't execute
      if (response) {
        dispatch(feedAdded(response))
        // set URL into local storage
        localStorage.setItem(url, 1)
        // Switch to newly added feed
        dispatch(setFeedIndex(userFeeds.length))
      }
    } else {
      alert('This feed is already on your display!')
    }
  }

  // Delete a feed from the App state
  const deleteFeed = async (e, title, url) => {
    // console.log(e);
    console.log(title)

    dispatch(feedRemoved(url))
    localStorage.removeItem(url)

    console.log(`switch displayed-feed : ${userFeeds.length - 2}`)
    dispatch(setFeedIndex(userFeeds.length - 2))
  }

  // Switch the feed to be displayed
  const switchDisplayedFeed = (e, feedUrl) => {
    // find the feed that matches title of button clicked
    let feedIndex = -1
    userFeeds.forEach((elm, index) => {
      if (elm.feed.url === feedUrl) {
        feedIndex = index
      }
    })
    if (feedIndex === -1) throw new Error('Feed requested not found!')
    // set the State var to update the displayed feed
    dispatch(setFeedIndex(feedIndex))
  }

  // ✨ Context toggle
  const [show, setShow] = useState(false)
  const toggleShow = () => {
    setShow(!show)
  }

  return (
    <MyContext.Provider value={{ show, toggleShow }}>
      <div className={`app-container ${themeRedux.background}`}>
        <AddFeedMenu onAdd={addFeed} />
        <UserFeeds feeds={userFeeds} displayedFeed={currentFeedIndex} switchDisplayedFeed={switchDisplayedFeed} deleteFeed={deleteFeed} />
        <div className='flex bottom-container'>
          <FeedDisplay feed={userFeeds[currentFeedIndex]} />
          <SettingsMenu />
        </div>
      </div>
    </MyContext.Provider>
  )
}

// http://www.reddit.com/.rss
// https://www.theguardian.com/international/rss
// https://lifehacker.com/rss
// http://rss.cnn.com/rss/edition.rss

export default App
