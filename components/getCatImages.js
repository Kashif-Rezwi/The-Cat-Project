export async function getCatImages(BREED_ID, API_KEY) {
  let IMAGES_BY_BREED = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${BREED_ID}&api_key=${API_KEY}`;
  try {
    let res = await fetch(IMAGES_BY_BREED);
    let data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}
