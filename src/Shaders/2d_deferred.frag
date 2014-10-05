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
	vec3 normal = vec3(0, 0, 0);
	
	#ifdef DIFFUSE_SAMPLER
		diffuse = texture2D(diffuseTex, fragTexCoord);
	#endif
	
	//We know the diffuse color will always be there
	diffuse *= diffuseColor;

	#ifdef NORMAL_MAP
		//RGB out of normalMap
		vec3 normalMapRGB = texture2D(normalMap, fragTexCoord).rgb;
		//Store normal from textureMap in normal
		normal = normalize(normalMapRGB * 2.0 - 1.0);
	#endif
	//Output format:
	//Position
	//Normal
	//Diffuse
	gl_FragData[0] = vec4(fragPos, 0, 1);
	gl_FragData[1] = vec4(normal, 1);
	gl_FragData[2] = diffuse;
}