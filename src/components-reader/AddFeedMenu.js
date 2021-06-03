import { useState, useEffect } from 'react';

function AddFeedMenu({ onAdd }) {
  const [url, setUrl] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!url) {
      alert('Please add an URL to form');
      return;
    }

    onAdd(url);
    setUrl('');

    // onAdd({ text, day, reminder });

    // setText('');
    // setDay('');
    // setReminder(false);
  };

  return (
    <form className='add-feed-menu box-g2' onSubmit={onSubmit}>
      {/* <label>RSS URL:</label> */}
      <input
        type='text'
        placeholder='https://my-favorite-feed/rss'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <input type='submit' value='Add to Feed' className='btn accent add-feed-btn' />
    </form>
  );
}

export default AddFeedMenu;
