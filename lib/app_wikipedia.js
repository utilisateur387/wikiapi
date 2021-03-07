const searchForm = document.getElementById('search-form');
const userInput = document.getElementById('input');
const result = document.getElementById('result');
const image = document.getElementById('image');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const baseUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${userInput.value}`
  const complementaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${userInput.value}`
  fetch(baseUrl).then((response) =>
    response.json())
    .then((data) => {
      const pageId = Object.keys(data.query.pages)[0];
      let extract = data.query.pages[pageId]['extract'];

      if (extract === undefined) {
        image.innerHTML = "";
        extract = `Sorry, we couldn't find any matching artist :(`;
      }
      result.innerHTML = "";
      result.insertAdjacentHTML('afterbegin', extract);
    });

    fetch(complementaryUrl).then((response) =>
    response.json())
    .then((data) => {
      const imgUrl = data.thumbnail.source;
      console.log(imgUrl);
      image.innerHTML = "";
      image.insertAdjacentHTML('beforeend', `<img src="${imgUrl}" alt="">`)
    });
});
