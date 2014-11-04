#version 110

//Samples from an texture holding the glyph bitmap
uniform sampler2D glyphSampler;
uniform vec4 fontColor;

varying vec2 fragTexCoord;
varying vec2 fragPos;

void main() {
	vec4 glyph = texture2D(glyphSampler, fragTexCoord);

	gl_FragData[0] = vec4(fragPos, 0, 1);
	#ifdef LIGHTING
		gl_FragData[1] = vec4(0, 0, 0, 1);
	#else
		gl_FragData[1] = vec4(-10, -10, -10, 1);
	#endif
	gl_FragData[2] = glyph * fontColor; 
}