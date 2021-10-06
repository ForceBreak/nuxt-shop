
self.addEventListener('install', function(event) {
  // The promise that skipWaiting() returns can be safely ignored.
  self.skipWaiting();

  // Perform any other actions required for your
  // service worker to install, potentially inside
  // of event.waitUntil();
});
self.addEventListener('notificationclick', function(e) {
  console.log(e.notification.data.url, 'e.notification.data.url')
  clients.openWindow(e.notification.data.url)
  notification.close()
})