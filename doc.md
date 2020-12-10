## Classes

<dl>
<dt><a href="#VertoStudio">VertoStudio</a></dt>
<dd><p>A singleton that represents the Verto Studio editor application</p>
</dd>
<dt><a href="#Scene">Scene</a></dt>
<dd><p>A Verto Studio Scene</p>
</dd>
<dt><a href="#Texture">Texture</a></dt>
<dd></dd>
<dt><a href="#Material">Material</a></dt>
<dd></dd>
<dt><a href="#Camera">Camera</a></dt>
<dd><p>A 3D camera that uses spherical coordinates for positioning.</p>
</dd>
<dt><a href="#Model">Model</a></dt>
<dd><p>A Verto Studio 3D model</p>
</dd>
<dt><a href="#SceneSelection">SceneSelection</a></dt>
<dd><p>Represents a user selection of Models</p>
</dd>
<dt><a href="#VertexSelection">VertexSelection</a></dt>
<dd><p>Represents a user selection of Vertices (Points)</p>
</dd>
<dt><a href="#FaceSelection">FaceSelection</a></dt>
<dd><p>Represents a user selection of Faces (Triangles or Quads)</p>
</dd>
<dt><a href="#ModelGenerator">ModelGenerator</a></dt>
<dd><p>A convenient ModelGenerator class</p>
</dd>
<dt><a href="#Quat">Quat</a></dt>
<dd><p>A utility class for generating Quaternion values</p>
</dd>
<dt><a href="#Vec3">Vec3</a></dt>
<dd><p>A utility class representing a 3D Vector value</p>
</dd>
<dt><a href="#Triangle">Triangle</a></dt>
<dd><p>A utility class representing a Triangle face</p>
</dd>
<dt><a href="#Quad">Quad</a></dt>
<dd><p>A utility class representing a Quad face</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Point3D">Point3D</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#InputDialogCallback">InputDialogCallback</a> : <code>function</code></dt>
<dd><p>The inputDialog callback function</p>
</dd>
<dt><a href="#DialogParam">DialogParam</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#DialogOptions">DialogOptions</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#ModelEditFinishCallback">ModelEditFinishCallback</a> : <code>function</code></dt>
<dd><p>The finish function used by Model.edit()</p>
</dd>
<dt><a href="#ModelEditFunction">ModelEditFunction</a> : <code>function</code></dt>
<dd><p>The editor function used by Model.edit()</p>
</dd>
</dl>

<a name="VertoStudio"></a>

## VertoStudio
A singleton that represents the Verto Studio editor application

**Kind**: global class  

