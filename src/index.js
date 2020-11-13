import $ from 'jquery';

import 'normalize.css';
import './index.css';

import store from './store';
import api from './api';
import bookmarkList from './bookmarks';

const main = () => {
  api.getBookmarks()
    .then(res => res.json())
    .then(bookmarks => {
      bookmarks.forEach(bookmark => store.addBookmark(bookmark));
      bookmarkList.render();
      bookmarkList.bindListeners();
    });
};

$(main);