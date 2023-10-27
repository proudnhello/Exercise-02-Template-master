class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    preload() {
        this.load.path = './assets/img/'
        this.load.image('grass', 'grass.jpg')
        this.load.image('cup', 'cup.jpg')
        this.load.image('ball', 'ball.png')
        this.load.image('wall', 'wall.png')
        this.load.image('oneway', 'one_way_wall.png')
    }

    create() {
        // add background grass
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0)

        // add cup
        this.cup = this.physics.add.sprite(width/2, height/10, 'cup')
        this.cup.body.setCircle(this.cup.width/4)
        this.cup.body.setOffset(this.cup.width/4)
        this.cup.body.setImmovable(true)

        // add ball
        this.ball = this.physics.add.sprite(width/2, height - height/10, "ball")
        this.ball.body.setCircle(this.ball.width/2)
        this.ball.body.setCollideWorldBounds(true)
        this.ball.body.setBounce(.5)
        this.ball.setDamping(true).setDrag(0.5)

        // add walls
        let wallA = this.physics.add.sprite(0, height/4, 'wall')
        wallA.setX(Phaser.Math.Between(0 + wallA.width/2, width - wallA.width/2))
        wallA.body.setImmovable(true)
        wallA.body.setVelocityX(width/5)
        wallA.body.setBounce(1)
        wallA.setCollideWorldBounds(true)

        let wallB = this.physics.add.sprite(0, height/2, 'wall')
        wallB.setX(Phaser.Math.Between(0 + wallB.width/2, width - wallB.width/2))
        wallB.body.setImmovable(true)

        this.walls = this.add.group([wallA, wallB])

        // oneway wall
        this.oneway =  this.physics.add.sprite(0, height/4 * 3,'oneway')
        this.oneway.setX(Phaser.Math.Between(0, width-this.oneway.width/2))
        this.oneway.setImmovable(true)
        this.oneway.body.checkCollision.down = false

        // setting shot perameters
        this.SPD_X = 200
        this.SPD_Y_MIN = 700
        this.SPD_Y_MAX = 1100

        this.input.on('pointerdown', (pointer) => {
            let shotDirection 
            let xDir
            pointer.y <= this.ball.y ? shotDirection = 1 : shotDirection = -1
            pointer.x <= this.ball.x ? xDir = 1 : xDir = -1
            this.ball.body.setVelocityX(Phaser.Math.Between(0, this.SPD_X*xDir))
            this.ball.body.setVelocityY(Phaser.Math.Between(this.SPD_Y_MIN, this.SPD_Y_MAX) * shotDirection)
            shotsTaken += 1
        })

        this.physics.add.collider(this.ball, this.cup, () => {
            this.ball.setX(width/2)
            this.ball.setY(height - height/10)
            this.ball.setVelocity(0, 0)
            holeIn += 1
        })
        this.physics.add.collider(this.walls, this.ball)
        this.physics.add.collider(this.ball, this.oneway)

        // Create text
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#000000',
            align: 'left',
            bold: true,
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
    }

    update() {
    }
}