var utilities = require("utilities");

cc.Class({
    extends: cc.Component,

    properties: {
        timeToLive: 100,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.lifeTime = 0;
    },

    update (dt) {
        if (!cc.isValid(this.node)) return;

        if (this.lifeTime >= this.timeToLive) {
            this.node.destroy();
        }
        else {
            this.lifeTime += dt;
        }
    },

    // will be called once when two colliders begin to contact
    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.tag == 1){
            this.node.destroy();
        }
        else if (otherCollider.tag == 2){
            var event = new cc.Event.EventCustom('score', true);
            event.setUserData ({ score : 1 });
            this.node.dispatchEvent( event );
        }
    },
});
