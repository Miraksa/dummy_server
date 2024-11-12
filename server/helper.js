function updateCombinedData(mainData, teamData) {
	const existingTeamIndex = mainData.locationInfo.findIndex(team => team.team_number === teamData.team_number);

	if (existingTeamIndex !== -1) {
		mainData.locationInfo[existingTeamIndex] = teamData;
	} else {
        mainData.locationInfo.push(teamData);
	}
}

function updateServerTime(jsonData){
    const now = new Date();
    jsonData.servertime = {
        day: now.getDay(),
        hour: now.getHours(),
        minute: now.getMinutes(),
        seconds: now.getSeconds(),
        milliseconds: now.getMilliseconds()
    };
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

const telemetryKeys = [
    'team_number',
    'uav_latitude',
    'uav_longitude',
    'uav_altitude',
    'uav_elevation',
    'uav_orientation',
    'uav_banking',
    'uav_speed',
    'uav_battery',
    'uav_autonomous',
    'uav_locking',
    'target_center_x',
    'target_center_y',
    'target_width',
    'target_height',
    'gps_time',
    'gps_time.hour',
    'gps_time.minute',
    'gps_time.seconds',
    'gps_time.milliseconds'
];

module.exports = {
    updateCombinedData,
    updateServerTime,
    getEssential,
    telemetryKeys
}