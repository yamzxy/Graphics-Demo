#version 450

in vec3 colorOut;
out vec4 pixelColor;
in vec2 textureOut;
in vec3 vertexOut;
in vec3 normalOut; 
in float timeOut;

uniform float time;
uniform float portalType;
uniform sampler2D textureImage1;

uniform int isTextured;

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

uniform Light lights[3];

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
	float angle = atan(vertexOut.x + 6, vertexOut.y- 1);
	float color = 0.0f;
	float color2 = 0.0f;
	float color3 = 0.0f;

	//Activates and deactivates effects based on portal type
	if((portalType >= 0.0f && portalType < 0.2f) || (portalType >= 0.8f && portalType < 1.1f)) 
	{
		color = sin(15 * (angle -timeOut/10 + sqrt(pow(vertexOut.x + 6, 2) + pow(vertexOut.y- 1, 2))));
	}
	if((portalType >= 0.2f && portalType < 0.4f) || (portalType >= 0.6f && portalType < 0.8f)|| (portalType >= 0.8f && portalType < 1.0f))
	{
		color2 = sin(15 * (angle -timeOut/5 + sqrt(pow(vertexOut.x + 6, 2) + pow(vertexOut.y- 1, 2))));
	}
	if((portalType >= 0.4f && portalType < 0.6f) || (portalType >= 0.6f && portalType < 0.8f)|| (portalType >= 0.8f && portalType < 1.0f))
	{
		color3 = sin(15 * (angle/15 -timeOut/10 + sqrt(pow(vertexOut.x + 6, 2) + pow(vertexOut.y- 1, 2))));
	}

	//Adds up active effects
		pixelColor = vec4(color2 + color + color3, color2 + color + color3, color2 + color + color3, 1.0f)/2 + vec4(colorOut, alpha); 


}
