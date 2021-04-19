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

uniform Light lights[3];

struct Material
{
vec3 ambient;
vec3 diffuse;
vec3 specular;
float shininess;
};

uniform Material material;



void main(void)
{
	//Changes color based on depth of pixel
		pixelColor = vec4(5*vertexOut.y + 1.0f, 5*vertexOut.y + 1.0f, 5*vertexOut.y + 1.f, 0.0f)  + vec4(colorOut, alpha); 
}

