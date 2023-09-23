const suraConent = document.querySelector("#sura .content");
const sajdaConent = document.querySelector("#sajda .content");
const hadeethConent = document.querySelector("#hadeeth .content");
const CategorieHadeethConent = document.querySelector(
  "#hadeeth #hadeeth .content"
);
const oneHadeeth = document.querySelector("#oneHadeeth .content");
const azkerContent = document.querySelector("#azkar .content");
const azkerCategorie = document.querySelector("#oneAzkar #azkar .content");
function displaySagda(element) {
  let content = `
<div class="col-lg-4 col-md-6 col-12 p-3 ">
  <div class="sajda">
    <h2>${element.text}</h2>
    <audio id="id" src="${element.audio}" controls class="audiplay"></audio>
    <div class="data-info">
      <span class="badge text-bg-primary">الجزء ${element.juz}</span>
      <span class="badge text-bg-primary">${element.surah.name} </span>
      <span class="badge text-bg-primary">الاية ${element.numberInSurah}</span>
      <span class="badge text-bg-primary">صفحة ${element.page}</span>
    </div>
  </div>
</div>
`;
  sajdaConent.innerHTML += content;
}

function displaySura(element) {
  let content = `
<div class="col-lg-3 col-md-4 col-sm-6 col-12 p-2">
  <div class="sura" id="${element.number}">
    <h2>${element.name}</h2>
  </div>
</div>
`;
  suraConent.innerHTML += content;
}

// Display Ayahs
function displayAyah(arr) {
  let counter = 1;
  arr.forEach((aya, index) => {
    if (index === 0) {
      aya = aya.split(" ").splice(4);
    }
    let lis = `
<li id=${counter}>${aya} ${
      aya.length === 0 ? "" : ` <span><b>﴿</b>${counter++}<b>﴾</b></span>`
    }
</li>`;
    suraWord.innerHTML += lis;
  });
}
function displayHadeeth(element) {
  let content = `
<div class="col-lg-3 col-md-4 col-sm-6 col-12 p-2">
  <div class="hadeeth" id="${element.id}" total="${element.hadeeths_count}">
    <h2>${element.title}</h2>
    <span class="badge text-bg-primary">حــديث ${element.hadeeths_count}</span>
  </div>
</div>
`;
  hadeethConent.innerHTML += content;
}

function displayCategorieHadeeth(element) {
  let content = `
<div class="col-lg-3 col-md-4 col-sm-6 col-12 p-2">
  <div class="hadeeth" id="${element.id}">
    <h2>${element.title}</h2>
  </div>
</div>
`;
  CategorieHadeethConent.innerHTML += content;
}

function displayOneHadeeth(element) {
  let content = `
<div class="title mx-auto">
  <h2>${element.title}</h2>
</div>
<div class="contentHadeeth">
  <p>${element.hadeeth}</p>
  <span class="badge text-bg-primary">${element.attribution}</span>
  <span class="badge text-bg-primary">${element.grade}</span>
</div>
<div class="contentHadeeth">
  <h2>تــفــســيــر</h2>
  <p>${element.explanation}</p>
</div>
<div class="contentHadeeth">
  <h2>تـــوضـــيـــحات</h2>
  <ul> ${ul(element.hints)}</ul>
</div>
${
  element.words_meanings.length === 0
    ? ""
    : `<div class="contentHadeeth">
  <h2>مــعــانــى</h2>
  <dl> ${dl(element.words_meanings)}</dl>
</div>`
}

`;
  function ul(arr) {
    let lis = "";
    arr.forEach((element) => {
      lis += `<li><i class="fa-solid fa-check"></i>${element}</li>`;
    });
    return lis;
  }

  function dl(arr) {
    let dls = "";
    arr.forEach(({ word, meaning }) => {
      dls += `<dt>${word}</dt>
<dd><i class="fa-solid fa-check"></i> ${meaning}</dd>`;
    });
    return dls;
  }
  oneHadeeth.innerHTML += content;
}

function displayAzkar(element) {
  let content = `
<div class="col-lg-3 col-md-4 col-sm-6 col-12 p-2">
  <div class="azkar" key="${element}">
    <h2>${element}</h2>
  </div>
</div>
`;
  azkerContent.innerHTML += content;
}

function displayAzkarCategory(element) {
  let content = `
<div class="col-lg-3 col-md-4 col-sm-6 col-12 p-2">
  <div class="azkar">
    <p>${element.content}</p>
    <span class="badge text-bg-primary"> الـعــدد  ${parseInt(
      element.count
    )}</span>
  </div>
</div>
`;
  azkerCategorie.innerHTML += content;
}

function displayTafser(element) {
  let content = `
<div class="col-lg-3 col-md-4 col-sm-6 col-12 p-2">
  <div class="azkar">
    <p>${element.content}</p>
    <span class="badge text-bg-primary"> الـعــدد  ${parseInt(
      element.count
    )}</span>
  </div>
</div>
`;
  azkerCategorie.innerHTML += content;
}

export {
  displaySura,
  displaySagda,
  displayHadeeth,
  displayCategorieHadeeth,
  displayOneHadeeth,
  displayAyah,
  displayAzkar,
  displayAzkarCategory,
  displayTafser,
};
