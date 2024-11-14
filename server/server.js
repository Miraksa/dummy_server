// const express = require('express')
const express = require('express');
const redis = require('redis');
const app = express();
const { updateCombinedData, getEssential, telemetryKeys, updateServerTime } = require('./helper.js');
app.use(express.json());

const client = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: 6379
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});


// Initial data fot combined telemetry
const now = new Date()
let _initial_combined_data = {
	"servertime": {
		"day": now.getDate(),
		"hour": now.getHours(),
		"minute": now.getMinutes(),
		"seconds": now.getSeconds(),
		"milliseconds": now.getMilliseconds()
	},
	"locationInfo": []
};
client.set('combinedTelemetry', JSON.stringify(_initial_combined_data), (err) => {
    if (err) {
        console.error(`Redis set combined telemetry error:`, err);
        return res.status(500).json({ error: `Failed to store combined telemetry data in Redis` });
    }

    console.log(`combined telemetry stored`);
});

app.get('/testTelemetry', (req, res) => {
    client.get('combinedTelemetry', (err, reply) => {
        res.send(JSON.parse(reply));
    });
});

app.get('/api/servertime', (req, res) => {
    const servertime = {
        day: now.getDay(),
        hour: now.getHours(),
        minute: now.getMinutes(),
        seconds: now.getSeconds(),
        milliseconds: now.getMilliseconds()
    };
    res.status(200).json(servertime);
})

app.post('/api/send_telemetry_data', async(req, res) => {
    const telemetryData = req.body;

    // const allKeysPresent = telemetryKeys.every(key => key in telemetryData);
    if (!telemetryData) {
        return res.status(400).json({ error: 'Invalid or empty telemetry data' });
    }
    
    // 1. get the team number from the json and store it using the team number key
    const teamKey = 'telemetry' + telemetryData['team_number'];
    client.get(teamKey, (err, teamTelemetryData) => {
        if (err) {
            console.error(`Redis check ${teamKey} error:`, err);
            return res.status(500).json({ error: `Error checking for ${teamKey} data in Redis` });
        }

        // 2. put the telemetry data to the team key
        client.set(teamKey, JSON.stringify(telemetryData), (err) => {
            if (err) {
                console.error(`Redis set ${teamKey} error:`, err);
                return res.status(500).json({ error: `Failed to store ${teamKey} data in Redis` });
            }
        });

        // 3. get the current combined telemetry data and then update it
        client.get('combinedTelemetry', (err, combinedTelemetryData) => {
            if (err) {
                console.error(`Redis check combined telemetry error:`, err);
                return res.status(500).json({ error: `Error checking for combined telemetry:`, err });
            }
            
            combinedTelemetryData = JSON.parse(combinedTelemetryData || '{}');
            teamTelemetryData = JSON.parse(teamTelemetryData || '{}');

            updateCombinedData(combinedTelemetryData, getEssential(teamTelemetryData));
            updateServerTime(combinedTelemetryData);

            client.set('combinedTelemetry', JSON.stringify(combinedTelemetryData), (err) => {
                if (err) {
                    console.error(`Redis set combined telemetry error:`, err);
                    return res.status(500).json({ error: `Failed to store combined telemetry data in Redis` });
                }
                res.status(200).json(combinedTelemetryData);
            });
        });

        
        console.log(`${teamKey} stored`);

    });
});

app.post('/api/locking_information', (req, res) => {
    const locking_info = req.body;


});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
