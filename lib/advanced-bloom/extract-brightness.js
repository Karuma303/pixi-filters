'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var source = "struct ExtractBrightnessUniforms {\r\n  uThreshold: f32,\r\n};\r\n\r\n@group(0) @binding(1) var uTexture: texture_2d<f32>; \r\n@group(0) @binding(2) var uSampler: sampler;\r\n@group(1) @binding(0) var<uniform> extractBrightnessUniforms : ExtractBrightnessUniforms;\r\n\r\n@fragment\r\nfn mainFragment(\r\n  @builtin(position) position: vec4<f32>,\r\n  @location(0) uv : vec2<f32>\r\n) -> @location(0) vec4<f32> {\r\n  let color: vec4<f32> = textureSample(uTexture, uSampler, uv);\r\n\r\n  // A simple & fast algorithm for getting brightness.\r\n  // It's inaccurate, but good enough for this feature.\r\n  let max: f32 = max(max(color.r, color.g), color.b);\r\n  let min: f32 = min(min(color.r, color.g), color.b);\r\n  let brightness: f32 = (max + min) * 0.5;\r\n\r\n  return select(vec4<f32>(0.), color, brightness > extractBrightnessUniforms.uThreshold);\r\n}\r\n";

exports["default"] = source;
//# sourceMappingURL=extract-brightness.js.map
