import { FaTimesCircle } from 'react-icons/fa'
// import { IconContext } from 'react-icons'
// import { Scrollbars } from 'react-custom-scrollbars';
import { useSelector, useDispatch } from 'react-redux'
import { feedRemoved, setFeedIndex, selectFeeds, selectFeedIndex } from '../features/feedsApi/feedsSlice'

function UserFeeds() {
  // console.log(feeds);

  const dispatch = useDispatch()
  const themeRedux = useSelector((state) => state.theme)
  const userFeeds = useSelector(selectFeeds)
  const currentFeedIndex = useSelector(selectFeedIndex)

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

  // Delete a feed from the App state
  const deleteFeed = async (e, title, url) => {
    // console.log(e);
    console.log(title)

    dispatch(feedRemoved(url))
    localStorage.removeItem(url)

    console.log(`switch displayed-feed : ${userFeeds.length - 2}`)
    dispatch(setFeedIndex(userFeeds.length - 2))
  }

  let feedList = []
  if (userFeeds.length > 0) {
    feedList = userFeeds.map((feed, index) => (
      <li className='user-feeds-item' key={feed.feed.url}>
        <div className={`btn ${index === currentFeedIndex ? 'active-feed' : ''}`} onClick={(e) => switchDisplayedFeed(e, feed.feed.url)}>
          {decodeURIComponent(feed.feed.title).slice(0, 16) + (feed.feed.title.length > 16 ? '...' : '')}
        </div>
        {/* <IconContext.Provider value={{ onMouseOver: '' }}> */}
        <FaTimesCircle className='delete-btn' onClick={(e) => deleteFeed(e, feed.feed.title, feed.feed.url)} />
        {/* </IconContext.Provider> */}
      </li>
    ))
  }

  if (userFeeds.length > 0) {
    return <div>{userFeeds.length > 0 ? <ul className={`br10 user-feeds ${themeRedux.card1}`}>{feedList}</ul> : <ul className='br10 user-feeds'></ul>}</div>
  } else {
    // return <ul className='gradient2 user-feeds'></ul>;
    return <ul className={`br10 user-feeds ${themeRedux.card1}`}>No feeds registered</ul>
  }
}

export default UserFeeds
