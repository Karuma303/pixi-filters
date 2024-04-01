'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fragment = "precision highp float;\r\nin vec2 vTextureCoord;\r\nout vec4 finalColor;\r\n\r\nuniform sampler2D uTexture;\r\nuniform vec2 uTwist;\r\nuniform vec2 uOffset;\r\nuniform vec4 uInputSize;\r\n\r\nvec2 mapCoord( vec2 coord )\r\n{\r\n    coord *= uInputSize.xy;\r\n    coord += uInputSize.zw;\r\n\r\n    return coord;\r\n}\r\n\r\nvec2 unmapCoord( vec2 coord )\r\n{\r\n    coord -= uInputSize.zw;\r\n    coord /= uInputSize.xy;\r\n\r\n    return coord;\r\n}\r\n\r\nvec2 twist(vec2 coord)\r\n{\r\n    coord -= uOffset;\r\n\r\n    float dist = length(coord);\r\n    float uRadius = uTwist[0];\r\n    float uAngle = uTwist[1];\r\n\r\n    if (dist < uRadius)\r\n    {\r\n        float ratioDist = (uRadius - dist) / uRadius;\r\n        float angleMod = ratioDist * ratioDist * uAngle;\r\n        float s = sin(angleMod);\r\n        float c = cos(angleMod);\r\n        coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);\r\n    }\r\n\r\n    coord += uOffset;\r\n\r\n    return coord;\r\n}\r\n\r\nvoid main(void)\r\n{\r\n    vec2 coord = mapCoord(vTextureCoord);\r\n    coord = twist(coord);\r\n    coord = unmapCoord(coord);\r\n    finalColor = texture(uTexture, coord);\r\n}\r\n";

exports["default"] = fragment;
//# sourceMappingURL=twist.js.map
