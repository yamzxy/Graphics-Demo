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


void main(void)
{
	colorOut = colorIn;
	vertexIn2 = vertexIn;
	textureOut = textureIn;
		normalOut =  (model * vec4(normalIn, 1.0)).xyz;
		vertexOut = (model * vec4(vertexIn, 1.0)).xyz;

	float bigWave = 800;
	float littleWave = 200;
	float speed = 50;

	vertexIn2.z += speed* time;

	//Rotates the fish around its lengthways axis
	float temp = vertexIn2.x;
	float angle = sin(vertexIn2.z/speed) / 3;
	vertexIn2.x = vertexIn2.x * cos(angle) - vertexIn2.y * sin(angle) ;
	vertexIn2.y = temp * sin (angle) + vertexIn2.y * cos (angle);

	vertexIn2.x +=  littleWave * sin(vertexIn2.z/bigWave);

		
	//Makes fish move in a sin wave
	float tempz = 0;
	float tempx = vertexIn2.x;
	temp = tempx;


	//Rotates each section of fish based on angle of the sin wave it moved in to stop shearing
	angle = -3.1415 / 4 * cos(vertexIn2.z/bigWave);
	tempx = tempx * cos(angle) - tempz * sin(angle) ;
	tempz = temp * sin (angle) + tempz * cos (angle);

	vertexIn2.x = 2* littleWave * sin(vertexIn2.z/bigWave) + tempx;
	vertexIn2.z = tempz + vertexIn.z + speed * time;

	//Moves in a smaller sin wave
	float move = vertexIn2.z/speed;
	vertexIn2.x +=  10* (1 - 0.5 * cos(move));
	vertexIn2.z +=  10* (0.5 * cos(move));

	vertexIn2.z =  vertexIn.z;



	gl_Position = proj * view * model * vec4(vertexIn2 , 1.0f);
}