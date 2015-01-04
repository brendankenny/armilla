precision mediump float;

const float FILTER_PIXEL_WIDTH = 1.4142135623730951;
const vec3 BLACK = vec3(0., 0., 0.);

varying vec2 localCoord;

void main() {
  float dist = length(localCoord - vec2(.5, .5)) / .5;

  // float edgeBlendSize = 2. * FILTER_PIXEL_WIDTH / pointDiameter;
  
  // vec3 color = mix(pointColor, BLACK, smoothstep(0.8 - edgeBlendSize, 0.8, dist));
  // float alpha = 1. - smoothstep(1. - edgeBlendSize, 1., dist);
  
  float alpha = 1. - step(1. - .5, dist);

  gl_FragColor = vec4(BLACK, 1) * alpha;
}
