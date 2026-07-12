import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
let scene, currentGroup;

let currentLightIntensity = 1.0;
let currentBgColor = "#dfdfdf";

const createScene = () => {
    const s = new BABYLON.Scene(engine);

    s.clearColor = BABYLON.Color3.FromHexString(currentBgColor);
    
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 5, BABYLON.Vector3.Zero(), s);
    camera.attachControl(canvas, true);
    
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), s);
    light.intensity = currentLightIntensity;
    
    s.createDefaultEnvironment({ createGround: true, createSkybox: false });

    document.getElementById("bgColor").value = currentBgColor;
    document.getElementById("lightIntensity").value = parseFloat(currentLightIntensity);
    return s;
};

scene = createScene();

// File Handling & Dynamic Loading
document.getElementById('fileInput').addEventListener('change', (evt) => {
    if (evt.target.files.length === 0) return;

    const meshesToClear = [...scene.meshes];
    meshesToClear.forEach(mesh => mesh.dispose());
    
    if (scene.animationGroups) {
        scene.animationGroups.forEach(group => group.dispose());
    }
    
    const file = evt.target.files[0];
    const blobUrl = URL.createObjectURL(file);

    BABYLON.SceneLoader.Append("", blobUrl, scene, (loadedScene) => {
        const currentLightIntensity = parseFloat(document.getElementById("lightIntensity").value);
        const currentBgColor = document.getElementById("bgColor").value;

        loadedScene.clearColor = BABYLON.Color3.FromHexString(currentBgColor);
        loadedScene.lights.forEach(l => l.intensity = currentLightIntensity);
        loadedScene.createDefaultCameraOrLight(true, true, true);
        loadedScene.activeCamera.attachControl(canvas, true);
        URL.revokeObjectURL(blobUrl);

        setupAnimationControls(loadedScene);
    }, null, null, ".glb");
});

// Animation Extraction Logic
function setupAnimationControls(loadedScene) {
    const animPanel = document.getElementById("animPanel");
    const animSelect = document.getElementById("animSelect");
    animSelect.innerHTML = ""; // reset

    if (loadedScene.animationGroups && loadedScene.animationGroups.length > 0) {
        animPanel.style.display = "block";
        
        loadedScene.animationGroups.forEach((group, index) => {
            const opt = document.createElement("option");
            opt.value = index;
            opt.textContent = group.name || `Animation ${index + 1}`;
            animSelect.appendChild(opt);
        });
        
        currentGroup = loadedScene.animationGroups[0];
        currentGroup.play(true);
    } else {
        animPanel.style.display = "none";
    }
}

// UI Control Adjustments 
document.getElementById("animSelect").addEventListener("change", (e) => {
    if (currentGroup) currentGroup.stop();
    currentGroup = scene.animationGroups[e.target.value];
    currentGroup.play(true);
});
document.getElementById("btnPlay").addEventListener("click", () => currentGroup?.play(true));
document.getElementById("btnPause").addEventListener("click", () => currentGroup?.pause());

document.getElementById("lightIntensity").addEventListener("input", (e) => {
    scene.lights.forEach(l => l.intensity = parseFloat(e.target.value));
});
document.getElementById("bgColor").addEventListener("input", (e) => {
    scene.clearColor = BABYLON.Color3.FromHexString(e.target.value);
});

// Official Deep Inspector Toggle Setup
document.getElementById("btnInspector").addEventListener("click", () => {
    if (scene.debugLayer.isVisible()) {
        scene.debugLayer.hide();
    } else {
        scene.debugLayer.show({ overlay: true, handleResize: true });
    }
});

// CRITICAL: "H" Key UI Visibility Toggle
window.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "h") {
        const panels = document.querySelectorAll(".ui-panel, #hint");
        panels.forEach(panel => panel.classList.toggle("hidden"));
    }
});

// Render runtime configuration Loop
engine.runRenderLoop(() => scene.render());
window.addEventListener("resize", () => engine.resize());
