const sin = Math.sin;
const cos = Math.cos;
const sqrt = Math.sqrt;
const pow = Math.pow;
const asin = Math.asin;
const acos = Math.acos;
const tan = Math.tan;
const atan = Math.atan;
const exp = Math.exp;
const log = Math.log;
const random = Math.random;
const PI = Math.PI, pi = Math.PI;

class ParametricSurface {
  static run(params) {
    const uRes = params['U Res'].value;
    const vRes = params['V Res'].value;      
    const xFunc = params['X'].value;
    const yFunc = params['Y'].value;
    const zFunc = params['Z'].value;
    
    const uScale = eval(params['U Scale'].value);
    const vScale = eval(params['V Scale'].value);
  
    const surface = new Model;
    
    const quat = Quat.fromAxisAngle(90, 1, 0, 0);
    const doRotate = params['Rotate Z-Up'].value;
  
    surface.edit((m, finish) => {
      let newVerts = [ ];        
      let newTexcoords = [ ];  
      let newQuads = [ ];  
      let newTriangles = [ ];
      
      let siPos = 0;
      let vPos = 0;
      let si = new Map;
      
      for(let iu = 0; iu < uRes; iu++) {
        for(let iv = 0; iv < vRes; iv++) {
          let u = (iu/(uRes-1))*uScale;
          let v = (iv/(vRes-1))*vScale;
                 
          //evaluate the function passed in from the dialog 
          let p = new Vec3(
            eval(xFunc), eval(yFunc), eval(zFunc)
          );

          //..or uncomment to code your own function
          //const r1 = 10, r2 = 20;
          //const C = (r2 + r1*cos(v));
          //p = new Vec3(
          //  C*cos(u),
          //  C*sin(u),
          //  r1*sin(v)            
          //);

          if(doRotate)
            p = Quat.apply(quat, p);
          newVerts.push(p);
          newTexcoords.push(new Vec2(u, v));                       
          
          si.set(siPos, vPos);
          siPos++;
          vPos++;
        }
        
        for(let i = 0; i < siPos-1; i++) {
          const pos = [ i, i+vRes, i+1+vRes, i+1 ];
          
          if(i%vRes == vRes-1)
            continue;
        
          if(si.has(pos[0]) && si.has(pos[1]) && si.has(pos[2]) && si.has(pos[3])) {                     
            newQuads.push(new Quad(si.get(pos[0]), si.get(pos[1]), si.get(pos[2]), si.get(pos[3])));
          }
        }
      }
      
      //passing null for the norms automatically calculates the new normals
      finish(Vec3.float32Array(newVerts), null, Vec2.float32Array(newTexcoords), 
             Triangle.uint32Array(newTriangles), Quad.uint32Array(newQuads));
    });
  
  
    return surface;    
  }  
};

VertoStudio.inputDialog({
  title: 'Parametric Surface',
  params: [
    {
      name: 'U Res',
      type: 'integer',
      min: 16,
      max: 128,
      value: 32
    },
    {
      name: 'V Res',
      type: 'integer',
      min: 16,
      max: 128,
      value: 32
    },    
    {
      name: 'X',
      type: 'string',
      value: '(1-v)*(3 + cos(u))*cos(4*pi*v)'
    },
    {
      name: 'Y',
      type: 'string',
      value: '(1-v)*(3 + cos(u))*sin(4*pi*v)'
    },
    {
      name: 'Z',
      type: 'string',
      value: '3*v + (1-v)*sin(u) + 1'
    },
    {
      name: 'U Scale',
      type: 'string',
      value: '2*pi'
    },
    {
      name: 'V Scale',
      type: 'string',
      value: '1.0'
    },        
    {
      name: 'Rotate Z-Up',
      type: 'bool',
      value: true
    }
  ]
}, (values) => {
  const model = ParametricSurface.run(values);

  const material = new Material('red material');
  material.diffuse = [ 1, 0, 0, 1 ];
  material.specular = [ 1, 1, 1, 1 ];
  material.textureTileX = 5;
  material.textureTileY = 5;
  material.shininess = 64.0;

  model.material = material;  
});


