/** 
* Animation example - Animates the first object in the scene and the first light
* in the scene until stopped 
**/ 

let t = 0;
const fps = 60.0;

//If omitted, fps defaults to 30
Animation.start(fps, () => {

  Scene.current.models[0].x = Math.sin(t)*10.0;  
  
  const l = Scene.current.lights[0];
  l.x = Math.cos(t)*10.0;  
  l.y = 15+Math.sin(t)*5.0;
  l.attenuation = [ 0, 0.1, 0 ];
    
  t += 2 * 1.0/fps;
  
  //return true to keep animating 
  return true;
});