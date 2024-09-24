uniform sampler2D frontTexture;
uniform sampler2D backTexture;
uniform float time;
varying vec2 vUv;

float random (vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
} 

void main() {
  float totalFrames = 66.0;
  float initialLoop = 37.0;
  float loopLength = totalFrames - initialLoop;
  float currentTime = time * 1.0;
  float currentFrame;
  
  if (currentTime < totalFrames) {
    currentFrame = floor(mod(currentTime, totalFrames));
  } else {
    float timeAfterFirstLoop = currentTime - totalFrames;
    currentFrame = floor(initialLoop + mod(timeAfterFirstLoop, loopLength));
  }

  float column = mod(currentFrame, 6.0);
  float row = floor(currentFrame / 6.0);

  vec2 frameSize = vec2(1.0 / 6.0, 1.0 / 11.0);
  
  vec2 offset = vec2(column * frameSize.x, (10.0 - row) * frameSize.y); // Flip rows

  vec2 frontSize = vec2((57.0 * 13.0) / 2048.0, (57.0 * 13.0) / 1024.0);
  vec2 frontCenter = vec2(0.25, 0.5);
  vec2 frontStart = frontCenter - frontSize * 0.5;
  vec2 frontEnd = frontCenter + frontSize * 0.5;

  vec2 backSize = vec2((47.0 * 3.0) / 2048.0, (10.0 * 3.0) / 1024.0);
  vec2 backCenter = vec2(0.75, 0.5);
  vec2 backStart = backCenter - backSize * 0.5;
  vec2 backEnd = backCenter + backSize * 0.5;

  if (vUv.x >= frontStart.x && vUv.x <= frontEnd.x && vUv.y >= frontStart.y && vUv.y <= frontEnd.y) {
    vec2 remappedUV = (vUv - frontStart) / frontSize;
    
    vec2 frameUV = fract(remappedUV) * frameSize + offset;
    
    vec4 texColor = texture2D(frontTexture, frameUV);
    
    gl_FragColor = texColor * (0.8 + 0.2 * random(remappedUV));
  } else if (vUv.x >= backStart.x && vUv.x <= backEnd.x && vUv.y >= backStart.y && vUv.y <= backEnd.y) {
    vec2 remappedUV = (vUv - backStart) / backSize;
    vec4 texColor = texture2D(backTexture, remappedUV);
    gl_FragColor = texColor * (0.8 + 0.2 * random(remappedUV));
  } else {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
  }
}