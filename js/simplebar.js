// скролл
const heroLists = document.querySelectorAll('.hero__dropdown-list');
heroLists.forEach(item => {
  new SimpleBar(item, {
    autoHide: false,
    scrollbarMaxSize: 28,
  });
});
