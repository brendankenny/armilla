/* global Matrix4x4 */

var QUAD_GEOMETRY = new Float32Array([
  0, 0, 0, 1,
  1, 1, 0, 1,
  0, 1, 0, 1,
  0, 0, 0, 1,
  1, 0, 0, 1,
  1, 1, 0, 1
]);

var TEST_COUNT = 100;

function generateTestGeometry() {
  var testGeometry = new Float32Array(TEST_COUNT * 6 * 6);

  var transform = new Matrix4x4();
  for (var i = 0; i < TEST_COUNT; i++) {
    var theta = i / TEST_COUNT * 2 * Math.PI;
    transform.identity();
    transform.rotateY(theta);

    for (var j = 0; j < QUAD_GEOMETRY.length; j += 6) {
      // add transformed world coordinate and texture coordinate
      var destOffset = i * 6 * 6 + j;
      transform.transformOffsetVec4(testGeometry, destOffset, QUAD_GEOMETRY, j);
    }
  }

  return testGeometry;
}
