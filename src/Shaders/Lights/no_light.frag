#version 110

uniform sampler2D vertexBufferSampler;
uniform sampler2D normalBufferSampler;
uniform sampler2D diffuseBufferSampler;

varying vec2 fragTexCoord;

void main() {
	vec4 diffuse = texture2D(diffuseBufferSampler, fragTexCoord);
	vec2 vertexPos = texture2D(vertexBufferSampler, fragTexCoord).xy;
	vec3 normal = texture2D(normalBufferSampler, fragTexCoord).xyz;
	
	gl_FragColor = vec4(diffuse);
}