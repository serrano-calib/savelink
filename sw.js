/* sw.js */

const RESOURCES = [
        "/",
        "/favicon.ico",
        "/index.html",
        "/about.html",
        "/main.js"
];

const CACHE_VERSION = "1.0.10";

async function deleteOldCache() {
        let allCache;

        allCache = await caches.keys();
        allCache.forEach(async function(cacheName) {
                if (cacheName != CACHE_VERSION) {
                        await caches.delete(cacheName);
                }
        });

}
async function addToCache(resources) {
        let cache;

        cache = await caches.open(CACHE_VERSION);
        await cache.addAll(resources);
        await deleteOldCache();
}

async function respondWithCache(request) {
        let cache, resource, response;

        if (await caches.match(request)) {
                return caches.match(request);
        }
        response = await fetch(request);
        cache = await caches.open(CACHE_VERSION);
        cache.put(request, response);
        return caches.match(request);
}

self.addEventListener("install", function (event) {
        event.waitUntil(addToCache(RESOURCES));
});

self.addEventListener("fetch", function (event) {
        event.respondWith(respondWithCache(event.request));
});
