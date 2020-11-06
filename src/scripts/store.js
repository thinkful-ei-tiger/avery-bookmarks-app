const bookmarks = [];
let filterBy = 'none';
let editing = false;

const findById = (id) => {
  return bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const addBookmark = (bookmark) => {
  bookmarks.push(bookmark);
};

const findAndUpdate = (id, newData) => {
  const currentBookmark = findById(id);
  Object.assign(currentBookmark, newData);
};

const findAndDelete = (id) => {
  let newBookmarks = bookmarks.filter(currentBookmark => currentBookmark.id !== id);
  return newBookmarks;
};

const assignFilter = (filterType) => {
  filterBy = filterType;
};


export default {
  bookmarks,
  addBookmark,
  findAndUpdate,
  findAndDelete,
  assignFilter
};