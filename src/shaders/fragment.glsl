varying vec3 vPosition;
varying vec2 vUv;

void main () {
    gl_FragColor = vec4(vec3(smoothstep(0.45, 0.55, vUv.x)), 1.0);
}