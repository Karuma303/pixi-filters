'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fragment = "in vec2 vTextureCoord;\r\nout vec4 finalColor;\r\n\r\nuniform sampler2D uTexture;\r\nuniform vec2 uTexelSize;\r\nuniform mat3 uMatrix;\r\n\r\nvoid main(void)\r\n{\r\n    vec4 c11 = texture(uTexture, vTextureCoord - uTexelSize); // top left\r\n    vec4 c12 = texture(uTexture, vec2(vTextureCoord.x, vTextureCoord.y - uTexelSize.y)); // top center\r\n    vec4 c13 = texture(uTexture, vec2(vTextureCoord.x + uTexelSize.x, vTextureCoord.y - uTexelSize.y)); // top right\r\n\r\n    vec4 c21 = texture(uTexture, vec2(vTextureCoord.x - uTexelSize.x, vTextureCoord.y)); // mid left\r\n    vec4 c22 = texture(uTexture, vTextureCoord); // mid center\r\n    vec4 c23 = texture(uTexture, vec2(vTextureCoord.x + uTexelSize.x, vTextureCoord.y)); // mid right\r\n\r\n    vec4 c31 = texture(uTexture, vec2(vTextureCoord.x - uTexelSize.x, vTextureCoord.y + uTexelSize.y)); // bottom left\r\n    vec4 c32 = texture(uTexture, vec2(vTextureCoord.x, vTextureCoord.y + uTexelSize.y)); // bottom center\r\n    vec4 c33 = texture(uTexture, vTextureCoord + uTexelSize); // bottom right\r\n\r\n    finalColor =\r\n        c11 * uMatrix[0][0] + c12 * uMatrix[0][1] + c13 * uMatrix[0][2] +\r\n        c21 * uMatrix[1][0] + c22 * uMatrix[1][1] + c23 * uMatrix[1][2] +\r\n        c31 * uMatrix[2][0] + c32 * uMatrix[2][1] + c33 * uMatrix[2][2];\r\n\r\n    finalColor.a = c22.a;\r\n}";

exports["default"] = fragment;
//# sourceMappingURL=convolution.js.map
