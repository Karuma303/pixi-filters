'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var source = "struct AdvancedBloomUniforms {\r\n  uBloomScale: f32,\r\n  uBrightness: f32,\r\n};\r\n\r\n@group(0) @binding(1) var uTexture: texture_2d<f32>; \r\n@group(0) @binding(2) var uSampler: sampler;\r\n@group(1) @binding(0) var<uniform> advancedBloomUniforms : AdvancedBloomUniforms;\r\n@group(1) @binding(1) var uMapTexture: texture_2d<f32>;\r\n\r\n@fragment\r\nfn mainFragment(\r\n  @builtin(position) position: vec4<f32>,\r\n  @location(0) uv : vec2<f32>\r\n) -> @location(0) vec4<f32> {\r\n  var color = textureSample(uTexture, uSampler, uv);\r\n  color = vec4<f32>(color.rgb * advancedBloomUniforms.uBrightness, color.a);\r\n\r\n  var bloomColor = vec4<f32>(textureSample(uMapTexture, uSampler, uv).rgb, 0.0);\r\n  bloomColor = vec4<f32>(bloomColor.rgb * advancedBloomUniforms.uBloomScale, bloomColor.a);\r\n  \r\n  return color + bloomColor;\r\n}\r\n";

exports["default"] = source;
//# sourceMappingURL=advanced-bloom2.js.map
