import { useState, useEffect } from 'react';
import AddFeedMenu from './components-reader/AddFeedMenu';
import FeedDisplay from './components-reader/FeedDisplay';
import UserFeeds from './components-reader/UserFeeds';
import SettingsMenu from './components-reader/SettingsMenu';
import { MyContext, ThemeContext, themes } from './components-reader/Context';

// https://cors-anywhere.herokuapp.com/

// Local Storage is used to keep track of a user's saved feeds
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
        let key = localStorage.key(i);
        if (key !== 'theme') {
          let feed = await fetchFeedFromUrl(key);
          // CHECKING THAT THE FEED != undefined
          if (feed) {
            reloadedFeeds.push(feed);
          }
        }
      }
      // console.log(reloadedFeeds);
      await setFetchedData([...fetchedData, ...reloadedFeeds]);

      // Finally, if localStorage was empty, add a default The Guardian RSS feed to it
      // This way the User doesn't see an empty site at 1st
      if (localStorage.length === 0) {
        let feed = await fetchFeedFromUrl('https://www.theguardian.com/international/rss');
        localStorage.setItem('https://www.theguardian.com/international/rss', 1);
        setFetchedData([feed]);
      }
    };
    reAddSavedFeeds();
  }, []);

  useEffect(() => {
    let currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      setTheme(themes.dark);
    }
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
    console.log('toggle show!');
    setShow(!show);
  };

  const [theme, setTheme] = useState(themes.light);
  const toggleTheme = () => {
    console.log('toggle theme!');
    localStorage.setItem('theme', theme === themes.dark ? 'light' : 'dark');
    setTheme(theme === themes.dark ? themes.light : themes.dark);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MyContext.Provider value={{ show, toggleShow }}>
        <div className={`app-container ${theme.background}`}>
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
          <div className='flex bottom-container'>
            {fetchedData.length > 0 ? (
              <FeedDisplay feed={fetchedData[displayedFeed]} />
            ) : (
              <p>Nothing to show!!</p>
            )}
            <SettingsMenu />
          </div>
        </div>
      </MyContext.Provider>
    </ThemeContext.Provider>
  );
}
// https://cors-anywhere.herokuapp.com/
// http://www.reddit.com/.rss
// https://www.theguardian.com/international/rss
// https://lifehacker.com/rss
// http://rss.cnn.com/rss/edition.rss
export default App;
