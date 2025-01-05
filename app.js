const fetchData = () => {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=ma")
    .then((res) => res.json())
    .then((data) => {
      displayData(data.drinks);
    });
};
fetchData();

const displayData = (allData) => {
  const show_data = document.getElementById("show_data");
  console.log(allData);
  allData.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card h-100" style="width: 18rem;">
        <img src="${element.strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Name: ${element.strDrink}</h5>
            <h6 class="card-title">Category: ${element.strCategory}</h6>
            <p title="${
              element.strInstructions
            }" class="card-text">Instructions: ${element.strInstructions.substring(
      0,
      15
    )}${element.strInstructions.length > 15 ? "..." : ""}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
    `;
    show_data.appendChild(div);
  });
};

document.getElementById("search_btn").addEventListener("click", (e) => {
  const text = document.getElementById("search_box").value;
  if (text.length == 0) {
    document.getElementById("show_data").innerHTML = "";
    fetchData();
  } else {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        document.getElementById("show_data").innerHTML = "";
        if (data.drinks) {
          displayData(data.drinks);
        } else {
          const show_data = document.getElementById("show_data");
          const p = document.createElement("p");
          p.classList.add("no_data");
          p.innerText = "No data found";
          console.log(p);
          show_data.appendChild(p);
        }
      });
  }
});
