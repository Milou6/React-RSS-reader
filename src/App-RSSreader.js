import { useState, useEffect, useContext } from 'react';
import AddFeedMenu from './components-reader/AddFeedMenu';
import FeedDisplay from './components-reader/FeedDisplay';
import UserFeeds from './components-reader/UserFeeds';
import SettingsMenu from './components-reader/SettingsMenu';
import { MyContext } from './components-reader/Context';

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
        // CHECKING THAT THE FEED != undefined
        if (feed) {
          reloadedFeeds.push(feed);
        }
      }
      // console.log(reloadedFeeds);
      setFetchedData([...fetchedData, ...reloadedFeeds]);
    };
    reAddSavedFeeds();
  }, []);

  // Fetch feed from url
  async function fetchFeedFromUrl(url) {
    try {
      // 💯 USING NETLIFY FUNCTIONS TO FETCH RSS FEED WITHOUT LEAKING API KEY
      const request = await fetch(`/.netlify/functions/fetchfeed?url=${url}`);
      // console.log(request);

      // If request failed, we do an early return!
      if (request.status !== 200) {
        alert(
          "Couldn't fetch feed from the URL provided. \n\nPlease check whether inputting the URL on https://rss2json.com gives a valid JSON."
        );
        throw new Error(request.statusText);
      }

      const json = await request.json();
      // console.log(json);
      return json;
    } catch (err) {
      console.log(err);
    }
  }

  // Add a feed to the App state
  const addFeed = async (url) => {
    if (!localStorage.getItem(url)) {
      const response = await fetchFeedFromUrl(url);

      // If fetch failed, block below won't execute
      if (response) {
        setFetchedData([...fetchedData, response]);
        // set URL into local storage
        localStorage.setItem(url, 1);
        // Switch to newly added feed
        setDisplayedFeed(fetchedData.length);
      }
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

    console.log(`switch displayed-feed : ${fetchedData.length - 1}`);
    setDisplayedFeed(fetchedData.length - 2); // Gotta do minus 2 to get last feed added!
  };

  // Switch the feed to be displayed
  const switchDisplayedFeed = (e, feedUrl) => {
    console.log(e);

    // find the feed that matches title of button clicked
    let feedIndex = -1;
    fetchedData.forEach((elm, index) => {
      // if (elm.feed.title === e.target.innerHTML) feedIndex = index;
      if (elm.feed.url === feedUrl) {
        feedIndex = index;
      }
    });
    if (feedIndex === -1) throw new Error('Feed requested not found!');
    // set the State var to update the displayed feed
    setDisplayedFeed(feedIndex);
  };

  const [show, setShow] = useState(false);
  const toggleShow = () => {
    console.log('toggle theme!');
    setShow(!show);
  };

  return (
    <MyContext.Provider value={{ show, toggleShow }}>
      <AddFeedMenu onAdd={addFeed} />
      {fetchedData.length > 0 ? (
        <UserFeeds
          feeds={fetchedData}
          displayedFeed={displayedFeed}
          switchDisplayedFeed={switchDisplayedFeed}
          deleteFeed={deleteFeed}
        />
      ) : (
        <p>Loading your feeds...</p>
      )}
      <div className='flex'>
        {fetchedData.length > 0 ? (
          <FeedDisplay feed={fetchedData[displayedFeed]} />
        ) : (
          <p>Nothing to show!!</p>
        )}
        <SettingsMenu />
      </div>
    </MyContext.Provider>
  );
}
// https://cors-anywhere.herokuapp.com/
// http://www.reddit.com/.rss
// https://www.theguardian.com/international/rss
// https://lifehacker.com/rss
// http://rss.cnn.com/rss/edition.rss
export default App;
