cc.Class({
    extends: cc.Component,

    // will be called once when two colliders begin to contact
    onBeginContact: function (contact, selfCollider, otherCollider) {
        this.node.destroy();
    },
});
