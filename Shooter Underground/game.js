const TXT = (size = '12px', color = '#ffffff') => ({
    fontFamily: '"Press Start 2P", monospace',
    fontSize: size,
    color,
    align: 'center',
    lineSpacing: 12
});

function createTextButton(scene, x, y, w, h, label, bgColor, callback, fontSize = '12px') {
    const rect = scene.add.rectangle(x, y, w, h, bgColor)
        .setStrokeStyle(3, 0x0f172a)
        .setInteractive({ useHandCursor: true });

    const text = scene.add.text(x, y, label, TXT(fontSize)).setOrigin(0.5);

    rect.on('pointerover', () => rect.setAlpha(0.85));
    rect.on('pointerout', () => rect.setAlpha(1));
    rect.on('pointerdown', () => callback(rect, text));

    return { rect, text };
}

class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {
        this.load.image('titulo', 'assets/titulo.png');
    }

    create() {
        this.cameras.main.setBackgroundColor('#334155');

        const titleImg = this.add.image(550, 230, 'titulo');
        const scale = Math.min(720 / titleImg.width, 320 / titleImg.height);
        titleImg.setScale(scale);

        createTextButton(this, 210, 520, 300, 74, 'INICIAR\nPARTIDA', 0xef4444, () => {
            this.scene.start('GameScene');
        }, '16px');

        createTextButton(this, 550, 520, 320, 74, 'CONTROLES\nY REGLAS', 0x1e293b, () => {
            this.scene.start('InfoScene', { mode: 'controls' });
        }, '16px');

        createTextButton(this, 890, 520, 300, 74, 'CRÉDITOS', 0x1e293b, () => {
            this.scene.start('InfoScene', { mode: 'credits' });
        }, '16px');
    }
}

class InfoScene extends Phaser.Scene {
    constructor() {
        super('InfoScene');
    }

    init(data) {
        this.mode = data.mode;
    }

    create() {
        this.cameras.main.setBackgroundColor('#334155');

        if (this.mode === 'controls') {
            this.renderControls();
        } else {
            this.renderCredits();
        }

        createTextButton(this, 550, 580, 280, 52, 'VOLVER AL MENÚ', 0x1e293b, () => {
            this.scene.start('MenuScene');
        }, '13px');
    }

    renderControls() {
        this.add.text(550, 115, 'CONTROLES Y REGLAS', TXT('22px', '#facc15')).setOrigin(0.5);

        this.add.text(
            310, 275,
            'JUGADOR 1\n\nMOVER: W A S D\nGIRAR: Q / E\nDISPARAR: ESPACIO',
            TXT('14px', '#38bdf8')
        ).setOrigin(0.5);

        this.add.text(
            790, 275,
            'JUGADOR 2\n\nMOVER: FLECHAS\nGIRAR: CTRL / SHIFT\nDISPARAR: -',
            TXT('14px', '#f87171')
        ).setOrigin(0.5);

        this.add.text(
            550, 445,
            '10 IMPACTOS PARA GANAR.\nBOTIQUIN CURA 100% Y REAPARECE EN 10S.',
            TXT('13px', '#f8fafc')
        ).setOrigin(0.5);
    }

    renderCredits() {
        this.add.text(550, 140, 'CRÉDITOS - GRUPO A', TXT('22px', '#facc15')).setOrigin(0.5);

        this.add.text(
            550, 335,
            'MARCOS GACITUAGA RODRÍGUEZ\n\nPABLO GARCÍA LUZÓN-REVILLA\n\nADRIÁN LLORENTE IBARRA',
            TXT('18px', '#ffffff')
        ).setOrigin(0.5);
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        this.top = 74;
        this.h = 570;
        this.hpTimer = 0;

        this.physics.world.setBounds(0, this.top, 1100, this.h);

        this.drawStation();
        this.generateTextures();
        this.buildObstacles();
        this.spawnPlayers();
        this.setupCollisions();
        this.spawnMedkit();
        this.buildHUD();
        this.setupKeys();
    }

