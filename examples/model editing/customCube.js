
class MyModelGenerator {
  static genCube() {
    const cube = new Model;
  
    cube.edit((m, finish) => {
      let newVerts = [
        new Vec3(-5, -5, -5),
        new Vec3( 5, -5, -5),  
        new Vec3( 5, -5,  5),
        new Vec3(-5, -5,  5),

        new Vec3(-5,  5, -5),
        new Vec3( 5,  5, -5),  
        new Vec3( 5,  5,  5),
        new Vec3(-5,  5,  5),    
      ];
  
      let newNorms = [
        new Vec3(-5, -5, -5).normalized(),
        new Vec3( 5, -5, -5).normalized(),  
        new Vec3( 5, -5,  5).normalized(),
        new Vec3(-5, -5,  5).normalized(),

        new Vec3(-5,  5, -5).normalized(),
        new Vec3( 5,  5, -5).normalized(),  
        new Vec3( 5,  5,  5).normalized(),
        new Vec3(-5,  5,  5).normalized(),    
      ];
  
      let newTexcoords = [
        new Vec2(0,  0),
        new Vec2(1,  0),  
        new Vec2(1,  1),
        new Vec2(0,  1),

        new Vec2(0,  0),
        new Vec2(1,  0),  
        new Vec2(1,  1),
        new Vec2(0,  1),      
      ];
  
      let newQuads = [
        new Quad(0, 1, 2, 3),
        new Quad(4, 5, 1, 0),    
        new Quad(6, 7, 3, 2),    
        new Quad(0, 3, 7, 4),    
        new Quad(5, 6, 2, 1),        
        new Quad(7, 6, 5, 4),
      ];
  
      let newTriangles = [ ];

      finish(Vec3.float32Array(newVerts), Vec3.float32Array(newNorms), Vec2.float32Array(newTexcoords), 
             Triangle.uint32Array(newTriangles), Quad.uint32Array(newQuads));
    });
  
    return cube;
  }
}

const material = new Material;

material.diffuse = [ 0, 0.5, 1, 1 ];
material.specular = [ 1, 1, 1, 1 ];
material.shininess = 64.0;

const cube = MyModelGenerator.genCube();  
cube.material = material;
  