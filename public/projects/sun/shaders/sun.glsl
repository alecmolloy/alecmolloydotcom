// Author: Alec Molloy
// Title: Alec Molloy.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// y = smoothstep(0.0,1.0,x);
// y = 1.5 * x - .25;
vec3 red = vec3(242./255., 65./255.,0.0);

float smootherstep(float edge0, float edge1, float x)
{
    // Scale, and clamp x to 0..1 range
    x = clamp((x - edge0)/(edge1 - edge0), 0.0, 1.0);
    // Evaluate polynomial
    return x*x*x*(x*(x*6.0 - 15.0) + 10.0);
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 toCenter = (st - vec2(.5)) * 2.0;
    float pct = smootherstep(0.0, 1.0,length(toCenter));

    gl_FragColor = vec4(red,1.0-pct);
}