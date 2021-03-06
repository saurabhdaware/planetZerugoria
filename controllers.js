fakeKeydown = function(key){
    if(typeof touchinterval !== 'undefined'){
        clearInterval(touchinterval);
    }
    moveleft_keydown = false;
    moveright_keydown = false;
    moveup_keydown = false;
    movedown_keydown = false;
    touchinterval = setInterval(()=>{
        var e = new Event("keydown");
        e.key=key;    // just enter the char you want to send 
        e.keyCode=e.key.charCodeAt(0);
        e.which=e.keyCode;
        e.altKey=false;
        e.ctrlKey=true;
        e.shiftKey=false;
        e.metaKey=false;
        e.bubbles=true;
        document.getElementById('bodyy').dispatchEvent(e);
        if(touchend == true){
            clearInterval(touchinterval);
        }
    },30)

}

movement_keydown = function(event){

    if(event.key == "ArrowLeft"){
        moveleft_keydown = true;
    }
    if(event.key == "ArrowRight"){
        moveright_keydown = true;
    }
    if(event.key == "ArrowUp"){
        moveup_keydown = true;
    }
    if(event.key == "ArrowDown"){
        movedown_keydown = true;
    }
    if(event.key == "0"){
        let shooter = new Shooter();
        shooter.shoot();
    }
    updateMovement();
}

movement_keyup = function(event){
    if(event.key == "ArrowLeft"){
        moveleft_keydown = false;
    }
    if(event.key == "ArrowRight"){
        moveright_keydown = false;
    }
    if(event.key == "ArrowUp"){
        moveup_keydown = false;
    }
    if(event.key == "ArrowDown"){
        movedown_keydown = false;
    }
    updateMovement();
}

updateMovement = function(){
    if(moveleft_keydown == true || mySpaceship.rotation.x < 0){
        if(mySpaceship.rotation.x > -90*Math.PI/180){
            mySpaceship.rotation.x -= 2*Math.PI/180;
        }
    }

    if(moveright_keydown == true || mySpaceship.rotation.x > 0){
        if(mySpaceship.rotation.x < 90*Math.PI/180 ){
            mySpaceship.rotation.x +=2*Math.PI/180;
        }
    }

    
    if(moveup_keydown == true){
        if(mySpaceship.rotation.z < 40*Math.PI/180 ){
            mySpaceship.rotation.z +=2*Math.PI/180;
        }
    }
        
    if(movedown_keydown == true){
        if(mySpaceship.rotation.z > -40*Math.PI/180 ){
            mySpaceship.rotation.z -=2*Math.PI/180;
        }
    }



}

class MainController{
    constructor(){
        this.utils = new Utils();
    }

    moveLeft(){
        if(mySpaceship.rotation.x < 0*Math.PI/180 ){ //Left
            if(moveleft_keydown == false){
                mySpaceship.rotation.x +=2*Math.PI/180;
            }
            mySpaceship.position.z -= -3*(mySpaceship.rotation.x*180/Math.PI)/50 ;
            camera.position.z -= -3*(mySpaceship.rotation.x*180/Math.PI)/50;
        }
    }


    moveRight(){
        if(mySpaceship.rotation.x > 0*Math.PI/180){ //Right
            if(moveright_keydown == false){
                mySpaceship.rotation.x -=2*Math.PI/180;
            }
            mySpaceship.position.z += 3*(mySpaceship.rotation.x*180/Math.PI)/50;
            camera.position.z += 3*(mySpaceship.rotation.x*180/Math.PI)/50;
        }
    }

    moveUp(){
        if(mySpaceship.rotation.z > 0*Math.PI/180){// Up
            if(moveup_keydown == false){
                mySpaceship.rotation.z -=2*Math.PI/180;
            }
            mySpaceship.position.y +=3*(mySpaceship.rotation.z*180/Math.PI)/50;
            camera.position.y +=3*(mySpaceship.rotation.z*180/Math.PI)/50;
        }
        if(mySpaceship.position.y > 700){
            this.utils.showMessage("Alarm Beeps: High atmospheric pressure go Down!",'#aa0000')
            if(mySpaceship.position.y > 1200){
                window.location.href ="http://www.saurabhdaware.cf";
            }
        }
    }

    moveDown(){
        if(mySpaceship.rotation.z < 0*Math.PI/180){// Down
            if(movedown_keydown == false){
                mySpaceship.rotation.z +=2*Math.PI/180;
            }
            mySpaceship.position.y -=-3*(mySpaceship.rotation.z*180/Math.PI)/50;
            camera.position.y -=-3*(mySpaceship.rotation.z*180/Math.PI)/50;
        }
    }

    boostersControl(models){
        if(movedown_keydown && ((moveright_keydown && moveleft_keydown) || (moveright_keydown || moveleft_keydown))){
            models.shootL.visible = false;
            models.shootR.visible = false;
            models.detonationL.visible = false;
            models.detonationR.visible = false;
        }else{
            models.shootL.visible = true;
            models.shootR.visible = true;
            models.detonationL.visible = true;
            models.detonationR.visible = true;
        }
    }

    // shootForward(){
    //     if(shoot)
    // }
}