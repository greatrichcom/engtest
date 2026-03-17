
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://npmsqsdozazfkgskfwdp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wbXNxc2RvemF6Zmtnc2tmd2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0OTc2MTAsImV4cCI6MjA4OTA3MzYxMH0.G64TjPrRkGQwm-2Oy4Mw_jDM2ubMSCWC-tHoEf_x65c';
const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteBook() {
  const titleToDelete = '스캔 단어장 2026.3.15';
  
  console.log(`Searching for book with title: ${titleToDelete}`);
  
  const { data: books, error: findError } = await supabase
    .from('books')
    .select('id, title')
    .ilike('title', `%${titleToDelete}%`);

  if (findError) {
    console.error('Error finding book:', findError);
    return;
  }

  if (!books || books.length === 0) {
    console.log('No matching book found.');
    return;
  }

  console.log('Found books:', books);

  for (const book of books) {
    console.log(`Deleting book: ${book.title} (ID: ${book.id})`);
    
    // Deleting a book might have cascading effects or need manual deletion of units/words
    // Assuming DB has cascade delete or we just delete the book record
    const { error: deleteError } = await supabase
      .from('books')
      .delete()
      .eq('id', book.id);

    if (deleteError) {
      console.error(`Error deleting book ${book.id}:`, deleteError);
    } else {
      console.log(`Successfully deleted book: ${book.title}`);
    }
  }
}

deleteBook();
