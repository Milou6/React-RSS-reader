import { useState } from 'react';
import Item from './Item';

function FeedDisplay({ feed }) {
  // const [items, setItems] = useState([]);

  // const [showDescription, setShowDescription] = useState(false);

  // const onHover = () => {
  //   setShowDescription(!showDescription);
  // };

  return (
    <div className='feed-display box-g3'>
      <ul>
        {feed.items.map((item) => (
          <Item key={item.guid} data={item} />
        ))}
      </ul>
    </div>
  );
}

export default FeedDisplay;
