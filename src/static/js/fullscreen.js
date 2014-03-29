var fullscreenVertexShader =
"precision highp float; \
attribute vec2 vertex; \
varying vec2 texcoord; \
void \
main() \
{ \
    texcoord = 0.5 * vertex + 0.5; \
    gl_Position = vec4(vertex, 0.0, 1.0); \
} \
";

var fullscreenFragmentShader =
"precision highp float; \
varying vec2 texcoord; \
uniform sampler2D texture; \
void \
main() \
{ \
    gl_FragColor = texture2D(texture, texcoord); \
} \
";

function fullscreenBuffer(gl)
{
    var buffer = gl.createBuffer();

    if(!buffer)
    {
        console.log("Failed to create buffer");
        return null;
    }

    var vertexArray = [
        -1.0, -1.0,
        +1.0, -1.0,
        +1.0, +1.0,
        +1.0, +1.0,
        -1.0, +1.0,
        -1.0, -1.0
    ];

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW);
    gl.binBuffer(gl.ARRAY_BUFFER, null);

    return buffer;
}