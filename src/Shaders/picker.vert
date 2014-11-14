#version 110

uniform mat4 modelMat;
uniform mat4 viewMat;
uniform mat4 projMat;

attribute vec3 vertPos;

void main() {
	gl_Position = projMat * viewMat * modelMat * vec4(vertPos, 1);
}