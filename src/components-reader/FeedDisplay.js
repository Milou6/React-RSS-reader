import { useState } from 'react';
import Item from './Item';
import { Scrollbars } from 'react-custom-scrollbars';
// import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

function FeedDisplay({ feed }) {
  // const [items, setItems] = useState([]);

  // const [showDescription, setShowDescription] = useState(false);

  // const onHover = () => {
  //   setShowDescription(!showDescription);
  // };

  let feedList = [];
  if (feed) {
    feedList = feed.items.map((item) => <Item key={item.guid} data={item} />);
  }

  return (
    <div className='feed-display br10'>
      <Scrollbars className='user-feeds-scrollbar' style={{ width: 1000, height: 600 }}>
        {/* <OverlayScrollbarsComponent> */}
        <ul>{feedList.length > 0 ? feedList : <li>Waiting for feed item data...</li>}</ul>
        {/* </OverlayScrollbarsComponent> */}
      </Scrollbars>
    </div>
  );
}

export default FeedDisplay;
