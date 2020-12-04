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

class EdgeGraph {
  constructor(allTriangles, allQuads) {
    this.adjacency = new MultiMap();        
    this.visitedEdges = new Set();
    this.loopPath = new VertexSelection();
    this.edgeToFace = new MultiMap();
    
    for(const tri of allTriangles) {
      this.edge(tri.indices[0], tri.indices[1], tri);
      this.edge(tri.indices[1], tri.indices[2], tri);
      this.edge(tri.indices[2], tri.indices[0], tri);            
    }

    for(const quad of allQuads) {
      this.edge(quad.indices[0], quad.indices[1], quad);
      this.edge(quad.indices[1], quad.indices[2], quad);
      this.edge(quad.indices[2], quad.indices[3], quad);            
      this.edge(quad.indices[3], quad.indices[0], quad);                  
    }    
  }
  
  edge(a, b, face) {
    //record this edge in the adjacency lists..
    this.adjacency.add(a, b);    
    
    //..and construct a mapping of edges back to owning faces
    this.edgeToFace.add(this.edgeHash(a, b), face);
  }   
  
  edgeHash(a, b) {
    if(a < b) {
      return BigInt(a) | (BigInt(b)<<32n); 
    } else {
      return BigInt(b) | (BigInt(a)<<32n);     
    }
  }
  
  findLoop(ea, eb) {
    const eh = this.edgeHash(ea, eb);
    const edgeFaces = this.edgeToFace.getAll(eh);

    if(!this.visitedEdges.has(eh)) {
    
      this.visitedEdges.add(eh);
      this.loopPath.add({ type: 'vertex', index: ea });
      this.loopPath.add({ type: 'vertex', index: eb });      
            
      const adj = this.adjacency.getAll(eb).filter(v => v !== ea );
            
      if(adj.length === 3) {      
      
        for(const ebPrime of adj) {
          const ebPrimeFaces = this.edgeToFace.getAll(this.edgeHash(eb, ebPrime));
          let noCommonFaces = true;
          
          search: for(const ef of edgeFaces) for(const ebpf of ebPrimeFaces) {
            if(ef.equals(ebpf)) {
              noCommonFaces = false;
              break search;
            }
          }
          
          if(noCommonFaces) {
            this.findLoop(eb, ebPrime);
          }
        }
      }
    }
  }
}

function doEdgeLoop(direction) {
  const scene = Scene.current;

  if(!scene.editMode) {
    VertoStudio.alert('Cannot run loop select outside of edit mode');
    return;
  }
  
  const selection = scene.selection;
  
  if(!selection instanceof VertexSelection || selection.count != 2) {
    VertoStudio.alert('This script requires selecting exactly one edge (two vertices) to run');
    return;
  }

  const editModel = scene.editTarget;

  const allTriangles = Triangle.array(editModel.triangles);
  const allQuads = Quad.array(editModel.quads);

  const edgeGraph = new EdgeGraph(allTriangles, allQuads);

  if(direction === 'forward') {
    edgeGraph.findLoop(selection.items[0].index, selection.items[1].index);
  } else if(direction === 'backward') {
    edgeGraph.findLoop(selection.items[1].index, selection.items[0].index);
  } else {
    edgeGraph.findLoop(selection.items[0].index, selection.items[1].index);
    edgeGraph.visitedEdges.delete(edgeGraph.edgeHash(selection.items[0].index, selection.items[1].index)); //HACK
    edgeGraph.findLoop(selection.items[1].index, selection.items[0].index);  
  }
  scene.selection = edgeGraph.loopPath;
}

doEdgeLoop('both');

