'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fragment = "in vec2 vTextureCoord;\r\nout vec4 finalColor;\r\n\r\nuniform sampler2D uTexture;\r\nuniform sampler2D uMapTexture;\r\nuniform float uBloomScale;\r\nuniform float uBrightness;\r\n\r\nvoid main() {\r\n    vec4 color = texture(uTexture, vTextureCoord);\r\n    color.rgb *= uBrightness;\r\n    vec4 bloomColor = vec4(texture(uMapTexture, vTextureCoord).rgb, 0.0);\r\n    bloomColor.rgb *= uBloomScale;\r\n    finalColor = color + bloomColor;\r\n}\r\n";

exports["default"] = fragment;
//# sourceMappingURL=advanced-bloom.js.map
