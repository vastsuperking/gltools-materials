#version 110

struct Light {
	vec4 ambient;
	vec4 diffuse;
	vec4 specular;
	vec3 position;
	vec3 attenuation;
};


uniform vec3 camWorldPos;

uniform sampler2D vertexBufferSampler;
uniform sampler2D normalBufferSampler;
uniform sampler2D diffuseBufferSampler;
uniform sampler2D specularBufferSampler;

uniform Light light;

varying vec2 fragTexCoord;

void main() {
	vec4 diffuse = texture2D(diffuseBufferSampler, fragTexCoord);
	vec4 specular = texture2D(specularBufferSampler, fragTexCoord);
	
	vec3 v = texture2D(vertexBufferSampler, fragTexCoord).xyz;
	vec3 n = texture2D(normalBufferSampler, fragTexCoord).xyz;

	vec3 l = normalize(vec3(light.position - v));
	vec3 e = normalize(camWorldPos - v);
	vec3 r = normalize(reflect(-l, n));

	float d = length(vec3(light.position - v));
	
	vec4 color = vec4(0, 0, 0, 0);
	color += diffuse * light.diffuse * max(dot(n, l), 0.0);
	color += specular * light.specular * pow(max(dot(r, e), 0.0), 5.0);

	float attenuationFactor = 1.0/(light.attenuation.x + d * light.attenuation.y + d * d * light.attenuation.z);
	gl_FragColor = attenuationFactor * color + light.ambient * diffuse;
	//gl_FragColor = vec4(v, 1);
	//gl_FragColor = vec4(n, 1);
}