const { cos, sin, PI } = Math;
var utilities = {
    rad : deg => deg * Math.PI / 180,
    cosd : deg => Math.cos(utilities.rad(deg)),
    sind : deg => Math.sin(utilities.rad(deg)),
    clamp : (val, min, max) => val < min ? min : val > max ? max : val,
    rand: (min, max) => min + Math.random() * max,
}
module.exports = utilities;