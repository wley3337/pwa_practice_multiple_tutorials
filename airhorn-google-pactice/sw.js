//you need to use a cache-polyfill because Cache API is not 
//fully supported in all browsers.
importScripts('/cache-polyfill.js');

//adding an event listner to install this opens the cache
// and then addes the list of things we want to cache.

self.addEventListener('install', function(e){
    e.waitUntil(
        caches.open('airhorner')
        .then(function(cache){
            // .addAll is an all or nothing, if one of the resources
            //doesn load then none of them will
            // .addAll is also not fully supported 
            // NOTE: URLs with query strings are considered seperate individual urls and need to be cached 
            //sperately. 
            return cache.addAll([
                '/',
                '/index.html',
                '/index.html?homescreen=1',
                '/?homescreen=1',
                '/styles/main.css',
                '/scripts/main.min.js',
                '/sounds/airhorn.mp3'  
            ]);
        })
    );
});





self.addEventListener('fetch', function(event){
    console.log(event.request.url);
    //evenalutates future responses. 
    event.respondWith(
        //this looks in the cache to see if there is a matching request
        // if there is then it serves up the one from the cache if not it runs the fetch. 
        //caches.match returns a promise that resolves even if the event is not found
        caches.match(event.request)
        //this returns the cached response or if it is nil performs the fetch request. 
        .then(function(response){
            return response || fetch(event.request);
        })
    );
});