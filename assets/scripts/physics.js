// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        active: true,
        debug: false,

        gravity: cc.v2(0, -10),

        accumulator: false,
        fixedTimeStep: 60,
        velocityIterations: 10,
        positionIterations: 10,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var manager = cc.director.getPhysicsManager();

        manager.enabled = this.active;
        if (this.debug) {
            manager.debugDrawFlags = 
            cc.PhysicsManager.DrawBits.e_aabbBit |
            cc.PhysicsManager.DrawBits.e_pairBit |
            cc.PhysicsManager.DrawBits.e_centerOfMassBit |
            cc.PhysicsManager.DrawBits.e_jointBit |
            cc.PhysicsManager.DrawBits.e_shapeBit;
        }
        else {
            manager.debugDrawFlags = 0;
        }

        // Enable settings for physics timestep
        manager.enabledAccumulator = this.accumulator;

        // Physics timestep, default FIXED_TIME_STEP is 1/60
        manager.FIXED_TIME_STEP = 1/this.fixedTimeStep;

        // The number of iterations per update of the Physics System processing speed is 10 by default
        manager.VELOCITY_ITERATIONS = this.velocityIterations;

        // The number of iterations per update of the Physics processing location is 10 by default
        manager.POSITION_ITERATIONS = this.positionIterations;
    },
});
