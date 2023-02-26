const olColor = document.querySelector("#shuffleColor");
const storeList = document.querySelector("#storeList");
const hex = document.querySelector("#hex");
const rgb = document.querySelector("#rgb");
const hsl = document.querySelector("#hsl");
const shuffleButton = document.querySelector("#shuffleButton");
const shufflatText = document.querySelector("#shufflatText");
const container = document.querySelector("#container");
const error = document.querySelector("#shadeError");

error.style.display = "none";
container.style.display = "none";
shufflatText.style.display = "none";

let reload = () => {
  location.reload();
};

// [x]LOOPA
// [x]Färgändring när koden ändras
// []Gör textfärgen ljus om färgen är mörk
// []Kunna kopiera färgkoden

// SHUFFLE-FUNKTION Visar färg utifrån vald(a) checkbox(ar)
let shuffleCheckboxes = (result) => {
  const shuffleList = document.querySelector("#shuffleList");

  if (hex.checked) {
    const li = document.createElement("li");
    li.innerHTML = result.hex;
    li.style.backgroundColor = result.hex;
    shufflatText.style.display = "block";

    shuffleList.appendChild(li);
  }

  if (rgb.checked) {
    const li = document.createElement("li");
    li.innerHTML = result.rgb;
    li.style.backgroundColor = result.rgb;
    shufflatText.style.display = "block";

    shuffleList.appendChild(li);
  }

  if (hsl.checked) {
    const li = document.createElement("li");
    li.innerHTML = result.hsl;
    li.style.backgroundColor = result.hsl;
    shufflatText.style.display = "block";

    shuffleList.appendChild(li);
  }

  if ((hsl.checked && hex.checked) || rgb.checked) {
    decreaseButton.style.visibility = "visible";
  } else if ((rgb.checked && hsl.checked) || hex.checked) {
    decreaseButton.style.visibility = "visible";
  } else if ((hex.checked && rgb.checked) || hsl.checked) {
    decreaseButton.style.visibility = "visible";
  } else {
    decreaseButton.style.visibility = "hidden";
  }
};

let colorArray = [];

let shuffleFunction = () => {
  fetch("https://x-colors.herokuapp.com/api/random")
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      shuffleCheckboxes(result);

      // lägger värdena i localStorage
      if (rgb.checked || hex.checked || hsl.checked) {
        colorArray.push(result);
        resetAllButton.style.display = "block";
        resetButton.style.display = "block";
      }

      localStorage.setItem("saved", JSON.stringify(colorArray));

      console.log(colorArray);
    });
};

// FUNKTION OCH KNAPP FÖR ATT SPARA NER OCH VISA SÖKTA FÄRGER I 'SLUMPAD'

const localStorageButton = document.querySelector("#localStorageButton");
const hideLocalStoreButton = document.querySelector("#hideLocalStorageButton");

localStoreList.style.display = "none";
hideLocalStoreButton.style.display = "none";

localStorageButton.addEventListener("click", (event) => {
  const newStoreColorArray = JSON.parse(localStorage.getItem("saved"));

  hideLocalStoreButton.style.display = "block";
  localStoreList.style.display = "block";
  localStorageButton.style.display = "none";

  for (let i = 0; i < newStoreColorArray.length; i++) {
    const localStorageArray = newStoreColorArray[i];
    const li = document.createElement("li");
    // IF IS CHECKED
    li.innerHTML =
      localStorageArray.hex +
      " " +
      localStorageArray.rgb +
      "  " +
      localStorageArray.hsl;
    li.style.background = localStorageArray.hex;

    localStoreList.appendChild(li);
  }
  event.preventDefault();
});

hideLocalStoreButton.addEventListener("click", (event) => {
  localStorageButton.style.display = "block";
  localStoreList.innerHTML = "";

  event.preventDefault();
});

shuffleButton.addEventListener("click", (event) => {
  if (!hex.checked && !rgb.checked && !hsl.checked) {
    let h = document.createElement("h2");
    //FUNKAR EJ
    h.textContent =
      "Inga checkboxar är ifyllda. Klicka i en eller flera och försök igen!";
    shufflatText.style.display = "none";
  } else {
    shuffleFunction();
  }

  event.preventDefault();
});

