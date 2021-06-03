import { useState } from 'react';

function Item({ data }) {
  const [showDescription, setShowDescription] = useState(false);

  const onHover = () => {
    setShowDescription(!showDescription);
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
          <span>{data.title}</span>
        </div>
        <span className='display-item-arrow'>▼</span>
      </span>

      {showDescription && (
        <div
          className='display-item-description'
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      )}
    </li>
  );
}

export default Item;
