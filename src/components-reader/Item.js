import { useState, useContext } from 'react';
import { ThemeContext, MyContext } from './Context';

function Item({ data }) {
  const [showDescription, setShowDescription] = useState(false);
  const { show, toggleShow } = useContext(MyContext);
  const { theme } = useContext(ThemeContext);

  const onHover = () => {
    // setShowDescription(!showDescription);
    setShowDescription(true);
  };
  const onHoverOut = () => {
    setShowDescription(false);
  };

  return (
    <li
      className={`display-item box-g2 ${theme.card2}`}
      onClick={onHover}
      onMouseLeave={onHoverOut}
    >
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
        <div className={`display-item-title ${theme.card2}`}>
          {data.title.replace('&amp;', '&')}
        </div>
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
