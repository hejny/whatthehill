import * as BABYLON from 'babylonjs';
import Player from '../Player';

export default function createLights(
    scene: BABYLON.Scene,
    player: Player
): BABYLON.Light[] {


    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogColor = BABYLON.Color3.FromHexString('#dffbff');
    scene.fogDensity = 0.005;/**/

    const light1 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(1, -2, 1), scene);
    light1.position = new BABYLON.Vector3(20, 3, 20);
    //light1.color = BABYLON.Color3.FromHexString('#ffd513');
    light1.intensity = 0.2;


    const light2 = new BABYLON.PointLight("dir01", player.mesh.position, scene);
    //light1.color = BABYLON.Color3.FromHexString('#ffd513');
    light2.intensity = 0.8;


    return [light1, light2]
}