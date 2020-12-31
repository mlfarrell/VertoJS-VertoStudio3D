/** 
* Animation example - Fun little animation inside a predetermined scene
* Run this script on the advancedAnimationExample file provided in 
* the examples
**/ 

function mixV(v1, v2, p) {
  return v1.scalarMultiplied(1-p).added(v2.scalarMultiplied(p));
}

function mix(v1, v2, p) {
  return v1*(1-p) + v2*p;
}

const scene = Scene.current;
const camera = scene.camera;
const bike = scene.models[scene.models.length-1];

//Store initial state of the objects we want to animate 
//so we can put them back later
const initialBikePos = bike.pos;
const initialCameraState = {
  distance: camera.distance,
  theta: camera.theta,
  phi: camera.phi,
  center: camera.center
};

function doAnimation() {
  const maxT = 60;
  let t = 0;
  const fps = (VertoStudio.environmentType() === 'PC') ? 60 : 30;

  if(scene.editMode) {
    VertoStudio.alert('Cannot run this script in edit mode');
    return;
  }

  const bikePos0 = new Vec3(-209, 8.330570220947266, -35);
  const cameraVec0 = new Vec3(-1, 1, 1).normalized();
  const cameraVec1 = new Vec3(1, 1, 2).normalized();

  bike.pos = bikePos0;
  bike.orientation = Quat.fromAxisAngle(90, 0, 1, 0);

  Animation.start(fps, () => {
    let bikePos = new Vec3(bikePos0);

    //move the bike along the z axis based on current time  
    bikePos.z = bikePos0.z + t;
  
    //move the camera out and slowly transition vantage positions over 
    //the full animation duration
    const cameraDist = mix(4.0, 50, t/maxT);
    const cameraVec = mixV(cameraVec1, cameraVec0, t/maxT).normalized();
  
    bike.pos = bikePos;
    camera.lookAt(bikePos, bikePos.added(cameraVec.scalarMultiplied(cameraDist)));
  
    t += 2 * 1.0/fps;
    
    //the animation ends once t reaches 60
    return (t < maxT);
  });
}

//Lets use the nifty onScriptEnd method to put the bike & camera 
//back where we found it when the animation is ended
VertoStudio.onScriptEnd(() => {
  bike.pos = initialBikePos;
  camera.distance = initialCameraState.distance;
  camera.theta = initialCameraState.theta;
  camera.phi = initialCameraState.phi;
  camera.center = initialCameraState.center;
});

//now lets start the animation
doAnimation();