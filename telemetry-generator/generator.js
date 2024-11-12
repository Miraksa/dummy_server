const axios = require('axios');

// Function to generate random telemetry data
function getRandomTelemetry() {
    return {
        team_number: process.env.TEAM_NUMBER || Math.floor(Math.random() * 10) + 1,
        uav_latitude: (Math.random() * 180 - 90).toFixed(6),
        uav_longitude: (Math.random() * 360 - 180).toFixed(6),
        uav_altitude: (Math.random() * 500).toFixed(2),
        uav_elevation: (Math.random() * 180 - 90).toFixed(2),
        uav_orientation: Math.floor(Math.random() * 361),
        uav_banking: (Math.random() * 180 - 90).toFixed(2),
        uav_speed: (Math.random() * 100).toFixed(2),
        uav_battery: Math.floor(Math.random() * 100) + 1,
        uav_locking: Math.random() >= 0.5,
        target_center_x: Math.floor(Math.random() * 800),
        target_center_y: Math.floor(Math.random() * 600),
        target_width: Math.floor(Math.random() * 100),
        target_height: Math.floor(Math.random() * 100),
        gps_time: {
            hour: new Date().getUTCHours(),
            minute: new Date().getUTCMinutes(),
            seconds: new Date().getUTCSeconds(),
            milliseconds: new Date().getUTCMilliseconds()
        }
    };
}

// Function to send telemetry data to the server
async function sendTelemetry() {
    const telemetry = getRandomTelemetry();
    try {
        const response = await axios.post(process.env.API_URL, telemetry);
        console.log(`Telemetry sent: ${JSON.stringify(response.data)}`);
    } catch (error) {
        console.error(`Error sending telemetry: ${error.message}`);
    }
}

// Send telemetry data every 1 seconds
setInterval(sendTelemetry, 1000);
