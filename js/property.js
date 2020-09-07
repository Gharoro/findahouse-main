const id = sessionStorage.getItem("prop_id");
function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

window.addEventListener("load", async (event) => {
  event.preventDefault();

  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}/properties/${id}`,
    });

    const property = response.data.data;
    console.log(property);
    const realtor = response.data.realtor;
    const html = `
    <div class="single-property">
        <div
            id="carouselExampleControls"
            class="carousel slide"
            data-ride="carousel"
        >
            <div class="carousel-inner">
            <div class="carousel-item active">
                <div class="sp-image">
                <img
                    src="${property.property_images[0]}"
                    class="d-block w-100"
                    alt=""
                />
                ${
                  property.category === "rent"
                    ? `<div class="sp-badge offer">${property.category.toUpperCase()}</div>`
                    : `<div class="sp-badge new">${property.category.toUpperCase()}</div>`
                }
                </div>
            </div>
            </div>
            <a
            class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
            >
            <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
            ></span>
            <span class="sr-only">Previous</span>
            </a>
            <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
            >
            <span
                class="carousel-control-next-icon"
                aria-hidden="true"
            ></span>
            <span class="sr-only">Next</span>
            </a>
        </div>

        <div class="row">
            <div class="col-lg-8">
            <div class="property-header">
                <h3>${property.title}</h3>
                <h5>${property.location}</h5>
            </div>
            </div>
            <div class="col-lg-4 text-left text-lg-right">
            <div class="property-header">
                <h3>N${numberWithCommas(property.price)}</h3>
                <p>${property.size} Bedrooms ${property.property_type}</p>
            </div>
            </div>
        </div>
        <div class="property-info-bar">
            <div class="row">
            <div class="col-lg-7">
                <div class="pi-metas">
                <div class="pi-meta">${property.size} Bedroom</div>
                </div>
            </div>
            </div>
        </div>
        <div class="property-text">
            <h4>Description</h4>
            <p>${property.description}</p>
        </div>
        </div>
        <div class="map-widget">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14376.077865872314!2d-73.879277264103!3d40.757667781624285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1546528920522"
            style="border: 0"
            allowfullscreen
        ></iframe>
    </div>
    `;
    document.getElementById("single-property-detail").innerHTML = html;

    document.getElementById("agent-photo").src = realtor.profile_picture;
    document.getElementById("agent-name").innerHTML = realtor.name;
    document.getElementById(
      "agent-office"
    ).innerHTML = `Office-Address: ${realtor.office_address}`;
  } catch (error) {
    console.log("ERROR: ", error.response);
  }
});

const make_booking = async (event) => {
  event.preventDefault();

  const contactForm = document.getElementById("contact-form");
  const formData = new FormData(contactForm);

  let bodyFormData = new FormData();
  bodyFormData.append("name", formData.get("name"));
  bodyFormData.append("email", formData.get("email"));
  bodyFormData.append("subject", formData.get("subject"));
  bodyFormData.append("message", formData.get("message"));
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}/bookings/${id}`,
      data: bodyFormData,
    });
    console.log(response.data);

    Swal.fire(response.data.message, "", "success");

    // toastr.info(response.data.message, { timeOut: 4000 });
  } catch (error) {
    console.log("ERROR: ", error.response);
    toastr.error(error.response.data.error);
  }
};
