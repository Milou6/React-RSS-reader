import { useState, useContext } from 'react';
import Item from './Item';
import { ThemeContext } from './Context';
// import { Scrollbars } from 'react-custom-scrollbars';
// import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

function FeedDisplay({ feed }) {
  // const [items, setItems] = useState([]);

  // const [showDescription, setShowDescription] = useState(false);

  // const onHover = () => {
  //   setShowDescription(!showDescription);
  // };

  // const [show, setShow] = useState(false);
  // const toggleShow = () => {
  //   console.log('toggle theme!');
  //   setShow(!show);
  // };

  const { theme } = useContext(ThemeContext);

  let feedList = [];
  if (feed) {
    feedList = feed.items.map((item) => <Item key={item.guid} data={item} />);
  }

  return (
    <div className={`feed-display br10 ${theme.card1}`}>
      {/* <Scrollbars className='user-feeds-scrollbar' style={{ width: 1000, height: 600 }}> */}
      {/* <OverlayScrollbarsComponent> */}
      <ul>{feedList.length > 0 ? feedList : <li>Waiting for feed item data...</li>}</ul>
      {/* </OverlayScrollbarsComponent> */}
      {/* </Scrollbars> */}
    </div>
  );
}

export default FeedDisplay;
