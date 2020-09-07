const BASE_URL = "https://find-a-house-rails-api.herokuapp.com/api/v1";

/** Hide and display contact form */
function toggleContactForm(event) {
  event.preventDefault();
  let x = document.getElementById("contact-form");
  if (x.style.display === "none") {
    x.style.display = "";
  } else {
    x.style.display = "none";
  }
}

/** Search Listings */
const search_listings = (event) => {
  event.preventDefault();
  console.log("search started...");
};
