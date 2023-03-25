// Get references to the HTML elements
const getLocationBtn = document.getElementById("getLocationBtn");
const removeLocationBtn = document.getElementById("removeLocationBtn");
const mapDiv = document.getElementById("map");

// Check if the latitude and longitude are already in local storage
const lat = localStorage.getItem("lat");
const long = localStorage.getItem("long");

// If the latitude and longitude are already in local storage, disable the Get Location button and show the map
if (lat && long) {
  getLocationBtn.disabled = true;
  const mapUrl = `https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed`;
  mapDiv.innerHTML = `<iframe width="600" height="450" frameborder="0" style="border:0" src="${mapUrl}" allowfullscreen></iframe>`;
}

// Add an event listener to the Get Location button
getLocationBtn.addEventListener("click", () => {
  // Check if the Geolocation API is supported by the browser
  if (navigator.geolocation) {
    // Call the getCurrentPosition method, passing in the showPosition callback function
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    // Display an error message if the Geolocation API is not supported
    alert("Geolocation is not supported by this browser.");
  }
});

// Add an event listener to the Remove Location button
removeLocationBtn.addEventListener("click", () => {
  // Remove the latitude and longitude from local storage
  localStorage.removeItem("lat");
  localStorage.removeItem("long");
  // Enable the Get Location button and clear the map
  getLocationBtn.disabled = false;
  mapDiv.innerHTML = "";
});

// Define the showPosition callback function
function showPosition(position) {
  // Retrieve the latitude and longitude from the position object
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  // Save the latitude and longitude in local storage
  localStorage.setItem("lat", lat);
  localStorage.setItem("long", long);
  // Disable the Get Location button and show the map
  getLocationBtn.disabled = true;
  const mapUrl = `https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed`;
  mapDiv.innerHTML = `<iframe width="600" height="450" frameborder="0" style="border:0" src="${mapUrl}" allowfullscreen></iframe>`;
}
