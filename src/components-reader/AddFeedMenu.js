import { useState } from 'react'

import { useSelector } from 'react-redux'

function AddFeedMenu({ onAdd }) {
  const [url, setUrl] = useState('')

  const themeRedux = useSelector((state) => state.theme)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!url) {
      alert('Please choose a URL to add to your RSS feed!')
      return
    }
    onAdd(url)
    // reset field to placeholder
    setUrl('')
  }

  return (
    <form className={`add-feed-menu br10 ${themeRedux.card1}`} onSubmit={onSubmit}>
      {/* <label>RSS URL:</label> */}
      <input type='text' placeholder='https://my-favorite-feed/rss' value={url} onChange={(e) => setUrl(e.target.value)} />

      <input type='submit' value='Add to Feed' className='btn accent add-feed-btn' />
    </form>
  )
}

export default AddFeedMenu
