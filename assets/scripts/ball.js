cc.Class({
    extends: cc.Component,

    properties: {
        timeToLive: 100,
    },

    setPool(pool) {
        this._pool = pool;
    },

    destroyOrReturn2Pool() {
        if (this._pool !== undefined){
            
            /* Reset the internal values */
            this._lifeTime = 0;

            this._pool.put(this.node);
        }
        else {
            this.node.destroy();
        }
    },

    onLoad () {
        this._lifeTime = 0;
    },

    update (dt) {
        if (!cc.isValid(this.node)) return;

        if (this._lifeTime >= this.timeToLive) {
            this.destroyOrReturn2Pool();
        }
        else {
            this._lifeTime += dt;
        }
    },
});
