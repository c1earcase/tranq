function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

scale = 1

class Invader {
    life = 1
    projectile = null
    constructor({position}) {

        /** player speed */
        this.velocity = {
            x: 0,
            y: 0
        }
        /** Customized for invader varieties */

        // RANDOM COIN INVADER
        this.imageA = new Image();
        this.imageA.src = this.getRandomInvaderImage()
        this.imageA.onload = () => {
            this.image = this.imageA
            this.width = this.imageA.width * scale;
            this.height = this.imageA.height * scale;
            this.position = {
                x: position.x,
                y: position.y
            }
        }

        // TOGGLE TO SPACE INVADER
        this.imageX = new Image();
        this.imageX.src = './img/invaders/invader_x.png'
        this.imageX.onload = () => {
            this.image = this.imageX
            this.width = this.imageX.width * scale;
            this.height = this.imageX.height * scale;
            this.position = {
                x: position.x,
                y: position.y
            }
        }

        this.frames = 0
    }

    getRandomInvaderImage() {
        const imgName = "./img/invaders/invader_" + randomIntFromInterval(0,481) + ".png";
        return imgName;
    }

    draw() {
        
        if (this.frames % 40 < 10) {
          this.image = this.imageX
        } else {
          this.image = this.imageA
        }

        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }

    /** Press (Arrow keys & Shift update invader position ..) */
    update({velocity}) {
        if (this.image) {
            this.draw()
            this.position.x += velocity.x
            this.position.y += velocity.y
        }
        this.frames++
    }

    shoot(invaderProjectiles) {
        audio.enemyShoot.play()
        invaderProjectiles.push(new InvaderProjectile({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height
            },
            velocity: {
                x: 0,
                y: 20
            }
        }));
    }
}

class BossInvader extends Invader {

    constructor({position}) {
        scale = 2 // make boss bigger
        super({position});
        this.life = 4
    }

    getRandomInvaderImage() {
        const imgName = "./img/invaders/boss_" + randomIntFromInterval(0,0) + ".png";
        return imgName;
    }

    draw() {
        c.drawImage(
            this.imageA,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }


}
