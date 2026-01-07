const tempCtx = document.getElementById('tempChart').getContext('2d');
const vibCtx = document.getElementById('vibChart').getContext('2d');
const distCtx = document.getElementById('distChart').getContext('2d');
const tempChart = new Chart(tempCtx, {
 type: 'line',
 data: {
 labels: [],
 datasets: [{
 label: 'Temperature (°C)',
 borderColor: 'red',
 data: [],
 fill: false
 }]
 }
});
const vibChart = new Chart(vibCtx, {
 type: 'line',
 data: {
 labels: [],
 datasets: [{
 label: 'Vibration (g)',
 borderColor: 'blue',
 data: [],
 fill: false
 }]
 }
});
const distChart = new Chart(distCtx, {
 type: 'line',
 data: {
 labels: [],
 datasets: [{
 label: 'Distance (cm)',
 borderColor: 'green',
 data: [],
 fill: false
 }]
 }
});
function fetchData() {
 fetch('http://<ESP32_IP>/data') // Replace with your ESP32 IP
 .then(response => response.json())
 .then(data => {
 const time = new Date().toLocaleTimeString();
 tempChart.data.labels.push(time);
 tempChart.data.datasets[0].data.push(data.temperature);
 tempChart.update();
 vibChart.data.labels.push(time);
 vibChart.data.datasets[0].data.push(data.vibration);
 vibChart.update();
 distChart.data.labels.push(time);
 distChart.data.datasets[0].data.push(data.distance);
 distChart.update();
 // Keep only the last 20 data points
 [tempChart, vibChart, distChart].forEach(chart => {
 if (chart.data.labels.length > 20) {
 chart.data.labels.shift();
 chart.data.datasets[0].data.shift();
 }
 });
 })
 .catch(err => console.error("Failed to fetch data:", err));
}
// Fetch every 2 seconds
setInterval(fetchData, 2000);