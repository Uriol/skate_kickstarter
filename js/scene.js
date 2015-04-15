
var sceneWidth = window.innerWidth, sceneHeight = window.innerHeight;

var sceneAngle = 45, sceneAspect = sceneWidth/sceneHeight, sceneNear = 1, sceneFar = 1000;

var camera, scene, renderer;

camera = new THREE.PerspectiveCamera( sceneAngle, sceneAspect, sceneNear, sceneFar);
scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer();


var sceneBackgroundColor = new THREE.Color('rgb(20,20,20)');
camera.position.z = 300;

renderer.setClearColor( sceneBackgroundColor );
renderer.setSize( sceneAspect );

$('skateVisuals').append(renderer.domElement);