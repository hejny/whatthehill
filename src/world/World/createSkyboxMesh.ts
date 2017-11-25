import * as BABYLON from 'babylonjs';

export default function createSkyboxMesh(scene:BABYLON.Scene):BABYLON.AbstractMesh{

    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogColor = BABYLON.Color3.FromHexString('#c8e7ff');
    scene.fogDensity = 0.01;


    const skyboxMesh = BABYLON.Mesh.CreateBox("skyBox", 1000, scene);
    skyboxMesh.applyFog = false;
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(process.env.PUBLIC_URL +"/assets/skyboxes/TropicalSunnyDay/TropicalSunnyDay", scene, ["_ft.jpg", "_up.jpg", "_rt.jpg", "_bk.jpg", "_dn.jpg", "_lf.jpg"]);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skyboxMesh.material = skyboxMaterial;
    return skyboxMesh;
}