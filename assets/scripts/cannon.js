var utilities = require("utilities");

cc.Class({
    extends: cc.Component,

    properties: {
        baseNode: {
            default: null,
            type: cc.Node
        },
        barrelNode: {
            default: null,
            type: cc.Node
        },
        fireNode: {
            default: null,
            type: cc.Node
        },
        bulletPrefab: {
            default: null,
            type: cc.Prefab
        },

        baseAngleSpeed: 0,
        angleSpeed: 0,
        leftMaxAngle: 0,
        rightMaxAngle: 0,

        velocity: 400,
    },

    // FUNCTIONS

    fireBullet: function(velocity) {
        if (this.bulletPrefab !== null){
            var angle = this.barrelNode.rotation;
            var bullet = cc.instantiate(this.bulletPrefab);
            bullet.parent = this.fireNode;
            bullet.active = true;
            bullet.position = cc.v2(0, 0);

            var body = bullet.getComponent(cc.RigidBody);
            if (body) {
                body.linearVelocity = cc.v2(utilities.sind(angle) * velocity, utilities.cosd(angle) * velocity);
            }
        }
        else {
            log.warning("Failed to create bullet as the prefab is null");
        }
    },


    onKeyDown: function(event) {
        switch(event.keyCode){
            case cc.macro.KEY.left:
                this.angleSpeed = this.baseAngleSpeed;
                break;
            case cc.macro.KEY.right:
                this.angleSpeed = -1 *this.baseAngleSpeed;
                break;
            case cc.macro.KEY.space:
                this.fireBullet(this.velocity);
                break;
        }
    },

    onKeyUp: function(event) {
        switch(event.keyCode){
            case cc.macro.KEY.left:
            case cc.macro.KEY.right:
                this.angleSpeed = 0;
                break;
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    update (dt) {
        if (this.angleSpeed !== 0) {
            this.barrelNode.angle = utilities.clamp(this.barrelNode.angle + this.angleSpeed * dt, -1 * this.rightMaxAngle, this.leftMaxAngle);
        }
    },
});
