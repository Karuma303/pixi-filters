'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var source = "struct DropShadowUniforms {\r\n  uAlpha: f32,\r\n  uColor: vec3<f32>,\r\n  uOffset: vec2<f32>,\r\n};\r\n\r\nstruct GlobalFilterUniforms {\r\n  uInputSize:vec4<f32>,\r\n  uInputPixel:vec4<f32>,\r\n  uInputClamp:vec4<f32>,\r\n  uOutputFrame:vec4<f32>,\r\n  uGlobalFrame:vec4<f32>,\r\n  uOutputTexture:vec4<f32>,\r\n};\r\n\r\n@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;\r\n\r\n@group(0) @binding(1) var uTexture: texture_2d<f32>; \r\n@group(0) @binding(2) var uSampler: sampler;\r\n@group(1) @binding(0) var<uniform> dropShadowUniforms : DropShadowUniforms;\r\n\r\n@fragment\r\nfn mainFragment(\r\n  @builtin(position) position: vec4<f32>,\r\n  @location(0) uv : vec2<f32>\r\n) -> @location(0) vec4<f32> {\r\n  var color: vec4<f32> = textureSample(uTexture, uSampler, uv - dropShadowUniforms.uOffset * gfu.uInputSize.zw);\r\n\r\n  // Premultiply alpha\r\n  color = vec4<f32>(vec3<f32>(dropShadowUniforms.uColor.rgb * color.a), color.a);\r\n  // alpha user alpha\r\n  color *= dropShadowUniforms.uAlpha;\r\n\r\n  return color;\r\n}";

exports["default"] = source;
//# sourceMappingURL=drop-shadow2.js.map