    drawStation() {
        const g = this.add.graphics();

        g.fillStyle(0x272c36).fillRect(0, this.top, 1100, this.h);
        g.fillStyle(0x1c212b).fillRect(0, this.top + 210, 1100, 150);

        g.fillStyle(0x3a281c);
        for (let x = 10; x < 1100; x += 26) {
            g.fillRect(x, this.top + 222, 10, 126);
        }

        g.fillStyle(0x64748b)
            .fillRect(0, this.top + 226, 1100, 6)
            .fillRect(0, this.top + 338, 1100, 6);

        g.fillStyle(0xeab308)
            .fillRect(0, this.top + 203, 1100, 7)
            .fillRect(0, this.top + 360, 1100, 7);
    }

    generateTextures() {
        [0x38bdf8, 0xf87171].forEach((color, idx) => {
            if (this.textures.exists(`p${idx}`)) return;

            const tg = this.make.graphics({ add: false });
            tg.fillStyle(0x0f172a).fillRect(40, 27, 24, 10);
            tg.fillStyle(color).lineStyle(2, 0x020617)
                .fillCircle(46, 20, 5.5).strokeCircle(46, 20, 5.5)
                .fillCircle(46, 44, 5.5).strokeCircle(46, 44, 5.5);
            tg.lineStyle(3, 0x020617)
                .fillCircle(32, 32, 20).strokeCircle(32, 32, 20);

            tg.generateTexture(`p${idx}`, 64, 64).destroy();
        });

        if (!this.textures.exists('bullet')) {
            this.make.graphics({ add: false })
                .fillStyle(0xfacc15)
                .fillCircle(6, 6, 5)
                .generateTexture('bullet', 12, 12)
                .destroy();
        }

        if (!this.textures.exists('medkit')) {
            const mg = this.make.graphics({ add: false });
            mg.fillStyle(0x16a34a).lineStyle(3, 0xdcfce7)
                .fillRect(0, 0, 28, 28).strokeRect(0, 0, 28, 28);
            mg.fillStyle(0xffffff)
                .fillRect(11, 5, 6, 18).fillRect(5, 11, 18, 6);

            mg.generateTexture('medkit', 28, 28).destroy();
        }
    }

    buildObstacles() {
        this.walls = this.physics.add.staticGroup();
        this.crates = this.physics.add.staticGroup();

        const wallData = [
            [180, 75, 50, 50, 0x64748b],
            [870, 75, 50, 50, 0x64748b],
            [180, 445, 50, 50, 0x64748b],
            [870, 445, 50, 50, 0x64748b],
            [350, 230, 400, 110, 0x334155]
        ];

        wallData.forEach(([x, y, w, h, color]) => {
            const rect = this.add.rectangle(x + w / 2, this.top + y + h / 2, w, h, color)
                .setStrokeStyle(3, 0x0f172a);
            this.physics.add.existing(rect, true);
            this.walls.add(rect);
        });

        const crateData = [
            [280, 110],
            [774, 110],
            [280, 414],
            [774, 414]
        ];

        crateData.forEach(([x, y]) => {
            const crate = this.add.rectangle(x + 23, this.top + y + 23, 46, 46, 0x92400e)
                .setStrokeStyle(3, 0x1c1917);
            this.physics.add.existing(crate, true);
            crate.hp = 80;
            this.crates.add(crate);
        });
    }

    spawnPlayers() {
        this.players = [
            this.createPlayer(0, 90, this.top + this.h / 2, 0),
            this.createPlayer(1, 1010, this.top + this.h / 2, Math.PI)
        ];
        this.bullets = this.physics.add.group();
    }

    createPlayer(id, x, y, rot) {
        const player = this.physics.add.sprite(x, y, `p${id}`)
            .setCircle(20, 12, 12)
            .setCollideWorldBounds(true);

        return Object.assign(player, {
            id,
            rotation: rot,
            hp: 100,
            score: 0,
            cd: 0
        });
    }

