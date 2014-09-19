#version 110

uniform sampler2D diffuseTex;
uniform vec4 diffuseColor;

varying vec2 vertTexCoord;

void main() {
	vec4 diffuse = vec4(1.0, 1.0, 1.0, 1.0);
	#ifdef DIFFUSE_SAMPLER
	diffuse = texture2D(diffuseTex, vertTexCoord);
	#endif
	diffuse *= diffuseColor;
	
	gl_FragColor = diffuse;
}