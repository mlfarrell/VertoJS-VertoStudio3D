import { VR } from 'VR';

function rayPos(o, d, t) {
  const o3 = new Vec3(o);
  const d3 = new Vec3(d);  
  
  return o3.added(d3.scalarMultiplied(t));
}

function deg(r) {
  return r * (180/Math.PI);
}

function doVertexRaycast(params) {
  //slightly boost this to place the vertex off of the targeted surface
  const offsetVal = parseInt(params['Offset (mm)'].value);
  const offsetMeters = (!isNaN(offsetVal) ? offsetVal : 0)/1000.0;  
  VertoStudio.globalState.vertexRaycasterState.offset = offsetVal;

  const scene = Scene.current;
  
  let didMove = false;

  //We're using the animation feature to keep our script alive along enough to read VR controller state  
  Animation.start(60, () => {	                 
    const model = scene.editTarget;
  
    let vertex = VertoStudio.globalState.vertexRaycasterState.vertex;
    if(!vertex) {
      VertoStudio.globalState.vertexRaycasterState.vertex = scene.selection.items[0].index;
      vertex = scene.selection.items[0].index;        
    }
    
    const controller = VR.controllers[0];
    
    //only move the selected vert when we're pressing the trigger
    if(controller.trigger == 0.0) {
      if(didMove) {
        console.log('Updating model for trigger release...');

        //we were using fastUpdate to update the model which foregoes calculating the final bounding box
        //so we do that manually when the trigger is released
        scene.editTarget.edit((m, finish) => {
          finish(m.vertices, m.normals, m.texcoords, m.triangles, m.quads);    
        });
        
        VertoStudio.globalState.vertexRaycasterState.vertex = undefined;        
        didMove = false;
      }
      
      return true;
    }
    
    //get the current cursor position of the controller ray
    let cursorPos = controller.cursorPos;
          
    //..and convert that position into the model's own coordinate space
    cursorPos = new Vec3(model.fromSceneSpace(cursorPos));
    
    if(offsetMeters > 0.0) {
      let cursorNorm = new Vec3(controller.cursorNorm).scalarMultiplied(offsetMeters);
      cursorNorm = new Vec3(model.fromSceneSpace({ x: cursorNorm.x, y: cursorNorm.y, z: cursorNorm.z, w: 0.0 }));
      cursorPos.add(cursorNorm);
    }      

    //edit the model by replacing the vertex with the new position (move it)
    model.edit((m, finish) => {        
      //foregoing the conversions to Vec3 here for speed and instead modifying the raw float arrays
      //using slice() to copy the input is a required step here
      const va = m.vertices.slice(0);
      va[vertex*3+0] = cursorPos.x;
      va[vertex*3+1] = cursorPos.y;
      va[vertex*3+2] = cursorPos.z;
      finish(va, m.normals, m.texcoords, m.triangles, m.quads, { fastUpdate: true });    
    });
   
    didMove = true;

    //keep the script alive (keep "animating")
    return true;
  });  
  
  /*VertoStudio.onScriptEnd(() => {      
    VertoStudio.globalState.vertexRaycasterState.selectedVertex = undefined;    
  });*/
}

function setupVertexRaycast(showAlerts) {
  const scene = Scene.current;
  
  const showAlert = (msg) => {
    if(showAlerts)
      VertoStudio.alert(msg);
  };
  
  if(!VertoStudio.isVR()) {
    showAlert('This script only runs on Verto Studio VR');
  } else if(!scene.editMode) {
    showAlert('You can only use this script in edit mode');
  } else if(scene.selectionMode !== 'vertex' || (!VertoStudio.globalState.vertexRaycasterState.selectedVertex && scene.selection.count === 0)) {
    showAlert('You must select a single vertex to use this script');
  } else {     
    const offset = VertoStudio.globalState.vertexRaycasterState.offset || 0;
    
    //skip the dialog if a value was set (it slows things down massively)
    //it'll come back after app restart
    if(VertoStudio.globalState.vertexRaycasterState.offset !== undefined)
    {
      doVertexRaycast({ "Offset (mm)": offset.toString() });
      return;
    }
  
    VertoStudio.inputDialog({
      title: 'Vertex Raycast',
      params: [
        {
          name: 'Offset (mm)',
          type: 'string',
          value: offset.toString()
        }
      ]
    }, (values) => {
      if(values) {            
        doVertexRaycast(values);
      }
    });  
  }
}

console.log('global state: ' + JSON.stringify(VertoStudio.globalState));

if(!VertoStudio.globalState.vertexRaycasterState || !VertoStudio.globalState.vertexRaycasterState.seenInstructions) {
  const msg = `Select a single vertex in edit mode before using this script,
 then hold the trigger while aiming at a surface to place it on 
 the surface at the 3D cursor position`;
 
  VertoStudio.alert(msg);
  
  VertoStudio.globalState.vertexRaycasterState = {
    seenInstructions: true
  };
  
  setupVertexRaycast(false);
} else {
  VertoStudio.globalState.vertexRaycasterState.vertex = undefined;        
  setupVertexRaycast(true);
}
