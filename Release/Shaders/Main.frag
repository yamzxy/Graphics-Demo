#version 450

in vec3 colorOut;
out vec4 pixelColor;
in vec2 textureOut;
in vec3 vertexOut;
in vec3 normalOut; 

uniform float time;
uniform sampler2D textureImage1;

uniform int isTextured;
//uniform sampler2D textureImage2;

uniform vec3 cameraPosition;
uniform bool isLit;

uniform float alpha;

struct Light
{
	int type;

	vec3 position;
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;

	float attenuationConst;
	float attenuationLinear;
	float attenuationQuad;
};

uniform Light lights[6];

struct Material
{
vec3 ambient;
vec3 diffuse;
vec3 specular;
float shininess;
};

uniform Material material;


vec3 CalculateLight(Light light, vec3 normal, vec3 fragPos, vec3 viewDir);
//vec3 CalculateDirectionalLight(Light light, vec3 normal, vec3 fragPos, vec3 viewDir);


void main(void)
{

if(isLit)
{
    // properties
	vec3 normal = normalize(normalOut);
    //vec3 norm = normalize(Normal);
    vec3 viewDir = normalize(cameraPosition - vertexOut);

	vec3 result = vec3(0.0f, 0.0f, 0.0f);

	for (int a = 0; a < lights.length(); a++)
	{
		if(lights[a].type == 0)
		{
			result += CalculateLight(lights[a], normal, vertexOut, viewDir);
		}
		else if(lights[a].type == 1)
		{
//			result += CalculateDirectionalLight(lights[a], normal, vertexOut, viewDir);
		}
	}

	//calculate final fragment color using color addition
	if(isTextured == 1)
	{
		pixelColor =  vec4(result, alpha) * texture(textureImage1, textureOut); 
	}
	else
	{
	pixelColor = vec4(result, alpha);
	}
}
else
{
	if(isTextured == 1)
	{
		pixelColor = vec4(colorOut, alpha) * texture(textureImage1, textureOut); 
	}
	else
	{
		pixelColor = vec4(colorOut, alpha); 
	}
}

}

vec3 CalculateLight(Light light, vec3 normal, vec3 fragPos, vec3 viewDir)
{

		//Ambient calculations
		vec3 ambientColor = light.ambient * material.ambient;

		//Diffuse calculations
		vec3 lightDirection = normalize(light.position - vertexOut);
		float lightIntensity = dot(lightDirection, normal);
		vec3 diffuseColor = light.diffuse * lightIntensity * material.diffuse;

		//Specular calculations
		vec3 viewDirection = normalize(cameraPosition - vertexOut);
		vec3 reflection = reflect(-lightDirection, normal);
		float specularTerm = pow(max(dot(viewDirection, reflection), 0.0), material.shininess);
		vec3 specularColor = light.specular * specularTerm * material.specular;
	


		float distance = sqrt(pow((light.position.x - vertexOut.x), 2) + pow((light.position.y - vertexOut.y), 2) + pow((light.position.z - vertexOut.z), 2));
		float attenuation = 1/(light.attenuationConst + light.attenuationLinear * distance + light.attenuationQuad * pow(distance, 2));


		ambientColor *= attenuation;
		diffuseColor *= attenuation;
		specularColor *= attenuation;

    return (ambientColor + specularColor + diffuseColor);
}

//vec3 CalculateDirectionalLight(Light light, vec3 normal, vec3 fragPos, vec3 viewDir)
//{
//    vec3 lightDir = normalize(light.position);
//    // diffuse shading
//    float diff = max(dot(normal, lightDir), 0.0);
//    // specular shading
//    vec3 reflectDir = reflect(-lightDir, normal);
//    float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
//    // combine results
//    vec3 ambient  = light.ambient  * vec3(texture(material.diffuse, TexCoords));
//    vec3 diffuse  = light.diffuse  * diff * vec3(texture(material.diffuse, TexCoords));
//    vec3 specular = light.specular * spec * vec3(texture(material.specular, TexCoords));
//
//    return (ambient + diffuse + specular);
//}