-- Create a function to handle presence broadcasts
CREATE OR REPLACE FUNCTION broadcast_user_presence(
  p_plan_id UUID,
  p_user_id UUID,
  p_user_name TEXT,
  p_section TEXT DEFAULT 'overview',
  p_cursor_x FLOAT DEFAULT 0,
  p_cursor_y FLOAT DEFAULT 0
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- This function would be called from Edge Function or client
  -- to broadcast presence via Supabase Realtime
  PERFORM pg_notify(
    'presence:' || p_plan_id::text,
    json_build_object(
      'user_id', p_user_id,
      'user_name', p_user_name,
      'section', p_section,
      'cursor_x', p_cursor_x,
      'cursor_y', p_cursor_y,
      'timestamp', now()
    )::text
  );
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION broadcast_user_presence TO authenticated;
