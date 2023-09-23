import { getOneCategorie } from "./request.js";
import { displayCategorieHadeeth } from "./display.js";
document.title = sessionStorage["categorie"];
document.querySelector("#hadeeth .title h2").innerHTML =
  sessionStorage["categorie"];
let items;
const paginationList = document.getElementById("pagination");
let id = new URL(location.href).searchParams.get("id");
let page = new URL(location.href).searchParams.get("page");
let total = +sessionStorage["total"];
let itemInPage = 20;
let totalPages = Math.ceil(total / itemInPage);

getOneCategorie(id, page).then((data) => {
  data.forEach((element) => displayCategorieHadeeth(element));
  let hadeeths = [...document.querySelectorAll("#hadeeth .content .hadeeth")];
  goTohadeeth(hadeeths);
});

function goTohadeeth(arr) {
  arr.forEach((item) => {
    item.addEventListener("click", () => {
      let url = `../page/oneHadeeth.html?id=${item.getAttribute("id")}`;
      window.location.assign(url);
      // alert(url);
    });
  });
}

function pagination(totalPages) {
  let urlParams = new URLSearchParams(window.location.search);
  let currentPage = parseInt(urlParams.get("page")) - 1 || 0;
  let lis = "";

  if (currentPage >= totalPages - 10) {
    currentPage = totalPages - 10;
  }

  lis += `<li class="pre">></li>`;
  for (let i = currentPage; i < totalPages; i++) {
    if (i > currentPage + 9) {
      lis += `<li class="item dot">...</li>`;
      break;
    }
    lis += `<li class="item">${i + 1}</li>`;
  }
  lis += `<li class="next"><</li>`;

  paginationList.innerHTML = lis;

  items = paginationList.querySelectorAll(".item:not(.dot)");
  items.forEach((li) => {
    li.addEventListener("click", (e) => {
      let page = parseInt(e.target.innerHTML);
      let url = `../page/hadeeth.html?id=${id}&page=${page}`;
      window.location.assign(url);
      getOneCategorie(id, page).then((data) => {
        data.forEach((element) => displayCategorieHadeeth(element));
        let hadeeths = [
          ...document.querySelectorAll("#hadeeth .content .hadeeth"),
        ];
        goTohadeeth(hadeeths);
      });

      items.forEach((li) => li.classList.remove("active"));
      li.classList.add("active");
    });
    if (page === li.innerHTML) {
      items.forEach((li) => li.classList.remove("active"));
      li.classList.add("active");
    }
  });

  getOneCategorie(id, currentPage + 1).then((data) => {
    data.forEach((element) => displayCategorieHadeeth(element));
    let hadeeths = [...document.querySelectorAll("#hadeeth .content .hadeeth")];
    goTohadeeth(hadeeths);
  });

  let next = paginationList.querySelector(".next");
  let pre = paginationList.querySelector(".pre");

  next.addEventListener("click", () => {
    let page = currentPage + 2;
    let url = `../page/hadeeth.html?id=${id}&page=${page}`;
    window.location.assign(url);
  });

  pre.addEventListener("click", () => {
    let page = currentPage;
    let url = `../page/hadeeth.html?id=${id}&page=${page}`;
    window.location.assign(url);
  });
  +page === 1 ? (pre.style.display = "none") : (pre.style.display = "flex");
  +page === totalPages
    ? (next.style.display = "none")
    : (next.style.display = "flex");
}
pagination(totalPages);
