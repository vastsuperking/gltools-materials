#version 110

uniform sampler2D diffuseTex;
uniform vec4 diffuseColor;

varying vec2 fragTexCoord;

void main() {
	vec4 diffuse = vec4(1.0, 1.0, 1.0, 1.0);
	#ifdef DIFFUSE_SAMPLER
	diffuse = texture2D(diffuseTex, fragTexCoord);
	#endif
	diffuse *= diffuseColor;
	
	gl_FragColor = diffuse;
}