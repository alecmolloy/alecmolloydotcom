#define PI 3.1415926535
uniform float time;
uniform vec2 resolution;
uniform bool renderToTexture;

varying vec2 vUv;


void main() {

  float t = time / 5.0;
  // Get the current fragment coordinates
  vec2 fragCoord = gl_FragCoord.xy / resolution;
  float pct = distance(fragCoord,vec2(0.5));
  vec3 color = vec3(step(0.5, sin(pct + t) * 0.5 + 0.5));

  gl_FragColor = vec4(color, 1.0);
}