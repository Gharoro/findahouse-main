const search_result = JSON.parse(sessionStorage.getItem("search_result"));

function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

if (search_result.data.length === 0) {
  document.getElementById("search-sub-heading").innerHTML =
    search_result.message;
  document.getElementById("search-result-row").style.display = "none";
  document.getElementById("load-more").style.display = "none";
} else {
  const items = search_result.data;
  document.getElementById("search-sub-heading").innerHTML =
    search_result.message;
  const items_row = document.getElementById("search-result-row");
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
              <h3>N${numberWithCommas(item.price)}</h3>
              <h5>${
                item.title
              } <span style="float: right;">${item.location.toUpperCase()}</span></h5>
              <h6> ${item.size} Beds</h6>
              <p>${item.description}</p>
              <a href="" class="readmore-btn" onclick="property_id('${
                item.id
              }')">Find out more</a>
          </div>
      </div>
      `;
  };

  items_row.innerHTML = `${items.map(item_card).join("")}`;
}

const property_id = (id) => {
  event.preventDefault();
  sessionStorage.setItem("prop_id", id);
  window.location = "single-property.html";
  return false;
};
