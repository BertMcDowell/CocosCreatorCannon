require("utilities");

cc.Class({
    extends: cc.Component,

    properties: {
        barrelNode: {
            default: null,
            type: cc.Node,
            tooltip: "Barrel node that will be rotated"
        },
        fireNode: {
            default: null,
            type: cc.Node,
            tooltip: "Fore node that the cannon ball will be fired from, this should be in the barrel part of the node tree"
        },
        ballPrefab: {
            default: null,
            type: cc.Prefab,
            tooltip: "Object that will be fired out of the cannon"
        },

        /* Angle of rotation per second */
        angleSpeed: 90,
        /* Max left angle supported */
        leftMaxAngle: 45,
        /* Max right angle supported */
        rightMaxAngle: 45,
        
        /* velocity to fire the ball with */
        velocity: 600,
        /* number of cannon balls to create onLoad */
        poolSize: 15,
    },

    fireBall: function() {
        if (this._pool !== undefined){
            if (this._pool.size() > 0) {
                var ball = this._pool.get();
                ball.parent = this.fireNode;
                ball.active = true;
                ball.position = cc.v2(0, 0);

                let angle = -this.barrelNode.angle;
                let body = ball.getComponent(cc.RigidBody);
                if (body) {
                    body.linearVelocity = cc.v2(Math.sind(angle) * this.velocity, Math.cosd(angle) * this.velocity);
                }
            }
            else {
                log.message("Failed to create cannon ball as the pool is empty");    
            }
        }
        else {
            log.warning("Failed to create cannon ball as the pool is invalid");
        }
    },

    onKeyDown: function(event) {
        switch(event.keyCode){
            case cc.macro.KEY.left:
                this._speed = 1;
                break;
            case cc.macro.KEY.right:
                this._speed = -1;
                break;
            case cc.macro.KEY.space:
                this.fireBall();
                break;
        }
    },

    onKeyUp: function(event) {
        switch(event.keyCode){
            case cc.macro.KEY.left:
            case cc.macro.KEY.right:
                this._speed = 0;
                break;
        }
    },

    onLoad () {
        this._speed = 0;
        this._pool = new cc.NodePool();

        // Build a pool of cannon balls so that we can reuse them
        // this stops the game creating / destroying objects
        if (this.ballPrefab !== null){
                
            for (let i = 0; i < this.poolSize; ++i) {
                let ball = cc.instantiate(this.ballPrefab);
                let component = ball.getComponent("ball");
                if (component && component.setPool) {
                    component.setPool(this._pool);
                }
                this._pool.put(ball);
            }
        }
        else {
            log.warning("Failed to create cannon ball pool as the prefab is null");
        }

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onDestroy () {
        this._speed = 0;
        this._pool.clear();

        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    update (dt) {
        if (this._speed !== 0) {
            /* Angle to rotate this frame */
            let rotate_by = this.angleSpeed * this._speed * dt;
            /* Apply the rotation and limit the angles */
            this.barrelNode.angle = Math.clamp(this.barrelNode.angle + rotate_by, -1 * this.rightMaxAngle, this.leftMaxAngle);
        }
    },
});
