
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import webpush from 'https://esm.sh/web-push@3.6.6'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { notice } = await req.json()

    // Get all subscriptions from the database
    const { data: subscriptions, error: fetchError } = await supabase
      .from('notification_subscriptions')
      .select('subscription')

    if (fetchError) throw fetchError

    // Configure web-push with VAPID details
    webpush.setVapidDetails(
      'mailto:temple@example.com',
      'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U',
      'YOUR_PRIVATE_KEY'
    )

    // Send notifications to all subscriptions
    const notifications = subscriptions.map(async ({ subscription }) => {
      try {
        await webpush.sendNotification(subscription, JSON.stringify({
          title: notice.title,
          content: notice.content,
          url: '/'
        }))
      } catch (error) {
        console.error('Error sending notification:', error)
      }
    })

    await Promise.all(notifications)

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
