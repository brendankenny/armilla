attribute vec4 worldCoord;
attribute vec2 uvCoord;

uniform mat4 globeMatrix;
// varying float spriteDiameter;

varying vec2 localCoord;

void main() {
  // transform to globe space
  gl_Position = globeMatrix * worldCoord;

  localCoord = uvCoord;
}
