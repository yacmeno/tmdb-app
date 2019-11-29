# tmdb-app
A React application consuming the [TMDB](https://www.themoviedb.org/) public API.

It features movie browsing by discovering the currently popular ones or by searching.
The app provides the ability to save these movies to a personal "Watch later" list without any form of authentication
with the use of IndexedDB.

Made the app to fiddle with the following concepts:
- React 16.9 (hooks and custom hooks) + Typescript
- Browsers' IndexedDB and offline storage
- Custom client-side routing with the browser history API
- Custom Webpack configs

## To run locally
Clone the repo and
``` bash
# install dependencies
npm install

# serve on localhost
npm start

# or build for production
npm run build
```

## Try live version
https://tmdbapp.netlify.com/

There are a few bugs :-)
