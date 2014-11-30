#version 110

uniform sampler2D vertexBufferSampler;
uniform sampler2D normalBufferSampler;
uniform sampler2D diffuseBufferSampler;

varying vec2 fragTexCoord;

void main() {
	vec4 diffuse = texture2D(diffuseBufferSampler, fragTexCoord);
	vec2 vertexPos = texture2D(vertexBufferSampler, fragTexCoord).xy;
	vec3 normal = texture2D(normalBufferSampler, fragTexCoord).xyz;
	
	if (normal.x < -1.0 && normal.y < -1.0 && normal.z < -1.0) {
		gl_FragColor = vec4(diffuse);
 	} else gl_FragColor = vec4(0, 0, 0, 1);
}