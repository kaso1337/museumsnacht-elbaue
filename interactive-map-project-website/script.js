// Initialize the map
const map = L.map('map', {
  maxBounds: [
    [-90, -180], // Southwest corner (latitude, longitude)
    [90, 180]    // Northeast corner (latitude, longitude)
  ],
  maxBoundsViscosity: 1.0 // Restrict smooth movement at edges
}).setView([20, 0], 2); // Set the initial center and zoom level

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
  subdomains: 'abcd',
  minZoom: 3,
  maxZoom: 19
}).addTo(map);

// Array of locations with coordinates, images, and descriptions
const locations = [
  {
    coords: [51.0504, 13.7373],
    image: 'images/Dresden.jpg',
    country: 'Germany',
    description: 'Dresden is known for its baroque architecture and cultural landmarks.'
  }, {
    coords: [7.0731, 125.6131], // Approximate coordinates for Bohol, Philippines
    image: 'images/bohl,philipens.png',
    country: 'Philippines',
    description: 'Bohol is famous for its Chocolate Hills and pristine beaches.'
  },
  {
    coords: [-6.3690, 34.8888], // Approximate coordinates for Tanzania
    image: 'images/tansania.png',
    country: 'Tanzania',
    description: 'Tanzania is known for its wildlife, Mount Kilimanjaro, and Serengeti National Park.'
  },
  {
    coords: [57.1200, -4.7100], // Approximate coordinates for the Scottish Highlands
    image: 'images/highlands,schottland.png',
    country: 'Scotland',
    description: 'The Scottish Highlands offer stunning landscapes, castles, and rich history.'
  },
  {
    coords: [43.7711, 11.2486],
    image: 'images/Italy.png',
    country: 'Italy',
    description: 'Italy is famous for its historical sites, art, and cuisine.'
  },
  {
    coords: [43.5297, 5.4474],
    image: 'images/France.png',
    country: 'France',
    description: 'France is known for its art, fashion, and iconic landmarks like the Eiffel Tower.'
  },
  {
    coords: [23.1621, 113.3419],
    image: 'images/china.png',
    country: 'China',
    description: 'China is rich in history, culture, and diverse landscapes.'
  }
];

// Image viewer elements
const viewer = document.getElementById('viewer');
const viewerImg = document.getElementById('viewer-img');
const viewerDesc = document.getElementById('viewer-desc');
// const fullscreenBtn = document.getElementById('global-fullscreen-btn');
// const infoBtn = document.getElementById('info-btn');
const homeBtn = document.getElementById('home_btn');

// Add markers and pop-ups to the map
locations.forEach(location => {
  const marker = L.marker(location.coords).addTo(map);

  // Create popup content
  const popupContent = document.createElement('div');
  popupContent.style.textAlign = 'center';

  const title = document.createElement('h3');
  title.textContent = location.country;

  const img = document.createElement('img');
  img.src = location.image;
  img.alt = location.country;
  img.style.maxWidth = '300px';
  img.style.height = 'auto';
  img.style.border = '2px solid #ccc';
  img.style.cursor = 'pointer';

  // Add event listener to open the image viewer
  img.addEventListener('click', () => openViewer(location.image, location.description));

  popupContent.appendChild(title);
  popupContent.appendChild(img);

  marker.bindPopup(popupContent);
});

// Function to open the image viewer in full-screen
function openViewer(imageSrc, description) {
  viewerImg.src = imageSrc;
  viewerDesc.textContent = description;
  viewer.classList.add('show');
  viewer.style.display = 'flex';
}

// Function to close the image viewer
function closeViewer() {
  viewer.classList.remove('show');
  setTimeout(() => {
    viewer.style.display = 'none';
    viewerImg.src = '';
    viewerDesc.textContent = '';
  }, 300);
}

// // Function to toggle full-screen mode
// function toggleFullScreen() {
//   if (!document.fullscreenElement) {
//     document.documentElement.requestFullscreen().catch(err => {
//       console.error(`Error attempting to enable full-screen mode: ${err.message}`);
//     });
//   } else {
//     document.exitFullscreen();
//   }
// }

// // Attach event listener to global full-screen button
// fullscreenBtn.addEventListener("click", toggleFullScreen);

// Function to toggle the floating description
// infoBtn.addEventListener("click", () => {
//   viewerDesc.classList.toggle("show");
// });

homeBtn.addEventListener("click", () => {
  window.location.href = '../index.html';
  console.log("Home button clicked, redirecting to index.html");
});
