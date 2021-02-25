const cube = ModelGenerator.genCube(5.0);

cube.y = 10.0;

const material = new Material('cube material');
const red = [ 1, 0, 0, 1 ];
material.diffuse = red;

cube.material = material;

const radius = 2.0;
const sphere = ModelGenerator.genSphere(radius, 16, 16);

sphere.y = 15.0+radius;
sphere.material = material;

Scene.current.camera.center = sphere.pos;
