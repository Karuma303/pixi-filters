'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fragment = "precision highp float;\r\nin vec2 vTextureCoord;\r\nout vec4 finalColor;\r\n\r\nuniform sampler2D uTexture;\r\nuniform sampler2D uMapTexture;\r\nuniform vec3 uColor;\r\nuniform float uAlpha;\r\nuniform vec2 uDimensions;\r\n\r\nuniform vec4 uInputSize;\r\n\r\nvoid main() {\r\n    vec4 diffuseColor = texture(uTexture, vTextureCoord);\r\n    vec2 lightCoord = (vTextureCoord * uInputSize.xy) / uDimensions;\r\n    vec4 light = texture(uMapTexture, lightCoord);\r\n    vec3 ambient = uColor.rgb * uAlpha;\r\n    vec3 intensity = ambient + light.rgb;\r\n    vec3 color = diffuseColor.rgb * intensity;\r\n    finalColor = vec4(color, diffuseColor.a);\r\n}\r\n";

exports["default"] = fragment;
//# sourceMappingURL=simple-lightmap2.js.map
