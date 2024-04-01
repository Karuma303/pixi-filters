'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var source = "struct AdjustmentUniforms {\r\n  uGamma: f32,\r\n  uContrast: f32,\r\n  uSaturation: f32,\r\n  uBrightness: f32,\r\n  uColor: vec4<f32>,\r\n};\r\n\r\n@group(0) @binding(1) var uTexture: texture_2d<f32>; \r\n@group(0) @binding(2) var uSampler: sampler;\r\n@group(1) @binding(0) var<uniform> adjustmentUniforms : AdjustmentUniforms;\r\n\r\n@fragment\r\nfn mainFragment(\r\n  @location(0) uv: vec2<f32>,\r\n  @builtin(position) position: vec4<f32>\r\n) -> @location(0) vec4<f32> {\r\n  var sample = textureSample(uTexture, uSampler, uv);\r\n  let color = adjustmentUniforms.uColor;\r\n\r\n  if (sample.a > 0.0) \r\n  {\r\n    sample = vec4<f32>(sample.rgb / sample.a, sample.a);\r\n    var rgb: vec3<f32> = pow(sample.rgb, vec3<f32>(1. / adjustmentUniforms.uGamma));\r\n    rgb = mix(vec3<f32>(.5), mix(vec3<f32>(dot(vec3<f32>(.2125, .7154, .0721), rgb)), rgb, adjustmentUniforms.uSaturation), adjustmentUniforms.uContrast);\r\n    rgb.r *= color.r;\r\n    rgb.g *= color.g;\r\n    rgb.b *= color.b;\r\n    sample = vec4<f32>(rgb.rgb * adjustmentUniforms.uBrightness, sample.a);\r\n    sample = vec4<f32>(sample.rgb * sample.a, sample.a);\r\n  }\r\n\r\n  return sample * color.a;\r\n}";

exports["default"] = source;
//# sourceMappingURL=adjustment.js.map
