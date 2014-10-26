#version 110

uniform mat4 modelMat;
uniform mat4 viewMat;
uniform mat4 projMat;
uniform mat3 normalMat;

attribute vec3 vertPos;
attribute vec2 vertTexCoord;
attribute vec3 vertNormal;

varying vec3 fragPos;
varying vec2 fragTexCoord;
varying vec3 fragNormal;

void main() {
	vec4 worldPos = modelMat * vec4(vertPos, 1);
	vec4 outputVert = projMat * viewMat * worldPos;
	gl_Position = outputVert;
	
	fragPos = worldPos.xyz;
	fragTexCoord = vertTexCoord;
	fragNormal = normalMat * vertNormal;
}