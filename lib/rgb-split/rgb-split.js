'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fragment = "precision highp float;\r\nin vec2 vTextureCoord;\r\nout vec4 finalColor;\r\n\r\nuniform sampler2D uTexture;\r\nuniform vec4 uInputSize;\r\nuniform vec2 uRed;\r\nuniform vec2 uGreen;\r\nuniform vec2 uBlue;\r\n\r\nvoid main(void)\r\n{\r\n   float r = texture(uTexture, vTextureCoord + uRed/uInputSize.xy).r;\r\n   float g = texture(uTexture, vTextureCoord + uGreen/uInputSize.xy).g;\r\n   float b = texture(uTexture, vTextureCoord + uBlue/uInputSize.xy).b;\r\n   float a = texture(uTexture, vTextureCoord).a;\r\n   finalColor = vec4(r, g, b, a);\r\n}\r\n";

exports["default"] = fragment;
//# sourceMappingURL=rgb-split.js.map
