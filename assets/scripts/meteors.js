var utilities = require("utilities");

cc.Class({
    extends: cc.Component,

    properties: {
        meteorPrefab: {
            default: null,
            type: cc.Prefab,
        },
    
        meteorSpawnMinX: 0,
        meteorSpawnMaxX: 0,
        meteorSpawnMinY: 0,
        meteorSpawnMaxY: 0,
        meteorMinVelocity: 0,
        meteorMaxVelocity: 0,
    },

    
    // FUNCTIONS

    createMeteor() {
        if (this.meteorPrefab !== null){
            const x = utilities.rand(this.meteorSpawnMinX, this.meteorSpawnMaxX);
            const y = utilities.rand(this.meteorSpawnMinY, this.meteorSpawnMaxY);
            const angle = 90 + 25 + Math.random() * 20;
            const velocity = utilities.rand(this.meteorMinVelocity, this.meteorMaxVelocity);

            var meteor = cc.instantiate(this.meteorPrefab);
            
            meteor.parent = this.node;
            meteor.active = true;
            meteor.position = cc.v2(x, y); 

            var body = meteor.getComponent(cc.RigidBody);
            if (body) {
                body.linearVelocity = cc.v2(utilities.sind(angle) * velocity, utilities.cosd(angle) * velocity);
            }
        }
        else {
            log.warning("Failed to create meteor as the prefab is null");
        }
    },

    scheduleCreateMeteor() {
        cc.director.getScheduler().schedule(this.createMeteor, this, 1 + Math.random() * 1, false);
    },
    
    createMeteorAndScheduleNext() {
        this.createMeteor();
        this.scheduleCreateMeteor();
    },

    // LIFE-CYCLE CALLBACKS:

    start () {
        this.scheduleCreateMeteor();
    },
});
