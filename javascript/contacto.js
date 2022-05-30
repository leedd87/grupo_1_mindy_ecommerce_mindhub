var map = L.map('map').setView([-34.6121000, -58.4303215], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Â© OpenStreetMap'
}).addTo(map);
var marker = L.marker([-34.6121000, -58.4303215]).addTo(map);
marker.bindPopup("<p>Encontranos aqui!</p>").openPopup();