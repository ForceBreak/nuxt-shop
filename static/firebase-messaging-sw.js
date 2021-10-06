const options = {
  "firebaseVersion":"7.14.1",
  "config":{
    "apiKey":"AIzaSyA4Wi5BcCh3pmrwbDOdDP80wz-KglgnOzw",
    "authDomain":"nuxt-shop-93181.firebaseapp.com",
    "databaseURL":"https:\u002F\u002Fnuxt-shop-93181.firebaseio.com",
    "projectId":"nuxt-shop-93181",
    "storageBucket":"nuxt-shop-93181.appspot.com",
    "messagingSenderId":"77297445051",
    "appId":"1:77297445051:web:65e16a6dcbe955f3e7619e",
    "measurementId":"G-ZNKZ29139Y",
    "fcmPublicVapidKey":"BE3UXm4KGGj8CsClKnJHTyQedM3NSs3AaNj81za6O6fZM_fIV9CUYgcC_6aRV8jPscAfBpRFCs__s0lAYPFSY4E"
  },
    "onFirebaseHosting":false
}
const version = options.firebaseVersion
const onFirebaseHosting = options.onFirebaseHosting

if (onFirebaseHosting) {
  // Only works on Firebase hosting!
  importScripts('/__/firebase/' + version + '/firebase-app.js')
  importScripts('/__/firebase/' + version + '/firebase-messaging.js')
  importScripts('/__/firebase/init.js')
}
else {
  importScripts(
    'https://www.gstatic.com/firebasejs/' + version + '/firebase-app.js'
  )
  importScripts(
    'https://www.gstatic.com/firebasejs/' + version + '/firebase-messaging.js'
  )
  firebase.initializeApp(options.config)
}

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function(payload) {
  console.info("SW received the message: ", payload);
  const notification = payload.notification;

  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body,
    icon: notification.image,
    vibrate: notification.vibrate || [200, 100, 200, 100, 200, 100, 200],
    actions: [
      // First item is always taken as click action (see comment below)
      {
        title: "Visit",
        action: notification.clickPath
      }
    ]
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})
