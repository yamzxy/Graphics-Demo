#version 450

in vec3 vertexIn;
varying vec3 vertexIn2;
in vec3 normalIn;
in vec3 colorIn;
out vec3 colorOut;
out vec3 vertexOut;
out vec3 normalOut;

in vec2 textureIn;
out vec2 textureOut;

uniform float time;
uniform mat4 model;
uniform mat4 view;
uniform mat4 proj;

void main(void)
{
	colorOut = colorIn;
	vertexIn2 = vertexIn;
	textureOut = textureIn;
	normalOut = normalIn;
	vertexOut = (model * vec4(vertexIn, 1.0)).xyz;

	//Uses time so it doesnt complain
	float lol = time;

	gl_Position = proj * view * model * vec4(vertexIn2 , 1.0f);
}