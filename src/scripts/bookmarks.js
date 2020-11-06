import $ from 'jquery';
import api from './api';

import store from './store';

const generateElement = (bookmark) => {
  let bookmarkInfo = `
    <h3 class="bookmark-title">${bookmark.title}</h3>
    <p class="bookmark-link"><a href="${bookmark.url}">${bookmark.url}</a></p>
    `;
  let bookmarkControls = `
    <button class="bookmark-edit">Edit</button>
  `;
  let listType = 'condensed';
  
  if (bookmark.expanded === true)
  {
    listType = 'expanded';
    {
      bookmarkInfo = `
        <input type="text" class="bookmark-title" placeholder="${bookmark.title}">
        <input type="text" class="bookmark-link" placeholder="${bookmark.url}</input>
        <textarea class="bookmark-desc" placeholder="${bookmark.desc}"></textarea>
      `;
      bookmarkControls = `
        <button type="submit" class="bookmark-save">Save</button>
      `;
    }
  }

  return `
    <form class="bookmark ${bookmark.listType}" data-bookmark-id="${bookmark.id}">
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
          <input type="text" class="bookmark-title" placeholder="Bookmark">
          <input type="text" class="bookmark-link" placeholder="https://bookmark.link/">
          <textarea class="bookmark-desc" placeholder="Bookmark Description"></textarea>
        </div>
        <div class="bookmark-controls">
          <div class="bookmark-stars"></div>
          <button type="submit">Add</button>
        </div>
      </form>
    `;
    $('.bookmark-init').html(bookmarkInit);
    handleAddBookmark();
    render();
  });
};

const handleAddBookmark = () => {
  $('#bookmark-new').submit(event => {
    event.preventDefault();
    let bookmarkName = $('.bookmark-title').val();
    let bookmarkLink = $('.bookmark-link').val();
    let bookmarkDesc = $('.bookmark-desc').val();
    api.createBookmark(bookmarkName, bookmarkLink, bookmarkDesc)
      .then(res => res.json())
      .then(newBookmark => {
        store.addBookmark(newBookmark);
        render();
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
      .then(bookmark => {
        store.findAndDelete(bookmark.id);
        render();
      });
  });
};

const handleExpandBookmark = () => {
  $('.bookmark').on('click', '.bookmark-edit', event => {
    event.preventDefault();
    const id = getBookmarkIdFromElement(event.currentTarget);
    store.findAndUpdate(id, {expanded: true});
  })
}

const handleEditBookmarkSubmit = () => {
  $('#bookmark-save').submit(event => {
    console.log('Edit handle triggered');
    event.preventDefault();
    const id = getBookmarkIdFromElement(event.currentTarget);
    api.editBookmark(id)
      .then(res => res.json())
      .then(bookmark => {
        store.findAndUpdate(bookmark.id);
        render();
      });
  });
};

const bindListeners = () => {
  handleNewBookmark();
  handleDeleteBookmarkClicked();
  handleEditBookmarkSubmit();
};


export default {
  render,
  bindListeners
};