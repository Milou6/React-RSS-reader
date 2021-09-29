import { useEffect } from 'react'
import AddFeedMenu from './components-reader/AddFeedMenu'
import FeedDisplay from './components-reader/FeedDisplay'
import UserFeeds from './components-reader/UserFeeds'
import SettingsMenu from './components-reader/SettingsMenu'
// import { MyContext } from './components-reader/Context'
// Redux imports
import { useSelector, useDispatch } from 'react-redux'
import { setThemeTo } from './features/theme/themeSlice'
import { setShowFeedDetails } from './features/feedsApi/feedsSlice'

// Local Storage is used to keep track of a user's saved feeds
const localStorage = window.localStorage

function App() {
  const themeRedux = useSelector((state) => state.theme)

  const dispatch = useDispatch()

  useEffect(() => {
    let savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark' || savedTheme === 'light') {
      dispatch(setThemeTo(savedTheme))
    }

    let savedShowDetails = localStorage.getItem('RSSshowDetails')
    if (savedShowDetails !== null) {
      dispatch(setShowFeedDetails(savedShowDetails))
    }
  }, [dispatch])

  return (
    // <MyContext.Provider value={{ show, toggleShow }}>
    <div className={`app-container ${themeRedux.background}`}>
      <AddFeedMenu />
      <UserFeeds />
      <div className='flex bottom-container'>
        <FeedDisplay />
        <SettingsMenu />
      </div>
    </div>
    // </MyContext.Provider>
  )
}

// http://www.reddit.com/.rss
// https://www.theguardian.com/international/rss
// https://lifehacker.com/rss
// http://rss.cnn.com/rss/edition.rss

export default App
