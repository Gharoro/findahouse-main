const BASE_URL = "https://find-a-house-rails-api.herokuapp.com/api/v1";

function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

window.addEventListener("load", async (event) => {
  event.preventDefault();

  const items_row = document.getElementById("properties-row");
  const item_card = (item) => {
    return `
    <div class="col-lg-4">
        <div class="property-item">
            <div class="pi-image">
                <img src="${item.property_images[0]}" alt="" />
                ${
                  item.category === "rent"
                    ? `<div class="pi-badge offer"> ${item.category.toUpperCase()} </div>`
                    : `<div class="pi-badge new"> ${item.category.toUpperCase()} </div>`
                }
            </div>
            <h3>${
              item.title
            } <span style="float: right;">${item.location.toUpperCase()}</span></h3>
            <h5>N${numberWithCommas(item.price)}</h5>
            <h6> ${item.size} Beds</h6>
            <p>${item.description}</p>
            <a href="" class="readmore-btn" onclick="property_id('${
              item.id
            }')">Find out more</a>
        </div>
    </div>
    `;
  };

  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}/properties`,
    });

    if (response.data.count === 0) {
      items_row.style.display = "none";
      document.getElementById("home-sub-heading").innerHTML =
        response.data.message;
    } else {
      const items = response.data.data;
      items_row.innerHTML = `${items.map(item_card).join("")}`;
    }
  } catch (error) {
    console.log("ERROR: ", error.response);
  }
});

const property_id = (id) => {
  event.preventDefault();
  sessionStorage.setItem("prop_id", id);
  window.location = "single-property.html";
  return false;
};

search_listings = async (event) => {
  event.preventDefault();
  let location = document.getElementById("s_location").value;
  if (!location) {
    location = "lagos";
  }
  location = location.toLowerCase();
  let category;
  if (document.getElementById("buy").checked) {
    category = document.getElementById("buy").value;
  }
  if (document.getElementById("rent").checked) {
    category = document.getElementById("rent").value;
  }

  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}/properties/search/${category}/${location}`,
    });

    sessionStorage.setItem("search_result", JSON.stringify(response.data));
    window.location = "search-result.html";
    return false;
  } catch (error) {
    console.log("ERROR: ", error.response);
  }
};
