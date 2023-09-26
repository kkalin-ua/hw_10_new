const url = 'https://api.thecatapi.com/v1';
const api_key = "live_w1pZANCYxZIwqFnjiTpNJsLnvtVnFTrYUU1qI1lSDQnRWaUsTms7A2qd4Qb65atm";


export function fetchCat(data) {

  return fetch(`${url}${data}?api_key=${api_key}`)
    .then(
    forLoader.style.display = "block"
    )
    .then((response) => {
    if (!response.ok) {
      forLoader.style.display = "none";
      ifError.style.display = "block";
      throw new Error(response.status);
    }
    forLoader.style.display = "none";
    return response.json();
  });
}