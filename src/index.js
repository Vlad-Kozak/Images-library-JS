import './js/btn-to-top';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/service';
import { makeMarkupGallery } from './js/templates';

let page = 1;
let lightbox;

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onClickLoadMoreBtn);

function onSubmit(e) {
  e.preventDefault();
  page = 1;

  const inputValue = e.currentTarget.elements.searchQuery.value.trim();

  if (!inputValue) {
    return Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  firstRenderMarkupGallery(inputValue);
}

function onClickLoadMoreBtn() {
  page += 1;
  renderMarkupGallery(form.elements.searchQuery.value.trim());
}

function firstRenderMarkupGallery(search) {
  fetchImages(search, page)
    .then(r => {
      if (!r.hits.length) {
        return Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (r.hits.length < 40) {
        loadMoreBtn.classList.add('display-none');
      }

      gallery.innerHTML = '';
      Notify.info(`Hooray! We found ${r.totalHits} images.`);
      gallery.insertAdjacentHTML('beforeend', makeMarkupGallery(r.hits));

      if (r.hits.length === 40) {
        loadMoreBtn.classList.remove('display-none');
      }

      lightbox = new SimpleLightbox('.gallery a');
      scroll(0.2);
    })
    .catch(error => console.log(error));
}

function renderMarkupGallery(search) {
  fetchImages(search, page)
    .then(r => {
      if (r.hits.length < 40) {
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        loadMoreBtn.classList.add('display-none');
      }

      gallery.insertAdjacentHTML('beforeend', makeMarkupGallery(r.hits));

      lightbox.refresh();
      scroll(2);
    })
    .catch(error => {
      console.log(error);
      Notify.info("We're sorry, but you've reached the end of search results.");
      loadMoreBtn.classList.add('display-none');
    });
}

function scroll(value) {
  setTimeout(() => {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * value,
      behavior: 'smooth',
    });
  }, 600);
}
