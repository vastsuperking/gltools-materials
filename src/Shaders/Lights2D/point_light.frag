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
	vec4 finalColor = vec4(0.0, 0.0, 0.0, 1.0);

	vec4 diffuse = texture2D(diffuseBufferSampler, fragTexCoord);
	vec2 vertexPos = texture2D(vertexBufferSampler, fragTexCoord).xy;
	vec3 unNormalized = texture2D(normalBufferSampler, fragTexCoord).xyz;
	vec3 normal = normalize(unNormalized);
	
	vec3 lightDir = vec3(lightPos.xy - vertexPos, lightPos.z);
	
	float lightDist = length(lightDir);
	
	lightDir = normalize(lightDir);
	//Attenuation, x is constant, y is linear, z is quadradic
	float r = (lightAttenuation.x) + 
			  (lightAttenuation.y * lightDist) + 
			  (lightAttenuation.z * lightDist * lightDist);
	float attenuation = 0.0;
	if (r == 0.0) attenuation = 0.0;
	else attenuation = 1.0 / r; 
	
	//If the unnormalized normal is below the lower bound,
	//then we should treat it as unlighted
	
	finalColor = vec4(normal, 1); 		
 	if (unNormalized.x < -1.0 && unNormalized.y < -1.0 && unNormalized.z < -1.0) {
		finalColor = diffuse; 		
 	    //Otherwise, light it
 	} else {
		vec4 ambientComp = diffuse * lightAmbientColor;
		vec4 diffuseComp = (diffuse * lightDiffuseColor * max(dot(normal, lightDir), 0.0)) * attenuation;
		finalColor = ambientComp + diffuseComp;
	}

	gl_FragColor = finalColor;
}