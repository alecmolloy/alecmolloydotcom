#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

void main(void){
    // Initialize the fragment coordinates
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    
    // Set the background color to #ff4e00 (International Orange)
    vec3 color = vec3(1.0, 0.306, 0.0);

    // st = rotate2D(st, PI * 0.25);
    vec2 diamondRadius = vec2(1. / sqrt(2.0) * 0.5 + 0.5);
    vec2 position = step(st, diamondRadius) * step(1.- st, diamondRadius);
    float diamond = position.x * position.y;

    st = tile(st, 2.0);
    // Create a 2x2 checkerboard pattern inside the diamond
    vec2 checkerSt = st * 2.0; // Scale to create 2x2 grid
    vec2 checkerPos = floor(checkerSt);
    float checker = mod(checkerPos.x + checkerPos.y, 2.0);
    
    // Apply the checkerboard pattern only inside the diamond
    diamond *= step(0.5, checker);
    
    color += diamond;



    // Set the final color of the fragment
    // The alpha channel is set to 1.0 for full opacity
    gl_FragColor = vec4(color, 1.0);
}