var utilities = require("utilities");

cc.Class({
    extends: cc.Component,

    properties: {
        meteorPrefab: {
            default: null,
            type: cc.Prefab,
        },

        meteorPoolSize: 5,
    
        meteorSpawnMinTime: 1,
        meteorSpawnMaxTime: 2,

        meteorSpawnMinAngle: 0,
        meteorSpawnMaxAngle: -30,

        meteorSpawnWidth: 0,
        meteorSpawnHeight: 0,

        meteorSpawnMinVelocity: 0,
        meteorSpawnMaxVelocity: 0,
    },

    
    // FUNCTIONS

    createMeteor() {
        if (this.meteorPool !== undefined){
            if (this.meteorPool.size() > 0) {
                const width = this.meteorSpawnWidth || this.node.width;
                const height = this.meteorSpawnHeight || this.node.height;
                
                const x = (Math.random() * width) - (this.node.width * this.node.anchorX);
                const y = (Math.random() * height) - (this.node.height * this.node.anchorY);
                const angle = 180 + utilities.rand(this.meteorSpawnMinAngle, this.meteorSpawnMaxAngle);
                const velocity = utilities.rand(this.meteorSpawnMinVelocity, this.meteorSpawnMaxVelocity);

                var meteor = this.meteorPool.get();
                
                meteor.parent = this.node;
                meteor.active = true;
                meteor.position = cc.v2(x, y); 

                var body = meteor.getComponent(cc.RigidBody);
                if (body) {
                    body.linearVelocity = cc.v2(utilities.sind(angle) * velocity, utilities.cosd(angle) * velocity);
                }
            }
            else {
                log.warning("Failed to create meteor as the pool is empty");
            }
        }
        else {
            log.warning("Failed to create meteor as the pool is invalid");
        }
    },

    scheduleCreateMeteor() {
        cc.director.getScheduler().schedule(this.createMeteor, this, utilities.rand(this.meteorSpawnMinTime, this.meteorSpawnMaxTime), false);
    },
    
    createMeteorAndScheduleNext() {
        this.createMeteor();
        this.scheduleCreateMeteor();
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if (this.meteorPrefab !== null){
            // Build a pool of meteors
            this.meteorPool = new cc.NodePool();
            for (let i = 0; i < this.meteorPoolSize; ++i) {
                let meteor = cc.instantiate(this.meteorPrefab);
                let component = meteor.getComponent("meteor");
                if (component){
                    component.pool = this.meteorPool;
                }
                this.meteorPool.put(meteor);
            }
        }
        else {
            log.warning("Failed to create meteor pool as the prefab is null");
        }
    },

    onDestroy() {
        // Don't need the pool and its nodes anymore
        // so destroy all the nodes in it.
        this.meteorPool.clear();
    },

    start () {
        this.scheduleCreateMeteor();
    },
});
