#version 110

uniform sampler2D vertexBufferSampler;
uniform sampler2D normalBufferSampler;
uniform sampler2D diffuseBufferSampler;

uniform vec3 lightPos;
uniform vec4 lightDiffuseColor;
uniform vec4 lightAmbientColor;
uniform vec3 lightAttenuation;

varying vec2 fragTexCoord;

void main() {
	vec4 finalColor = vec4(0.0);

	vec4 diffuse = texture2D(diffuseBufferSampler, fragTexCoord);
	vec2 vertexPos = texture2D(vertexBufferSampler, fragTexCoord).xy;
	vec3 normal = normalize(texture2D(normalBufferSampler, fragTexCoord).xyz);
	
	vec3 lightDir = vec3(lightPos.xy - vertexPos, lightPos.z);
	
	float lightDist = length(lightDir);
	
	lightDir = normalize(lightDir);
	//Attenuation, x is constant, y is linear, z is quadradic
	float attenuation = 1.0 / 	(lightAttenuation.x + 
								(lightAttenuation.y * lightDist) + 
								(lightAttenuation.z * lightDist * lightDist));
	
	vec4 diffuseComp;
	if (normal != vec3(0, 0, 0)) {
		diffuseComp = (diffuse * lightDiffuseColor * max(dot(normal, lightDir), 1.0)) * attenuation;
	} else {
		//diffuseComp = diffuse * attenuation;
		diffuseComp = vec4(1, 1, 1, 1);
	}	

	vec4 ambientComp = diffuse * lightAmbientColor;

	finalColor = ambientComp + diffuseComp;
	gl_FragColor = finalColor;
}