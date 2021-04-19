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

uniform vec2 voronoiPoints[20];


void main(void)
{
	colorOut = colorIn;
	vertexIn2 = vertexIn;
	textureOut = textureIn;
		normalOut =  (model * vec4(normalIn, 1.0)).xyz;


	//Calculates the distance to the nearest point
	float smallestDistance = 100.0f;
	for(int a = 0; a < voronoiPoints.length(); a++)
	{
		float pointDistance = sqrt(pow(vertexIn2.x - voronoiPoints[a].x ,2) + pow(vertexIn2.z - voronoiPoints[a].y ,2));
		if(pointDistance < smallestDistance)
		{
			smallestDistance = pointDistance;
		}
	}
	//Displaces downwards by the distance
	//Squared to make effect rounded 
	vertexIn2.y -= pow(smallestDistance, 2);

	vertexOut = (model * vec4(vertexIn2, 1.0)).xyz;

	gl_Position = proj * view * model * vec4(vertexIn2 , 1.0f);
}