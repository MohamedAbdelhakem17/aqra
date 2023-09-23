export async function getSagda() {
  const response = await fetch("https://api.alquran.cloud/v1/sajda/ar.alafasy");
  const {
    data: { ayahs },
  } = await response.json();
  return ayahs;
}

export async function getSura() {
  const response = await fetch("https://api.alquran.cloud/v1/surah");
  const { data } = await response.json();
  return data;
}

export async function getOneSura(id) {
  const response = await fetch(
    `https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`
  );
  const { data } = await response.json();
  return data;
}

export async function hadeethCategories() {
  const response = await fetch(
    `https://hadeethenc.com/api/v1/categories/list/?language=ar`
  );
  const data = await response.json();
  data.length = 15;
  return data;
}

export async function getOneCategorie(id = 1, page = 1) {
  const response = await fetch(
    `https://hadeethenc.com/api/v1/hadeeths/list/?language=ar&category_id=${id}&page=${page}&per_page=11`
  );
  const { data } = await response.json();
  return data;
}

export async function getOneHadeeth(id) {
  const response = await fetch(
    `https://hadeethenc.com/api/v1/hadeeths/one/?language=ar&id=${id}`
  );
  const data = await response.json();
  return data;
}

export async function getAzkar() {
  const response = await fetch(`../data/azkar.json`);
  const data = await response.json();
  return data;
}

export async function tafser(tafser_id, sura_number, ayah_number) {
  const response = await fetch(
    `http://api.quran-tafseer.com/tafseer/${tafser_id}/${sura_number}/${ayah_number}`
  );
  const { text, tafseer_name } = await response.json();
  return [text, tafseer_name];
}