    setupCollisions() {
        this.physics.add.collider(this.players, [this.walls, this.crates]);
        this.physics.add.collider(this.players[0], this.players[1]);

        this.physics.add.collider(this.bullets, this.walls, (bullet) => {
            bullet.destroy();
        });

        this.physics.add.collider(this.bullets, this.crates, (bullet, crate) => {
            bullet.destroy();
            crate.hp -= 20;
            if (crate.hp <= 0) crate.destroy();
        });

        this.physics.add.overlap(this.bullets, this.players, (player, bullet) => {
            if (bullet.owner === player.id) return;

            bullet.destroy();
            player.hp -= 10;
            this.players[bullet.owner].score += 10;
            this.updateHUD();

            if (player.hp <= 0) {
                this.endMatch();
            }
        });
    }

    spawnMedkit() {
        let x, y;
        const obstacles = [...this.walls.getChildren(), ...this.crates.getChildren()];

        do {
            x = 60 + Math.random() * 980;
            y = this.top + 50 + Math.random() * (this.h - 100);
        } while (obstacles.some((obs) => Phaser.Geom.Rectangle.Contains(obs.getBounds(), x, y)));

        this.medkit = this.physics.add.sprite(x, y, 'medkit');

        this.physics.add.overlap(this.players, this.medkit, (player) => {
            if (!this.medkit) return;

            player.hp = 100;
            this.medkit.destroy();
            this.medkit = null;
            this.hpTimer = 10;
            this.updateHUD();
        });
    }

    buildHUD() {
        this.add.rectangle(550, 37, 1100, 74, 0x0f172a).setStrokeStyle(3, 0x475569);
        this.add.text(32, 14, 'JUGADOR 1', TXT('10px', '#38bdf8'));
        this.add.text(802, 14, 'JUGADOR 2', TXT('10px', '#f87171'));

        this.hpBars = [
            this.add.rectangle(33, 35, 264, 10, 0x22c55e).setOrigin(0, 0.5),
            this.add.rectangle(803, 35, 264, 10, 0x22c55e).setOrigin(0, 0.5)
        ];

        this.scoreTxts = [
            this.add.text(32, 48, 'PUNTOS: 0', TXT('10px', '#cbd5e1')),
            this.add.text(802, 48, 'PUNTOS: 0', TXT('10px', '#cbd5e1'))
        ];

        this.add.rectangle(550, 672, 1100, 56, 0x0f172a).setStrokeStyle(3, 0x475569);
    }

    updateHUD() {
        this.players.forEach((player, i) => {
            this.hpBars[i].width = Math.max(0, (player.hp / 100) * 264);
            this.scoreTxts[i].setText(`PUNTOS: ${player.score}`);
        });
    }

    setupKeys() {
        this.k = this.input.keyboard.addKeys('W,S,A,D,Q,E,SPACE,UP,DOWN,LEFT,RIGHT,MINUS');
        this.extra = {};

        this.input.keyboard.on('keydown', (e) => {
            this.extra[e.code] = true;
            if (e.key === '-') this.extra.minus = true;
            if (e.code === 'Escape' || e.code === 'KeyP') this.pauseGame();
        });

        this.input.keyboard.on('keyup', (e) => {
            this.extra[e.code] = false;
            if (e.key === '-') this.extra.minus = false;
        });
    }

    pauseGame() {
        this.scene.pause();
        this.scene.launch('EndScene', { pause: true });
    }

    update(_, delta) {
        const dt = delta / 1000;

        if (!this.medkit && (this.hpTimer -= dt) <= 0) {
            this.spawnMedkit();
        }

        this.handlePlayersInput(dt);
        this.cleanBullets();
    }

