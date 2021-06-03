import { FaTimesCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';

function UserFeeds({ feeds, switchDisplayedFeed, deleteFeed }) {
  console.log(feeds);

  if (feeds.length > 0) {
    return (
      <>
        {feeds.length > 0 ? (
          <ul className='box-g3 user-feeds'>
            {feeds.map((feed) => (
              <li className='user-feeds-item' key={feed.feed.url}>
                <div className='btn' onClick={(e) => switchDisplayedFeed(e, feed.feed.url)}>
                  {decodeURIComponent(feed.feed.title)}
                </div>
                {/* <IconContext.Provider value={{ onMouseOver: '' }}> */}
                <FaTimesCircle
                  className='delete-btn'
                  onClick={(e) => deleteFeed(e, feed.feed.title, feed.feed.url)}
                />
                {/* </IconContext.Provider> */}
              </li>
            ))}
          </ul>
        ) : (
          <ul className='gradient2 user-feeds'></ul>
        )}
      </>
    );
  } else {
    return <ul className='gradient2 user-feeds'></ul>;
  }
}

export default UserFeeds;
