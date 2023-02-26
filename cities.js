const radioButtonNo = document.querySelector("#radioButtonNo");
let radioButtonYes = document.querySelector("#radioButtonYes");

let reload = () => {
  location.reload();
};

// HÄMTA STÄDER OCH POPULATION

fetch("https://avancera.app/cities/")
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    const table = document.querySelector("table");

    let displayCitiesFunc = () => {
      for (let i = 0; i < result.length; i++) {
        console.log(result[i]);

        const tr = document.createElement("tr");

        table.appendChild(tr);

        const tdCity = document.createElement("td");
        const tdPopulation = document.createElement("td");
        const tdID = document.createElement("td");

        tr.appendChild(tdCity);
        tr.appendChild(tdPopulation);
        tr.appendChild(tdID);

        tdCity.textContent = result[i].name;
        tdPopulation.textContent = result[i].population;
        tdID.textContent = result[i].id;
      }
    };

    displayCitiesFunc();

    // Lägg till en stad och population

    let textboxCities = document.querySelector("#textboxCities");
    let textboxPopulation = document.querySelector("#textboxPopulation");
    let addCheckbox = document.querySelector("#addCityAndPopulation");

    let addCityFunc = () => {
      let name = textboxCities.value;
      let population = textboxPopulation.value;
      fetch("https://avancera.app/cities/", {
        body: JSON.stringify({ name: name, population: Number(population) }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((response) => response.json())
        .then((result) => {
          reload();

          console.log(result);
          console.log(textboxCities.value);
          console.log(textboxPopulation.value);
        });
    };

    // TA BORT STAD
    let deleteCity = document.querySelector("#deleteCity");
    let deleteCityFunc = (response) => {
      let id = textboxID.value;

      fetch("https://avancera.app/cities/" + id, {
        body: JSON.stringify({ id: id }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }).then((response) => {
        console.log(response);
        reload();
      });
      for (let i = 0; i < result.length; i++) {
        console.log(result[i]);
      }
    };

    // REDIGERA STÄDER OCH POPULATION

    let changeCity = document.querySelector("#changeCity");

    let changeCitiesFunc = () => {
      let name = textboxCities.value;
      let population = textboxPopulation.value;
      let id = textboxID.value;

      let change = {};

      if (name !== null) {
        change["name"] = name;
      }

      if (population !== null) {
        change["population"] = Number(population);
      }

      fetch("https://avancera.app/cities/" + id, {
        body: JSON.stringify(change),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
      }).then((response) => {
        console.log(response);
        reload();
      });
    };

    const displayCitiesButton = document.querySelector("#displayCitiesButton");

    displayCitiesButton.addEventListener("click", (event) => {
      if (radioButtonYes.checked) {
        displayCitiesFunc();
        table.style.display = "block";
      }
      if (radioButtonNo.checked) {
        table.innerHTML = " ";
        table.style.display = "none";
      }
      event.preventDefault();
    });

    // BUTTON
    citiesButton.addEventListener("click", (event) => {
      if (changeCity.checked) {
        changeCitiesFunc();
      }

      if (deleteCity.checked) {
        deleteCityFunc();
      }

      if (addCheckbox.checked) {
        addCityFunc();
      }

      event.preventDefault();
    });
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
