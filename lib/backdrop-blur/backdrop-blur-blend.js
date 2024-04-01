'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fragment = "precision highp float;\r\nin vec2 vTextureCoord;\r\nout vec4 finalColor;\r\n\r\nuniform sampler2D uTexture;\r\nuniform sampler2D uBackground;\r\n\r\nvoid main(void){\r\n    vec4 front = texture(uTexture, vTextureCoord);\r\n    vec4 back = texture(uBackground, vTextureCoord);\r\n\r\n    if (front.a == 0.0) {\r\n        discard;\r\n    }\r\n    \r\n    vec3 color = mix(back.rgb, front.rgb / front.a, front.a);\r\n\r\n    finalColor = vec4(color, 1.0);\r\n}";

exports["default"] = fragment;
//# sourceMappingURL=backdrop-blur-blend.js.map
