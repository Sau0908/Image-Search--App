const client_id = "mxBIsKDjS5mMsuLdwRDQ5JRBy0Qj_oX4ygYC1r8AZDE";

const formElement = document.querySelector("form");
const inputElement = document.querySelector(".inputContainer");
const allCardElement = document.querySelector(".cardContainer");
const showMoreElement = document.querySelector(".showMoreButton");

let input = "";
let page = 1;
console.log(formElement);
async function searchImages() {
  input = inputElement.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${input}&client_id=${client_id}`;
  console.log(input);
  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;
  console.log(results);

  if (page === 1) {
    allCardElement.innerHTML = "";
  }
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("card");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;
    //imageWrapper.classList.add(".card img");

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    allCardElement.appendChild(imageWrapper);
  });
  page++;
  if (page > 1) {
    showMoreElement.style.display = "block";
  }
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreElement.addEventListener("click", () => {
  searchImages();
});
