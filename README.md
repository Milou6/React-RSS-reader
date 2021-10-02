[![Netlify Status](https://api.netlify.com/api/v1/badges/b72de571-8c9f-4b7b-ac7d-788bdcfe1d63/deploy-status)](https://app.netlify.com/sites/nervous-panini-4ea298/deploys)

# *RSS reader (built with React and Redux ⚛️)*

This RSS reader is a thorough project built to showcase my React & Redux skills. 

* The interface is built with re-usable components, and the app uses the [rss2json API](https://rss2json.com/) under the hood to request RSS feeds.
* The user has no need to create his own API account, as the app uses **Netlify (lambda) functions to securely hide API keys**✔ from the client-side.
* The app also uses Local storage and Redux✨ to save User preferences, such as light/dark theme.
* All components are optimized so that they ***never re-render when they don't have to***.
* 100% mobile-responsive interface 📱.

You can find a live version of the site here : [https://rss-react-reader.netlify.app/](https://rss-react-reader.netlify.app/)


![image](https://user-images.githubusercontent.com/47149772/135717774-3e4cacff-c50b-40f5-978b-0d2319be1e20.png)

