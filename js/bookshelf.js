const CURATED_ISBNS = [
  { isbn: '9780596517748', title: 'JavaScript: The Good Parts',       author: 'Douglas Crockford', year: 2008 },
  { isbn: '9781491950296', title: "You Don't Know JS",                 author: 'Kyle Simpson',       year: 2015 },
  { isbn: '9780321965516', title: 'HTML & CSS',                        author: 'Jon Duckett',        year: 2011 },
  { isbn: '9780137081073', title: 'Clean Code',                        author: 'Robert C. Martin',   year: 2008 },
  { isbn: '9781449331818', title: 'Learning Web Design',               author: 'Jennifer Robbins',   year: 2018 },
  { isbn: '9781430216070', title: 'Principles of Beautiful Web Design', author: 'Jason Beaird',      year: 2010 },
];

function coverUrl(isbn) {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
}

function bookCardHTML({ isbn, title, author, year, coverId }) {
  const imgSrc = isbn
    ? coverUrl(isbn)
    : coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : '';
  const escapedTitle = title.replace(/"/g, '&quot;');
  return `
    <article class="book-card">
      <div class="book-cover-wrap">
        ${imgSrc
          ? `<img class="book-cover" src="${imgSrc}" alt="Cover of ${escapedTitle}" loading="lazy"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
             <div class="book-cover-fallback" style="display:none" role="img" aria-label="No cover available for ${escapedTitle}">${title}</div>`
          : `<div class="book-cover-fallback" role="img" aria-label="No cover available for ${escapedTitle}">${title}</div>`
        }
      </div>
      <div class="book-info">
        <p class="book-title">${title}</p>
        <p class="book-author">${author || 'Unknown author'}</p>
        ${year ? `<p class="book-year">${year}</p>` : ''}
      </div>
    </article>`;
}

function renderBookList(books, container) {
  if (!books.length) {
    container.innerHTML = '<p class="empty-msg">No books found. Try a different search.</p>';
    return;
  }
  container.innerHTML = books.map(bookCardHTML).join('');
}

// Load curated favourites on page load
const curatedGrid = document.getElementById('curated-grid');
if (curatedGrid) {
  curatedGrid.innerHTML = CURATED_ISBNS.map(b => bookCardHTML(b)).join('');
}

// Search
const searchInput = document.getElementById('book-search');
const searchResults = document.getElementById('search-results');
let debounceTimer;

async function searchBooks(query) {
  searchResults.innerHTML = `<div class="loading-msg"><div class="spinner" aria-hidden="true"></div>Searching...</div>`;
  try {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&fields=title,author_name,cover_i,first_publish_year&limit=12`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const books = data.docs.map(d => ({
      title: d.title,
      author: d.author_name?.[0] || '',
      year: d.first_publish_year,
      coverId: d.cover_i,
    }));
    renderBookList(books, searchResults);
  } catch {
    searchResults.innerHTML = '<p class="error-msg">Could not load results. Check your connection and try again.</p>';
  }
}

if (searchInput && searchResults) {
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    const q = searchInput.value.trim();
    if (!q) {
      searchResults.innerHTML = '';
      return;
    }
    debounceTimer = setTimeout(() => searchBooks(q), 400);
  });
}
