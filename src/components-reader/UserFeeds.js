import { FaTimesCircle } from 'react-icons/fa'
// import { IconContext } from 'react-icons'
// import { Scrollbars } from 'react-custom-scrollbars';
import { useSelector } from 'react-redux'

function UserFeeds({ feeds, displayedFeed, switchDisplayedFeed, deleteFeed }) {
  // console.log(feeds);

  const themeRedux = useSelector((state) => state.theme)

  let feedList = []
  if (feeds.length > 0) {
    feedList = feeds.map((feed, index) => (
      <li className='user-feeds-item' key={feed.feed.url}>
        <div className={`btn ${index === displayedFeed ? 'active-feed' : ''}`} onClick={(e) => switchDisplayedFeed(e, feed.feed.url)}>
          {decodeURIComponent(feed.feed.title).slice(0, 16) + (feed.feed.title.length > 16 ? '...' : '')}
        </div>
        {/* <IconContext.Provider value={{ onMouseOver: '' }}> */}
        <FaTimesCircle className='delete-btn' onClick={(e) => deleteFeed(e, feed.feed.title, feed.feed.url)} />
        {/* </IconContext.Provider> */}
      </li>
    ))
  }

  if (feeds.length > 0) {
    return <div>{feeds.length > 0 ? <ul className={`br10 user-feeds ${themeRedux.card1}`}>{feedList}</ul> : <ul className='br10 user-feeds'></ul>}</div>
  } else {
    // return <ul className='gradient2 user-feeds'></ul>;
    return <ul className={`br10 user-feeds ${themeRedux.card1}`}>No feeds registered</ul>
  }
}

export default UserFeeds
