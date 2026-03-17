
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://npmsqsdozazfkgskfwdp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wbXNxc2RvemF6Zmtnc2tmd2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0OTc2MTAsImV4cCI6MjA4OTA3MzYxMH0.G64TjPrRkGQwm-2Oy4Mw_jDM2ubMSCWC-tHoEf_x65c';
const supabase = createClient(supabaseUrl, supabaseKey);

async function findUserId() {
  const { data, error } = await supabase
    .from('books')
    .select('user_id')
    .eq('is_preset', true)
    .limit(1);

  if (error) {
    console.error('Error:', error);
    return;
  }

  if (data && data.length > 0) {
    console.log('USER_ID_START');
    console.log(data[0].user_id);
    console.log('USER_ID_END');
  }
}

findUserId();
