// // this design is pulled from:
// // https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-3-offline-support-and-network-resilience-c84db889162c

// //set this to true for production
// let doCache = false;

// //name our cache
// let CACHE_NAME = 'my-pwa-cache-v1';

// //delete old caches that are not our current one!
// self.addEventListener("activate", event => {
//     const cacheWhiteList = [CACHE_NAME];
//     event.waitUntil(
//         caches.keys()
//             .then(keyList =>
//                 Promise.all(keyList.map(key => {
//                     if(!cacheWhiteList.includes(key)){
//                     console.log('Deleting cache: ' + key)
//                     return caches.delete(key);}   
//                 }))
//             )
//     )
// })

// //the first time the user starts up the PWA, 'install' is triggered.
// self.addEventListener('install', function(event){
//     if(doCache){
//         event.waitUntil(
//             caches.open(CACHE_NAME)
//             .then(function(cache){
//                 //get the assets manifest so we can see what our js file is named
//                 //this is because webpack hases it
//                 fetch("asset-manifest.json")
//                 .then(response => {
//                     response.json()
//                 })
//                 .then(assets => {
//                     //open a cache and cache our files
//                     //we want to cache the page and the main.js generated by webpack
//                     //we could also cache any static assets like CSS or images
//                     const urlsToCache =[
//                         "/",
//                         assets["main.js"]
//                     ]
//                     cache.addAll(urlsToCache)
//                     console.log('cached');
//                 })
//             })
//         );
//     }
// });

// //When the webpage goes to fetch files, we intercept that request and serve up the matching files
// //if we have them

// self.addEventListener('fetch', function(event){
//     if (doCache){
//         event.respondWith(
//             caches.match(event.request)
//             .then(function(response){
//                 return response || fetch(event.request);
//             })
//         )
//     }
// })


//Copied and pasted version:

// Set this to true for production
var doCache = false;

// Name our cache
var CACHE_NAME = 'my-pwa-cache-v1';

// Delete old caches that are not our current one!
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            console.log('Deleting cache: ' + key)
            return caches.delete(key);
          }
        }))
      )
  );
});

// The first time the user starts up the PWA, 'install' is triggered.
self.addEventListener('install', function(event) {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          // Get the assets manifest so we can see what our js file is named
          // This is because webpack hashes it
          fetch("asset-manifest.json")
            .then(response => {
              response.json()
            })
            .then(assets => {
              // Open a cache and cache our files
              // We want to cache the page and the main.js generated by webpack
              // We could also cache any static assets like CSS or images
              const urlsToCache = [
                "/",
                assets["main.js"]
              ]
              cache.addAll(urlsToCache)
              console.log('cached');
            })
        })
    );
  }
});

// When the webpage goes to fetch files, we intercept that request and serve up the matching files
// if we have them
self.addEventListener('fetch', function(event) {
    if (doCache) {
      event.respondWith(
          caches.match(event.request).then(function(response) {
              return response || fetch(event.request);
          })
      );
    }
});
