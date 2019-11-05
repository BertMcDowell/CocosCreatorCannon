require("utilities");

cc.Class({
    extends: cc.Component,

    properties: {
        meteorPrefab: {
            default: null,
            type: cc.Prefab,
        },

        meteorSpawnMinTime: .5,
        meteorSpawnMaxTime: 1,

        meteorSpawnMinAngle: 0,
        meteorSpawnMaxAngle: -30,

        meteorSpawnMinVelocity: 100,
        meteorSpawnMaxVelocity: 200,
    },

    dropMeteor() {
        if (this.meteorPrefab) {
            const width = this.node.width;
            const height = this.node.height;
            
            const x = (Math.random() * width) - (this.node.width * this.node.anchorX);
            const y = (Math.random() * height) - (this.node.height * this.node.anchorY);
            const angle = 180 + Math.randomBetween(this.meteorSpawnMinAngle, this.meteorSpawnMaxAngle);
            const velocity = Math.randomBetween(this.meteorSpawnMinVelocity, this.meteorSpawnMaxVelocity);

            var meteor = cc.instantiate(this.meteorPrefab);
            
            meteor.parent = this.node;
            meteor.active = true;
            meteor.position = cc.v2(x, y); 

            var body = meteor.getComponent(cc.RigidBody);
            if (body) {
                body.linearVelocity = cc.v2(Math.sind(angle) * velocity, Math.cosd(angle) * velocity);
            }
        }
        else {
            log.warning("Failed to create meteor as the prefab is invalid");
        }
    },

    scheduleCreateMeteor() {
        cc.director.getScheduler().schedule(this.dropMeteor, this, Math.randomBetween(this.meteorSpawnMinTime, this.meteorSpawnMaxTime), false);
    },
    
    createMeteorAndScheduleNext() {
        this.createMeteor();
        this.scheduleCreateMeteor();
    },

    start () {
        this.scheduleCreateMeteor();
    },
});
