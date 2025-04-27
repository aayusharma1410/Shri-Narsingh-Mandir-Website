
self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.content || 'New notice update!',
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      data: { url: '/' }
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'Notice Update', options)
    );
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
