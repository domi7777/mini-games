'strict'
$(function(){
    var canvas = $("#game canvas")[0];
    var ctx = canvas.getContext('2d');

    $(canvas).on('click', function(){
        if(!started){
            startGame();
        }else{
            hero.jump();
        }
    });

    var AnimatedImage = function(imageSrc, x, y, width, height, speedX, speedY){
        this.image = new Image();
        this.image.src = imageSrc;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speedX = speedX;
        this.speedY = speedY;
        this.base = {};
        $.extend(this.base, this); //copy original values in 'base'

        this.jump = function(){
            if(GameUtils.isOnTheGroud(this, ground)){
                this.speedY = -50;
            }
        }

        this.reset = function(){
            this.x = this.base.x;
            this.y = this.base.y;
            this.width = this.base.width;
            this.height = this.base.height;
            this.speedX = this.base.speedX;
            this.speedY = this.base.speedY;
        }
    }

    var ground = {y: 450, x:0, width: 1000, height: 30, speed: {x: 0, y: 0}}; // invisible

    var hero = new AnimatedImage ("images/choco.png", 100, -160, 140, 140, 0, 0);
    var obstacle = new AnimatedImage ("images/pampa.png", 1000, 250, 100, 100, -25, 0);
    var shapes = [obstacle, hero];
    var obstacles = [obstacle];

    setTimeout(function(){ // really not ideal but I'm lazy
        DrawingUtils.drawShapes(shapes, ctx);
    },2000);

    setTimeout(function(){
        ctx.fillStyle = "red";
        ctx.font = "25px 'Press Start 2P'";
        ctx.fillText("Chocobo VS Pampa", 15, 35);
        ctx.fillText("Click to jump", 45, 70);
        ctx.fillText("> Start <", 75, 105);
    }, 500);


    var applyGravityAndSpeed = function(shape){
        shape.x += shape.speedX;
        if (GameUtils.isOnTheGroud(shape, ground)){
            shape.y = ground.y - shape.height;
            shape.speedY = 0;
        } else {
            shape.y += shape.speedY;
            shape.speedY += window.GRAVITY;
        }
    }
    var lives = window.lifes;
    var score = 0;

    var writeScoreAndLives = function(){
        $('#game .status .lives').html(lives);
        $('#game .status .score').html(score);
    }

    var handleCollisions = function(){
        if(GameUtils.areColliding(hero, obstacle)){
            lives --;
            writeScoreAndLives();
            obstacle.reset();
            hero.reset();
        }
    }

    var handleScore = function(){
        if (obstacle.x < -obstacle.width){
            score += 100;
            writeScoreAndLives();
            obstacle.x = obstacle.base.x * obstacle.speedX / obstacle.base.speedX;
            if(score % 300 === 0){
                obstacle.speedX -= 1;
            }
            if(score % 500 === 0){
                obstacle.width *= 1.2;
                obstacle.height *= 1.2;
            }
            if(score % 5000 === 0){
                lives ++;
                writeScoreAndLives();
            }
        }
    }

    var runGame = function(){
        ctx.clearRect(0, 0, window.canvasSize, window.canvasSize);
        DrawingUtils.drawShapes(shapes, ctx);

        applyGravityAndSpeed(hero);
        applyGravityAndSpeed(obstacle);

        handleCollisions();
        handleScore();

        if(lives <= 0){
            gameOver();
        }
    }

    var gameOver = function(){
        ctx.clearRect(0, 0, window.canvasSize, window.canvasSize);
        stopGame();
        ctx.fillStyle = "white";
        ctx.font = "15px 'Press Start 2P'";
        ctx.fillText("Game over!", 15, 35);
        ctx.fillText("Click to try again", 15, 70);
    }

    var started = false;
    var interval;
    var startGame = function (){
        lives = window.lifes;
        score = 0;
        writeScoreAndLives();

        if(!started){
            interval = setInterval(runGame, 1000/30);
            started = true;
        }
    }

    var stopGame = function (){
        clearInterval(interval);
        started = false;
    }

});
