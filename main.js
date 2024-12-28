const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__tag", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__content .section__description", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 2000,
});

ScrollReveal().reveal(".service__card", {
  ...scrollRevealOption,
  interval: 500,
});

const swiper = new Swiper(".swiper", {
  slidesPerView: "auto",
  spaceBetween: 30,
});

ScrollReveal().reveal(".client__image img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".client__content .section__subheader", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".client__content .section__header", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".client__content .section__description", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".client__details", {
  ...scrollRevealOption,
  delay: 2000,
});
ScrollReveal().reveal(".client__rating", {
  ...scrollRevealOption,
  delay: 2500,
});

ScrollReveal().reveal(".download__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".download__content .section__subheader", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".download__content .section__header", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".download__content .section__description", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".download__btn", {
  ...scrollRevealOption,
  delay: 2000,
});
document.getElementById('watchVideoLink').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default link behavior

  var video = document.getElementById('myVideo');
  video.style.display = 'block'; // Show the video element
  video.play(); 
});
// Add event listeners to all order buttons
document.querySelectorAll('.order-btn').forEach(button => {
  button.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the default behavior of the button

      const item = this.getAttribute('data-item'); // Get the item name
      document.getElementById('selectedItem').textContent = `You are ordering: ${item}`; // Display the selected item in the modal
      document.getElementById('orderModal').style.display = 'flex'; // Show the modal
  });
});

// Close the modal when the close button is clicked
document.querySelector('.close').addEventListener('click', function() {
  document.getElementById('orderModal').style.display = 'none';
});

// Handle the "Confirm Order" button click event
document.getElementById('confirmOrder').addEventListener('click', function() {
  const name = document.getElementById('name').value.trim(); // Get the name and trim any whitespace
  const date = document.getElementById('date').value; // Get the date
  const mobileNumber = document.getElementById('mobileNumber').value.trim(); // Get the mobile number and trim any whitespace

  // Validate required fields
  if (!name || !date || !mobileNumber) {
      alert('Please fill in all required fields.');
      return;
  }

  const selectedItem = document.getElementById('selectedItem').textContent.replace('You are ordering: ', '');
  const dateInput = document.getElementById('date').value; // Get the date from input
  const orderDate = new Date(dateInput); // Create a Date object
  const formattedDate = formatDate(orderDate);
  const message = `Order confirmed for: ${selectedItem} on ${date}. Thank you for your order!`;
  const whatsappURL = `https://wa.me/${mobileNumber}?text=${encodeURIComponent(message)}`;

  // Open the WhatsApp link in a new tab
  window.open(whatsappURL, '_blank');

  document.getElementById('orderModal').style.display = 'none'; // Close the modal
  document.getElementById('mobileNumber').value = ''; // Clear the mobile number field
  document.getElementById('name').value = ''; // Clear the name field
  document.getElementById('date').value = ''; // Clear the date field

  // Call the function to submit the order to the backend
  submitOrder(name, formattedDate,message, mobileNumber,  whatsappURL);
});
function formatDate(date) {
  const year = date.getFullYear(); // Get the full year
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-based index, add 1)
  const day = String(date.getDate()).padStart(2, '0'); // Get the day of the month

  return `${year}-${month}-${day}`; // Return formatted date as YYYY-MM-DD
}

// Show or hide the address field based on the "Request Delivery" checkbox
document.getElementById("deliveryOption").addEventListener("change", function() {
  const addressField = document.getElementById("address");
  addressField.style.display = this.checked ? "block" : "none"; // Show or hide the address field
});

// Function to submit the order data to the server using fetch
function submitOrder(name, date,message, mobileNumber,whatsappURL) {
  const deliveryOption = document.getElementById("deliveryOption").checked;
  const address = deliveryOption ? document.getElementById("address").value : null;
  const selectedItem = document.getElementById('selectedItem').textContent.replace('You are ordering: ', '');

  const orderData = {
      name,
      date,
      mobileNumber,
      delivery: deliveryOption,
      selectedItem,
      address
  };
  fetch("http://localhost/rest/process_order.php", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert("Order saved successfully!");
          window.open(whatsappURL, '_blank');
          document.getElementById('mobileNumber').value = ''; 
          document.getElementById('name').value = ''; 
          document.getElementById('date').value = ''; 
      } else {
          alert("Error saving order: " + data.message);
      }
  })
  .catch(error => console.error("Error:", error));
  const jsonString = JSON.stringify(orderData);
  console.log(jsonString); 
}
