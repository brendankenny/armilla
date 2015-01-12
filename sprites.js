/* global Matrix4x4 */

var QUAD_GEOMETRY = new Float32Array([
  0, 0, 0, 1,
  1, 1, 0, 1,
  0, 1, 0, 1,
  0, 0, 0, 1,
  1, 0, 0, 1,
  1, 1, 0, 1
]);

function generateTestGeometry(count) {
  var testGeometry = new Float32Array(count * 6 * 6);

  var transform = new Matrix4x4();
  var radius = 1 / Math.tan(2 * Math.PI / count);
  for (var i = 0; i < count; i++) {
    var theta = i / count * 2 * Math.PI;
    transform.identity();
    // TODO(bckenny): adjust to add space in between sprites
    transform.scaleUniform(0.2);
    transform.translate(0, -0.5, 1);
    transform.rotateY(theta);

    for (var j = 0; j < QUAD_GEOMETRY.length / 4; j++) {
      // add transformed world coordinate and texture coordinate
      var destOffset = i * 6 * 6 + j * 6;
      transform.transformOffsetVec4(testGeometry, destOffset, QUAD_GEOMETRY, j * 4);
      testGeometry[destOffset + 4] = QUAD_GEOMETRY[j * 4];
      testGeometry[destOffset + 5] = QUAD_GEOMETRY[j * 4 + 1];
    }
  }

  return testGeometry;
}
