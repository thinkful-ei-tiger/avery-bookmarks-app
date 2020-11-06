import $ from 'jquery';
import api from './scripts/api';
import store from './scripts/store';

import 'normalize.css';
import './index.css';

import bookmarkList from './scripts/bookmarks';

const main = () => {
  api.getBookmarks()
    .then(res => res.json())
    .then(bookmarks => {
      bookmarks.forEach(bookmark => store.addBookmark(bookmark));
      bookmarkList.render();
    });
  bookmarkList.bindListeners();
  bookmarkList.render();
};

$(main);