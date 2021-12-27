//Simple script to apply nice lighting to a scene

function findLightByIndex(i) {
  const lights = Scene.current.lights;
  return (i < lights.length) ? lights[i] : undefined;
}

function minMax(v, min, max) {
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

function calcBoundingBox(model) {
  //future version of VertoJS will let you retrieve model bounding boxes
  //but for now, we have to get these ourselves
  const vertices = Vec3.array(model.vertices);
  const min = new Vec3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
  const max = new Vec3(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE); 
  
  if(vertices.length === 0) {
    return undefined;
  }
  
  for(const v of vertices) {
  	minMax(v, min, max);
  }
  
  const bbox = max.subtracted(min);
  bbox.x *= model.scale[0];
  bbox.y *= model.scale[1];
  bbox.z *= model.scale[2];
  return bbox;
}

function calcSceneBounds() {
  const min = new Vec3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
  const max = new Vec3(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE); 

  for(const model of Scene.current.models) {
    const bbox = calcBoundingBox(model);
    
    const modelPos = new Vec3(model.pos);
    
    const bbMin = modelPos.subtracted(bbox.scalarMultiplied(0.5));
    const bbMax = modelPos.added(bbox.scalarMultiplied(0.5));
    minMax(bbMin, min, max);
    minMax(bbMax, min, max);    
  }
  
  const size = max.subtracted(min);
  const sceneBbox = { pos: min.added(size.scalarMultiplied(0.5)), size: size };
  return sceneBbox;
}

function doStudioLighting() {
  if(Scene.current.models.length == 0) {
    return;
  }

  const sceneBounds = calcSceneBounds();
  const padding = 0.15;

  const l0 = findLightByIndex(0) || new Light;
  l0.diffuse = [ 0.7, 0.7, 0.7, 1.0 ];

  const l1 = findLightByIndex(1) || new Light;
  l1.pos = sceneBounds.pos.added(sceneBounds.size.scalarMultiplied(0.5+padding));
  l1.diffuse = [ 1.0, 0.7, 0.5, 1.0 ];

  const l2 = findLightByIndex(2) || new Light;
  l2.pos = sceneBounds.pos.subtracted(sceneBounds.size.scalarMultiplied(0.5+padding));
  l2.diffuse = [ 0.5, 0.7, 1.0, 1.0 ];
}

doStudioLighting();