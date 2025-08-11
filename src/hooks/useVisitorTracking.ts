
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

// Detect device type
const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
};

export const useVisitorTracking = (page: string) => {
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    // Generate or retrieve session ID
    const storedSessionId = localStorage.getItem('session_id');
    const currentSessionId = storedSessionId || uuidv4();
    
    if (!storedSessionId) {
      localStorage.setItem('session_id', currentSessionId);
    }
    
    setSessionId(currentSessionId);

    // Track page visit start time
    const startTime = Date.now();

    // Unload event to track visit duration
    const handleUnload = async () => {
      const visitDuration = Math.round((Date.now() - startTime) / 1000); // duration in seconds

      try {
        await supabase.functions.invoke('track-visit', {
          body: JSON.stringify({
            page_visited: page,
            session_id: currentSessionId,
            user_agent: navigator.userAgent,
            ip_address: null, // Note: Client-side IP detection is not reliable
            referrer: document.referrer,
            device_type: getDeviceType(),
            visit_duration: visitDuration,
            user_id: null // You can add user ID if the user is logged in
          })
        });
      } catch (error) {
        console.error('Failed to track visit:', error);
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [page]);

  return { sessionId };
};
