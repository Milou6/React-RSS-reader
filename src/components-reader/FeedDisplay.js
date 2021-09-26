import Item from './Item'
// import { Scrollbars } from 'react-custom-scrollbars';
// import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import { useSelector, useDispatch } from 'react-redux'
import { feedLoadMore } from '../features/feedsApi/feedsSlice'

function FeedDisplay({ feed }) {
  const themeRedux = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  // ✨✨✨
  // const postStatus = useSelector(state => state.posts.status)
  // const error = useSelector(state => state.posts.error)

  const handleLoadMore = (e, feed) => {
    console.log(e.target)
    // let feedLength = feed.length
    // console.log(feedLength)
    dispatch(feedLoadMore(e.target))
  }

  let feedList = []
  if (feed) {
    feedList = feed.items.map((item) => <Item key={item.guid} data={item} />)
  }

  return (
    <div className={`feed-display br10 ${themeRedux.card1}`}>
      {/* <Scrollbars className='user-feeds-scrollbar' style={{ width: 1000, height: 600 }}> */}
      {/* <OverlayScrollbarsComponent> */}
      <ul>{feedList.length > 0 ? feedList : <li>No feed to display. Try to add an RSS link above!</li>}</ul>
      {/* </OverlayScrollbarsComponent> */}
      {/* </Scrollbars> */}
      <button onClick={(e, feed) => handleLoadMore(e, feed)} disabled={feed && feed.feed.isComplete}>
        {feed && feed.feed.isComplete ? 'No more feeds to load' : 'Load more'}
      </button>
    </div>
  )
}

export default FeedDisplay
