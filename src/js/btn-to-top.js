const btnToTop = document.querySelector('.btn-to-top');

btnToTop.addEventListener('click', topFunction);

window.onscroll = () => scrollFunction();

function scrollFunction() {
  if (document.documentElement.scrollTop > 20) {
    btnToTop.style.display = 'block';
  } else {
    btnToTop.style.display = 'none';
  }
}

function topFunction() {
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
