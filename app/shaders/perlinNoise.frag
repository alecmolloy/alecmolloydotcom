#define PI 3.1415926535
uniform float time;
uniform vec2 resolution;
uniform bool renderToTexture;

varying vec2 vUv;

float noise3(vec3 x) {
  vec3 p = floor(x), f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  float n = p.x + p.y * 57.0 + 113.0 * p.z;
  return mix(
    mix(
      mix(fract(sin(n +  0.0) * 43758.5453), fract(sin(n +  1.0) * 43758.5453), f.x),
      mix(fract(sin(n + 57.0) * 43758.5453), fract(sin(n + 58.0) * 43758.5453), f.x),
      f.y
    ),
    mix(
      mix(fract(sin(n + 113.0) * 43758.5453), fract(sin(n + 114.0) * 43758.5453), f.x),
      mix(fract(sin(n + 170.0) * 43758.5453), fract(sin(n + 171.0) * 43758.5453), f.x),
      f.y
    ),
    f.z
  );
}

float noise(vec3 x) {
  return (noise3(x) + noise3(x + 11.5)) / 2.0;
}

  // ${[
  //   0,  32, 8,  40, 2,  34, 10, 42,
  //   48, 16, 56, 24, 50, 18, 58, 26,
  //   12, 44, 4,  36, 14, 46, 6,  38,
  //   60, 28, 52, 20, 62, 30, 54, 22,
  //   3,  35, 11, 43, 1,  33, 9,  41,
  //   51, 19, 59, 27, 49, 17, 57, 25,
  //   15, 47, 7,  39, 13, 45, 5,  37,
  //   63, 31, 55, 23, 61, 29, 53, 21].map(v => (v /
  //   64.0).toPrecision(6)).join(', ')}

const float bayerMatrix[64] = float[64](
  0.0,0.5,0.125,0.625,0.03125,0.53125,0.15625,0.65625,0.75,0.25,0.875,0.375,0.78125,0.28125,0.90625,0.40625,0.1875,0.6875,0.0625,0.5625,0.21875,0.71875,0.09375,0.59375,0.9375,0.4375,0.8125,0.3125,0.96875,0.46875,0.84375,0.34375,0.046875,0.546875,0.171875,0.671875,0.015625,0.515625,0.140625,0.640625,0.796875,0.296875,0.921875,0.421875,0.765625,0.265625,0.890625,0.390625,0.234375,0.734375,0.109375,0.609375,0.203125,0.703125,0.078125,0.578125,0.984375,0.484375,0.859375,0.359375,0.953125,0.453125,0.828125,0.328125
);

float dither8x8(vec2 position, float brightness) {
  int x = int(mod(position.x, 8.0));
  int y = int(mod(position.y, 8.0));
  int index = y * 8 + x;
  float threshold = bayerMatrix[index];
  return brightness < threshold ? 0.0 : 1.0;
}

void main() {
  // Calculate pixel coordinates based on UV and resolution
  vec2 pixelCoord = floor(vUv * resolution);
  
  vec2 uv = pixelCoord * 1. / resolution;
  
  vec3 noiseCoord = vec3(uv * 10.0, time * 0.25);
  float n = noise(noiseCoord);

  float clipFloor = 0.2;
  if (n <= clipFloor) {
    n = 0.0;
  } else {
    n = 1.0 - pow(max(0.0, abs((n - clipFloor) * 2.0 - 1.0)), 3.0);
    // n = pow(min(cos (PI * n / 2.0), 1.0 - abs (n)), 0.5);
    
  }

  // n = 0.49;
  vec2 ditherCoord = pixelCoord;
  float ditheredValue = dither8x8(ditherCoord, n);
  
  vec3 light = vec3(1.0);
  vec3 dark = vec3(0.0);
  vec3 noiseColor = mix(dark, light, ditheredValue);
  gl_FragColor = vec4(noiseColor, 1.0);
}