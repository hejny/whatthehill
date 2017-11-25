import * as BABYLON from 'babylonjs';

export default function createCamera(scene:BABYLON.Scene):BABYLON.FreeCamera{
    const camera = new BABYLON.FreeCamera("FreeCamera", BABYLON.Vector3.Zero(),  scene);
    camera.fov = 1.3;
    camera.inertia = 0;
    //console.log(camera.angularSensibility );
    camera.angularSensibility  = -500;
    camera.fov = 1.2;
    return camera;
}