function Vector2(v) {
  if (v == null) return false;
  this.v = this.prepareInput(v);
}
Vector2.prototype = {
  prepareInput: function (input) {
    if (input == null) return false;
    var isVector = input instanceof Vector2;
    var isArray = Array.isArray(input);

    return isVector
      ? input.v
      : isArray
      ? [input[0], input[1] != null ? input[1] : input[0]]
      : [input, input];
  },
  set: function (v) {
    this.v = this.prepareInput(v);

    return this;
  },
  add: function (v, returnOnly = false) {
    v = this.prepareInput(v);

    var sum = this.v.map((val, dim) => val + v[dim]);

    if (returnOnly) return sum;

    this.set(sum);
    return this;
  },
  subtract: function (v, returnOnly = false) {
    v = this.prepareInput(v);

    var sum = this.v.map((val, dim) => val - v[dim]);

    if (returnOnly) return sum;

    this.set(sum);
    return this;
  },
  multiply: function (v, returnOnly = false) {
    v = this.prepareInput(v);

    var sum = this.v.map((val, dim) => val * v[dim]);

    if (returnOnly) return sum;

    this.set(sum);
    return this;
  },
  divide: function (v, returnOnly = false) {
    v = this.prepareInput(v);

    var sum = this.v.map((val, dim) => val / v[dim]);

    if (returnOnly) return sum;

    this.set(sum);
    return this;
  },
  distance: function (v) {
    v = this.prepareInput(v);

    var [dX, dY] = this.subtract(v, true);
    var dist = Math.pow(Math.pow(dX, 2) + Math.pow(dY, 2), 0.5);

    return dist;
  },
  inBounds: function (v) {
    v = this.prepareInput(v);

    return this.v.map((val, dim) => Math.abs(val) < v[dim]);
  },
  ease: function (target, easing = 1, returnOnly = true) {
    target = this.prepareInput(target);
    return this.v.map((val, dim) => val + (target[dim] - val) * easing);
  }
};

export default Vector2;