* [VertoStudio](#VertoStudio)
    * [.globalState](#VertoStudio+globalState) : <code>object</code>
    * [.alert(Msg)](#VertoStudio+alert)
    * [.version()](#VertoStudio+version) ⇒ <code>number</code>
    * [.inputDialog(dialogOptions, callback)](#VertoStudio+inputDialog)
    * [.isVR()](#VertoStudio+isVR) ⇒ <code>boolean</code>
    * [.environmentType()](#VertoStudio+environmentType) ⇒ <code>string</code>

<a name="VertoStudio+globalState"></a>

### vertoStudio.globalState : <code>object</code>
Accesses the global state object.  This object is persisted across multiple script executions.
<p>
Note: Any values stored in here will be readable by ALL other vertoJS scripts ran by the user.
</p>

**Kind**: instance property of [<code>VertoStudio</code>](#VertoStudio)  
<a name="VertoStudio+alert"></a>

### vertoStudio.alert(Msg)
Presents up an OS-themed modal alert dialog.

**Kind**: instance method of [<code>VertoStudio</code>](#VertoStudio)  

| Param | Type | Description |
| --- | --- | --- |
| Msg | <code>string</code> | The message to display in the alert |

<a name="VertoStudio+version"></a>

### vertoStudio.version() ⇒ <code>number</code>
Returns the Verto Studio version.

**Kind**: instance method of [<code>VertoStudio</code>](#VertoStudio)  
**Returns**: <code>number</code> - - The version of the application.  
<a name="VertoStudio+inputDialog"></a>

### vertoStudio.inputDialog(dialogOptions, callback)
Presents an input dialog to the user with various parameter types.

**Kind**: instance method of [<code>VertoStudio</code>](#VertoStudio)  

| Param | Type | Description |
| --- | --- | --- |
| dialogOptions | [<code>DialogOptions</code>](#DialogOptions) | The options for presenting the dialog. |
| callback | [<code>InputDialogCallback</code>](#InputDialogCallback) | The callback that handles the user response. |

<a name="VertoStudio+isVR"></a>

### vertoStudio.isVR() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>VertoStudio</code>](#VertoStudio)  
**Returns**: <code>boolean</code> - True if running on a Virtual Reality device  
<a name="VertoStudio+environmentType"></a>

### vertoStudio.environmentType() ⇒ <code>string</code>
Obtains the current environment type that Verto Studio is running in.

**Kind**: instance method of [<code>VertoStudio</code>](#VertoStudio)  
**Returns**: <code>string</code> - 'PC', 'Tablet', 'Phone', 'Holographic', or 'VR'  
<a name="Scene"></a>

## Scene
A Verto Studio Scene

**Kind**: global class  

* [Scene](#Scene)
    * [.current](#Scene+current) : [<code>Scene</code>](#Scene)
    * [.models](#Scene+models) : [<code>Array.&lt;Model&gt;</code>](#Model)
    * [.camera](#Scene+camera) : [<code>Camera</code>](#Camera)
    * [.textures](#Scene+textures) : [<code>Array.&lt;Texture&gt;</code>](#Texture)
    * [.materials](#Scene+materials) : [<code>Array.&lt;Material&gt;</code>](#Material)
    * [.selectionMode](#Scene+selectionMode) : <code>string</code>
    * [.editTarget](#Scene+editTarget) : [<code>Model</code>](#Model)
    * [.editMode](#Scene+editMode) : <code>boolean</code>
    * [.selection](#Scene+selection) : [<code>SceneSelection</code>](#SceneSelection) \| [<code>VertexSelection</code>](#VertexSelection) \| [<code>FaceSelection</code>](#FaceSelection)
    * [.selectAll()](#Scene+selectAll)
    * [.selectNone()](#Scene+selectNone)
    * [.selectInverse()](#Scene+selectInverse)

<a name="Scene+current"></a>

### scene.current : [<code>Scene</code>](#Scene)
Accesses the currently active Scene

**Kind**: instance property of [<code>Scene</code>](#Scene)  
**Read only**: true  
<a name="Scene+models"></a>

### scene.models : [<code>Array.&lt;Model&gt;</code>](#Model)
The Scene's models

**Kind**: instance property of [<code>Scene</code>](#Scene)  
**Read only**: true  
<a name="Scene+camera"></a>

### scene.camera : [<code>Camera</code>](#Camera)
The Scene's current active camera

**Kind**: instance property of [<code>Scene</code>](#Scene)  
**Read only**: true  
<a name="Scene+textures"></a>

### scene.textures : [<code>Array.&lt;Texture&gt;</code>](#Texture)
The Scene's textures

**Kind**: instance property of [<code>Scene</code>](#Scene)  
**Read only**: true  
<a name="Scene+materials"></a>

### scene.materials : [<code>Array.&lt;Material&gt;</code>](#Material)
The Scene's materials

**Kind**: instance property of [<code>Scene</code>](#Scene)  
**Read only**: true  
<a name="Scene+selectionMode"></a>

### scene.selectionMode : <code>string</code>
The current selection mode ('vertex' or 'face')

**Kind**: instance property of [<code>Scene</code>](#Scene)  
**Read only**: true  
<a name="Scene+editTarget"></a>

### scene.editTarget : [<code>Model</code>](#Model)
The current edit target (defined if editMode is true)

**Kind**: instance property of [<code>Scene</code>](#Scene)  
**Read only**: true  
<a name="Scene+editMode"></a>

### scene.editMode : <code>boolean</code>
Whether or not the Scene is currently in edit mode.

**Kind**: instance property of [<code>Scene</code>](#Scene)  
**Read only**: true  
<a name="Scene+selection"></a>

### scene.selection : [<code>SceneSelection</code>](#SceneSelection) \| [<code>VertexSelection</code>](#VertexSelection) \| [<code>FaceSelection</code>](#FaceSelection)
The Scene selection

**Kind**: instance property of [<code>Scene</code>](#Scene)  
<a name="Scene+selectAll"></a>

### scene.selectAll()
Selects all models, vertices, or faces depending upon the current Scene's selection mode & edit mode state.

**Kind**: instance method of [<code>Scene</code>](#Scene)  
<a name="Scene+selectNone"></a>

### scene.selectNone()
Clears the current Scene's selection

**Kind**: instance method of [<code>Scene</code>](#Scene)  
<a name="Scene+selectInverse"></a>

### scene.selectInverse()
Inverts the current Scene's selection

**Kind**: instance method of [<code>Scene</code>](#Scene)  
<a name="Texture"></a>

## Texture
**Kind**: global class  

* [Texture](#Texture)
    * [new Texture([scene], name, path)](#new_Texture_new)
    * [.mipmapped](#Texture+mipmapped) : <code>boolean</code>

<a name="new_Texture_new"></a>

### new Texture([scene], name, path)
Creates a Texture and adds it to a Scene
<p>
Note: On macOS platforms, this method may trigger a security open dialog to prompt the user to allow access to the texture file.
</p>


| Param | Type | Description |
| --- | --- | --- |
| [scene] | [<code>Scene</code>](#Scene) | The scene to add this texture to (defaults to Scene.current) |
| name | <code>string</code> | The unique name of this texture. |
| path | <code>string</code> | A full path to the texture's location on the disk.  Currently PNG & JPG file formats are supported. |

<a name="Texture+mipmapped"></a>

### texture.mipmapped : <code>boolean</code>
The textures mipmap state

**Kind**: instance property of [<code>Texture</code>](#Texture)  
<a name="Material"></a>

## Material
**Kind**: global class  

* [Material](#Material)
    * [new Material([scene], [name])](#new_Material_new)
    * [.texture](#Material+texture) : [<code>Texture</code>](#Texture)
    * [.textureTileY](#Material+textureTileY) : <code>number</code>
    * [.textureTileX](#Material+textureTileX) : <code>number</code>
    * [.shininess](#Material+shininess) : <code>number</code>
    * [.emissive](#Material+emissive) : <code>Array.&lt;number&gt;</code>
    * [.specular](#Material+specular) : <code>Array.&lt;number&gt;</code>
    * [.ambient](#Material+ambient) : <code>Array.&lt;number&gt;</code>
    * [.diffuse](#Material+diffuse) : <code>Array.&lt;number&gt;</code>

<a name="new_Material_new"></a>

### new Material([scene], [name])
Creates a Material and adds it to a Scene


| Param | Type | Description |
| --- | --- | --- |
| [scene] | [<code>Scene</code>](#Scene) | The scene to add this material to (defaults to Scene.current) |
| [name] | <code>string</code> | The unique name of this material. |

<a name="Material+texture"></a>

### material.texture : [<code>Texture</code>](#Texture)
The Material's texture assignment

**Kind**: instance property of [<code>Material</code>](#Material)  
<a name="Material+textureTileY"></a>

### material.textureTileY : <code>number</code>
The Material's texture tiling in the Y(V) direction

**Kind**: instance property of [<code>Material</code>](#Material)  
<a name="Material+textureTileX"></a>

### material.textureTileX : <code>number</code>
The Material's texture tiling in the X(U) direction

**Kind**: instance property of [<code>Material</code>](#Material)  
<a name="Material+shininess"></a>

### material.shininess : <code>number</code>
The Material's shininess component (phong model)

**Kind**: instance property of [<code>Material</code>](#Material)  
<a name="Material+emissive"></a>

### material.emissive : <code>Array.&lt;number&gt;</code>
The Material's RGBA emissive component (phong model)

**Kind**: instance property of [<code>Material</code>](#Material)  
<a name="Material+specular"></a>

### material.specular : <code>Array.&lt;number&gt;</code>
The Material's RGBA specular (reflective) component (phong model)

**Kind**: instance property of [<code>Material</code>](#Material)  
<a name="Material+ambient"></a>

### material.ambient : <code>Array.&lt;number&gt;</code>
The Material's RGBA ambient component (phong model)

**Kind**: instance property of [<code>Material</code>](#Material)  
<a name="Material+diffuse"></a>

### material.diffuse : <code>Array.&lt;number&gt;</code>
The Material's RGBA diffuse (main color) component (phong model)

**Kind**: instance property of [<code>Material</code>](#Material)  
<a name="Camera"></a>

## Camera
A 3D camera that uses spherical coordinates for positioning.

**Kind**: global class  

* [Camera](#Camera)
    * [.pos](#Camera+pos) : [<code>Point3D</code>](#Point3D)
    * [.distance](#Camera+distance) : <code>number</code>
    * [.phi](#Camera+phi) : <code>number</code>
    * [.theta](#Camera+theta) : <code>number</code>
    * [.center](#Camera+center) : [<code>Point3D</code>](#Point3D)
    * [.lookAt(newCenter, newVantage)](#Camera+lookAt)

<a name="Camera+pos"></a>

### camera.pos : [<code>Point3D</code>](#Point3D)
The Camera's current position in 3D space

**Kind**: instance property of [<code>Camera</code>](#Camera)  
**Read only**: true  
<a name="Camera+distance"></a>

### camera.distance : <code>number</code>
The Camera's r-value distance from its center in spherical coordinates.

**Kind**: instance property of [<code>Camera</code>](#Camera)  
<a name="Camera+phi"></a>

### camera.phi : <code>number</code>
The Camera's phi position in spherical coordinates (in degrees).

**Kind**: instance property of [<code>Camera</code>](#Camera)  
<a name="Camera+theta"></a>

### camera.theta : <code>number</code>
The Camera's theta position in spherical coordinates (in degrees).

**Kind**: instance property of [<code>Camera</code>](#Camera)  
<a name="Camera+center"></a>

### camera.center : [<code>Point3D</code>](#Point3D)
The Camera's center position in spherical coordinates.

**Kind**: instance property of [<code>Camera</code>](#Camera)  
<a name="Camera+lookAt"></a>

### camera.lookAt(newCenter, newVantage)
Moves the camera to a given vantage point looking at a given center point.

**Kind**: instance method of [<code>Camera</code>](#Camera)  

| Param | Type | Description |
| --- | --- | --- |
| newCenter | [<code>Point3D</code>](#Point3D) | The new center position for which the camera will look towards. |
| newVantage | [<code>Point3D</code>](#Point3D) | The new vantage position from where the camera will look. |

<a name="Model"></a>

## Model
A Verto Studio 3D model

**Kind**: global class  

* [Model](#Model)
    * [new Model()](#new_Model_new)
    * [.quads](#Model+quads) : <code>Uint32Array</code>
    * [.triangles](#Model+triangles) : <code>Uint32Array</code>
    * [.texcoords](#Model+texcoords) : <code>Float32Array</code>
    * [.normals](#Model+normals) : <code>Float32Array</code>
    * [.vertices](#Model+vertices) : <code>Float32Array</code>
    * [.material](#Model+material) : [<code>Material</code>](#Material)
    * [.scale](#Model+scale) : [<code>Point3D</code>](#Point3D)
    * [.orientation](#Model+orientation) : <code>Array.&lt;number&gt;</code>
    * [.pos](#Model+pos) : [<code>Point3D</code>](#Point3D)
    * [.z](#Model+z) : <code>number</code>
    * [.y](#Model+y) : <code>number</code>
    * [.x](#Model+x) : <code>number</code>
    * [.edit(callback)](#Model+edit)

<a name="new_Model_new"></a>

### new Model()
Creates a new empty Model and adds it to a Scene

<a name="Model+quads"></a>

### model.quads : <code>Uint32Array</code>
Accesses the Model's Quad face index array
   <p>
   Note: Use Quad.array(model.quads) to obtain an array of Quad objects from this value.
   </p>

**Kind**: instance property of [<code>Model</code>](#Model)  
**Read only**: true  
<a name="Model+triangles"></a>

### model.triangles : <code>Uint32Array</code>
Accesses the Model's Triangle face index array
   <p>
   Note: Use Triangle.array(model.triangles) to obtain an array of Triangle objects from this value.
   </p>

**Kind**: instance property of [<code>Model</code>](#Model)  
**Read only**: true  
<a name="Model+texcoords"></a>

### model.texcoords : <code>Float32Array</code>
Accesses the Model's texcoords vertex array
   <p>
   Note: Use Vec2.array(model.texcoords) to obtain an array of Vec2 objects from this value.
   </p>

**Kind**: instance property of [<code>Model</code>](#Model)  
**Read only**: true  
<a name="Model+normals"></a>

### model.normals : <code>Float32Array</code>
Accesses the Model's normals vertex array
   <p>
   Note: Use Vec3.array(model.normals) to obtain an array of Vec3 objects from this value.
   </p>

**Kind**: instance property of [<code>Model</code>](#Model)  
**Read only**: true  
<a name="Model+vertices"></a>

### model.vertices : <code>Float32Array</code>
Accesses the Model's position (vertices) vertex array
   <p>
   Note: Use Vec3.array(model.vertices) to obtain an array of Vec3 objects from this value.
   </p>

**Kind**: instance property of [<code>Model</code>](#Model)  
**Read only**: true  
<a name="Model+material"></a>

### model.material : [<code>Material</code>](#Material)
Accesses the Model's material

**Kind**: instance property of [<code>Model</code>](#Model)  
<a name="Model+scale"></a>

### model.scale : [<code>Point3D</code>](#Point3D)
Accesses the Model's 3D scale

**Kind**: instance property of [<code>Model</code>](#Model)  
<a name="Model+orientation"></a>

### model.orientation : <code>Array.&lt;number&gt;</code>
Accesses the Model's 3D XYZW quaternion orientation value
   <p>
   Note: You can use the Quat.fromAxisAngle() utility method to construct this value.
   </p>

**Kind**: instance property of [<code>Model</code>](#Model)  
<a name="Model+pos"></a>

### model.pos : [<code>Point3D</code>](#Point3D)
Accesses the Model's 3D position

**Kind**: instance property of [<code>Model</code>](#Model)  
<a name="Model+z"></a>

### model.z : <code>number</code>
Accesses the Model's 3D Z-position

**Kind**: instance property of [<code>Model</code>](#Model)  
<a name="Model+y"></a>

### model.y : <code>number</code>
Accesses the Model's 3D Y-position

**Kind**: instance property of [<code>Model</code>](#Model)  
<a name="Model+x"></a>

### model.x : <code>number</code>
Accesses the Model's 3D X-position

**Kind**: instance property of [<code>Model</code>](#Model)  
<a name="Model+edit"></a>

### model.edit(callback)
Performs an edit on this model.  For the edit to be completed, the provided callback function must be called with the proper new model data values.

**Kind**: instance method of [<code>Model</code>](#Model)  

| Param | Type | Description |
| --- | --- | --- |
| callback | [<code>ModelEditFunction</code>](#ModelEditFunction) | A function that implements the model edit. |

<a name="SceneSelection"></a>

## SceneSelection
Represents a user selection of Models

**Kind**: global class  

* [SceneSelection](#SceneSelection)
    * [new SceneSelection([scene])](#new_SceneSelection_new)
    * [.items](#SceneSelection+items) : [<code>Array.&lt;Model&gt;</code>](#Model)
    * [.count](#SceneSelection+count) : <code>integer</code>
    * [.add(item)](#SceneSelection+add)
    * [.remove(item)](#SceneSelection+remove)
    * [.clear()](#SceneSelection+clear)
    * [.translate(delta)](#SceneSelection+translate)
    * [.rotate(axis, angle)](#SceneSelection+rotate)
    * [.scale(scale)](#SceneSelection+scale)
    * [.delete()](#SceneSelection+delete)
    * [.duplicate()](#SceneSelection+duplicate)

<a name="new_SceneSelection_new"></a>

### new SceneSelection([scene])
Creates a new empty Selection


| Param | Type | Description |
| --- | --- | --- |
| [scene] | [<code>Scene</code>](#Scene) | The scene for which this selection will be for. |

<a name="SceneSelection+items"></a>

### sceneSelection.items : [<code>Array.&lt;Model&gt;</code>](#Model)
The Selections items

**Kind**: instance property of [<code>SceneSelection</code>](#SceneSelection)  
**Read only**: true  
<a name="SceneSelection+count"></a>

### sceneSelection.count : <code>integer</code>
The Number of items in the selection

**Kind**: instance property of [<code>SceneSelection</code>](#SceneSelection)  
**Read only**: true  
<a name="SceneSelection+add"></a>

### sceneSelection.add(item)
Adds an item to the selection

**Kind**: instance method of [<code>SceneSelection</code>](#SceneSelection)  

| Param | Type | Description |
| --- | --- | --- |
| item | [<code>Model</code>](#Model) | The item to add to the selection. |

<a name="SceneSelection+remove"></a>

### sceneSelection.remove(item)
Removes an item from the selection

**Kind**: instance method of [<code>SceneSelection</code>](#SceneSelection)  

| Param | Type | Description |
| --- | --- | --- |
| item | [<code>Model</code>](#Model) | The item to remove from the selection. |

<a name="SceneSelection+clear"></a>

### sceneSelection.clear()
Clears all items from the selection

**Kind**: instance method of [<code>SceneSelection</code>](#SceneSelection)  
<a name="SceneSelection+translate"></a>

### sceneSelection.translate(delta)
Translates this Selection's items

**Kind**: instance method of [<code>SceneSelection</code>](#SceneSelection)  

| Param | Type | Description |
| --- | --- | --- |
| delta | [<code>Point3D</code>](#Point3D) | The translation amount. |

<a name="SceneSelection+rotate"></a>

### sceneSelection.rotate(axis, angle)
Translates this Selection's items about their local origin

**Kind**: instance method of [<code>SceneSelection</code>](#SceneSelection)  

| Param | Type | Description |
| --- | --- | --- |
| axis | [<code>Point3D</code>](#Point3D) | The rotation axis. |
| angle | <code>number</code> | The rotation amount (in degrees). |

<a name="SceneSelection+scale"></a>

### sceneSelection.scale(scale)
Scales this Selection's items

**Kind**: instance method of [<code>SceneSelection</code>](#SceneSelection)  

| Param | Type | Description |
| --- | --- | --- |
| scale | [<code>Point3D</code>](#Point3D) | The 3D scale amount. |

<a name="SceneSelection+delete"></a>

### sceneSelection.delete()
Deletes this Selection's items from the scene

**Kind**: instance method of [<code>SceneSelection</code>](#SceneSelection)  
<a name="SceneSelection+duplicate"></a>

### sceneSelection.duplicate()
Duplicate this Selection's items within the scene

**Kind**: instance method of [<code>SceneSelection</code>](#SceneSelection)  
<a name="VertexSelection"></a>

## VertexSelection
Represents a user selection of Vertices (Points)

**Kind**: global class  

* [VertexSelection](#VertexSelection)
    * [new VertexSelection([scene])](#new_VertexSelection_new)
    * [.items](#VertexSelection+items) : <code>Array.&lt;SelectedVertexItem&gt;</code>
    * [.count](#VertexSelection+count) : <code>integer</code>
    * [.add(item)](#VertexSelection+add)
    * [.remove(item)](#VertexSelection+remove)
    * [.clear()](#VertexSelection+clear)
    * [.translate(delta)](#VertexSelection+translate)
    * [.rotate(axis, angle)](#VertexSelection+rotate)
    * [.scale(scale)](#VertexSelection+scale)
    * [.delete()](#VertexSelection+delete)
    * [.duplicate()](#VertexSelection+duplicate)
    * [.subdivide()](#VertexSelection+subdivide)
    * [.flipFaces()](#VertexSelection+flipFaces)
    * [.weld()](#VertexSelection+weld)
    * [.selectConnected()](#VertexSelection+selectConnected)
    * [.selectRing()](#VertexSelection+selectRing)
    * [.splitQuads()](#VertexSelection+splitQuads)
    * [.mergeDoubles()](#VertexSelection+mergeDoubles)
    * [.extrude(direction, cap)](#VertexSelection+extrude)

<a name="new_VertexSelection_new"></a>

### new VertexSelection([scene])
Creates a new empty Selection for the currently edited model
<p>
Note: Verto Studio (the current scene) must be in edit mode to use this class
</p>


| Param | Type | Description |
| --- | --- | --- |
| [scene] | [<code>Scene</code>](#Scene) | The scene for which this selection will be for. |

<a name="VertexSelection+items"></a>

### vertexSelection.items : <code>Array.&lt;SelectedVertexItem&gt;</code>
The Selections items

**Kind**: instance property of [<code>VertexSelection</code>](#VertexSelection)  
**Read only**: true  
<a name="VertexSelection+count"></a>

### vertexSelection.count : <code>integer</code>
The Number of items in the selection

**Kind**: instance property of [<code>VertexSelection</code>](#VertexSelection)  
**Read only**: true  
<a name="VertexSelection+add"></a>

### vertexSelection.add(item)
Adds an item to the selection

**Kind**: instance method of [<code>VertexSelection</code>](#VertexSelection)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>SelectedVertexItem</code> | The item to add to the selection. |

<a name="VertexSelection+remove"></a>

### vertexSelection.remove(item)
Removes an item from the selection

**Kind**: instance method of [<code>VertexSelection</code>](#VertexSelection)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>SelectedVertexItem</code> | The item to remove from the selection. |

<a name="VertexSelection+clear"></a>

### vertexSelection.clear()
Clears all items from the selection

**Kind**: instance method of [<code>VertexSelection</code>](#VertexSelection)  
<a name="VertexSelection+translate"></a>

### vertexSelection.translate(delta)
Translates this Selection's items

**Kind**: instance method of [<code>VertexSelection</code>](#VertexSelection)  

| Param | Type | Description |
| --- | --- | --- |
| delta | [<code>Point3D</code>](#Point3D) | The translation amount. |

<a name="VertexSelection+rotate"></a>

### vertexSelection.rotate(axis, angle)
Translates this Selection's items about their local origin

**Kind**: instance method of [<code>VertexSelection</code>](#VertexSelection)  

| Param | Type | Description |
| --- | --- | --- |
| axis | [<code>Point3D</code>](#Point3D) | The rotation axis. |
| angle | <code>number</code> | The rotation amount (in degrees). |

<a name="VertexSelection+scale"></a>

### vertexSelection.scale(scale)
Scales this Selection's items

**Kind**: instance method of [<code>VertexSelection</code>](#VertexSelection)  

| Param | Type | Description |
| --- | --- | --- |
| scale | [<code>Point3D</code>](#Point3D) | The 3D scale amount. |

<a name="VertexSelection+delete"></a>

### vertexSelection.delete()
Deletes this Selection's items from the model

**Kind**: instance method of [<code>VertexSelection</code>](#VertexSelection)  
<a name="VertexSelection+duplicate"></a>

### vertexSelection.duplicate()
Duplicate this Selection's items within the scene

**Kind**: instance method of [<code>VertexSelection</code>](#VertexSelection)  
<a name="VertexSelection+subdivide"></a>

### vertexSelection.subdivide()
Subdivides all faces made up by this selection

**Kind**: instance method of [<code>VertexSelection</code>](#VertexSelection)  
<a name="VertexSelection+flipFaces"></a>

### vertexSelection.flipFaces()
Flips (flips face normals and winding direction) all faces made up by this selection.

**Kind**: instance method of [<code>VertexSelection</code>](#VertexSelection)  
<a name="VertexSelection+weld"></a>

### vertexSelection.weld()
Welds this selection's vertices

**Kind**: instance method of [<code>VertexSelection</code>](#VertexSelection)  
<a name="VertexSelection+selectConnected"></a>

### vertexSelection.selectConnected()
Expands the current selection by selecting all edge-connected vertices.

**Kind**: instance method of [<code>VertexSelection</code>](#VertexSelection)  
<a name="VertexSelection+selectRing"></a>

### vertexSelection.selectRing()
Expands the current selection by selecting the subtended edge ring.

**Kind**: instance method of [<code>VertexSelection</code>](#VertexSelection)  
<a name="VertexSelection+splitQuads"></a>

### vertexSelection.splitQuads()
Splits (quad to triangle) all quads made up by this selection

**Kind**: instance method of [<code>VertexSelection</code>](#VertexSelection)  
<a name="VertexSelection+mergeDoubles"></a>

### vertexSelection.mergeDoubles()
Merges duplicate vertices within this selection.

**Kind**: instance method of [<code>VertexSelection</code>](#VertexSelection)  
<a name="VertexSelection+extrude"></a>

### vertexSelection.extrude(direction, cap)
Extrude the faces made up by this selection.

**Kind**: instance method of [<code>VertexSelection</code>](#VertexSelection)  

| Param | Type | Description |
| --- | --- | --- |
| direction | [<code>Point3D</code>](#Point3D) | The extrusion vector. |
| cap | <code>boolean</code> | Whether or not to cap-off the extrusion (with new faces) |

<a name="FaceSelection"></a>

## FaceSelection
Represents a user selection of Faces (Triangles or Quads)

**Kind**: global class  

* [FaceSelection](#FaceSelection)
    * [new FaceSelection([scene])](#new_FaceSelection_new)
    * [.items](#FaceSelection+items) : <code>Array.&lt;SelectedFaceItem&gt;</code>
    * [.count](#FaceSelection+count) : <code>integer</code>
    * [.add(item)](#FaceSelection+add)
    * [.remove(item)](#FaceSelection+remove)
    * [.clear()](#FaceSelection+clear)
    * [.translate(delta)](#FaceSelection+translate)
    * [.rotate(axis, angle)](#FaceSelection+rotate)
    * [.scale(scale)](#FaceSelection+scale)
    * [.delete()](#FaceSelection+delete)
    * [.duplicate()](#FaceSelection+duplicate)
    * [.subdivide()](#FaceSelection+subdivide)
    * [.flipFaces()](#FaceSelection+flipFaces)
    * [.weld()](#FaceSelection+weld)
    * [.selectConnected()](#FaceSelection+selectConnected)
    * [.selectRing()](#FaceSelection+selectRing)
    * [.splitQuads()](#FaceSelection+splitQuads)
    * [.mergeDoubles()](#FaceSelection+mergeDoubles)
    * [.extrude(direction, cap)](#FaceSelection+extrude)

<a name="new_FaceSelection_new"></a>

### new FaceSelection([scene])
Creates a new empty Selection for the currently edited model
<p>
Note: Verto Studio (the current scene) must be in edit mode to use this class
</p>


| Param | Type | Description |
| --- | --- | --- |
| [scene] | [<code>Scene</code>](#Scene) | The scene for which this selection will be for. |

<a name="FaceSelection+items"></a>

### faceSelection.items : <code>Array.&lt;SelectedFaceItem&gt;</code>
The Selections items

**Kind**: instance property of [<code>FaceSelection</code>](#FaceSelection)  
**Read only**: true  
<a name="FaceSelection+count"></a>

### faceSelection.count : <code>integer</code>
The Number of items in the selection

**Kind**: instance property of [<code>FaceSelection</code>](#FaceSelection)  
**Read only**: true  
<a name="FaceSelection+add"></a>

### faceSelection.add(item)
Adds an item to the selection

**Kind**: instance method of [<code>FaceSelection</code>](#FaceSelection)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>SelectedFaceItem</code> | The item to add to the selection. |

<a name="FaceSelection+remove"></a>

### faceSelection.remove(item)
Removes an item from the selection

**Kind**: instance method of [<code>FaceSelection</code>](#FaceSelection)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>SelectedFaceItem</code> | The item to remove from the selection. |

<a name="FaceSelection+clear"></a>

### faceSelection.clear()
Clears all items from the selection

**Kind**: instance method of [<code>FaceSelection</code>](#FaceSelection)  
<a name="FaceSelection+translate"></a>

### faceSelection.translate(delta)
Translates this Selection's items

**Kind**: instance method of [<code>FaceSelection</code>](#FaceSelection)  

| Param | Type | Description |
| --- | --- | --- |
| delta | [<code>Point3D</code>](#Point3D) | The translation amount. |

<a name="FaceSelection+rotate"></a>

### faceSelection.rotate(axis, angle)
Translates this Selection's items about their local origin

**Kind**: instance method of [<code>FaceSelection</code>](#FaceSelection)  

| Param | Type | Description |
| --- | --- | --- |
| axis | [<code>Point3D</code>](#Point3D) | The rotation axis. |
| angle | <code>number</code> | The rotation amount (in degrees). |

<a name="FaceSelection+scale"></a>

### faceSelection.scale(scale)
Scales this Selection's items

**Kind**: instance method of [<code>FaceSelection</code>](#FaceSelection)  

| Param | Type | Description |
| --- | --- | --- |
| scale | [<code>Point3D</code>](#Point3D) | The 3D scale amount. |

<a name="FaceSelection+delete"></a>

### faceSelection.delete()
Deletes this Selection's items from the model

**Kind**: instance method of [<code>FaceSelection</code>](#FaceSelection)  
<a name="FaceSelection+duplicate"></a>

### faceSelection.duplicate()
Duplicate this Selection's items within the scene

**Kind**: instance method of [<code>FaceSelection</code>](#FaceSelection)  
<a name="FaceSelection+subdivide"></a>

### faceSelection.subdivide()
Subdivides all faces made up by this selection

**Kind**: instance method of [<code>FaceSelection</code>](#FaceSelection)  
<a name="FaceSelection+flipFaces"></a>

### faceSelection.flipFaces()
Flips (flips face normals and winding direction) all faces made up by this selection.

**Kind**: instance method of [<code>FaceSelection</code>](#FaceSelection)  
<a name="FaceSelection+weld"></a>

### faceSelection.weld()
Welds this selection's vertices

**Kind**: instance method of [<code>FaceSelection</code>](#FaceSelection)  
<a name="FaceSelection+selectConnected"></a>

### faceSelection.selectConnected()
Expands the current selection by selecting all edge-connected vertices.

**Kind**: instance method of [<code>FaceSelection</code>](#FaceSelection)  
<a name="FaceSelection+selectRing"></a>

### faceSelection.selectRing()
Expands the current selection by selecting the subtended edge ring.

**Kind**: instance method of [<code>FaceSelection</code>](#FaceSelection)  
<a name="FaceSelection+splitQuads"></a>

### faceSelection.splitQuads()
Splits (quad to triangle) all quads made up by this selection

**Kind**: instance method of [<code>FaceSelection</code>](#FaceSelection)  
<a name="FaceSelection+mergeDoubles"></a>

### faceSelection.mergeDoubles()
Merges duplicate vertices within this selection.

**Kind**: instance method of [<code>FaceSelection</code>](#FaceSelection)  
<a name="FaceSelection+extrude"></a>

### faceSelection.extrude(direction, cap)
Extrude the faces made up by this selection.

**Kind**: instance method of [<code>FaceSelection</code>](#FaceSelection)  

| Param | Type | Description |
| --- | --- | --- |
| direction | [<code>Point3D</code>](#Point3D) | The extrusion vector. |
| cap | <code>boolean</code> | Whether or not to cap-off the extrusion (with new faces) |

<a name="ModelGenerator"></a>

## ModelGenerator
A convenient ModelGenerator class

**Kind**: global class  

* [ModelGenerator](#ModelGenerator)
    * [.genSphere(radius, slices, stacks)](#ModelGenerator+genSphere) ⇒ [<code>Model</code>](#Model)
    * [.genTorus(radius1, radius2, rings, segments)](#ModelGenerator+genTorus) ⇒ [<code>Model</code>](#Model)
    * [.genPlane(wt, ln)](#ModelGenerator+genPlane) ⇒ [<code>Model</code>](#Model)
    * [.genCube(size)](#ModelGenerator+genCube) ⇒ [<code>Model</code>](#Model)

<a name="ModelGenerator+genSphere"></a>

### modelGenerator.genSphere(radius, slices, stacks) ⇒ [<code>Model</code>](#Model)
Generates a UV-sphere and adds it to the scene.

**Kind**: instance method of [<code>ModelGenerator</code>](#ModelGenerator)  
**Returns**: [<code>Model</code>](#Model) - - The newly generated model  

| Param | Type | Description |
| --- | --- | --- |
| radius | <code>number</code> | The sphere radius |
| slices | <code>integer</code> | The number of U-subdivisions |
| stacks | <code>integer</code> | The number of V-subdivisions |

<a name="ModelGenerator+genTorus"></a>

### modelGenerator.genTorus(radius1, radius2, rings, segments) ⇒ [<code>Model</code>](#Model)
Generates a torus and adds it to the scene.

**Kind**: instance method of [<code>ModelGenerator</code>](#ModelGenerator)  
**Returns**: [<code>Model</code>](#Model) - - The newly generated model  

| Param | Type | Description |
| --- | --- | --- |
| radius1 | <code>number</code> | The first radius |
| radius2 | <code>number</code> | The second radius |
| rings | <code>integer</code> | The number of ring subdivisions |
| segments | <code>integer</code> | The number of segment subdivisions |

<a name="ModelGenerator+genPlane"></a>

### modelGenerator.genPlane(wt, ln) ⇒ [<code>Model</code>](#Model)
Generates a XZ plane and adds it to the scene.

**Kind**: instance method of [<code>ModelGenerator</code>](#ModelGenerator)  
**Returns**: [<code>Model</code>](#Model) - - The newly generated model  

| Param | Type | Description |
| --- | --- | --- |
| wt | <code>number</code> | The plane width |
| ln | <code>number</code> | The plane length |

<a name="ModelGenerator+genCube"></a>

### modelGenerator.genCube(size) ⇒ [<code>Model</code>](#Model)
Generates a flat-shaded cube and adds it to the scene.

**Kind**: instance method of [<code>ModelGenerator</code>](#ModelGenerator)  
**Returns**: [<code>Model</code>](#Model) - - The newly generated model  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>number</code> | The cube size. |

<a name="Quat"></a>

## Quat
A utility class for generating Quaternion values

**Kind**: global class  

* [Quat](#Quat)
    * [.fromAxisAngle(angleDegrees, x, y, z)](#Quat.fromAxisAngle) ⇒ <code>Array.&lt;number&gt;</code>
    * [.apply(q, v)](#Quat.apply)

<a name="Quat.fromAxisAngle"></a>

### Quat.fromAxisAngle(angleDegrees, x, y, z) ⇒ <code>Array.&lt;number&gt;</code>
Generates a rotation quaternion from axis-angle.

**Kind**: static method of [<code>Quat</code>](#Quat)  
**Returns**: <code>Array.&lt;number&gt;</code> - - The 4-tuple quaternion array value.  

| Param | Type | Description |
| --- | --- | --- |
| angleDegrees | <code>number</code> | The rotation angle in degrees. |
| x | <code>number</code> | Rotation Axis X |
| y | <code>number</code> | Rotation Axis Y |
| z | <code>number</code> | Rotation Axis Z |

<a name="Quat.apply"></a>

### Quat.apply(q, v)
Applies a quaternion's rotation transform to a position.

**Kind**: static method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| q | <code>Array.&lt;number&gt;</code> | Quaternion value representing a rotation. |
| v | [<code>Vec3</code>](#Vec3) | the position. |

<a name="Vec3"></a>

## Vec3
A utility class representing a 3D Vector value

**Kind**: global class  

* [Vec3](#Vec3)
    * [new Vec3(x, [y], [z])](#new_Vec3_new)
    * _instance_
        * [.equals(rhs)](#Vec3+equals)
        * [.length()](#Vec3+length) ⇒ <code>number</code>
        * [.dot(rhs)](#Vec3+dot) ⇒ <code>number</code>
        * [.cross(rhs)](#Vec3+cross) ⇒ [<code>Vec3</code>](#Vec3)
        * [.add(vec)](#Vec3+add)
        * [.added(vec)](#Vec3+added) ⇒ [<code>Vec3</code>](#Vec3)
        * [.subract(vec)](#Vec3+subract)
        * [.subtracted(vec)](#Vec3+subtracted) ⇒ [<code>Vec3</code>](#Vec3)
        * [.scalarMultiply(sc)](#Vec3+scalarMultiply)
        * [.scalarMultiplied(sc)](#Vec3+scalarMultiplied) ⇒ [<code>Vec3</code>](#Vec3)
        * [.negate()](#Vec3+negate)
        * [.negated()](#Vec3+negated) ⇒ [<code>Vec3</code>](#Vec3)
        * [.normalize()](#Vec3+normalize)
        * [.normalized()](#Vec3+normalized) ⇒ [<code>Vec3</code>](#Vec3)
    * _static_
        * [.array(va)](#Vec3.array) ⇒ [<code>Array.&lt;Vec3&gt;</code>](#Vec3)
        * [.float32Array(v3a)](#Vec3.float32Array) ⇒ <code>Float32Array</code>

<a name="new_Vec3_new"></a>

### new Vec3(x, [y], [z])
Creates a Vec3 from XYZ values


| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> \| [<code>Point3D</code>](#Point3D) | x-value or any point object with x,y,z values |
| [y] | <code>number</code> | y-value |
| [z] | <code>number</code> | y-value |

<a name="Vec3+equals"></a>

### vec3.equals(rhs)
Equality comparison

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type |
| --- | --- |
| rhs | [<code>Vec3</code>](#Vec3) | 

<a name="Vec3+length"></a>

### vec3.length() ⇒ <code>number</code>
**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>number</code> - This vector's geometric length  
<a name="Vec3+dot"></a>

### vec3.dot(rhs) ⇒ <code>number</code>
**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>number</code> - The vector dot product  

| Param | Type |
| --- | --- |
| rhs | [<code>Vec3</code>](#Vec3) | 

<a name="Vec3+cross"></a>

### vec3.cross(rhs) ⇒ [<code>Vec3</code>](#Vec3)
**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - The vector cross product  

| Param | Type |
| --- | --- |
| rhs | [<code>Vec3</code>](#Vec3) | 

<a name="Vec3+add"></a>

### vec3.add(vec)
Perform vector addition (+=)

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type |
| --- | --- |
| vec | [<code>Vec3</code>](#Vec3) | 

<a name="Vec3+added"></a>

### vec3.added(vec) ⇒ [<code>Vec3</code>](#Vec3)
Perform vector addition (+)

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type |
| --- | --- |
| vec | [<code>Vec3</code>](#Vec3) | 

<a name="Vec3+subract"></a>

### vec3.subract(vec)
Perform vector subtraction (-=)

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type |
| --- | --- |
| vec | [<code>Vec3</code>](#Vec3) | 

<a name="Vec3+subtracted"></a>

### vec3.subtracted(vec) ⇒ [<code>Vec3</code>](#Vec3)
Perform vector subtraction (-)

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type |
| --- | --- |
| vec | [<code>Vec3</code>](#Vec3) | 

<a name="Vec3+scalarMultiply"></a>

### vec3.scalarMultiply(sc)
Perform component-wise multiplication (*=)

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| sc | <code>number</code> | A scalar |

<a name="Vec3+scalarMultiplied"></a>

### vec3.scalarMultiplied(sc) ⇒ [<code>Vec3</code>](#Vec3)
Perform component-wise multiplication (*)

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| sc | <code>number</code> | A scalar |

<a name="Vec3+negate"></a>

### vec3.negate()
Negates this vector

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
<a name="Vec3+negated"></a>

### vec3.negated() ⇒ [<code>Vec3</code>](#Vec3)
Negates this vector

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
<a name="Vec3+normalize"></a>

### vec3.normalize()
Normalizes this vector

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
<a name="Vec3+normalized"></a>

### vec3.normalized() ⇒ [<code>Vec3</code>](#Vec3)
Normalizes this vector

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
<a name="Vec3.array"></a>

### Vec3.array(va) ⇒ [<code>Array.&lt;Vec3&gt;</code>](#Vec3)
Converts low-level vertex array type to convenient Vec3 array

**Kind**: static method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| va | <code>Float32Array</code> | A vertex array (tightly packed sets of XYZ float values) |

<a name="Vec3.float32Array"></a>

### Vec3.float32Array(v3a) ⇒ <code>Float32Array</code>
Converts convenient Vec3 array to optimized low-level vertex array

**Kind**: static method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| v3a | [<code>Array.&lt;Vec3&gt;</code>](#Vec3) | The array of Vec3's to convert |

<a name="Triangle"></a>

## Triangle
A utility class representing a Triangle face

**Kind**: global class  

* [Triangle](#Triangle)
    * [new Triangle(a, b, c)](#new_Triangle_new)
    * _instance_
        * [.equals(rhs)](#Triangle+equals)
        * [.reversed()](#Triangle+reversed) ⇒ [<code>Triangle</code>](#Triangle)
    * _static_
        * [.array(ia)](#Triangle.array) ⇒ [<code>Array.&lt;Triangle&gt;</code>](#Triangle)
        * [.uint32Array(i3a)](#Triangle.uint32Array) ⇒ <code>Uint32Array</code>

<a name="new_Triangle_new"></a>

### new Triangle(a, b, c)
Creates a Triangle from indices


| Param | Type | Description |
| --- | --- | --- |
| a | <code>integer</code> | First triangle index |
| b | <code>integer</code> | Second triangle index |
| c | <code>integer</code> | Third triangle index |

<a name="Triangle+equals"></a>

### triangle.equals(rhs)
Equality comparison

**Kind**: instance method of [<code>Triangle</code>](#Triangle)  

| Param | Type |
| --- | --- |
| rhs | [<code>Triangle</code>](#Triangle) | 

<a name="Triangle+reversed"></a>

### triangle.reversed() ⇒ [<code>Triangle</code>](#Triangle)
**Kind**: instance method of [<code>Triangle</code>](#Triangle)  
**Returns**: [<code>Triangle</code>](#Triangle) - This triangle with reversed index order.  
<a name="Triangle.array"></a>

### Triangle.array(ia) ⇒ [<code>Array.&lt;Triangle&gt;</code>](#Triangle)
Converts low-level index array type to convenient Triangle array

**Kind**: static method of [<code>Triangle</code>](#Triangle)  

| Param | Type | Description |
| --- | --- | --- |
| ia | <code>Uint32Array</code> | A Triangle array (tightly packed sets of ABC integer values) |

<a name="Triangle.uint32Array"></a>

### Triangle.uint32Array(i3a) ⇒ <code>Uint32Array</code>
Converts convenient Triangle array to optimized low-level index array

**Kind**: static method of [<code>Triangle</code>](#Triangle)  

| Param | Type | Description |
| --- | --- | --- |
| i3a | [<code>Array.&lt;Triangle&gt;</code>](#Triangle) | The array of Triangles to convert |

<a name="Quad"></a>

## Quad
A utility class representing a Quad face

**Kind**: global class  

* [Quad](#Quad)
    * [new Quad(a, b, c, d)](#new_Quad_new)
    * _instance_
        * [.equals(rhs)](#Quad+equals)
        * [.reversed()](#Quad+reversed) ⇒ [<code>Quad</code>](#Quad)
    * _static_
        * [.array(ia)](#Quad.array) ⇒ [<code>Array.&lt;Quad&gt;</code>](#Quad)
        * [.uint32Array(i4a)](#Quad.uint32Array) ⇒ <code>Uint32Array</code>

<a name="new_Quad_new"></a>

### new Quad(a, b, c, d)
Creates a Quad from indices


| Param | Type | Description |
| --- | --- | --- |
| a | <code>integer</code> | First quad index |
| b | <code>integer</code> | Second quad index |
| c | <code>integer</code> | Third quad index |
| d | <code>integer</code> | Fourth quad index |

<a name="Quad+equals"></a>

### quad.equals(rhs)
Equality comparison

**Kind**: instance method of [<code>Quad</code>](#Quad)  

| Param | Type |
| --- | --- |
| rhs | [<code>Quad</code>](#Quad) | 

<a name="Quad+reversed"></a>

### quad.reversed() ⇒ [<code>Quad</code>](#Quad)
**Kind**: instance method of [<code>Quad</code>](#Quad)  
**Returns**: [<code>Quad</code>](#Quad) - This quad with reversed index order.  
<a name="Quad.array"></a>

### Quad.array(ia) ⇒ [<code>Array.&lt;Quad&gt;</code>](#Quad)
Converts low-level index array type to convenient Triangle array

**Kind**: static method of [<code>Quad</code>](#Quad)  

| Param | Type | Description |
| --- | --- | --- |
| ia | <code>Uint32Array</code> | A Quad array (tightly packed sets of ABCD integer values) |

<a name="Quad.uint32Array"></a>

### Quad.uint32Array(i4a) ⇒ <code>Uint32Array</code>
Converts convenient Quad array to optimized low-level index array

**Kind**: static method of [<code>Quad</code>](#Quad)  

| Param | Type | Description |
| --- | --- | --- |
| i4a | [<code>Array.&lt;Quad&gt;</code>](#Quad) | The array of Quads to convert |

<a name="Point3D"></a>

## Point3D : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | X position |
| y | <code>number</code> | Y position |
| z | <code>number</code> | Z position |

<a name="InputDialogCallback"></a>

## InputDialogCallback : <code>function</code>
The inputDialog callback function

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| [values] | <code>Object</code> | The parameter values modified by the user. |

<a name="DialogParam"></a>

## DialogParam : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The parameter name |
| type | <code>string</code> | The parameter type (one of `string`, `decimal`, `integer`, or `bool`) |
| [min] | <code>number</code> | The min value for the slider range affecting numeric param types. |
| [max] | <code>number</code> | The max value for the slider range affecting numeric param types. |
| value | <code>string</code> \| <code>number</code> \| <code>boolean</code> | The parameter name |

<a name="DialogOptions"></a>

## DialogOptions : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [title] | <code>string</code> | The dialog title |
| params | [<code>Array.&lt;DialogParam&gt;</code>](#DialogParam) | The dialog parameters |

<a name="ModelEditFinishCallback"></a>

## ModelEditFinishCallback : <code>function</code>
The finish function used by Model.edit()

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| newVerts | <code>Float32Array</code> | The new vertices (can be constructed via Vec3.float32Array() utility method) |
| newNorms | <code>Float32Array</code> | The new normals (can be constructed via Vec3.float32Array() utility method) |
| newTexcoords | <code>Float32Array</code> | The new texture coordinates (can be constructed via Vec2.float32Array() utility method) |
| newTriangles | <code>Uint32Array</code> | The new triangle indices (can be constructed via Triangle.uint32Array() utility method) |
| newQuads | <code>Uint32Array</code> | The new quad indices (can be constructed via Quad.uint32Array() utility method) |

<a name="ModelEditFunction"></a>

## ModelEditFunction : <code>function</code>
The editor function used by Model.edit()

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| m | [<code>Model</code>](#Model) | The model being edited (this model). |
| finish | [<code>ModelEditFinishCallback</code>](#ModelEditFinishCallback) | The method that must be called at the end of the edit to provide the new model data values. |

