class Invader_Grid {
    constructor() {
        this.INVADER_IMG_SIDE_LENGTH = 100
        this.position = {
            x: 0,
            y: 0
        }
        this.velocity = {
            x: 3,
            y: 0
        }
        this.invaders = []
        this.createInvaders()
    }

    createInvaders() {
        /** Randomly changed grid columns  & rows , count and position */
        const columns = Math.floor(Math.random() * 10 + 1);
        const rows = Math.floor(Math.random() * 5 + 1);
        this.width = columns * this.INVADER_IMG_SIDE_LENGTH
        /** Randomly Defined grid columns  & rows in canvas */
        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                this.invaders.push(new Invader({
                    position: {
                        x: x * this.INVADER_IMG_SIDE_LENGTH,
                        y: y * this.INVADER_IMG_SIDE_LENGTH
                    }
                }
                )
                );
            }
        }
    }

    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.velocity.y = 0

        if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x
            this.velocity.y = 90
        }
    }
}

class BossInvader_Grid extends Invader_Grid {

    constructor() {
        super()
        this.INVADER_IMG_SIDE_LENGTH = 200
    }

    createInvaders() {
        /** Randomly changed grid columns  & rows , count and position */
        const columns = Math.floor(Math.random() * 1 + 1);
        const rows = Math.floor(Math.random() * 1 + 1);
        this.width = columns * this.INVADER_IMG_SIDE_LENGTH
        /** Randomly Defined grid columns  & rows in canvas */
        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                this.invaders.push(new BossInvader({
                    position: {
                        x: x * this.INVADER_IMG_SIDE_LENGTH,
                        y: y * this.INVADER_IMG_SIDE_LENGTH
                    }
                }
                )
                );
            }
        }
    }

}