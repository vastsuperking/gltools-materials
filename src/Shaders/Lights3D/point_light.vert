#version 110

attribute vec2 vertTexCoord;
attribute vec2 vertPos;

varying vec2 fragTexCoord;

void main() {
	fragTexCoord = vertTexCoord;
	gl_Position = vec4(vertPos, 0.0, 1.0);
}