import { getSura } from "./request.js";
import { displaySura } from "./display.js";
const suraPage = document.getElementById("suraPage");
if (suraPage) {
  document.title = "القرآن الكريم";
  const paginationList = document.getElementById("pagination");
  const suraConent = document.querySelector("#sura .content");
  const pageOf = document.getElementById("pageOf");
  let quran;
  const totalPages = 6;
  let currentPage = 0;
  let pageSura = [];

  function pagination(arr, page = 0) {
    const surasPerPages = 19;
    const startIndex = page * surasPerPages;
    const endIndex = startIndex + surasPerPages;
    pageSura = arr.slice(startIndex, endIndex);
    pageSura.forEach((element) => {
      displaySura(element);
      let item = [...document.getElementsByClassName("sura")];
      goToSura(item);
    });
  }

  for (let i = 0; i < totalPages; i++) {
    paginationList.innerHTML += `<li class="item">${i + 1}</li>`;
  }
  // Select current Page
  let items = [...paginationList.children];
  items[currentPage].classList.add("active");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      items.forEach((item) => {
        item.classList.remove("active");
      });
      item.classList.add("active");
      currentPage = items.indexOf(item);
      pageOf.innerHTML = currentPage + 1;
      suraConent.innerHTML = "";
      pagination(quran, currentPage);
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    });
  });

  getSura().then((data) => {
    quran = data;
    pagination(quran, currentPage);
  });
}
export function goToSura(arr) {
  arr.forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.getAttribute("id");
      const url = `../page/oneSura.html?id=${id}`;
      window.location.assign(url);
    });
  });
}
