'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var source = "struct ColorReplaceUniforms {\r\n  uOriginalColor: vec3<f32>,\r\n  uTargetColor: vec3<f32>,\r\n  uTolerance: f32,\r\n};\r\n\r\n@group(0) @binding(1) var uTexture: texture_2d<f32>; \r\n@group(0) @binding(2) var uSampler: sampler;\r\n@group(1) @binding(0) var<uniform> colorReplaceUniforms : ColorReplaceUniforms;\r\n\r\n@fragment\r\nfn mainFragment(\r\n   @builtin(position) position: vec4<f32>,\r\n    @location(0) uv : vec2<f32>\r\n) -> @location(0) vec4<f32> {\r\n  let sample: vec4<f32> = textureSample(uTexture, uSampler, uv);\r\n\r\n  let colorDiff: vec3<f32> = colorReplaceUniforms.uOriginalColor - (sample.rgb / max(sample.a, 0.0000000001));\r\n  let colorDistance: f32 = length(colorDiff);\r\n  let doReplace: f32 = step(colorDistance, colorReplaceUniforms.uTolerance);\r\n\r\n  return vec4<f32>(mix(sample.rgb, (colorReplaceUniforms.uTargetColor + colorDiff) * sample.a, doReplace), sample.a);\r\n}";

exports["default"] = source;
//# sourceMappingURL=color-replace2.js.map
