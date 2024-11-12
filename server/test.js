const jsonData = { 
    "name": "Alice", 
    "age": 25, 
    "number": 1
};



const requiredKeys = ['name', 'age', 'number'];
const allKeysPresent = requiredKeys.every(key => key in jsonData);
console.log(allKeysPresent);

const stringData = JSON.stringify(jsonData);
const idk = JSON.parse(stringData);

console.log(stringData);
console.log(idk);

let combinedData = {
	"servertime": {
		"day": 13,
		"hour": 11,
		"minute": 38,
		"seconds": 38,
		"milliseconds": 739
	},
	"locationInfo": [
		{
			"team_number": 1,
			"uav_latitude": 41.5118256,
			"uav_longitude": 36.11837,
			"uav_altitude": 36.0,
			"uav_elevation": -8.0,
			"uav_orientation": 127,
			"uav_banking": 19.0,
			"uav_speed": 41.0,
			"time_difference": 467
		},
		{
			"team_number": 2,
			"uav_latitude": 41.5123138,
			"uav_longitude": 36.12,
			"uav_altitude": 32.0,
			"uav_elevation": -9.0,
			"uav_orientation": 13,
			"uav_banking": -30.0,
			"uav_speed": 45.0,
			"time_difference": 30
		},
		{
			"team_number": 3,
			"uav_latitude": 41.5123138,
			"uav_longitude": 36.12,
			"uav_altitude": 32.0,
			"uav_elevation": 9.0,
			"uav_orientation": 13,
			"uav_banking": -30.0,
			"uav_speed": 45.0,
			"time_difference": 30
		}
	]
};

const teamData = {
	"team_number": 1,
	"uav_latitude": 41.508775,
	"uav_longitude": 36.118335,
	"uav_altitude": 38.0,
	"uav_elevation": 7.0,
	"uav_orientation": 210,
	"uav_banking": -30.0,
	"uav_speed": 28.0,
	"uav_battery": 50,
	"uav_autonomous": 1,
	"uav_locking": 1,
	"target_center_x": 300,
	"target_center_y": 230,
	"target_width": 30,
	"target_height": 43,
	"gps_time": {
		"hour": 11,
		"minute": 38,
		"seconds": 37,
		"milliseconds": 654
	}
};

const teamhuzzah = {
	"team_number": 4,
	"uav_latitude": 41.508775,
	"uav_longitude": 36.118335,
	"uav_altitude": 38.0,
	"uav_elevation": 7.0,
	"uav_orientation": 210,
	"uav_banking": -30.0,
	"uav_speed": 28.0,
	"uav_battery": 50,
	"uav_autonomous": 1,
	"uav_locking": 1,
	"target_center_x": 300,
	"target_center_y": 230,
	"target_width": 30,
	"target_height": 43,
	"gps_time": {
		"hour": 11,
		"minute": 38,
		"seconds": 37,
		"milliseconds": 654
	}
};

function updateCombinedData(mainData, teamData) {
	const existingTeamIndex = mainData.locationInfo.findIndex(team => team.team_number === teamData.team_number);

	if (existingTeamIndex !== -1) {
		// Update the existing team's data
		mainData.locationInfo[existingTeamIndex] = teamData;
	} else {
		// Add the new team data if it doesn't exist
		mainData.locationInfo.push(teamData);
	}
}

function getEssential(teamData) {
	return {
		team_number: teamData.team_number,
		uav_latitude: teamData.uav_latitude,
		uav_longitude: teamData.uav_longitude,
		uav_altitude: teamData.uav_altitude,
		uav_elevation: teamData.uav_elevation,
		uav_orientation: teamData.uav_orientation,
		uav_banking: teamData.uav_banking,
		uav_speed: teamData.uav_speed,
		time_difference: teamData.time_difference
	};
}

updateCombinedData(combinedData, getEssential(teamData));
updateCombinedData(combinedData, getEssential(teamhuzzah));

console.log(combinedData);

