precision mediump float;

const float FILTER_PIXEL_WIDTH = 1.4142135623730951;
const vec3 BLACK = vec3(0., 0., 0.);

varying vec2 localCoord;

void main() {
  float dist = length(localCoord - vec2(.5, .5)) / .5;
  if (dist > 0.5) {
    discard;
  }

  gl_FragColor = vec4(BLACK, 1);
}
