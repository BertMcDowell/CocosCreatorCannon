// This is the physics component and provides a scene level interface
// to configuring the directors physics manager.
cc.Class({
    extends: cc.Component,

    // Properties that will be displayed in the properties tab
    properties: {
        active: {
            default: true,
            tooltip: "Enable / disable physics"
        },
        debug: {
            default: false,
            tooltip: "Enable / disable the debug flags"
        },
 
        gravity: {
            default: cc.v2(0, -320),
            tooltip: "Physics world gravity."
        },
        ptm_ration: {
            default: 32,
            tooltip: "The ratio transform between physics unit and pixel unit, generally is 32."
        },

        accumulator: {
            default: false,
            tooltip: "Enabled accumulator, then will call step function with the fixed time step FIXED_TIME_STEP."
        },
        fixedTimeStep: {
            default: 60,
            tooltip: "Specify the fixed time step.",
        },

        velocityIterations: {
            default: 10,
            tooltip: "The velocity iterations for the velocity constraint solver.",
        },     
        positionIterations: {
            default: 10,
            tooltip: "The position Iterations for the position constraint solver.",
        }
    },
 
    // LIFE-CYCLE CALLBACKS:
 
    onLoad () {
        let manager = cc.director.getPhysicsManager();
 
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

        manager.gravity = this.gravity;
        manager.PTM_RATIO = this.ptm_ratio;
        
        manager.enabledAccumulator = this.accumulator;
        manager.FIXED_TIME_STEP = 1/this.fixedTimeStep;
 
        manager.VELOCITY_ITERATIONS = this.velocityIterations;
        manager.POSITION_ITERATIONS = this.positionIterations;
    },

    onDestroy () {
        let manager = cc.director.getPhysicsManager();
 
        // Disable the physics when destroyed
        manager.enabled = false;
        // Reset the debug flags
        manager.debugDrawFlags = 0;
    }
});
