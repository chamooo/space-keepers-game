startBtn = document.querySelector('#start-btn');
startScreen = document.querySelector('.start');
mainScreen = document.querySelector('.main');
endScreen = document.querySelector('.finish');
player = null;
numScores = 0;
mainAudio = document.createElement('audio');
mainAudio.src = 'audio/main.mp3';
statusGame = 'open';

bossFight = document.createElement('audio');
bossFight.src = 'audio/fight.mp3';

function getRand(min, max) {
    return Math.random() * (max - min) + min;
}
player = document.querySelector('.player');


soundBtn = document.querySelector(".sound");
isSound = false; //flag for checking
soundBtn.onclick = function() {
    if(isSound == true) {
        mainAudio.play(); //audio start 
        mainAudio.volume = 1;
        isSound = false;
        soundBtn.style.color = "white";

    }
    else {
        isSound = true;
        mainAudio.volume = 0; //mute audio
        soundBtn.style.color = "gray";
    }
}


function createScore() {
    score = document.createElement('div');
    score.className = 'score';
    score.innerText = 'SCORE:' + numScores;
    mainScreen.appendChild(score);
    gameBlock = document.querySelector('._block');
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


function createAsteroid() {
    let asteroid = document.createElement("div");
    asteroid.className = "enemy-1";

    asteroid.style.left = getRand(gameBlock.clientWidth, mainScreen.clientWidth - 65) + "px";
    if (statusGame !== 'finish') {
        mainScreen.appendChild(asteroid);
        moveAsteroid(asteroid);
    }

}

function moveAsteroid(asteroid) {
    let timerID = setInterval(function () {
        asteroid.style.top = asteroid.offsetTop + 5 + "px";
        console.dir(asteroid.offsetTop);
        if (asteroid.offsetTop > mainScreen.clientHeight) {
            asteroid.remove();
            createAsteroid();

            //interval clearing
            clearInterval(timerID);
        }
    }, 20);
}

function createBullet() {
    let bullet = document.createElement("div");
        bullet.className = "bullet";  
    mainScreen.appendChild(bullet);
    bullet.style.left = player.offsetLeft + 49 + "px";
    bullet.style.top = player.offsetTop - 24 + "px";
    moveBullet(bullet);
}

function moveBullet(bullet) {
    let timerID = setInterval(function() {
    bullet.style.top = bullet.offsetTop - 10 + "px";
        if(bullet.offsetTop < 0) {
            //interval clearing
            bullet.remove();
            clfearInterval(timerID);

        }   
        isBoom(bullet);
    }, 10)
        if (statusGame !== 'finish') {
            collision(asteroid);
        }
    }, 15);

}

function createUFO() {
    ufo = document.createElement('div');
    ufo.className = 'boss';
    ufo.style.left = getRand(0, 380) + 'px';
    mainScreen.appendChild(ufo);           
}
function createBoom(top, left) {
    let boom = document.createElement("div");
        boom.className = "boom";
        boom.style.top = top - 10 + "px";
        boom.style.left = left - 30 + "px";
    mainScreen.appendChild(boom); 

    setTimeout(function() {
        boom.remove();
    }, 500);

}

function isBoom(bullet) {
    let enemy = document.querySelector(".enemy-1");
    if (enemy.offsetLeft + enemy.offsetWidth >= bullet.offsetLeft && enemy.offsetLeft <= bullet.offsetLeft + bullet.offsetWidth) {
        if (enemy.offsetTop >= bullet.offsetTop - bullet.offsetHeight && enemy.offsetTop <= bullet.offsetTop) { 
            bullet.remove();
            createBoom(enemy.offsetTop, enemy.offsetLeft);
            enemy.remove();
            createAsteroid();
            // score.innerText = Number(score.innerText) + 10;
            // addScores();
        }
    }   
}

function gameEnd(health) {
    if (health <= 0) {
        statusGame = 'finish';
        mainScreen.style.display = 'none';
        deleteObj();
        mainAudio.pause();
        endScreen.style.display = 'block';
    }

}

function deleteObj() {
    asteroid.remove();
    player.remove();
    score.remove();
    indicator.remove();
}