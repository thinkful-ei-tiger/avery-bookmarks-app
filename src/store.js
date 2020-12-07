// this isnt a const and that is gross and bad
let bookmarks = [];
let filterBy = 'none';

const findById = (id) => {
  return bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const addBookmark = (bookmark) => {
  bookmarks.push(bookmark);
};

const findAndDelete = (id) => {
  // This doesn't actually delete the bookmark in the UI and I don't understand.
  return bookmarks = bookmarks.filter(currentBookmark => currentBookmark.id !== id);
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