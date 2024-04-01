'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var source = "struct ColorOverlayUniforms {\r\n    uColor: vec3<f32>,\r\n    uAlpha: f32,\r\n};\r\n\r\n@group(0) @binding(1) var uTexture: texture_2d<f32>; \r\n@group(0) @binding(2) var uSampler: sampler;\r\n@group(1) @binding(0) var<uniform> colorOverlayUniforms : ColorOverlayUniforms;\r\n\r\n@fragment\r\nfn mainFragment(\r\n    @builtin(position) position: vec4<f32>,\r\n    @location(0) uv : vec2<f32>\r\n) -> @location(0) vec4<f32> {\r\n    let c = textureSample(uTexture, uSampler, uv);\r\n    return vec4<f32>(mix(c.rgb, colorOverlayUniforms.uColor.rgb, c.a * colorOverlayUniforms.uAlpha), c.a);\r\n}\r\n";

exports["default"] = source;
//# sourceMappingURL=color-overlay2.js.map
