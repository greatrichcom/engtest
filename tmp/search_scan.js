
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://npmsqsdozazfkgskfwdp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wbXNxc2RvemF6Zmtnc2tmd2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0OTc2MTAsImV4cCI6MjA4OTA3MzYxMH0.G64TjPrRkGQwm-2Oy4Mw_jDM2ubMSCWC-tHoEf_x65c';
const supabase = createClient(supabaseUrl, supabaseKey);

async function searchScanBooks() {
  console.log(`Searching for scan-related books...`);
  
  const { data: books, error: findError } = await supabase
    .from('books')
    .select('id, title')
    .ilike('title', '%스캔%');

  if (findError) {
    console.error('Error finding books:', findError);
    return;
  }

  console.log('Found scan books:', books);
}

searchScanBooks();
