//variables
startBtn = document.querySelector('#start-btn');
againBtn = document.querySelector('.again-btn');
startScreen = document.querySelector('.start');
mainScreen = document.querySelector('.main');
endScreen = document.querySelector('.finish');
numScores = 0;
player = document.querySelector('.player');
bossFight = document.createElement('audio');
bossFight.src = 'audio/fight.mp3';
mainAudio = document.createElement('audio');
mainAudio.src = 'audio/main.mp3';
soundBtn = document.querySelector(".sound");
statusGame = 'open';
isSound = false; //flag for checking
shotCount = 0;

function getRand(min, max) {
    return Math.random() * (max - min) + min;
}

function createScore() {
    score = document.createElement('div');
    score.className = 'score';
    score.innerText = 'SCORE: ' + numScores;
    mainScreen.appendChild(score);
    gameBlock = document.querySelector('._block');
    if (numScores == 30) {
            bossLevel();
        }
}

function createHealth() {
    indicator = document.createElement('div');
    indicator.className = 'health-indicator';
    healthBar = document.createElement('div');
    healthBar.className = 'health-bar';
    indicator.appendChild(healthBar);
    mainScreen.appendChild(indicator);
}

function createBossHealth() {
    bossHealth = document.createElement('div');
    bossHealth.className = 'boss-health';
    bossBar = document.createElement('div');
    bossBar.className = 'boss-health-bar';
    bossHealth.appendChild(bossBar);
    mainScreen.appendChild(bossHealth);
}

function createPlayer() {
    player = document.createElement("div");
    player.className = "player";
    mainScreen.appendChild(player);
}


function createAsteroid() {
    let asteroid = document.createElement("div");
    asteroid.className = "enemy-1";
    asteroid.style.left = getRand(gameBlock.clientWidth, mainScreen.clientWidth - 65) + "px";

    if (statusGame !== 'finish') {
        mainScreen.appendChild(asteroid);
        moveAsteroid(asteroid, 15);
    }
}

function createAsteroidBig() {
    let asteroidBig = document.createElement("div");
    asteroidBig.className = "enemy-2";
    asteroidBig.style.left = getRand(gameBlock.clientWidth, mainScreen.clientWidth - 110) + "px";

    if (statusGame !== 'finish') {
        mainScreen.appendChild(asteroidBig);
        moveAsteroid(asteroidBig, 20);
    }
}

function moveAsteroid(asteroid, speed) {
    let timerID = setInterval(function () {
        asteroid.style.top = asteroid.offsetTop + 5 + "px";

        //console.dir(asteroid.offsetTop);
        if (asteroid.offsetTop > mainScreen.clientHeight) {
            asteroid.remove();
            //interval clearing
            clearInterval(timerID);
        }

        if (statusGame !== 'finish') {
            if (asteroid.className == "enemy-1") {
                collision(asteroid, 20);
            } else if (asteroid.className == "enemy-2") {
                collision(asteroid, 50);
            }
        }
    }, speed);
}

function createHeart() {
    heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = getRand(gameBlock.clientWidth, mainScreen.clientWidth - 35) + "px";
    mainScreen.appendChild(heart);
    moveHeart();
}

function moveHeart() {
    let timerID = setInterval(function () {
        heart.style.top = heart.offsetTop + 5 + "px";
        //console.dir(asteroid.offsetTop);
        if (heart.offsetTop > mainScreen.clientHeight) {
            heart.remove();
            clearInterval(timerID);
        }

        if (statusGame !== 'finish') {
            if (heart.offsetLeft + heart.offsetWidth >= player.offsetLeft && heart.offsetLeft <= player.offsetLeft + player.offsetWidth) {
                if (heart.offsetTop >= player.offsetTop - player.offsetHeight + 50 && heart.offsetTop <= player.offsetTop) {
                    if (parseInt(healthBar.style.width) < 244) {
                        healthBar.style.width = healthBar.offsetWidth + 20 + 'px';
                    }
                    heart.remove();
                    //interval clearing
                    clearInterval(timerID);
                }
            }
        }
        
    }, 20);
}

function createBullet() {
    bullet = document.createElement("div");
    bullet.className = "bullet";
    mainScreen.appendChild(bullet);
    bullet.style.left = player.offsetLeft + 49 + "px";
    bullet.style.top = player.offsetTop - 24 + "px";
    moveBullet(bullet);
    // playerShot.play();
}

