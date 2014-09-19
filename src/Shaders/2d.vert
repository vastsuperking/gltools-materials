#version 110

uniform mat3 modelMat;
uniform mat3 viewMat;
uniform mat3 projMat;

attribute vec2 vertPos;
attribute vec2 vertTexCoord;

varying vec2 fragTexCoord;

void main() {
	vec3 transformed = projMat * viewMat * modelMat * vec3(vertPos, 1);
	fragTexCoord = vertTexCoord;
	gl_Position = vec4(transformed.xy, 0, 1);
}