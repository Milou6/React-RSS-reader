import { useState, useContext } from 'react'
import { MyContext } from './Context'

import { useSelector } from 'react-redux'

function Item({ data }) {
  const [showDescription, setShowDescription] = useState(false)
  const { show } = useContext(MyContext)

  const themeRedux = useSelector((state) => state.theme)

  const onHover = () => {
    // setShowDescription(!showDescription);
    setShowDescription(true)
  }
  const onHoverOut = () => {
    // setShowDescription(false)
  }

  return (
    <li className={`display-item box-g2 ${themeRedux.card2}`} onClick={onHover} onMouseLeave={onHoverOut}>
      <span className='display-item-header'>
        <div>
          <a className='btn link-btn accent' target='_blank' rel='noopener noreferrer' href={data.link}>
            Link
          </a>
        </div>
        <div className={`display-item-title ${themeRedux.card2}`}>{data.title.replace('&amp;', '&')}</div>
        <span className='display-item-arrow'>▼</span>
      </span>

      {(show || showDescription) && <div className='display-item-description' dangerouslySetInnerHTML={{ __html: data.description }} />}
    </li>
  )
}

export default Item
