#version 110

uniform mat3 modelMat;
uniform mat3 viewMat;
uniform mat3 projMat;

attribute vec2 vertPos;
attribute vec2 vertTexCoord;

varying vec2 fragTexCoord;
varying vec2 fragPos;

void main() {
	vec3 modelPos = modelMat * vec3(vertPos, 1);
	vec3 transformed = projMat * viewMat * modelPos;
	
	fragTexCoord = vertTexCoord;
	fragPos = modelPos.xy;
	
	gl_Position = vec4(transformed.xy, 0, 1);
}