uniform sampler2D tDiffuse;
uniform sampler2D tBayer;
uniform vec3 darkColor;
uniform vec3 lightColor;
uniform vec2 resolution;
uniform float pixelSize;
uniform float gammaCorrection;
uniform float toneMapLow;
uniform float toneMapHigh;
uniform float time;

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

void main() {
  // Calculate the scaled UV coordinates
  vec2 scaledUv = floor(vUv * resolution / pixelSize) * pixelSize / resolution;
  
  // Sample the texture using the scaled UV coordinates
  vec4 texel = texture2D(tDiffuse, scaledUv);
  
  // Scale the alpha value
  texel.a *= 0.9; // Scale alpha by 0.95

  float gray;

  // Use the noise function to get the gray value, incorporating time for animation
  float noiseGray = noise(vec3(scaledUv * 10.0, time * 0.1)); // Adjust the scale and speed as needed

  // Blend gray value based on the alpha value
  if (texel.a == 0.0) {
    gray = noiseGray; // Fully transparent, use noise
  } else {
    // Calculate gray value from the texture
    float textureGray = dot(texel.rgb, vec3(0.299, 0.587, 0.114));
    // Blend using alpha
    gray = mix(noiseGray, textureGray, texel.a);
  }
  
  // Apply gamma correction and tone mapping
  gray = pow(gray, gammaCorrection);
  gray = smoothstep(toneMapLow, toneMapHigh, gray);
  
  // Use the Bayer texture for dithering
  vec2 bayerCoord = mod(gl_FragCoord.xy, 16.0) / 16.0;
  float threshold = texture2D(tBayer, bayerCoord).r;
  
  vec3 finalColor = threshold >= gray ? darkColor : lightColor;

  // Debug output
  gl_FragColor = vec4(finalColor, 1.0);
}