var arDrone = require('ar-drone'),
    arDroneConstants = require('ar-drone/lib/constants'),
    arDroneMask = require('ar-drone/lib/navdata/maskingFunctions'),
    client  = arDrone.createClient();

var navdata_options = (
    arDroneMask.NAVDATA_OPTION_MASK(arDroneConstants.options.DEMO)
  | arDroneMask.NAVDATA_OPTION_MASK(arDroneConstants.options.VISION_DETECT)
  | arDroneMask.NAVDATA_OPTION_MASK(arDroneConstants.options.MAGNETO)
  | arDroneMask.NAVDATA_OPTION_MASK(arDroneConstants.options.WIFI)
);

client.config('general:navdata_demo', false);
client.config('general:navdata.navdata_options', navdata_options);

client.config('detect:detect_type','4'); // tag type stripe
client.config('detect:detections_select_h','1'); // turn on forward camera
client.config('detect:enemy_without_shell','0');
client.config('detect:enemy_colors','3'); // orange blue orange


client.on('navdata', droneLog);

function droneLog(navdata) {
    for(var i=0; i<30; i++) { console.log(); }
    console.log("Detected: " + navdata.visionDetect.nbDetected);
    console.log("x,y: " + navdata.visionDetect.xc[0] + "," + navdata.visionDetect.yc[0]);
    console.log("Distance: " + navdata.visionDetect.dist[0]);
    console.log("Battery: " + navdata.rawMeasures.batteryMilliVolt);
}
