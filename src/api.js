/*
REQUIREMENTS
- Add bookmarks
  - Title
  - URL
  - Description
  - Rating
- View bookmarks
  - Condensed view; only title and rating
  - Detailed view; on bookmark click
  - Editable view; on Edit click
- Remove bookmarks
- Proper error handling
  - Invalid title
  - Invalid info
- Dropdown rating filter
- Edit rating and description
- Use fetch() function
- Change state and then render
- Semantic HTML
- a11y practices
*/

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/avery-obanion';

const getBookmarks = () => {
  return fetch(`${BASE_URL}/bookmarks`);
};

const createBookmark = (name, link, desc) => {
  const newBookmark = {
    title: name,
    rating: 5,
    url: link,
    desc: desc,
    expanded: false
  };
  return fetch(
    `${BASE_URL}/bookmarks`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBookmark)
    }
  );
};

const editBookmark = (id, info) => {
  return fetch(
    `${BASE_URL}/bookmarks/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    }
  );
};

const deleteBookmark = (id) => {
  return fetch(
    `${BASE_URL}/bookmarks/${id}`,
    {
      method: 'DELETE'
    }
  );
};

export default {
  getBookmarks,
  createBookmark,
  editBookmark,
  deleteBookmark
};