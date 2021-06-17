import { useState, useContext } from 'react';
import { MyContext } from './Context';

function Item({ data }) {
  const [showDescription, setShowDescription] = useState(false);
  const { show, toggleShow } = useContext(MyContext);

  const onHover = () => {
    // setShowDescription(!showDescription);
    setShowDescription(true);
  };
  const onHoverOut = () => {
    setShowDescription(false);
  };

  // onClick={setShowDescription(!showDescription)}
  // onMouseLeave={onHoverOut}

  return (
    <li className='display-item box-g2' onClick={onHover} onMouseLeave={onHoverOut}>
      <span className='display-item-header'>
        <div>
          <a
            className='btn link-btn accent'
            target='_blank'
            rel='noopener noreferrer'
            href={data.link}
          >
            Link
          </a>
        </div>
        <div className='display-item-title'>{data.title.replace('&amp;', '&')}</div>
        <span className='display-item-arrow'>▼</span>
      </span>

      {(show || showDescription) && (
        <div
          className='display-item-description'
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      )}
    </li>
  );
}

export default Item;
