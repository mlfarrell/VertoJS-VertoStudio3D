
class Stack {
  constructor() {
    this.items = [];
    this.count = 0;
  }
  
  getLength() {
    return this.count;
  }
  
  push(item) {
    this.items.push(item);
    this.count = this.count + 1;
  }
  
  pop() {
    if(this.count > 0) {
      this.count = this.count - 1;
    }
    
    return this.items.pop();
  }
  
  peek() {
    return this.items.slice(-1)[0];
  }
}

class MultiMap {
  constructor() {
    this.map = new Map();
  }
  
  add(key, value) {
    let arr;
  
    if((arr=this.map.get(key)) === undefined) {
      arr = [];
      this.map.set(key, arr);
    }

    arr.push(value);
  }
  
  has(key, value) {
    if(value === undefined) {
      return this.map.has(key);
    } else {
      return this.map.get(key).find(value);
    }
  }
  
  getAll(key) {
    return this.map.get(key);
  }
}

class PanelSearcher {
  constructor(allTriangles, allQuads, allVerts, maxAngle) {
    this.triangles = allTriangles;
    this.quads = allQuads;
    this.verts = allVerts;
    this.maxAngle = maxAngle;
    this.visitedFaces = new Set();
    this.selection = new FaceSelection();
    this.edgeToFace = new MultiMap();
    this.faceNormals = new Map();
        
    let i = 0;
    for(const tri of allTriangles) {
      //currently only the first material group is supported
      const sel = { type: 'triangle', index: i, group: 0 };
      this.edge(tri.indices[0], tri.indices[1], sel);
      this.edge(tri.indices[1], tri.indices[2], sel);
      this.edge(tri.indices[2], tri.indices[0], sel);            
      i++;
    }

    i = 0;
    for(const quad of allQuads) {
      const sel = { type: 'quad', index: i, group: 0 };    
      this.edge(quad.indices[0], quad.indices[1], sel);
      this.edge(quad.indices[1], quad.indices[2], sel);
      this.edge(quad.indices[2], quad.indices[3], sel);            
      this.edge(quad.indices[3], quad.indices[0], sel);    
      i++;              
    }    
  }
  
  edge(a, b, face) {    
    //..and construct a mapping of edges back to owning faces
    this.edgeToFace.add(this.edgeHash(a, b), face);
  }
  
  //skip to returning just the edge hashes instead of the edges for brevity
  edgesForFace(face) {
    if(face.type === 'triangle' || (face.indices && face.indices.length == 3)) {
      const ti = (face.indices) ? face.indices : this.triangles[face.index].indices;
      return [ 
        this.edgeHash(ti[0], ti[1]), 
        this.edgeHash(ti[1], ti[2]),
        this.edgeHash(ti[2], ti[0])
      ];
    } else if(face.type === 'quad' || (face.indices && face.indices.length == 4)) {
      const qi = (face.indices) ? face.indices : this.quads[face.index].indices;      
      return [ 
        this.edgeHash(qi[0], qi[1]), 
        this.edgeHash(qi[1], qi[2]),
        this.edgeHash(qi[2], qi[3]),
        this.edgeHash(qi[3], qi[0])        
      ];    
    }    
  }
  
  edgeHash(a, b) {
    if(a < b) {
      return BigInt(a) | (BigInt(b)<<32n); 
    } else {
      return BigInt(b) | (BigInt(a)<<32n);     
    }
  }
  
  calcFaceNormal(face, verts) {
    let fi;
    
    if(face.type === 'triangle' || (face.indices && face.indices.length == 3)) {
      fi = (face.indices) ? face.indices : this.triangles[face.index].indices;
    } else if(face.type === 'quad' || (face.indices && face.indices.length == 4)) {  
      fi = (face.indices) ? face.indices : this.quads[face.index].indices;  
    }
    
    const a = verts[fi[1]].subtracted(verts[fi[0]]);
    const b = verts[fi[1]].subtracted(verts[fi[2]]);    
        
    return b.cross(a).normalized();
  }
  
  faceNormal(face, verts) {
    let fn = this.faceNormals.get(face.index);
    
    if(!fn) {
      fn = this.calcFaceNormal(face, this.verts);
      this.faceNormals.set(face.index, fn);
    }
    
    return fn;
  }
  
  isSameFace(fa, fb) {
    return (fa.index == fb.index && fa.type === fb.type && fa.group == fb.group);
  }
    
  panelSearch(face) {
    const stack = new Stack();
    const cosMaxAngle = Math.cos(RAD(this.maxAngle));
        
    stack.push(face);
    
    while(stack.getLength() > 0) {
      const currentFace = stack.pop();
      
      const edges = this.edgesForFace(currentFace);
      const adjacentFaces = [];

      for(const eh of edges) {
        const edgeFaces = this.edgeToFace.getAll(eh);        
        adjacentFaces.push(...edgeFaces);                
      }
      
      for(const adjFace of adjacentFaces) {      
        //jump the fence?
        if(!this.isSameFace(currentFace, adjFace) && !this.visitedFaces.has(adjFace)) {
        
          //first check if the adjacent face is within the panel angle change tolerance
          const n1 = this.faceNormal(currentFace, this.verts), n2 = this.faceNormal(adjFace, this.verts)
                
          //if(n1.dot(n2) < cosMaxAngle)
          //  continue;
          
          if(DEG(Math.acos(n1.dot(n2))) > this.maxAngle)
            continue;
        
          this.visitedFaces.add(adjFace);   
          this.selection.add({ type: adjFace.type, index: adjFace.index, group: adjFace.group });
          stack.push(adjFace);
        }
      }
    }
  }
}

function doPanelSearch(maxAngle) {  
  const scene = Scene.current;
  //const maxAngle = 30.0;

  if(!scene.editMode) {
    VertoStudio.alert('Cannot run panel search outside of edit mode');
    return;
  }
  
  const selection = scene.selection;
  
  if(!selection instanceof FaceSelection || selection.count < 1) {
    VertoStudio.alert('This script requires selecting one or more faces to run');
    return;
  }
  
  //currently only the first material group is supported
  if(selection.items[0].group != 0)
    return;

  const editModel = scene.editTarget;

  const allTriangles = Triangle.array(editModel.triangles);
  const allQuads = Quad.array(editModel.quads);
  const allVerts = Vec3.array(editModel.vertices);

  const searcher = new PanelSearcher(allTriangles, allQuads, allVerts, maxAngle);
  
  searcher.panelSearch(selection.items[0]);  
  scene.selection = searcher.selection;
}


if(!VertoStudio.globalState.panelSelect) {
  VertoStudio.globalState.panelSelect = {};
}
  
VertoStudio.inputDialog({
  title: 'Panel Select',
  params: [
    {
      name: 'Max Angle',
      type: 'decimal',
      min: 0,
      max: 180,
      value: VertoStudio.globalState.panelSelect.maxAng || 30.0
    }
  ]
}, (values) => {
  if(values) {
    VertoStudio.globalState.panelSelect = { maxAng: values['Max Angle'].value };
    doPanelSearch(VertoStudio.globalState.panelSelect.maxAng);
  }
});
