var Socket = io.connect('http://localhost:6677');
const PUBLIC_VAPID_KEY =
  "BJuxZAK2tVrr8RwN3OTELQynIh2xKTb52XHyUBg1iIM4H_DW0Lse9Jwwd8_bRygGZXv5e4yNzh-ch7Eu4_9Reew";

const subscription = async () => {
  // Service Worker
  console.log("Registering a Service worker");
  var register = await navigator.serviceWorker.register("Public/JS/worker.js",{
      scope: "/PruebaSRP/Public/JS/"
  });
  console.log("New Service Worker");

  // Listen Push Notifications
  console.log("Listening Push Notifications");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
  });

  console.log(subscription);

  // Send Notification
  await Socket.emit('Suscribirse', subscription)
  console.log("Subscribed!");
};

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Service Worker Support
if ("serviceWorker" in navigator) {
  subscription().catch(err => console.log(err));
}