    handlePlayersInput(dt) {
        const inputs = [
            [
                this.k.W.isDown,
                this.k.S.isDown,
                this.k.A.isDown,
                this.k.D.isDown,
                this.k.Q.isDown,
                this.k.E.isDown,
                this.k.SPACE.isDown
            ],
            [
                this.k.UP.isDown,
                this.k.DOWN.isDown,
                this.k.LEFT.isDown,
                this.k.RIGHT.isDown,
                this.extra.ControlRight,
                this.extra.ShiftRight,
                this.extra.minus || this.k.MINUS.isDown
            ]
        ];

        this.players.forEach((player, i) => {
            this.movePlayer(player, dt, inputs[i]);
        });
    }

    movePlayer(player, dt, [up, down, left, right, rotLeft, rotRight, shoot]) {
        if (player.cd > 0) player.cd -= dt;
        if (rotLeft) player.rotation -= 3.3 * dt;
        if (rotRight) player.rotation += 3.3 * dt;

        const vx = (right ? 1 : 0) - (left ? 1 : 0);
        const vy = (down ? 1 : 0) - (up ? 1 : 0);
        const len = Math.hypot(vx, vy) || 1;

        player.setVelocity((vx / len) * 220, (vy / len) * 220);

        if (shoot && player.cd <= 0) {
            this.shootBullet(player);
            player.cd = 0.25;
        }
    }

    shootBullet(player) {
        const bx = player.x + Math.cos(player.rotation) * 34;
        const by = player.y + Math.sin(player.rotation) * 34;

        const bullet = this.bullets.create(bx, by, 'bullet');
        bullet.owner = player.id;
        bullet.setVelocity(Math.cos(player.rotation) * 600, Math.sin(player.rotation) * 600);
    }

    cleanBullets() {
        this.bullets.getChildren().forEach((b) => {
            if (b.x < 0 || b.x > 1100 || b.y < this.top || b.y > this.top + this.h) {
                b.destroy();
            }
        });
    }

    endMatch() {
        const [p1, p2] = this.players;
        const win = p1.hp <= 0 ? 'GANA EL JUGADOR 2' : 'GANA EL JUGADOR 1';

        this.scene.start('EndScene', {
            pause: false,
            win,
            stats: `J1: ${p1.score} PTS  |  J2: ${p2.score} PTS`
        });
    }
}

class EndScene extends Phaser.Scene {
    constructor() {
        super('EndScene');
    }

    init(data) {
        this.data = data;
    }

    create() {
        this.cameras.main.setBackgroundColor('#334155');
        if (this.data.pause) {
            this.add.rectangle(550, 350, 1100, 700, 0x0f172a, 0.85);
        }

        const title = this.data.pause ? 'PARTIDA EN PAUSA' : this.data.win;
        this.add.text(550, 220, title, TXT('22px', '#facc15')).setOrigin(0.5);

        if (!this.data.pause) {
            this.add.text(550, 285, this.data.stats, TXT('14px', '#ffffff')).setOrigin(0.5);
        }

        const mainBtnText = this.data.pause ? 'REANUDAR' : 'VOLVER A JUGAR';
        const mainBtnColor = this.data.pause ? 0x10b981 : 0xef4444;

        createTextButton(this, 550, 370, 290, 50, mainBtnText, mainBtnColor, () => {
            if (this.data.pause) {
                this.scene.resume('GameScene');
                this.scene.stop();
            } else {
                this.scene.start('GameScene');
            }
        }, '14px');

        createTextButton(this, 550, 440, 290, 50, 'MENÚ PRINCIPAL', 0x1e293b, () => {
            this.scene.stop('GameScene');
            this.scene.start('MenuScene');
        }, '14px');
    }
}

document.fonts.ready.then(() => {
    new Phaser.Game({
        type: Phaser.AUTO,
        width: 1100,
        height: 700,
        parent: 'phaser-container',
        backgroundColor: '#334155',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 }
            }
        },
        scene: [MenuScene, InfoScene, GameScene, EndScene]
    });
});