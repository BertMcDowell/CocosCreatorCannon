cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: {
            default: null,
            type: cc.Label,
        },
    },

    // FUNCTIONS

    onAddScore (event) {
        this.score += event.getUserData().score;
        if (this.scoreLabel){
            this.scoreLabel.string = "Score: " + this.score;
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.score= 0;
        this.node.on("score", this.onAddScore, this);
    },

    onDestroy() {
        this.node.off("score", this.onAddScore, this);
    },

    start () {
        this.score= 0;

        var event = new cc.Event.EventCustom('score', true);
        event.setUserData ({ score : 1 });
        this.onAddScore (event);
    },

    // update (dt) {},
});
