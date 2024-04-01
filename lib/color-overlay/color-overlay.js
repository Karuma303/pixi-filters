'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fragment = "in vec2 vTextureCoord;\r\nout vec4 finalColor;\r\n\r\nuniform sampler2D uTexture;\r\nuniform vec3 uColor;\r\nuniform float uAlpha;\r\n\r\nvoid main(void) {\r\n    vec4 c = texture(uTexture, vTextureCoord);\r\n    finalColor = vec4(mix(c.rgb, uColor.rgb, c.a * uAlpha), c.a);\r\n}\r\n";

exports["default"] = fragment;
//# sourceMappingURL=color-overlay.js.map
