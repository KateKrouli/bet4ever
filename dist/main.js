(() => {
  // src/js/main.js
  var link = document.querySelector(".main__scroll-link");
  link.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth"
    });
  });
})();
