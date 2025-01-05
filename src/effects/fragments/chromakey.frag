precision mediump float;

uniform sampler2D u_Source;
uniform vec3 u_Color;
uniform float u_Threshold;

varying vec2 v_TextureCoord;

void main() {
  vec4 color = texture2D(u_Source, v_TextureCoord);

  float distance = length(color.rgb - u_Color.rgb);
  float alpha = smoothstep(u_Threshold, 0.0, distance);

  gl_FragColor = vec4(color.rgb, alpha);
}