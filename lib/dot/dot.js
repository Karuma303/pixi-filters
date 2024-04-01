'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fragment = "precision highp float;\r\nin vec2 vTextureCoord;\r\nout vec4 finalColor;\r\n\r\nuniform sampler2D uTexture;\r\nuniform float uAngle;\r\nuniform float uScale;\r\nuniform bool uGrayScale;\r\n\r\nuniform vec4 uInputSize;\r\n\r\nfloat pattern()\r\n{\r\n    float s = sin(uAngle), c = cos(uAngle);\r\n    vec2 tex = vTextureCoord * uInputSize.xy;\r\n    vec2 point = vec2(\r\n        c * tex.x - s * tex.y,\r\n        s * tex.x + c * tex.y\r\n    ) * uScale;\r\n    return (sin(point.x) * sin(point.y)) * 4.0;\r\n    }\r\n\r\n    void main()\r\n    {\r\n    vec4 color = texture(uTexture, vTextureCoord);\r\n    vec3 colorRGB = vec3(color);\r\n\r\n    if (uGrayScale)\r\n    {\r\n        colorRGB = vec3(color.r + color.g + color.b) / 3.0;\r\n    }\r\n\r\n    finalColor = vec4(colorRGB * 10.0 - 5.0 + pattern(), color.a);\r\n}\r\n";

exports["default"] = fragment;
//# sourceMappingURL=dot.js.map
