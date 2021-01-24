
console.log('Verto Studio ' + VertoStudio.version());

const sphere = ModelGenerator.genSphere(5.0, 32, 32);
sphere.y = 5.0;

const material = new Material;
material.specular = [ 1, 1, 1, 1 ];
material.emissive = [ 1, 1, 1, 1 ];
material.textureTileX = 2;
material.textureTileY = 2;
material.shininess = 64.0;

sphere.material = material;

const texture = new Texture('test', 'test.jpg');

//uncomment to set texture as mipmapped
//texture.mipmapped = true;

sphere.material.texture = texture;

