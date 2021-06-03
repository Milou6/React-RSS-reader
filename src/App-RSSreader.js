import { useState, useEffect } from 'react';
import AddFeedMenu from './components-reader/AddFeedMenu';
import FeedDisplay from './components-reader/FeedDisplay';
import UserFeeds from './components-reader/UserFeeds';

// https://cors-anywhere.herokuapp.com/

const localStorage = window.localStorage;

function App() {
  const [fetchedData, setFetchedData] = useState([]);
  const [displayedFeed, setDisplayedFeed] = useState(0);

  // On page load, check if user already has feeds in local storage
  useEffect(() => {
    setFetchedData([]);

    const reAddSavedFeeds = async () => {
      let reloadedFeeds = [];
      // for each url saved, reload it into display by calling addFeed()
      for (let i = 0; i < localStorage.length; i++) {
        let feed = await fetchFeedFromUrl(localStorage.key(i));
        reloadedFeeds.push(feed);
      }
      console.log(reloadedFeeds);
      setFetchedData([...fetchedData, ...reloadedFeeds]);
    };
    reAddSavedFeeds();
  }, []);

  // Fetch feed from url
  async function fetchFeedFromUrl(url) {
    try {
      const proxy = 'https://api.rss2json.com/v1/api.json?rss_url=';
      const encoded = encodeURIComponent(url);
      const key = /*🛑YOUR rss2json.com API KEY HERE🛑*/ 

      // console.log(fetchURL);
      const request = await fetch(fetchURL, {
        // credentials: 'include',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
      });

      const json = await request.json();
      return json;
    } catch (err) {
      console.log(err);
    }
  }

  // Add a feed to the App state
  const addFeed = async (url) => {
    if (!localStorage.getItem(url)) {
      const response = await fetchFeedFromUrl(url);

      // console.log('before:');
      // console.log(fetchedData);
      setFetchedData([...fetchedData, response]);
      // console.log('after:');
      // console.log(fetchedData);

      // set URL into local storage
      localStorage.setItem(url, 1);
    } else {
      alert('This feed is already on your display!');
    }
  };

  // Delete a feed from the App state
  const deleteFeed = async (e, title, url) => {
    // console.log(e);
    console.log(title);

    setFetchedData(fetchedData.filter((feed) => feed.feed.title !== title));
    localStorage.removeItem(url);
  };

  // Switch the feed to be displayed
  const switchDisplayedFeed = (e, feedUrl) => {
    console.log(e.target.innerHTML);

    // find the feed that matches title of button clicked
    let feedIndex = -1;
    fetchedData.forEach((elm, index) => {
      // if (elm.feed.title === e.target.innerHTML) feedIndex = index;
      if (elm.feed.url === feedUrl) feedIndex = index;
    });
    // console.log(feedIndex);
    if (feedIndex === -1) throw new Error('Feed requested not found!');
    // set the State var to update the displayed feed
    setDisplayedFeed(feedIndex);
  };

  return (
    <>
      <AddFeedMenu onAdd={addFeed} />
      {fetchedData.length > 0 ? (
        <UserFeeds
          feeds={fetchedData}
          switchDisplayedFeed={switchDisplayedFeed}
          deleteFeed={deleteFeed}
        />
      ) : (
        <p>Loading your feeds...</p>
      )}
      {fetchedData.length > 0 ? (
        <FeedDisplay feed={fetchedData[displayedFeed]} />
      ) : (
        <p>Nothing to show!!</p>
      )}
    </>
  );
}
// https://cors-anywhere.herokuapp.com/
// http://www.reddit.com/.rss
// https://www.theguardian.com/international/rss
// sss
// https://lifehacker.com/rss
export default App;
