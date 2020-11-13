import $ from 'jquery';

import store from './store';
import api from './api';

const generateElement = (bookmark) => {
  let bookmarkInfo = `
    <h3 class="bookmark-title">${bookmark.title}</h3>
    <p class="bookmark-link"><a href="${bookmark.url}">${bookmark.url}</a></p>
    `;
  let bookmarkControls = `
    <button class="bookmark-edit" type="button">Edit</button>
    <button class="bookmark-delete" type="button">Delete</button>
  `;
  let listType = 'condensed';
  
  if (bookmark.expanded === true)
  {
    listType = 'expanded';
    {
      bookmarkInfo = `
        <input type="text" class="bookmark-title" placeholder="${bookmark.title}"></input>
        <input type="text" class="bookmark-link" placeholder="${bookmark.url}"></input>
        <textarea class="bookmark-desc" placeholder="${bookmark.desc}"></textarea>
      `;
      bookmarkControls = `
        <button class="bookmark-save" type="button">Save</button>
      `;
    }
  }

  return `
    <form class="bookmark ${listType}" data-bookmark-id="${bookmark.id}">
      <div class="bookmark-info">
        ${bookmarkInfo}
      </div>
      <div class="bookmark-controls">
        <div class="bookmark-stars"></div>
        ${bookmarkControls}
      </div>
    </form>
  `;
};

const generateBookmarkListString = (bookmarkList) => {
  const bookmarks = bookmarkList.map(bookmark => generateElement(bookmark));
  return bookmarks.join('');
};

const render = () => {
  let bookmarks = [...store.bookmarks];
  // TODO: Add filter code

  const bookmarkListString = generateBookmarkListString(bookmarks);

  $('.inner-container').html(bookmarkListString);
};

const handleNewBookmark = () => {
  $('.bookmark-create').on('click', event => {
    event.preventDefault();
    let bookmarkInit = `
      <form id="bookmark-new" class="bookmark editable">
        <div class="bookmark-info">
          <input type="text" class="bookmark-title" placeholder="Bookmark"></input>
          <input type="text" class="bookmark-link" placeholder="https://bookmark.link/"></input>
          <textarea class="bookmark-desc" placeholder="Bookmark Description"></textarea>
        </div>
        <div class="bookmark-controls">
          <div class="bookmark-stars"></div>
          <button type="submit">Add</button>
        </div>
      </form>
    `;
    $('.bookmark-init').html(bookmarkInit);
    render();
    bindListeners();
  });
};

const handleAddBookmark = () => {
  $('#bookmark-new').submit(event => {
    event.preventDefault();
    const bookmarkName = $('.bookmark-title').val();
    const bookmarkLink = $('.bookmark-link').val();
    const bookmarkDesc = $('.bookmark-desc').val();
    $('.bookmark-init').html('');
    api.createBookmark(bookmarkName, bookmarkLink, bookmarkDesc)
      .then(res => res.json())
      .then(newBookmark => {
        store.addBookmark(newBookmark);
        render();
        bindListeners();
      });
  });
};

const getBookmarkIdFromElement = (bookmark) => {
  return $(bookmark)
    .closest('.bookmark')
    .data('bookmark-id');
};

const handleDeleteBookmarkClicked = () => {
  $('.bookmark').on('click', '.bookmark-delete', event => {
    event.preventDefault();
    const id = getBookmarkIdFromElement(event.currentTarget);
    api.deleteBookmark(id)
      .then(res => res.json())
      .then(() => {
        store.findAndDelete(id);
        render();
        bindListeners();
      });
  });
};

const handleEditBookmarkClicked = () => {
  $('.bookmark').on('click', '.bookmark-edit', event => {
    event.preventDefault();
    const id = getBookmarkIdFromElement(event.currentTarget);
    store.findAndUpdate(id, {expanded: true});
    render();
    bindListeners();
  });
};

const handleSaveBookmarkClicked = () => {
  $('.bookmark').on('click', '.bookmark-save', event => {
    event.preventDefault();
    const id = getBookmarkIdFromElement(event.currentTarget);
    const info = {
      title: $('.bookmark-title').val(),
      url: $('.bookmark-link').val(),
      desc: $('.bookmark-desc').val()
    }
    api.editBookmark(id, info)
      .then(res => res.json())
      .then(() => {
        store.findAndUpdate(id, info);
        store.findAndUpdate(id, {expanded: false})
        render();
        bindListeners();
      });
  });
};

const bindListeners = () => {
  handleNewBookmark();
  handleAddBookmark();
  handleDeleteBookmarkClicked();
  handleEditBookmarkClicked();
  handleSaveBookmarkClicked();
};


export default {
  render,
  bindListeners
};