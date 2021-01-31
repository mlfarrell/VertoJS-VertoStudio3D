import { VR } from 'VR';

function rayPos(o, d, t) {
  const o3 = new Vec3(o);
  const d3 = new Vec3(d);  
  
  return o3.added(d3.scalarMultiplied(t));
}

function deg(r) {
  return r * (180/Math.PI);
}

function getBrush() {
  return Scene.current.textures.find(tex => tex.name === 'vrbrush') || 
         new Texture('vrbrush', 'brush.png');
}

function doVRBrush(params) {
  const strokeWidth = params['Stroke Width'].value;
  const updateInterval = 15-params['Smoothness'].value; //the higher the interval, the less updates per frame (slower devices cannot handle fast updates)
  const tintColor = [ params['Red'].value, params['Green'].value, params['Blue'].value, 0 ];
  const scene = Scene.current;

  scene.loadAllTextures();

  if(!VertoStudio.isVR()) {
    VertoStudio.alert('This script only runs on Verto Studio VR');
  } else if(scene.editMode) {
    VertoStudio.alert('You cannot use this script in edit mode');
  } else if(scene.textures.length === 0) {
    VertoStudio.alert('You need at least one texture within this scene for the brush to use');
  } else {  
    
    const brushMaterial = new Material(`brush material-${tintColor[0]}-${tintColor[1]}-${tintColor[2]}`);
    brushMaterial.texture = getBrush();
    brushMaterial.diffuse = [ 1, 1, 1, 0.95 ]; //using < 1 alpha to enable semi-transparency
    brushMaterial.specular = [ 0, 0, 0, 0 ];
    brushMaterial.ambient = [ 0, 0, 0, 0 ];
    brushMaterial.emissive = tintColor; //using emissive effectively disables lighting on the brush stroke

    const model = new Model();
    model.cullBackfaces = false;
    model.material = brushMaterial;
    model.name = 'VR Brush Stroke';
    
    const brushDirectionX = new Vec3(strokeWidth, 0, 0), brushDirectionZ = new Vec3(0, 0, strokeWidth);
    const up = new Vec3(0, 1, 0), right = new Vec3(1, 0, 0), zero = new Vec3(0, 0, 0);
    const quadTc = [ new Vec2(0, 1), new Vec2(0, 0), new Vec2(1, 0), new Vec2(1, 1) ];
    
    const strip = { 
      pos: [],
      norm: [], 
      tc: [],
      tri: []
    };
    let discreteT = 0;
    let prevPos;

    //We're using the animation feature to keep our script alive along enough to read VR controller state  
    Animation.start(60, () => {	                 
      discreteT++;
      
      //pace ourselves to avoid adding too many faces causing slowdown
      if(discreteT % updateInterval == 0) {
        const controller = VR.controllers[0];
        
        //only add to the brush strip when we're pressing the trigger
        if(controller.trigger == 0.0) {
          prevPos = undefined;
          return true;
        }
        
        //get the current "tip" of the controller position, 0.1 meters ahead
        let pos = rayPos(controller.pos, controller.forward, 0.1);
              
        //..and convert that position into the model's own coordinate space
        pos = new Vec3(model.fromSceneSpace(pos));
        
        if(prevPos != undefined) {
          const vi = strip.pos.length;
          const stripDirection = pos.subtracted(prevPos); //.normalized();
          
          //make our brush stroke out of a thin quad "strip"
          strip.pos.push(prevPos.subtracted(brushDirectionX));
          strip.pos.push(prevPos.added(brushDirectionX));
          strip.pos.push(pos.added(brushDirectionX));        
          strip.pos.push(pos.subtracted(brushDirectionX));
          
          for(let i = 0; i < 4; i++)
            strip.tc.push(quadTc[i]);
          
          //we aren't using lighting, so normals aren't too important right now
          for(let i = 0; i < 4; i++)
            strip.norm.push(zero);
          
          //when updating models in VR nees to be fast, triangles are much faster than quads
          strip.tri.push(new Triangle(vi+0, vi+1, vi+2));
          strip.tri.push(new Triangle(vi+0, vi+2, vi+3));
          
          model.edit((m, finish) => {       
            finish(Vec3.float32Array(strip.pos), Vec3.float32Array(strip.norm), Vec2.float32Array(strip.tc), 
                   Triangle.uint32Array(strip.tri), Quad.uint32Array([]), { fastUpdate: true });          
          });        
        }                  
        
        prevPos = pos;
      }    

      //keep the script alive (keep "animating")
      return true;
    });  
    
    VertoStudio.onScriptEnd(() => {  
      //we were using fastUpdate to update the model which foregoes calculating the final bounding box
      //so we do that manually when the script is over
      model.edit((m, finish) => {
          finish(m.vertices, m.normals, m.texcoords, m.triangles, m.quads);    
      });
    });  
  }
}

VertoStudio.inputDialog({
  title: 'VR Brush',
  params: [
    {
      name: 'Smoothness',
      type: 'integer',
      min: 0,
      max: 14,
      value: 13
    },
    {
      name: 'Stroke Width',
      type: 'decimal',
      min: 0.1,
      max: 2.0,
      value: 0.3
    },        
    {
      name: 'Red',
      type: 'decimal',
      min: 0,
      max: 1,
      value: 1
    },    
    {
      name: 'Green',
      type: 'decimal',
      min: 0,
      max: 1,
      value: 1
    },
    {
      name: 'Blue',
      type: 'decimal',
      min: 0,
      max: 1,
      value: 1
    }
  ]
}, (values) => {
  if(values) {
    doVRBrush(values);
  }
});

