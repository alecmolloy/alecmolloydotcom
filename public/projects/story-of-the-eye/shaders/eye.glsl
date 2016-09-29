uniform vec3      iResolution;           // viewport resolution (in pixels)
uniform float     iGlobalTime;           // shader playback time (in seconds)
uniform float     iTimeDelta;            // render time (in seconds)
uniform int       iFrame;                // shader playback frame
uniform float     iChannelTime[4];       // channel playback time (in seconds)
uniform vec3      iChannelResolution[4]; // channel resolution (in pixels)
uniform vec4      iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click
uniform samplerXX iChannel0..3;          // input channel. XX = 2D/Cube
uniform vec4      iDate;                 // (year, month, day, time in seconds)
uniform float     iSampleRate;           // sound sample rate (i.e., 44100)

vec2 pixel_size = vec2(iResolution.x);

vec2 pixelate (vec2 uv) {
  vec2 d = pixel_size * (1.0 / iResolution.xy);
  vec2 coord = vec2(d.x*(floor(uv.x/d.x) + (ceil(uv.x/d.x) - floor(uv.x/d.x))/2.0),
                    d.y*(floor(uv.y/d.y) + (ceil(uv.y/d.y) - floor(uv.y/d.y))/2.0));
  return coord;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord.xy / iResolution.xy;
    fragColor = texture2D(iChannel0, pixelate(uv));
}