// FUNKTION FÖR ATT TA BORT SENASTE SÖKNINGEN
let resetFunc = () => {
  shuffleList.innerHTML = "";
  colorArray.pop();
  console.log(colorArray);

  for (let i = 0; i < colorArray.length; i++) {
    const newArray = colorArray[i];
    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    const li3 = document.createElement("li");

    li1.innerHTML = newArray.hex;
    li1.style.background = newArray.hex;
    li2.innerHTML = newArray.rgb;
    li2.style.background = newArray.rgb;
    li3.innerHTML = newArray.hsl;
    li3.style.background = newArray.hsl;

    shuffleList.appendChild(li1);
    shuffleList.appendChild(li2);
    shuffleList.appendChild(li3);
  }
};

// KNAPP FÖR ATT TA BORT SENASTE SÖKNINGEN
const resetButton = document.querySelector("#resetButton");
resetButton.style.display = "none";

resetButton.addEventListener("click", (event) => {
  resetFunc();

  event.preventDefault();
});

// FUNKTION FÖR ATT KOMPRIMERA DEN SLUMPADE SÖKNINGEN
let decreaseFunc = () => {
  shuffleList.innerHTML = "";

  for (let i = 0; i < colorArray.length; i++) {
    const newArray = colorArray[i];
    const li = document.createElement("li");

    // if (hex.checked || rgb.checked || hsl.checked) {
    //   decreaseButton.style.display = "none";
    // } else {
    //   decreaseButton.style.display = "block";
    // }

    // if (hsl.checked && rgb.checked) {
    //   li.innerHTML = newArray.hsl + " " + newArray.rgb;
    //   li.style.background = newArray.hex;
    // }
    // if (hsl.checked && hex.checked) {
    //   li.innerHTML = newArray.hsl + " " + newArray.hex;
    //   li.style.background = newArray.hex;
    // }

    // if (hex.checked && rgb.checked) {
    //   li.innerHTML = newArray.hex + " " + newArray.rgb;
    //   li.style.background = newArray.hex;
    // } else {
    li.innerHTML = newArray.hex + " " + newArray.rgb + " " + newArray.hsl;
    li.style.background = newArray.hex;
    // }

    shuffleList.appendChild(li);
  }
};

// KNAPP FÖR ATT KOMPRIMERA DEN SLUMPADE SÖKNINGEN
const decreaseButton = document.querySelector("#decreaseButton");
decreaseButton.style.visibility = "hidden";

decreaseButton.addEventListener("click", (event) => {
  decreaseFunc();
  event.preventDefault();
});

// FUNKTION FÖR ATT TA BORT ALLT
const resetAllButton = document.querySelector("#resetAllButton");
resetAllButton.style.display = "none";

resetAllButton.addEventListener("click", (event) => {
  shuffleList.innerHTML = "";
  event.preventDefault();
});

// NYANSER

const inputColorShade = document.querySelector(".inputColorShade");

//Så chart kan köras mer än 1 gång
let myChart = null;

// FUNKTION FÖR ATT VISA BILDER + VÄRDEN
let photos;
let photoFunc = (data) => {
  data.photos.forEach((image) => {
    const photo = document.createElement("div");

    photo.innerHTML = `<div id='jsImgContainer'><img class='img' src=${image.src.large}>
        <p class='pText'> Hex färgkod: ${image.avg_color}</p></div>`;
    document.querySelector("#container").appendChild(photo);
  });
};

//SPARAR NYANS-VÄRDENA I SESSIONSTORAGE
let storeArray = [];

