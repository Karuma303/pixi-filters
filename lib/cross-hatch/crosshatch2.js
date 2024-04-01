'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fragment = "in vec2 vTextureCoord;\r\nout vec4 finalColor;\r\n\r\nuniform sampler2D uTexture;\r\n\r\nvoid main(void)\r\n{\r\n    float lum = length(texture(uTexture, vTextureCoord.xy).rgb);\r\n\r\n    finalColor = vec4(1.0, 1.0, 1.0, 1.0);\r\n\r\n    if (lum < 1.00)\r\n    {\r\n        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0)\r\n        {\r\n            finalColor = vec4(0.0, 0.0, 0.0, 1.0);\r\n        }\r\n    }\r\n\r\n    if (lum < 0.75)\r\n    {\r\n        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0)\r\n        {\r\n            finalColor = vec4(0.0, 0.0, 0.0, 1.0);\r\n        }\r\n    }\r\n\r\n    if (lum < 0.50)\r\n    {\r\n        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0)\r\n        {\r\n            finalColor = vec4(0.0, 0.0, 0.0, 1.0);\r\n        }\r\n    }\r\n\r\n    if (lum < 0.3)\r\n    {\r\n        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0)\r\n        {\r\n            finalColor = vec4(0.0, 0.0, 0.0, 1.0);\r\n        }\r\n    }\r\n}\r\n";

exports["default"] = fragment;
//# sourceMappingURL=crosshatch2.js.map
