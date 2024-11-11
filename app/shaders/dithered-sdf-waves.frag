varying vec2 vUv;
uniform float time;
uniform vec2 resolution;
uniform sampler2D tNoise;
uniform vec3 darkColor;
uniform vec3 lightColor;
uniform float pixelSize;
uniform float smoothstepWidth;
uniform float bandWidth;
uniform float numBands;
uniform float waveSize;
uniform float speed;
uniform float seed;
uniform float noiseTextureSize;

vec2 GetGradient(vec2 intPos, float t) {
    float rand = fract(sin(dot(intPos, vec2(12.9898, 78.233))) * 43758.5453);;
    float angle = 6.283185 * rand + 4.0 * t * rand;
    return vec2(cos(angle), sin(angle));
}

float Pseudo3dNoise(vec3 pos) {
    vec2 i = floor(pos.xy);
    vec2 f = pos.xy - i;
    vec2 blend = f * f * (3.0 - 2.0 * f);
    float noiseVal = 
        mix(
            mix(
                dot(GetGradient(i + vec2(0, 0), pos.z), f - vec2(0, 0)),
                dot(GetGradient(i + vec2(1, 0), pos.z), f - vec2(1, 0)),
                blend.x),
            mix(
                dot(GetGradient(i + vec2(0, 1), pos.z), f - vec2(0, 1)),
                dot(GetGradient(i + vec2(1, 1), pos.z), f - vec2(1, 1)),
                blend.x),
        blend.y
    );

return noiseVal;
}

float ditheredSDFWaves(vec2 uv) {
    float lowerBandStart = 0.5 - bandWidth;
    float upperBandStart = 0.5 + bandWidth;

    float t = time * speed + seed;

    float noiseVal = 0.5 + 0.5 * Pseudo3dNoise(vec3(uv * waveSize, t));

    float waves = 1.0 - 
      smoothstep(lowerBandStart - smoothstepWidth, lowerBandStart + smoothstepWidth, fract((abs(noiseVal) * numBands) + t)) *
      smoothstep(upperBandStart + smoothstepWidth, upperBandStart - smoothstepWidth, fract((abs(noiseVal) * numBands) + t));

    return waves;
}

float dither(float color, vec2 ditheredUv, vec2 ditheredPixelCoord) {

    float gray = color;

    // Apply edge fading effect
    vec2 edgeDistance = min(ditheredUv, 2. - ditheredUv);
    float edgeFade = smoothstep(0.0, 0.125, min(edgeDistance.x, edgeDistance.y));
    gray = mix(1.0, gray, edgeFade);

    // Use the noise texture for dithering
    vec2 noiseCoord = mod(ditheredPixelCoord, noiseTextureSize) / noiseTextureSize;
    float threshold = texture2D(tNoise, noiseCoord).r;

    float thresholdDifference = threshold - gray;

    if (thresholdDifference > 0.0) {
        gray = 1.0;
    } else if (thresholdDifference == 0.0) {
        gray = round(1.0 - threshold);
    } else {
        gray = 0.0;
    }
    return gray;
}

void main() {
    // Calculate the dithered pixel coordinate
    vec2 ditheredPixelCoord = floor(gl_FragCoord.xy / pixelSize);

    // Calculate the UV for the center of the dithered pixel
    vec2 ditheredUv = (ditheredPixelCoord * pixelSize + pixelSize * 0.5) / resolution;

    // Center the UV coordinates
    vec2 centeredUv = ditheredUv - 0.5;

    // Scale the centered UV coordinates
    vec2 scaledUv = centeredUv;

    // Recenter the UV coordinates
    vec2 adjustedUv = scaledUv + 0.5;

    float waves = ditheredSDFWaves(adjustedUv);
    float ditheredWaves = dither(waves, adjustedUv, ditheredPixelCoord);
    gl_FragColor = vec4(mix(lightColor, darkColor, ditheredWaves), 1.0);
}