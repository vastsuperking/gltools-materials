#version 110

uniform mat4 modelMat;
uniform mat4 viewMat;
uniform mat4 projMat;

attribute vec3 vertPos;
attribute vec2 vertTexCoord;

varying vec2 fragTexCoord;

void main() {
	vec4 worldPos = modelMat * vec4(vertPos, 1);
	vec4 outputVert = projMat * viewMat * worldPos;
	gl_Position = outputVert;
	
	fragTexCoord = vertTexCoord;
}