import * as BABYLON from 'babylonjs';

export default function createSkyboxMesh(scene:BABYLON.Scene):BABYLON.AbstractMesh{

    const skyboxMesh = BABYLON.Mesh.CreateBox("skyBox", 10000, scene);
    skyboxMesh.applyFog = false;
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(process.env.PUBLIC_URL +"/assets/skyboxes/TropicalSunnyDay/TropicalSunnyDay", scene, ["_ft.jpg", "_up.jpg", "_rt.jpg", "_bk.jpg", "_dn.jpg", "_lf.jpg"]);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    //skyboxMesh.isVisible = false;
    skyboxMesh.infiniteDistance = true;
    skyboxMesh.material = skyboxMaterial;

    scene.registerBeforeRender(()=>{
        skyboxMesh.rotation.y = performance.now()/1000/Math.PI/50;
    });


    return skyboxMesh;
    /**/
}