function moveBullet(bullet) {
    let timerID = setInterval(function () {
        bullet.style.top = bullet.offsetTop - 10 + "px";
        if (bullet.offsetTop < 0) {
            //interval clearing
            bullet.remove();
            clearInterval(timerID);
        }
        isBoom(bullet);
        bullToUfo(bullet, ufo);
    }, 15);
}

function createUFO() {
    ufo = document.createElement('div');
    ufo.className = 'boss';
    // ufo.style.left = getRand(0, 380) + 'px';
    ufo.style.left = getRand(5, 330) + 'px';
    mainScreen.appendChild(ufo);
}

function bossLevel() {
    ufo.style.top = 120 + 'px';
    ufo.style.transition = 'top 4.5s';
    mainAudio.pause();
    bossFight.play();
    bossFight.loop = true;
    createBossHealth();
    setTimeout(function () {
        moveBoss = setInterval(function () {   
             if (ufo.offsetLeft <= 200) {
             ufo.style.left = 330 + 'px';
             } else {
             ufo.style.left =  5 + 'px';
             }
             }, 1500);
             ufo.style.transition = 'left 1.5s';
            createBossBull();
        }, 4500);
    }


function createBossBull() {
        bossShoting = setInterval(function () {
            bossBull = document.createElement('div');
            bossBull.className = 'boss-bullet';
            bossBull.style.left = ufo.offsetLeft + 100 + 'px';
            mainScreen.appendChild(bossBull);
            moveBossBull(bossBull);
        }, 1000);
}

function moveBossBull(bull) {
    bossBullMove = setInterval(function () {       
        bull.style.top = bull.offsetTop + 15 + 'px';
        if (bull.offsetTop > mainScreen.clientHeight) {
            bull.remove();
            // clearInterval(bossBullMove);
        }
        bullToPlayer(bull, player)
    }, 20);
}        


function createBoom(top, left, boomType) {   
    let boom = document.createElement("div");
    boom.className = boomType;
    if (boomType == "smallBoom") {
        boom.style.top = top - 10 + "px";
        boom.style.left = left - 30 + "px";
    }
    else if (boomType == "bigBoom") {
        boom.style.top = top - 90 + "px";
        boom.style.left = left - 90 + "px";
    }
    else if (boomType == 'boomAsteroid') {
        boom.style.top = top - 10 + "px";
        boom.style.left = left - 30 + "px";
    }

    mainScreen.appendChild(boom);

    setTimeout(function () {
        boom.remove();
    }, 600);

}

function isBoom(bullet) {
    let enemy = document.querySelectorAll(".enemy-1");
    for (i = 0; i < enemy.length; i++) {
        if (enemy[i] !== null) {
            if (enemy[i].offsetLeft + enemy[i].offsetWidth >= bullet.offsetLeft && enemy[i].offsetLeft <= bullet.offsetLeft + bullet.offsetWidth) {
                if (enemy[i].offsetTop >= bullet.offsetTop - bullet.offsetHeight && enemy[i].offsetTop <= bullet.offsetTop) {
                    bullet.remove();
                    // shot.play();
                    createBoom(enemy[i].offsetTop, enemy[i].offsetLeft);
                    enemy[i].remove();
                    createAsteroid();
                    numScores = numScores + 10;
                    score.remove();
                    createScore();
                }
            }
        }
    }
}

function gameEnd(health) {
    if (health <= 14) {
        statusGame = 'finish';
        mainScreen.style.display = 'none';
        deleteObj();
        mainAudio.pause();
        endScreen.style.display = 'block';

        againBtn.onclick = function () {
            statusGame = 'play';
            endScreen.style.display = 'none';
            createPlayer();
            player.classList.add('levitation');
            createUFO();
            createScore();
            createHealth();
            mainScreen.style.display = "block";
            mainAudio.play();
            mainAudio.loop = true;
            delay = getRand(2000, 3000); //затримка для астероїдів
            longDelay = getRand(3500, 5000);
            setInterval(createAsteroid, delay);
            setInterval(createAsteroidBig, longDelay);
            setInterval(createHeart, 30000);
        }

    }
}

function deleteObj() {
    // document.querySelector('.boss').remove();
    // document.querySelectorAll('.boss-bullet').remove();
    // document.querySelector('.boss-health').remove();
    // document.querySelector('.enemy-1').remove();
    // document.querySelector('.enemy-2').remove();
    // document.querySelectorAll('.boomAsteroid').remove();
    
    player.remove();
    score.remove();
    indicator.remove();
}