
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    throw new Error('Push notifications are not supported');
  }

  const registration = await navigator.serviceWorker.register('/service-worker.js');
  return registration;
}

export async function subscribeUserToPush(registration: ServiceWorkerRegistration) {
  const subscribeOptions = {
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U'
    )
  };

  const pushSubscription = await registration.pushManager.subscribe(subscribeOptions);
  return pushSubscription;
}

export async function saveSubscription(subscription: PushSubscription) {
  // Convert subscription to a plain object that can be stored in the database
  const subscriptionJSON = subscription.toJSON();
  
  // Convert the subscriptionJSON to a format compatible with Supabase's Json type
  const subscriptionData = {
    endpoint: subscriptionJSON.endpoint,
    expirationTime: subscriptionJSON.expirationTime,
    keys: subscriptionJSON.keys
  } as unknown as Json;
  
  const { error } = await supabase
    .from('notification_subscriptions')
    .insert({
      subscription: subscriptionData
    });

  if (error) throw error;
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
