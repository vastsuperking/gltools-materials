#version 110

uniform vec4 diffuseColor;
uniform sampler2D diffuseTex;

varying vec2 fragTexCoord;

void main() {
	vec4 color = diffuseColor;
	#ifdef DIFFUSE_MAP
		color *= texture2D(diffuseTex, fragTexCoord);
	#endif
	gl_FragColor = color;
}
