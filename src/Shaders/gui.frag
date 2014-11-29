#version 110

uniform sampler2D normalMap;
uniform sampler2D diffuseTex;
uniform vec4 diffuseColor;

varying vec2 fragTexCoord;
varying vec2 fragPos; 

void main() {
	vec4 finalColor;

	//Compute diffuse color;
	vec4 diffuse = vec4(1.0, 1.0, 1.0, 1.0);
	
	#ifdef DIFFUSE_SAMPLER
		diffuse = texture2D(diffuseTex, fragTexCoord);
	#endif
	
	//We know the diffuse color will always be there
	diffuse *= diffuseColor;

	finalColor = diffuse;
	
	gl_FragColor = finalColor;
}