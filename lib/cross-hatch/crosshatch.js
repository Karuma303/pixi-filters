'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var source = "@group(0) @binding(1) var uTexture: texture_2d<f32>; \r\n@group(0) @binding(2) var uSampler: sampler;\r\n\r\n@fragment\r\nfn mainFragment(\r\n    @location(0) uv: vec2<f32>,\r\n    @builtin(position) position: vec4<f32>\r\n) -> @location(0) vec4<f32> {\r\n    let lum: f32 = length(textureSample(uTexture, uSampler, uv).rgb);\r\n\r\n    if (lum < 1.00)\r\n    {\r\n        if (modulo(position.x + position.y, 10.0) == 0.0)\r\n        {\r\n            return vec4<f32>(0.0, 0.0, 0.0, 1.0);\r\n        }\r\n    }\r\n\r\n    if (lum < 0.75)\r\n    {\r\n        if (modulo(position.x - position.y, 10.0) == 0.0)\r\n        {\r\n            return vec4<f32>(0.0, 0.0, 0.0, 1.0);\r\n        }\r\n    }\r\n\r\n    if (lum < 0.50)\r\n    {\r\n        if (modulo(position.x + position.y - 5.0, 10.0) == 0.0)\r\n        {\r\n            return vec4<f32>(0.0, 0.0, 0.0, 1.0);\r\n        }\r\n    }\r\n\r\n    if (lum < 0.3)\r\n    {\r\n        if (modulo(position.x - position.y - 5.0, 10.0) == 0.0)\r\n        {\r\n            return vec4<f32>(0.0, 0.0, 0.0, 1.0);\r\n        }\r\n    }\r\n\r\n    return vec4<f32>(1.0);\r\n}\r\n\r\nfn modulo(x: f32, y: f32) -> f32\r\n{\r\n  return x - y * floor(x/y);\r\n}";

exports["default"] = source;
//# sourceMappingURL=crosshatch.js.map
