import { useState } from 'react'
import { useSelector } from 'react-redux'

function Item({ data }) {
  const [showDescription, setShowDescription] = useState(false)

  const themeRedux = useSelector((state) => state.theme)
  const show = useSelector((state) => state.feeds.showFeedDetails)

  const handleClick = () => {
    setShowDescription(!showDescription)
  }

  return (
    <li className={`display-item br10 box-g2 ${themeRedux.card2}`} onClick={handleClick}>
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
