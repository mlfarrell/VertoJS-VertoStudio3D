
function hsb2rgb(h, s, v) {
  var r, g, b, i, f, p, q, t;
    if(arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r),
        g: Math.round(g),
        b: Math.round(b)
    };
}

const sphere = ModelGenerator.genSphere(5.0, 32, 32);
sphere.z = 25;

const material = new Material('red material');
material.diffuse = [ 1, 0, 0, 1 ];
material.specular = [ 1, 1, 1, 1 ];
material.shininess = 64.0;

sphere.material = material;

function doSomethingCool(xOffset) {
  for(let i = 0; i < 50; i++) {
    const cube = ModelGenerator.genCube(0.5);

    cube.scale = [ 10, 0.5, 1 ];
    cube.x = xOffset;
    cube.y = i;
    cube.orientation = Quat.fromAxisAngle(i/25.0 * 360.0, 0, 1, 0);  
    cube.material = sphere.material;
    
    const rgb = hsb2rgb(i/50.0 * 360, 1.0, 1.0);
    const mat = new Material();
    
    mat.diffuse = [ rgb.r, rgb.g, rgb.b, 1.0 ];
    cube.material = mat;
  }
}

doSomethingCool(0);

const camera = Scene.current.camera;
const newCenter = new Vec3(0, 0, 0);
const newVantagePoint = new Vec3(10, 75, 10);

camera.lookAt(newCenter, newVantagePoint);


