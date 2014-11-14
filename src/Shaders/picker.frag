#version 110
 
uniform vec4 pickingColor;
 
void main(){
	gl_FragColor = pickingColor;
}