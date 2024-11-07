varying vec2 vUv;
uniform float time;
uniform vec2 resolution;
uniform sampler2D tBayer;
uniform vec3 darkColor;
uniform vec3 lightColor;
uniform float pixelSize;

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
    const float SMOOTHSTEP_WIDTH = 0.015;
    const float BAND_WIDTH = 0.25;
    const float LOWER_BAND_START = 0.5 - BAND_WIDTH;
    const float UPPER_BAND_START = 0.5 + BAND_WIDTH;
    const float NUM_BANDS = 10.0;
    const float SIZE = 1.0;

    float t = time * 0.0125;

    float noiseVal = 0.5 + 0.5 * Pseudo3dNoise(vec3(uv * SIZE, t));

    float waves = 1.0 - 
      smoothstep(LOWER_BAND_START - SMOOTHSTEP_WIDTH, LOWER_BAND_START + SMOOTHSTEP_WIDTH, fract((abs(noiseVal) * NUM_BANDS) + t)) *
      smoothstep(UPPER_BAND_START + SMOOTHSTEP_WIDTH, UPPER_BAND_START - SMOOTHSTEP_WIDTH, fract((abs(noiseVal) * NUM_BANDS) + t));

    return waves;
}

float dither(float color, vec2 ditheredUv, vec2 ditheredPixelCoord) {

    float gray = color;

    // Apply edge fading effect
    vec2 edgeDistance = min(ditheredUv, 2. - ditheredUv);
    float edgeFade = smoothstep(0.0, 0.125, min(edgeDistance.x, edgeDistance.y));
    gray = mix(1.0, gray, edgeFade);

    // Use the Bayer texture for dithering
    vec2 bayerCoord = mod(ditheredPixelCoord, 16.0) / 16.0;
    float threshold = texture2D(tBayer, bayerCoord).r;

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