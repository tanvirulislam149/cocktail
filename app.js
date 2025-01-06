let allData;
const fetchData = () => {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=ma")
    .then((res) => res.json())
    .then((data) => {
      displayData(data.drinks);
      allData = data.drinks;
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
            <div class="d-flex justify-content-between">
                <button class="btn btn-primary" onclick="handleCart(${
                  element.idDrink
                })">Add to cart</button>
                <button id="details_btn" onclick="handleDetails(${
                  element.idDrink
                })" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
            </div>
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

const handleDetails = (id) => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.drinks[0]);
      const item = data.drinks[0];
      const modalTitle = document.getElementById("exampleModalLabel");
      modalTitle.innerText = item.strDrink;
      const modalBody = document.getElementById("modal_body");
      modalBody.innerHTML = `
      <div class="card h-100 border-0">
        <img src="${item.strDrinkThumb}" class="card-img-top w-50 mx-auto" alt="...">
        <div class="card-body">
            <h5 class="card-title">Name: ${item.strDrink}</h5>
            <h6 class="card-title">Category: ${item.strCategory}</h6>
            <h6 class="card-title">Alcoholic: ${item.strAlcoholic}</h6>
            <p class="card-text"><b>Instructions:</b> ${item.strInstructions}</p>
        </div>
    </div>
      `;
    });
};

const cart = [];
const handleCart = (id) => {
  if (cart.length >= 7) {
    alert("Cann't add more than 7 items.");
  } else {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const res = data.drinks[0];
        cart.push(res);
        const cart_data = document.getElementById("cart_data");
        document.getElementById("count").innerText = cart.length;
        cart_data.innerHTML = "";
        cart.forEach((e, index) => {
          const table_row = document.createElement("tr");
          table_row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>
        <img
          style="width: 50px; border-radius: 50%"
          src="${e.strDrinkThumb}"
          alt=""
        />
      </td>
      <td>${e.strDrink}</td>
    `;
          cart_data.appendChild(table_row);
        });
      });
  }
};
