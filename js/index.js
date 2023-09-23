import {
  getSagda,
  getSura,
  getOneSura,
  hadeethCategories,
  getOneHadeeth,
  getAzkar,
  tafser,
} from "./request.js";
import {
  displaySura,
  displaySagda,
  displayHadeeth,
  displayAyah,
  displayOneHadeeth,
  displayAzkar,
  displayAzkarCategory,
} from "./display.js";
import { goToSura } from "./allSura.js";
const index = document.getElementById("index");
const sajdaPage = document.getElementById("sajdaPage");
const oneSura = document.getElementById("oneSura");
const oneHadeeth = document.getElementById("oneHadeeth");
const oneAzkar = document.getElementById("oneAzkar");
const search = document.querySelector(".search");
const searchInput = document.querySelector(`.input input`);
const searchBtn = document.querySelector(".search .icon");
const clearBtn = document.querySelector(".search .clear");
const allSura = document.getElementById("allSura");
const allSajda = document.getElementById("allSajda");
const goTop = document.getElementById("gotop");
const loadMore = document.getElementById("loadMore");
const hadeethConent = document.querySelector("#hadeeth .content");
const tafseerList = [
  { id: 1, Tname: "التفسير الميسر" },
  { id: 2, Tname: "تفسير الجلالين" },
  { id: 3, Tname: "تفسير السعدي" },
];

if (index) {
  // searchBtn.addEventListener("click", () => {
  //   search.classList.toggle("active");
  // });
  // clearBtn.addEventListener("click", () => {
  //   searchInput.value = " ";
  // });

  // Get Sura
  getSura().then((data) => {
    for (let i = 0; i < 7; i++) {
      displaySura(data[i]);
    }
    let item = [...document.getElementsByClassName("sura")];
    goToSura(item);
  });

  // Get Ayahs sagda
  getSagda().then((data) => {
    for (let i = 0; i < 5; i++) {
      displaySagda(data[i]);
    }
  });

  // GO to All Suars
  allSura.addEventListener("click", () => {
    window.location.assign("../page/allSura.html?page=1");
  });

  // GO to All sagdas
  allSajda.addEventListener("click", () => {
    window.location.assign("../page/allsajda.html");
  });

  // Get hadeeth Data
  hadeethCategories().then((response) => {
    data = response;
    display(index, data);
  });
  // loadMore hadeeths
  let data;
  let index = 7;
  function display(index, data) {
    for (let i = 0; i < index; i++) {
      displayHadeeth(data[i]);
    }
    const hadeethItems = document.querySelectorAll("#hadeeth .hadeeth");
    goTOhadeethItems([...hadeethItems]);
  }
  // add index count
  function seeMore(data) {
    let endRange = 15;
    hadeethConent.innerHTML = "";
    index += 4;
    display(index, data);
    if (endRange === index) loadMore.style.display = "none";
  }
  // add Event To load More Btn
  loadMore.addEventListener("click", function () {
    seeMore(data);
  });

  // Go To hadeeth
  function goTOhadeethItems(arr) {
    arr.forEach((element) => {
      element.addEventListener("click", () => {
        let id = element.getAttribute("id");
        let total = element.getAttribute("total");
        let categorie = element.children[0].innerHTML;
        sessionStorage["total"] = total;
        sessionStorage["categorie"] = categorie;
        let url = `../page/hadeeth.html?id=${id}&page=1`;
        window.location.assign(url);
      });
    });
  }

  // Get Azkar
  getAzkar().then((data) => {
    Object.keys(data).forEach((element) => displayAzkar(element));
    const azkarItems = document.querySelectorAll("#azkar .azkar");
    goTOAzkar([...azkarItems]);
  });

  // Go To Azkar
  function goTOAzkar(arr) {
    arr.forEach((element) => {
      element.addEventListener("click", () => {
        let key = element.getAttribute("key");
        let url = `../page/oneAzkar.html?category=${key}`;
        window.location.assign(url);
      });
    });
  }
}

if (sajdaPage) {
  getSagda().then((data) => data.forEach((element) => displaySagda(element)));
  document.title = "Sajdas";
}

