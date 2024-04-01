'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var source = "@group(0) @binding(1) var uTexture: texture_2d<f32>; \r\n@group(0) @binding(2) var uSampler: sampler;\r\n\r\n@fragment\r\nfn mainFragment(\r\n  @location(0) uv: vec2<f32>,\r\n  @builtin(position) position: vec4<f32>\r\n) -> @location(0) vec4<f32> {\r\n  let color: vec4<f32> = textureSample(uTexture, uSampler, uv);\r\n\r\n  let g: f32 = dot(color.rgb, vec3<f32>(0.299, 0.587, 0.114));\r\n  return vec4<f32>(vec3<f32>(g), 1.);\r\n}";

exports["default"] = source;
//# sourceMappingURL=grayscale2.js.map
