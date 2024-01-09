Howler.volume(0.1);
const audio = {
    backgroundMusic: new Howl({
        src: './audio/background-music.mp3',
        loop: true
    }),
    enemyHit: new Howl({
        src: './audio/enemy_hit.mp3'
    }),
    enemyShoot: new Howl({
        src: './audio/enemyShoot.mp3',
    }),
    // explode: new Howl({
        // src: './audio/explode.wav'
    // }),
    gameOver: new Howl({
        src: './audio/game_over_short.mp3'
    }),
    select: new Howl({
        src: './audio/select.mp3'
    }),
    shoot: new Howl({
        src: './audio/shoot_soft.mp3'
    }),
    start: new Howl({
        src: './audio/start.mp3'
    })
}