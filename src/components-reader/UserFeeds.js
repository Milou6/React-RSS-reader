import { FaTimesCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { Scrollbars } from 'react-custom-scrollbars';

function UserFeeds({ feeds, displayedFeed, switchDisplayedFeed, deleteFeed }) {
  // console.log(feeds);

  let feedList = [];
  if (feeds.length > 0) {
    feedList = feeds.map((feed, index) => (
      <li className='user-feeds-item' key={feed.feed.url}>
        <div
          className={`btn ${index === displayedFeed ? 'active-feed' : ''}`}
          onClick={(e) => switchDisplayedFeed(e, feed.feed.url)}
        >
          {decodeURIComponent(feed.feed.title).slice(0, 16) +
            (feed.feed.title.length > 16 ? '...' : '')}
        </div>
        {/* <IconContext.Provider value={{ onMouseOver: '' }}> */}
        <FaTimesCircle
          className='delete-btn'
          onClick={(e) => deleteFeed(e, feed.feed.title, feed.feed.url)}
        />
        {/* </IconContext.Provider> */}
      </li>
    ));
  }

  if (feeds.length > 0) {
    return (
      <>
        {feeds.length > 0 ? (
          <Scrollbars autoHeight className='user-feeds-scrollbar' style={{ width: 1100 }}>
            <ul className='br10 user-feeds'>{feedList}</ul>
          </Scrollbars>
        ) : (
          <ul className='br10 user-feeds'></ul>
        )}
      </>
    );
  } else {
    return <ul className='gradient2 user-feeds'></ul>;
  }
}

export default UserFeeds;