if (oneSura) {
  const suraName = document.querySelector("#sura .title h2");
  const suraWord = document.getElementById("suraWord");
  const audio = document.getElementById("audio");
  const tafseerContainer = document.getElementById("tafser");
  const tfserText = document.getElementById("tfserText");
  const ayahText = document.getElementById("ayahText");
  const closeBtn = document.getElementById("closeBtn");
  const suraID = new URL(location.href).searchParams.get("id");
  let activeAya;
  let currentIndex = 0;
  let ayahsArray = [];
  let audioArray = [];
  let id = new URL(location.href);
  id = id.searchParams.get("id");
  // Display Tafser List
  const tafseerOption = document.getElementById("tafserType");
  tafseerList.forEach(({ id, Tname }) => {
    tafseerOption.innerHTML += `<option value="${id}">${Tname}</option>`;
  });

  // Get Susra
  getOneSura(id).then((data) => {
    suraName.innerHTML = data.name;
    document.title = data.name;
    collectVerses(data.ayahs);
    audio.src = audioArray[currentIndex];
    displayAyah(ayahsArray);
    activeAya = [...suraWord.children];
    activeAya[0].classList.add("active");
    const ayahs = [
      ...document.querySelectorAll("#oneSura #sura .content #suraWord li"),
    ];
    getTafser(ayahs);
  });

  // collect Text And Audio IN Array
  function collectVerses(arr) {
    arr.forEach((ayah) => {
      ayahsArray.push(ayah.text);
      audioArray.push(ayah.audio);
    });
  }

  // Change To Next Sound
  function ChangeAudio() {
    let activeAyaOFfset = document.querySelector(
      "#oneSura #sura .content #suraWord li.active"
    );

    activeAya[audioArray.length - 1].classList.remove("active");
    if (currentIndex < audioArray.length) {
      for (let i = 0; i < audioArray.length; i++) {
        if (currentIndex === i) {
          activeAya[i + 1].classList.add("active");
          activeAya[0].classList.remove("active");
        } else {
          activeAya[currentIndex].classList.remove("active");
        }
      }
      currentIndex++;
      audio.src = audioArray[currentIndex];
      audio.play();
      if (currentIndex === audioArray.length - 1) currentIndex = 0;
      window.scrollTo({
        top: activeAyaOFfset.offsetTop,
        behavior: "smooth",
      });
    }
  }

  audio.addEventListener("ended", ChangeAudio);

  function getTafser(arr) {
    arr.forEach((ayah) => {
      ayah.addEventListener("click", () => {
        let ayahId = ayah.id;
        ayahId = suraID !== "1" ? ayahId : +ayahId + 1;
        document.body.style.overflow = "hidden";
        tafseerContainer.style.display = "flex";
        tafseerContainer.style.opacity = 1;
        ayahText.innerHTML = ayah.innerText;
        tafser(1, suraID, ayahId).then((data) => {
          tfserText.innerHTML = data[0];
        });
        change(ayahId);
      });
    });
  }

  // Close Pop Up
  closeBtn.addEventListener("click", () => {
    document.body.style.overflow = "auto";
    tafseerContainer.style.display = "none";
    tafseerContainer.style.opacity = 1;
  });

  // Change Tafser
  function change(id) {
    tafseerOption.addEventListener("change", () => {
      const selectedId = parseInt(document.getElementById("tafserType").value);
      tafser(selectedId, suraID, id).then((data) => {
        tfserText.innerHTML = data[0];
      });
    });
  }
}

if (oneHadeeth) {
  let id = new URL(location.href).searchParams.get("id");
  getOneHadeeth(id).then((data) => {
    displayOneHadeeth(data);
  });
}

if (oneAzkar) {
  const h2Title = document.querySelector("#azkar .title h2");
  let title = new URL(location.href).searchParams.get("category");
  document.title = title;
  h2Title.innerHTML = title;
  getAzkar().then((data) =>
    data[title].forEach((data) => displayAzkarCategory(data))
  );
}
// // Go To Top
function scroll() {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      goTop.classList.add("active");
    } else {
      goTop.classList.remove("active");
    }
  });
  goTop.addEventListener("click", () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  });
}
scroll();
