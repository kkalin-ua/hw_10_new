import { fetchCat } from "./fetchCat";

const url = 'https://api.thecatapi.com/v1';
const api_key = "live_w1pZANCYxZIwqFnjiTpNJsLnvtVnFTrYUU1qI1lSDQnRWaUsTms7A2qd4Qb65atm";


const ref = {
  breedSelect: document.querySelector(".breed-select"),
  forLoader: document.querySelector(".loader"),
  ifError: document.querySelector(".error"),
  catInfo: document.querySelector(".cat-info"),
}

const { breedSelect, forLoader, ifError, catInfo } = ref;

forLoader.style.display = "none";
ifError.style.display = "none";


// <option>

fetch(`${url}/breeds?api_key=${api_key}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then(data => {
    // console.log(data)
    const markup = data
      .map(({ name, id }) => {
        return `<option value="${id}">${name}</option>`;
      })
      .join("");
    breedSelect.innerHTML = markup;
  })


breedSelect.addEventListener("change", function(){
  // console.log(this.value);

  catInfo.style.display = "flex";
  catInfo.style.marginTop = "20px";
  catInfo.style.border = '1px solid #0d161b';
  catInfo.style.justifyContent = 'center';
  catInfo.style.gap = '40px';
  catInfo.style.padding = '20px';
  catInfo.style.backgroundColor = 'rgb(247 244 213)';
  catInfo.style.fontsize = "24px";

  let fetchImg = `/images/search?${this.value}`;
  let fetchAbove = `/breeds`;


  fetchCat(fetchImg)
    .then(data => {
      const catInfoImg = `<img class="cat-Info-Img" loading="lazy" alt="Cat foto" src="${data[0].url}" width="400"></img>`;
      
    catInfo.innerHTML = catInfoImg;
      
      const catInfoImgStyle = document.querySelector(".cat-Info-Img");
      // console.log(catInfoImgStyle);
      
      catInfoImgStyle.style.height = 'auto';
      catInfoImgStyle.style.marginRight = "50px";
      
    })
    .catch(onFetchError);


    fetchCat(fetchAbove)
      .then(data => {
        // console.log(data)

        const catInfoArray = data.find(option => option.id === this.value);
        // console.log(catInfoArray);

        const catInfoDiv = `<div class="cat-Info-Above">
                            <h1>${catInfoArray.name}</h1>
                            <p>${catInfoArray.description}</p>
                            <p><b>Temperament:</b>
                            ${catInfoArray.temperament}</p>
                            </div>`

        const catInfoImg = document.querySelector(".cat-Info-Img");
        // console.log(catInfoDiv);
        catInfoImg.insertAdjacentHTML('afterend', catInfoDiv)
    })
    .catch(onFetchError);


})

// function fetchCat(data) {

//   return fetch(`${url}${data}?api_key=${api_key}`)
//     .then(
//     forLoader.style.display = "block"
//     )
//     .then((response) => {
//     if (!response.ok) {
//       forLoader.style.display = "none";
//       ifError.style.display = "block";
//       throw new Error(response.status);
//     }
//     forLoader.style.display = "none";
//     return response.json();
//   });
// }


function onFetchError(error) {
  ifError.style.display = "block";
  alert('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
      position: 'center-center',
      timeout: 5000,
      width: '400px',
      fontSize: '24px'
  });
};







