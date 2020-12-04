
///"blast" a bunch of copies of one model all over another's faces
class ModelBlaster {
  static calcFaceNormal(verts, face) {
    const a = verts[face.indices[1]].subtracted(verts[face.indices[0]]);
    const b = verts[face.indices[1]].subtracted(verts[face.indices[2]]);    
    
    return b.cross(a).normalized();
  }

  static doBlast(src, dest, srcUpVector) {
    const srcVerts = Vec3.array(src.vertices);
    const srcNormals = Vec3.array(src.normals);    
    const srcTexcoords = Vec2.array(src.texcoords);
    const srcTriangles = Triangle.array(src.triangles);    
    const srcQuads = Quad.array(src.quads);
    const offset = 0.1;
    
    dest.edit((m, finish) => {      
      const dstVerts = Vec3.array(m.vertices);
      const dstQuads = Quad.array(m.quads);
      let i, j, t, q, v;
      
      const oldVerts = Vec3.array(m.vertices);
      const oldNorms = Vec3.array(m.normals);    
      const oldTc = Vec2.array(m.texcoords);
      const oldTriangles = Triangle.array(m.triangles);
      const oldQuads = Quad.array(m.quads);
  
      let newVerts = oldVerts;
      let newNorms = oldNorms;
      let newTexcoords = oldTc;
      let newTriangles = oldTriangles;
      let newQuads = oldQuads;
      
      for(i = 0; i < dstQuads.length; i++) {
        const center = new Vec3(dstVerts[dstQuads[i].indices[0]]);        
        center.add(dstVerts[dstQuads[i].indices[1]]);
        center.add(dstVerts[dstQuads[i].indices[2]]);
        center.add(dstVerts[dstQuads[i].indices[3]]);
        center.scalarMultiply(1.0/4.0);
        
        const faceN = ModelBlaster.calcFaceNormal(dstVerts, dstQuads[i]);
        const angleBetween = DEG(Math.acos(faceN.dot(srcUpVector)));        
        const v = newVerts.length;
        
        for(j = 0; j < srcVerts.length; j++) {          
          if(Math.abs(angleBetween) > 0.001 && Math.abs(angleBetween) < 180.0) {
            const rotationAxis = srcUpVector.cross(faceN);
            const rotationQuat = Quat.fromAxisAngle(-angleBetween, rotationAxis.x, rotationAxis.y, rotationAxis.z);
            const rotatedVert = Quat.apply(rotationQuat, srcVerts[j]);
                    
            newVerts.push(rotatedVert.added(center).added(faceN.scalarMultiplied(offset)));
          } else {
            newVerts.push(srcVerts[j].added(center).added(faceN.scalarMultiplied(offset)));
          }
          
          newNorms.push(new Vec3(srcNormals[j]));
          newTexcoords.push(new Vec3(srcTexcoords[j]));
        }
        
        for(t = 0; t < srcTriangles.length; t++) {
          newTriangles.push(new Triangle(v+srcTriangles[t].indices[0], v+srcTriangles[t].indices[1], v+srcTriangles[t].indices[2]));
        }
        for(q = 0; q < srcQuads.length; q++) {
          newQuads.push(new Quad(v+srcQuads[q].indices[0], v+srcQuads[q].indices[1], v+srcQuads[q].indices[2], v+srcQuads[q].indices[3]));
        }        
      }
         
      finish(Vec3.float32Array(newVerts), Vec3.float32Array(newNorms), Vec2.float32Array(newTexcoords), 
             Triangle.uint32Array(newTriangles), Quad.uint32Array(newQuads));          
    });
  }
}

const selection = Scene.current.selection;

if(selection.items.length == 0) {
  VertoStudio.alert('Need to select a model before running this script!');
} else {
  const src = selection.items[0];
  ModelBlaster.doBlast(src, Scene.current.models[1], new Vec3(0, 1, 0));    
}
  
