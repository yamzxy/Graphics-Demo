#version 450

in vec3 vertexIn;
varying vec3 vertexIn2;
in vec3 colorIn;
in vec3 normalIn;
out vec3 colorOut;
out vec3 vertexOut;
out vec3 normalOut;

in vec2 textureIn;
out vec2 textureOut;

uniform float time;
uniform mat4 model;
uniform mat4 view;
uniform mat4 proj;

uniform vec2 mousePos;
uniform float test;

struct Ripple
{
	vec2 position;
	float age;
};

uniform Ripple ripples[10];


void main(void)
{
	colorOut = colorIn;
	vertexIn2 = vertexIn;
	textureOut = textureIn;
		normalOut =  (model * vec4(normalIn, 1.0)).xyz;
		vertexOut = (model * vec4(vertexIn, 1.0)).xyz;


	const float PI = 3.14159f;
	//Creates bump at player mouse
	float distance = 5 * sqrt((vertexIn2.x - mousePos.x) * (vertexIn2.x - mousePos.x) + (vertexIn2.z - mousePos.y) * (vertexIn2.z - mousePos.y));
	if(distance <= PI)
	{
	vertexIn2.y +=   0.1 * (1.0f + cos(distance));
	}

	//loops through every ripple
	for(int a = 0; a < 10; a++)
	{
	//only is affected if ripple is alive
		if(ripples[a].age > 0)
		{
			//displaces based on distance from front of ripple
			distance = 5 * sqrt((vertexIn2.x - ripples[a].position.x) * (vertexIn2.x - ripples[a].position.x) + (vertexIn2.z - ripples[a].position.y) * (vertexIn2.z - ripples[a].position.y));
			if(ripples[a].age - distance > 0)
			{
				vertexIn2.y +=   0.3 * sin( ripples[a].age - distance) / (1 + 2*(ripples[a].age - distance));
			}

		}
	}

	vertexOut = (model * vec4(vertexIn2, 1.0)).xyz;

	gl_Position = proj * view * model * vec4(vertexIn2 , 1.0f);
}