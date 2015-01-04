/**
 * A 4x4 Matrix.
 * @constructor
 * @struct
 */
var Matrix4x4 = function() {
  /**
   * The internal representation of the matix.
   * @private {Float32Array}
   */
  this.m_ = new Float32Array(16);

  this.identity();
};

/** @typedef {Array<number>|Float32Array} */
// Vec4;

/**
 * Reset matrix to the identity transformation.
 * @return {!Matrix4x4} This matrix.
 */
Matrix4x4.prototype.identity = function() {
  var m = this.m_;

  m[0] = 1;  m[1] = 0;  m[2] = 0;  m[3] = 0;
  m[4] = 0;  m[5] = 1;  m[6] = 0;  m[7] = 0;
  m[8] = 0;  m[9] = 0;  m[10] = 1; m[11] = 0;
  m[12] = 0; m[13] = 0; m[14] = 0; m[15] = 1;

  return this;
};

/**
 * Rotate the matrix by angle theta about the x axis.
 * @param {number} theta The rotation angle, in radians.
 * @return {!Matrix4x4} This matrix.
 */
Matrix4x4.prototype.rotateX = function(theta) {
  var cos = Math.cos(theta);
  var sin = Math.sin(theta);

  var m = this.m_;

  var c2 = cos*m[4] + m[8]*sin;
  var c3 = cos*m[8] - m[4]*sin;
  m[4] = c2;
  m[8] = c3;

  c2 = cos*m[5] + m[9]*sin;
  c3 = cos*m[9] - m[5]*sin;
  m[5] = c2;
  m[9] = c3;

  c2 = cos*m[6] + m[10]*sin;
  c3 = cos*m[10] - m[6]*sin;
  m[6] = c2;
  m[10] = c3;

  c2 = cos*m[7] + m[11]*sin;
  c3 = cos*m[11] - m[7]*sin;
  m[7] = c2;
  m[11] = c3;

  return this;
};

/**
 * Rotate the matrix by angle theta about the y axis.
 * @param {number} theta The rotation angle, in radians.
 * @return {!Matrix4x4} This matrix.
 */
Matrix4x4.prototype.rotateY = function(theta) {
  var cos = Math.cos(theta);
  var sin = Math.sin(theta);

  var m = this.m_;

  var c1 = cos * m[0] - m[8] * sin;
  var c3 = cos * m[8] + m[0] * sin;
  m[0] = c1;
  m[8] = c3;

  c1 = cos * m[1] - m[9] * sin;
  c3 = cos * m[9] + m[1] * sin;
  m[1] = c1;
  m[9] = c3;

  c1 = cos * m[2] - m[10] * sin;
  c3 = cos * m[10] + m[2] * sin;
  m[2] = c1;
  m[10] = c3;

  c1 = cos * m[3] - m[11] * sin;
  c3 = cos * m[11] + m[3] * sin;
  m[3] = c1;
  m[11] = c3;

  return this;
};

/**
 * Apply a scale of factor scale.
 * @param {number} scale
 * @return {!Matrix4x4} This matrix.
 */
Matrix4x4.prototype.scaleUniform = function(scale) {
  var m = this.m_;

  m[0] *= scale;
  m[1] *= scale;
  m[2] *= scale;
  m[3] *= scale;

  m[4] *= scale;
  m[5] *= scale;
  m[6] *= scale;
  m[7] *= scale;

  m[8] *= scale;
  m[9] *= scale;
  m[10] *= scale;
  m[11] *= scale;

  return this;
};

/**
 * Transform vec and place result in destVec. Returns destVec. destVec and vec
 * can be the same Vec4.
 * @param {!Vec4} destVec
 * @param {Vec4} vec
 * @return {!Vec4} destVec
 */
Matrix4x4.prototype.transformVec4 = function(destVec, vec) {
  var m = this.m_;
  var v0 = vec[0];
  var v1 = vec[1];
  var v2 = vec[2];
  var v3 = vec[3];

  destVec[0] = v0 * m[0] + v1 * m[4] + v2 * m[8]  + v3 * m[12];
  destVec[1] = v0 * m[1] + v1 * m[5] + v2 * m[9]  + v3 * m[13];
  destVec[2] = v0 * m[2] + v1 * m[6] + v2 * m[10] + v3 * m[14];
  destVec[3] = v0 * m[3] + v1 * m[7] + v2 * m[11] + v3 * m[15];

  return destVec;
};

/**
 * Transform vector at vecOffset in vec and place result at destVecOffset in
 * destVec. Result can be written in place by giving the same values for destVec
 * as for vec.
 * @param {!(Array<number>|Float32Array)} destVec
 * @param {number} destVecOffset
 * @param {!(Array<number>|Float32Array)} vec
 * @param {number} vecOffset
 */
Matrix4x4.prototype.transformOffsetVec4 = function(destVec, destVecOffset, vec, vecOffset) {
  var m = this.m_;
  vecOffset = vecOffset || 0;
  var v0 = vec[0 + vecOffset];
  var v1 = vec[1 + vecOffset];
  var v2 = vec[2 + vecOffset];
  var v3 = vec[3 + vecOffset];

  destVecOffset = destVecOffset || 0;
  destVec[0 + destVecOffset] = v0 * m[0] + v1 * m[4] + v2 * m[8]  + v3 * m[12];
  destVec[1 + destVecOffset] = v0 * m[1] + v1 * m[5] + v2 * m[9]  + v3 * m[13];
  destVec[2 + destVecOffset] = v0 * m[2] + v1 * m[6] + v2 * m[10] + v3 * m[14];
  destVec[3 + destVecOffset] = v0 * m[3] + v1 * m[7] + v2 * m[11] + v3 * m[15];
};

/**
 * Translate by vector tx, ty, tz.
 * @param {number} tx
 * @param {number} ty
 * @param {number} tz
 * @return {!Matrix4x4} This matrix.
 */
Matrix4x4.prototype.translate = function(tx, ty, tz) {
  var m = this.m_;

  m[12] += m[0]*tx + m[4]*ty + m[8]*tz;
  m[13] += m[1]*tx + m[5]*ty + m[9]*tz;
  m[14] += m[2]*tx + m[6]*ty + m[10]*tz;
  m[15] += m[3]*tx + m[7]*ty + m[11]*tz;

  return this;
};