// FUNKTION OCH KNAPP FÖR ATT SLUMPA FRAM NYANSER AV VALD FÄRG, SAMT KUNNA SE BILDER I VALD FÄRG
colorShadeButton.addEventListener("click", (event) => {
  let amount = document.querySelector("#imgAmount").value;
  container.innerHTML = "";

  const colorMap = {
    rosa: "pink",
    blå: "blue",
    gul: "yellow",
    grön: "green",
    lila: "purple",
    marinblå: "navy",
    limegrön: "lime",
    orange: "orange",
    turkos: "aqua",
    grå: "grey",
    röd: "red",
    brun: "brown",
  };

  let boxValue = inputColorShade.value.toLowerCase();
  let newColor = colorMap[boxValue];

  if (!colorMap.hasOwnProperty(boxValue)) {
    error.style.display = "block";
  } else {
    error.style.display = "none";
  }

  if (
    amount > 0 &&
    colorShadeButton.click &&
    colorMap.hasOwnProperty(boxValue) === true
  ) {
    container.style.display = "block";
    fetch(
      "https://api.pexels.com/v1/search?query=" +
        newColor +
        "&per_page=" +
        amount +
        "&page=1",
      {
        headers: {
          Authorization:
            "563492ad6f917000010000011543be9166e94840b915c9254f07ac73",
        },
      }
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data.photos);
        photoFunc(data);
      });
  }

  if (colorMap.hasOwnProperty(boxValue) === true) {
    fetch("https://x-colors.herokuapp.com/api/random/" + newColor)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        colorBoxes(result);

        // LÄGGER VÄRDENA I CHART
        storeArray.push(result);
        console.log(storeArray);

        sessionStorage.setItem("savedColor", JSON.stringify(storeArray));

        let data = [];
        let labels = [];

        // HÄMTAR RGB-VÄRDETS SIFFROR OCH PUSHAR IN I CHART
        for (let i = 0; i < storeArray.length; i++) {
          const regExp = /rgb\((\d+), ?(\d+), ?(\d+)\)/;
          let chartValues = regExp.exec(result.rgb);
          console.log(chartValues[1]);

          data.push(chartValues[1]);
          data.push(chartValues[2]);
          data.push(chartValues[3]);

          localStorage.setItem("labelcolor", JSON.stringify(newColor));
        }

        console.log(data);
        console.log(labels);

        //CHART
        const ctx = document.querySelector("#myChart").getContext("2d");

        if (myChart !== null) {
          myChart.destroy();
        }
        myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Röd", "Grön", "Blå"],
            datasets: [
              {
                label: "Färgandelar",
                data: data,
                backgroundColor: [
                  "rgba(216, 148, 174,0.8)",
                  "rgba(154, 184, 165,0.8)",
                  "rgba(191, 198, 242,0.8)",
                ],

                borderColor: [
                  "rgba(216, 148, 174,0.9)",
                  "rgba(154, 184, 165,0.9)",
                  "rgba(191, 198, 242,0.9)",
                ],
                borderWidth: 1,
              },
            ],
          },
        });
      });
  } else {
    container.style.display = "none";
  }
  event.preventDefault();
});

// LÄGGER RGB-VÄRDET FRÅN FETCEHEN I LISTA
let colorBoxes = (result) => {
  const li = document.createElement("li");
  li.innerHTML = result.rgb;
  li.style.backgroundColor = result.rgb;

  olColor.appendChild(li);
};

//RENSAR BILDERNA

const imgClear = document.querySelector("#imgClear");

imgClear.addEventListener("click", (event) => {
  container.innerHTML = "";

  event.preventDefault();
});

// RENSAR ALLA FÄRGNYANSERNA

const resetShade = document.querySelector("#resetShade");

resetShade.addEventListener("click", (event) => {
  shuffleColor.innerHTML = "";

  event.preventDefault;
});

// FUNKTION OCH KNAPP FÖR sessionStorage I 'NYANSER'

const storeButton = document.querySelector("#storeButton");

storeButton.addEventListener("click", (event) => {
  console.log(JSON.parse(sessionStorage.getItem("savedColor")));
  const sessionStorageArray = JSON.parse(sessionStorage.getItem("savedColor"));

  for (let i = 0; i < sessionStorageArray.length; i++) {
    const newSessionStorageArray = sessionStorageArray[i];
    const li = document.createElement("li");
    li.innerHTML = newSessionStorageArray.rgb;
    li.style.backgroundColor = newSessionStorageArray.rgb;
    storeList.appendChild(li);
  }
  event.preventDefault();
});

// KNAPP FÖR ATT KOMMA TILLBAKA UPP PÅ SIDAN

const upArrow = document.querySelector("#uparrow");

window.onscroll = function () {
  scrollFunc();
};

let scrollFunc = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    upArrow.style.display = "block";
  } else {
    upArrow.style.display = "none";
  }
};

upArrow.addEventListener("click", (event) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  event.preventDefault();
});
