/* Convert degrees to radian */
Math.rad = function(deg){ return deg * Math.PI / 180 };
/* cos with degrees input */
Math.cosd = function (deg) { return Math.cos(Math.rad(deg)); };
/* sin with degrees input */
Math.sind = function (deg) { return Math.sin(Math.rad(deg)); };
/* clamp a value between a range */
Math.clamp = function (val, min, max) { return val < min ? min : val > max ? max : val; };
/* random number between a range */
Math.randomBetween = function (a, b) { return Math.floor(Math.random() * (b - a + 1) + a); };