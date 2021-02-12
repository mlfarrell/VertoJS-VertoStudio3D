//lets have some fun!
const GRAVITY = 0.04;
let modelAnimData = [];

function calcBoundingBox(model) {
  //next version of VertoJS will let you retrieve model bounding boxes
  //but for now, we have to get these ourselves
  const vertices = Vec3.array(model.vertices);
  const min = new Vec3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
  const max = new Vec3(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE); 
  
  if(vertices.length === 0) {
    return undefined;
  }
  
  for(const v of vertices) {
    if(v.x < min.x)
      min.x = v.x;
    if(v.y < min.y)
      min.y = v.y;
    if(v.z < min.z)
      min.z = v.z;
    if(v.x > max.x)
      max.x = v.x;
    if(v.y > max.y)
      max.y = v.y;
    if(v.z > max.z)
      max.z = v.z;    
  }
  
  const bbox = max.subtracted(min);
  bbox.x *= model.scale[0];
  bbox.y *= model.scale[1];
  bbox.z *= model.scale[2];
  return bbox;
}

function savePositions() {
  modelAnimData = [];

  let i = 0;
  for(const model of Scene.current.models) {
    //skip the first model (which is likely our ground plane)
    if(i > 0) {
      modelAnimData.push({
        origPos: model.pos,
        pos: model.pos,
        bbox: calcBoundingBox(model),
        dy: 0.0,
        model: model,
      });
      
      console.log(calcBoundingBox(model).y);
    }
    
    i++;
  }
}

function restorePositions() {
  let i = 0;
  for(const modelData of modelAnimData) {
    modelData.model.pos = modelData.origPos;
  }
}

function bouncy() {
  let t = 0;
  Animation.start(60, () => {
    t += 1.0/60.0;
    
    for(const modelData of modelAnimData) {      
      modelData.dy -= GRAVITY;
      modelData.pos.y += modelData.dy;           
      
      const contactPointY = modelData.pos.y-modelData.bbox.y*0.5;
            
      if(contactPointY < 0) {
        modelData.pos.y -= contactPointY;
        modelData.dy *= -1;
      }
             
      modelData.model.pos = modelData.pos;
    }
    
    
    return true;
  });

  
  VertoStudio.onScriptEnd(() => {
    restorePositions();
  });
}

//console.log('Its bouncy time!');
savePositions();
bouncy();