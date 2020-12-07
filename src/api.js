/*
REQUIREMENTS
- X Add bookmarks
  - X Title
  - X URL
  - X Description
  - X Rating
- X View bookmarks
  - X Condensed view; only title and rating
  - Detailed view; on bookmark click
  - X Editable view; on Edit click
- X Remove bookmarks
- Proper error handling
  - Invalid title
  - Invalid info
- Dropdown rating filter
- X Edit rating and description
- X Use fetch() function
- X Change state and then render
- X Semantic HTML
- X a11y practices
*/

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/avery-obanion';

const getBookmarks = () => {
  return fetch(`${BASE_URL}/bookmarks`);
};

const createBookmark = (name, link, desc, rating) => {
  const newBookmark = {
    title: name,
    rating: 5,
    url: link,
    desc: desc,
    rating: rating,
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