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

float checkerboard(vec2 _st, float _size) {
    vec2 pos = floor(_st / _size);
    return mod(pos.x + pos.y, 2.0);
}



void main(void){
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    vec3 color = vec3(0.0);

    // Divide the space
    st = tile(st,1.);

    color = vec3(step(0.5, st) == vec2(step(0.5, st.y), step(0.5, st.x)));
    // color = vec3(st,0.0);

    // Draw squares that are 1/4 the length and width of the screen
    // at corners, edge centers, and image center

    st = tile(st,2.);
    // Use a matrix to rotate the space 45 degrees

    st = tile(st,4.);
    st = rotate2D(st,PI*0.25);

    color += vec3(step(0.5, st) == vec2(step(0.5, st.y), step(0.5, st.x)));

    gl_FragColor = vec4(color,1.0);
}