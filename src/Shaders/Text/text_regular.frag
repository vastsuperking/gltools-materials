#version 110

//Samples from an texture holding the glyph bitmap
uniform sampler2D glyphSampler;
uniform vec4 fontColor;

varying vec2 fragTexCoord;
varying vec2 fragPos;

void main() {
	vec4 glyph = texture2D(glyphSampler, fragTexCoord);
	
	gl_FragColor = glyph * fontColor;
}
