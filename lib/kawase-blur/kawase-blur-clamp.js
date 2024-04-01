'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fragmentClamp = "\r\nprecision highp float;\r\nin vec2 vTextureCoord;\r\nout vec4 finalColor;\r\n\r\nuniform sampler2D uTexture;\r\nuniform vec2 uOffset;\r\n\r\nuniform vec4 uInputClamp;\r\n\r\nvoid main(void)\r\n{\r\n    vec4 color = vec4(0.0);\r\n\r\n    // Sample top left pixel\r\n    color += texture(uTexture, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y), uInputClamp.xy, uInputClamp.zw));\r\n\r\n    // Sample top right pixel\r\n    color += texture(uTexture, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y), uInputClamp.xy, uInputClamp.zw));\r\n\r\n    // Sample bottom right pixel\r\n    color += texture(uTexture, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y), uInputClamp.xy, uInputClamp.zw));\r\n\r\n    // Sample bottom left pixel\r\n    color += texture(uTexture, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y), uInputClamp.xy, uInputClamp.zw));\r\n\r\n    // Average\r\n    color *= 0.25;\r\n\r\n    finalColor = color;\r\n}\r\n";

exports["default"] = fragmentClamp;
//# sourceMappingURL=kawase-blur-clamp.js.map
