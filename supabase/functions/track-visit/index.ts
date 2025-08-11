
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase environment variables not set')
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const body = await req.json()
    const { 
      page_visited, 
      session_id, 
      user_agent, 
      ip_address, 
      referrer, 
      device_type, 
      visit_duration,
      user_id 
    } = body

    const { error } = await supabase.from('visitor_analytics').insert({
      page_visited,
      session_id,
      user_agent,
      ip_address,
      referrer,
      device_type,
      visit_duration,
      user_id: user_id || null
    })

    if (error) throw error

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error tracking visit:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
