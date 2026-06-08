importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCX-bZLDHy-6wxuc5b8YInV_Mr7uYOTmgk",
  authDomain: "trinity-os-8edd0.firebaseapp.com",
  projectId: "trinity-os-8edd0",
  storageBucket: "trinity-os-8edd0.firebasestorage.app",
  messagingSenderId: "692349337854",
  appId: "1:692349337854:web:ef24ead6e7362a5772a5af"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [300, 100, 300],
    tag: 'peerlink-buzz',
    renotify: true
  });
});

// On notification click — open the PWA
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const client of list) {
        if (client.url.includes('peerlink') && 'focus' in client) return client.focus();
      }
      return clients.openWindow(self.location.origin);
    })
  );
});
