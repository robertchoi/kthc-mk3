'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "306a8b43d83c113e0fa9f2bc046219cd",
"index.html": "2224f913274040aea489006d806f68c2",
"/": "2224f913274040aea489006d806f68c2",
"main.dart.js": "ea280533f900cb9297c34fade9c9dc40",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "bacefd84d77df38b506bd8e4138f1241",
"assets/images/page_bg.png": "19ecb0fff0d79e2709f06f6796d3a984",
"assets/images/page_character.png": "a6be2e51a57e47276f688da572236579",
"assets/images/page010_button_clicked.png": "aa599d61f27ae7508a0c8e377eab0dba",
"assets/images/page001_selection01.png": "625d2e46ffbc5b43547b93604c7c27d2",
"assets/images/page090_bg.png": "e19390080b6180cc9ada6a4ebef8ce68",
"assets/images/page_title.png": "38e7e39c6d7b3afc5c947d875d9a260e",
"assets/images/page001_selection02.png": "19d72358cd49250277deb8ab90f5b50c",
"assets/images/page010_button_normal.png": "d6108c3639e546c3ac1cb4c8bcf21bfa",
"assets/images/page090_logo.png": "accd24a29770bc7e82c6fd4b27f2119d",
"assets/images/splash_title.png": "68dac9dfb1047416bd0ec24b575a5f74",
"assets/images/page008_button_clicked.png": "474478f40158ac275e5b5fb8c94c3904",
"assets/images/page005_button_clicked.png": "ccc6156cce5f8c52f16d19168874b912",
"assets/images/page091_textbox_left.png": "5cd6fff3089ac8565b3367d288ec7da5",
"assets/images/page011_result.png": "e173673b61787cb862531acb44414aac",
"assets/images/page_textbox_right.png": "a6b8307d98dab1e86f4b961e2d04573b",
"assets/images/page006_button_clicked.png": "bcb69980c06c2167d0e3d7751a7263c6",
"assets/images/page008_button_normal.png": "7404c7315d75f3d678c41ab0441c567c",
"assets/images/page090_image001.png": "189b79d8bdefdaa3717e6a6e886c6e1e",
"assets/images/splash_center.png": "c8ee59cd3b39e85650e20a3c597b1d93",
"assets/images/page_button_hover.png": "57eaf268a347a24c255c2bd4006e0b87",
"assets/images/page004_button_normal.png": "32a31c343860e223322851e8547c6288",
"assets/images/page003_birth_picker.png": "8350f4116aad2b319a5478cddd66e7c8",
"assets/images/page_character02.png": "7263b64a54134567f0f9a58907159e0e",
"assets/images/page004_button_clicked.png": "ccc6156cce5f8c52f16d19168874b912",
"assets/images/page091_textbox_right.png": "7411cbd59666f0de8fec2ea1cef2d9f0",
"assets/images/page005_button_normal.png": "d866c143851563db91a8f6c64c97ec1e",
"assets/images/fonts/NanumGothicExtraBold.ttf": "4b1b824d86d866cb8245accebe324b62",
"assets/images/fonts/NanumGothicBold.ttf": "4fa4ea43222779743fc8cd4b4835d04e",
"assets/images/fonts/NanumGothicRegular.ttf": "3cbe9257e888255cb2dad0d8a80a7759",
"assets/images/page006_button_normal.png": "fc958020bcd7b336eb3672a433213d25",
"assets/images/page_textbox_left.png": "40bf57dffb02d2218a6f619233a97e31",
"assets/images/page090_title_window.png": "4bf60f2618525bb71954dc485908d0ce",
"assets/images/page_button_normal.png": "fdec4cdf370e9387f074a52676b86009",
"assets/images/splash_bg.png": "ac10e6e622fa09bc57d66c943561c77c",
"assets/images/page090_textbox.png": "6a91ded2a1ccbae44635e9fdc6eedff2",
"assets/AssetManifest.json": "c03900c0a213ee5cb1d9a88fefe4bfae",
"assets/NOTICES": "4e9abebe57062b0e71469966edf4c2ae",
"assets/FontManifest.json": "45ac5c1faa718b3c8d8f044e65751269",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
