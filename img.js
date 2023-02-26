//Kod för att displaya värdena inspirerad av https://medium.com/star-gazers/how-to-work-pexels-api-with-javascript-9cda16bbece9

const container = document.querySelector("#container");

// FUNKTION SOM HÄMTAR VÄRDEN FRÅN API

let photos;
let photoFunc = (data) => {
  data.photos.forEach((image) => {
    const photo = document.createElement("div");
    const info = document.createElement("div");
    const button = document.createElement("div");
    const hideButton = document.createElement("div");
    info.style.display = "none";
    hideButton.style.display = "none";

    photo.innerHTML = `<img class='img' src=${image.src.large}> `;
    button.innerHTML = ` <button class='buttons'>Info</button>`;
    hideButton.innerHTML = `<button class='buttons'>Dölj</button>`;
    info.innerHTML = `
        <div class='text'>
        <p class='jsP'> ${image.alt}</p>
        <p class='jsP'> Fotograf: ${image.photographer}</p>
        <p class='jsP'> Fotografens webplats: ${image.photographer_url}</></div>`;
    document.querySelector("#container").appendChild(photo);
    document.querySelector("#container").appendChild(info);
    document.querySelector("#container").appendChild(button);
    document.querySelector("#container").appendChild(hideButton);

    button.addEventListener("click", () => {
      info.style.display = "block";
      hideButton.style.display = "block";
    });

    hideButton.addEventListener("click", () => {
      info.style.display = "none";
      hideButton.style.display = "none";
    });
  });
};

const resetButton = document.querySelector("#imgResetButton");

// RENSA BILDER OCH RENSA FORM

resetButton.addEventListener("click", (event) => {
  container.innerHTML = "";

  document.querySelector("form").reset();

  event.preventDefault();
});

let searchFunc = () => {
  const first = document.querySelector("#searchImg");
  const second = document.querySelector("#amountImg");

  let searchs = first.value;
  let amount = second.value;

  fetch(
    "https://api.pexels.com/v1/search?query=" +
      searchs +
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
};

//SÖK-KNAPP

const searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", (event) => {
  searchFunc();

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
