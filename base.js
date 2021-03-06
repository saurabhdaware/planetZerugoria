var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 7000);
var mySpaceship;
let moveleft_keydown = false;
let moveright_keydown = false;
let moveup_keydown = false;
let movedown_keydown = false;
let touchend = false;
let indx = 0;
let body = document.getElementById('bodyy');

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

THREEx.WindowResize(renderer, camera);

// var controls = new THREE.OrbitControls( camera,renderer.domElement );
camera.position.set( -0.17, 0.05, 0 );
camera.rotation.y = -90*Math.PI/180;


let environment = new Environment(1);
let models = new Models();
let shooter = new Shooter();
let mainController = new MainController();
models.loadShuttle(1);

var loadingManager = new THREE.LoadingManager( function() {
    scene.add( mySpaceship );
} );

var loader	= new THREE.ColladaLoader(loadingManager);
var gltfLoad = new THREE.GLTFLoader(loadingManager);
models.loadMyShuttle(loader,1);


body.addEventListener('keydown',function(event){
    movement_keydown(event);
    mainController.boostersControl(models);
});

body.addEventListener('keyup',function(event){
    movement_keyup(event)
    mainController.boostersControl(models);
});

var animate = function () {
    if(mySpaceship !== undefined){
        mySpaceship.position.x +=3;
        camera.position.x +=3;
        if(mySpaceship.position.x %3 ==0){
            indx++;
            environment.cloudsHolderMesh.children[indx].position.x = mySpaceship.position.x + 8000;
            if(indx >= 7990){
                indx = 0;
            }
        }


        mainController.moveUp();
        mainController.moveDown();
        mainController.moveLeft();
        mainController.moveRight();
 
    }
    requestAnimationFrame(animate);


    // controls.update();
    renderer.render(scene, camera);
};
// renderer.render(scene, camera);
animate();