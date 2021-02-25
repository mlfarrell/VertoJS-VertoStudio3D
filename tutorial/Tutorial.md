# VertoJS for Verto Studio 3D Tutorial

Congratulations on taking the dive into learning how to program inside of Verto Studio 3D!  This tutorial is suited for beginners to 3D programming and will show you the basics of how to write code to manipulate a 3D scene inside of any Verto Studio environment - whether its on the Desktop, a Mobile Tablet, or Virtual Reality.

## "Hello Verto" - Your First Script

Start by creating a new blank Verto Studio scene and then opening the VertoJS script editor (on macOS, this is done via the `⌘J` shortcut).

Lets think about what we want to do in our scene, and then set out to accomplish that task via code.  

### Creating models

For this tutorial, we'll start by creating a new 3D cube and adding it to our scene.

Type the following code into the script editor

```javascript
const cube = ModelGenerator.genCube(5.0);
```

.. and press `⌘R` on the keyboard to run it.  You should see a new cube appear above the default plane in our scene.  Now, `cube` is a [Model](../doc.md#Model), a special type representing any Verto Studio 3D model.

### Positioning models

Lets put our cube in a different place.  Add the following code below to change the `y` position of the cube to be higher off the plane.

```javascript
const cube = ModelGenerator.genCube(5.0);

//add this code
cube.y = 10.0; 
```

We can modify the `x`, `y`, and `z` position of any 3D model to place them wherever we want.

### Cleaning up

After we run our script a second time, you'll notice that we get two cubes on top of each other.  Verto Studio does not reset your 3D scene between each script run.  To avoid having new objects all over the place, for now, lets go ahead and remove the new objects after each script run.  Go ahead and click or tap into the scene and then click or tap on each of the cubes until they highlight with a green selection border.  Once selected tap `delete` on the keyboard to delete the cube.  Do this until there are no cubes left in the scene.  Later on, we can use code to prevent us from having to do this after each of our scripts.

### Adding colors with materials

Lets add some color to our cube.  Add the following new code so that our script looks like this

```javascript
const cube = ModelGenerator.genCube(5.0);
cube.y = 10.0;

//add this code
const material = new Material('cube material');
const red = [ 1, 0, 0, 1 ];
material.diffuse = red;

cube.material = material;
```

Here, we create a new [Material](../doc.md#Material) and set its `diffuse` property to a special RGBA value.  This colors the material as we would expect.  The RGBA  value is an array of numbers that represent a color in Red, Green, Blue, and Alpha order.  Unless you want semi-transparent objects, Alpha should always be set to 1.

Once our material is set up, we assign it to the model via its special `material` property. 

Running this script now gives you a red cube!

### Adding more stuff!

Lets take it a step further and put a sphere on top of our cube.  First, be sure to clean up the scene (by deleting all the cubes we've added sofar) and then, add this new code to the bottom of our script.

```javascript
//add this code
const radius = 2.0;
const sphere = ModelGenerator.genSphere(radius, 16, 16);

sphere.y = 15.0+radius;
sphere.material = material;
```

This adds a new red sphere right on top of our cube.  Try it out!

### Manipulating the camera

The last thing we will do in our tutorial, is center our scene camera directly onto the new sphere we've added, making it the focal point of the 3D scene.  
To do this, we'll need to access the current Verto Studio scene's [Camera](../doc.md#Camera) object.  

Add this code to manipulate the current camera's `center` position.

```javascript
//add this code
Scene.current.camera.center = sphere.pos;
```

Above, `sphere.pos` returns a point object representing the sphere's XYZ position which is then assigned to the camera's `center` position.

Running this script will cause the camera to be centered directly onto the sphere.

## Finding Objects

Sofar, we've been manually deleting our script objects each time.  This is usually fine for most scripts, but if we wanted to get fancy, we could _name_ our model objects so that we can find them later on when re-running our script.  

Lets modify our script a bit to give our cube and sphere a unique name!

```javascript
const cube = ModelGenerator.genCube(5.0);
cube.name = "mike's cube";

//...

const radius = 2.0;
const sphere = ModelGenerator.genSphere(radius, 16, 16);
sphere.name = "mike's sphere";

//...
```

Now that we have given our models a name, we need a way to find them later on the next script run.
Lets create a JS function to do that for us below!  Place this new code at the **top** of our script file.

```javascript
function findModelByName(name) {
  return Scene.current.models.find(m => m.name === name);
}
```

This function can now be used to look to see if our models are already there.
Check out our new fancy script below.  This now only adds the new models if they weren't already added!

```javascript
const cubeName = "mike's cube";
let cube = findModelByName(cubeName);
if(!cube) {
  cube = ModelGenerator.genCube(5.0);
  cube.name = cubeName;
}

cube.y = 10.0;

//...

const sphereName = "mike's sphere";
const radius = 2.0;
let sphere = findModelByName(sphereName);
if(!sphere) {
  sphere = ModelGenerator.genSphere(radius, 16, 16);
  sphere.name = sphereName;
}

sphere.y = 15.0+radius;

//...
```

## Conclusion

This only grazes the surface of what you can do within VertoJS.  For more examples, head to the top of this repository and read through the example and feature scripts!
