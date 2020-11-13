const bookmarks = [];
let filterBy = 'none';
let editing = false;

const findById = (id) => {
  return bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const addBookmark = (bookmark) => {
  bookmarks.push(bookmark);
};

const findAndDelete = (id) => {
  return this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
};

const assignFilter = (filterType) => {
  filterBy = filterType;
};

const findAndUpdate = (id, newData) => {
  const currentBookmark = findById(id);
  Object.assign(currentBookmark, newData);
};


export default {
  bookmarks,
  findById,
  addBookmark,
  findAndUpdate,
  findAndDelete,
  assignFilter
};