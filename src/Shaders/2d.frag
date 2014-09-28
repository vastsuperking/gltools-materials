#version 110

uniform sampler2D normalMap;
uniform sampler2D diffuseTex;
uniform vec4 diffuseColor;

#ifdef LIGHTING
uniform vec3 lightPos;
uniform vec4 lightDiffuseColor;
uniform vec4 lightAmbientColor;
uniform vec3 lightAttenuation;
#endif

varying vec2 fragTexCoord;
varying vec2 fragPos; 

void main() {
	vec4 finalColor;

	//Compute diffuse color;
	vec4 diffuse = vec4(1.0, 1.0, 1.0, 1.0);
	
	#ifdef DIFFUSE_SAMPLER
		diffuse = texture2D(diffuseTex, fragTexCoord);
	#endif
	
	//We know the diffuse color will always be there
	diffuse *= diffuseColor;


	#ifdef LIGHTING
		//Initialize normal
		vec3 normal = vec3(1.0, 1.0, 1.0);
	
		#ifdef NORMAL_MAP
			//RGB out of normalMap
			vec3 normalMapRGB = texture2D(normalMap, fragTexCoord).rgb;
			//Store normal from textureMap in normal
			normal = normalize(normalMapRGB * 2.0 - 1.0);
		#endif
		//Now get to the lighting computation
	
		vec3 lightDir = vec3(lightPos.xy - fragPos, lightPos.z);
	
		float lightDist = length(lightDir);
	
		lightDir = normalize(lightDir);
		//Attenuation, x is constant, y is linear, z is quadradic
		float attenuation = 1.0 / 	(lightAttenuation.x + 
								(lightAttenuation.y * lightDist) + 
								(lightAttenuation.z * lightDist * lightDist));	
		//gl_FragColor = vec4(attenuation);
	
		vec4 diffuseComp = diffuse * lightDiffuseColor * max(dot(normal, lightDir), 0.0);
		gl_FragColor = diffuseComp;
		vec4 ambientComp = diffuse * lightAmbientColor;

		finalColor = ambientComp + (diffuseComp * attenuation);
	#else
		//If no lighting
		finalColor = diffuse;
	#endif
	
	gl_FragColor = finalColor;
}