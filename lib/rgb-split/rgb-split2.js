'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var source = "struct RgbSplitUniforms {\r\n    uRed: vec2<f32>,\r\n    uGreen: vec2<f32>,\r\n    uBlue: vec3<f32>,\r\n};\r\n\r\nstruct GlobalFilterUniforms {\r\n    uInputSize:vec4<f32>,\r\n    uInputPixel:vec4<f32>,\r\n    uInputClamp:vec4<f32>,\r\n    uOutputFrame:vec4<f32>,\r\n    uGlobalFrame:vec4<f32>,\r\n    uOutputTexture:vec4<f32>,\r\n};\r\n\r\n@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;\r\n\r\n@group(0) @binding(1) var uTexture: texture_2d<f32>; \r\n@group(0) @binding(2) var uSampler: sampler;\r\n@group(1) @binding(0) var<uniform> rgbSplitUniforms : RgbSplitUniforms;\r\n\r\n@fragment\r\nfn mainFragment(\r\n    @builtin(position) position: vec4<f32>,\r\n    @location(0) uv : vec2<f32>\r\n) -> @location(0) vec4<f32> {\r\n    let r = textureSample(uTexture, uSampler, uv + vec2<f32>(rgbSplitUniforms.uRed.x / gfu.uInputSize.x, rgbSplitUniforms.uRed.y / gfu.uInputSize.y)).r;\r\n    let g = textureSample(uTexture, uSampler, uv + vec2<f32>(rgbSplitUniforms.uGreen.x / gfu.uInputSize.x, rgbSplitUniforms.uGreen.y / gfu.uInputSize.y)).g;\r\n    let b = textureSample(uTexture, uSampler, uv + vec2<f32>(rgbSplitUniforms.uBlue.x / gfu.uInputSize.x, rgbSplitUniforms.uBlue.y / gfu.uInputSize.y)).b;\r\n    let a = textureSample(uTexture, uSampler, uv).a;\r\n    return vec4<f32>(r, g, b, a);\r\n}\r\n";

exports["default"] = source;
//# sourceMappingURL=rgb-split2.js.map
