#version 110

uniform mat4 modelMat;
uniform mat4 viewMat;
uniform mat4 projMat;
uniform mat3 normalMat;

uniform vec4 diffuseColor;
uniform sampler2D diffuseTex;

varying vec3 fragPos;
varying vec2 fragTexCoord;
varying vec3 fragNormal;

void main() {
	vec4 diffuse = diffuseColor;
	#ifdef DIFFUSE_MAP
		diffuse *= texture2D(diffuseTex, fragTexCoord);
	#endif
	gl_FragData[0] = vec4(fragPos, 1);
	gl_FragData[1] = vec4(fragNormal, 1);
	gl_FragData[2] = diffuse;
	//No specular, so just put 0
	gl_FragData[3] = vec4(0, 0, 0, 1);
}
