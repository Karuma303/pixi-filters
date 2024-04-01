'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var source = "struct GlitchUniforms {\r\n  uSeed: f32,\r\n  uDimensions: vec2<f32>,\r\n  uAspect: f32,\r\n  uFillMode: f32,\r\n  uOffset: f32,\r\n  uDirection: f32,\r\n  uRed: vec2<f32>,\r\n  uGreen: vec2<f32>,\r\n  uBlue: vec2<f32>,\r\n};\r\n\r\nstruct GlobalFilterUniforms {\r\n  uInputSize:vec4<f32>,\r\n  uInputPixel:vec4<f32>,\r\n  uInputClamp:vec4<f32>,\r\n  uOutputFrame:vec4<f32>,\r\n  uGlobalFrame:vec4<f32>,\r\n  uOutputTexture:vec4<f32>,\r\n};\r\n\r\n@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;\r\n\r\n@group(0) @binding(1) var uTexture: texture_2d<f32>; \r\n@group(0) @binding(2) var uSampler: sampler;\r\n@group(1) @binding(0) var<uniform> glitchUniforms : GlitchUniforms;\r\n@group(1) @binding(1) var uDisplacementMap: texture_2d<f32>; \r\n@group(1) @binding(2) var uDisplacementSampler: sampler; \r\n\r\n@fragment\r\nfn mainFragment(\r\n  @builtin(position) position: vec4<f32>,\r\n  @location(0) uv : vec2<f32>\r\n) -> @location(0) vec4<f32> {\r\n  let uSeed: f32 = glitchUniforms.uSeed;\r\n  let uDimensions: vec2<f32> = glitchUniforms.uDimensions;\r\n  let uAspect: f32 = glitchUniforms.uAspect;\r\n  let uOffset: f32 = glitchUniforms.uOffset;\r\n  let uDirection: f32 = glitchUniforms.uDirection;\r\n  let uRed: vec2<f32> = glitchUniforms.uRed;\r\n  let uGreen: vec2<f32> = glitchUniforms.uGreen;\r\n  let uBlue: vec2<f32> = glitchUniforms.uBlue;\r\n\r\n  let uInputSize: vec4<f32> = gfu.uInputSize;\r\n  let uInputClamp: vec4<f32> = gfu.uInputClamp;\r\n\r\n  var discarded: bool = false;\r\n  var coord: vec2<f32> = (uv * uInputSize.xy) / uDimensions;\r\n\r\n    if (coord.x > 1.0 || coord.y > 1.0) {\r\n      discarded = true;\r\n    }\r\n\r\n    let sinDir: f32 = sin(uDirection);\r\n    let cosDir: f32 = cos(uDirection);\r\n\r\n    let cx: f32 = coord.x - 0.5;\r\n    let cy: f32 = (coord.y - 0.5) * uAspect;\r\n    var ny: f32 = (-sinDir * cx + cosDir * cy) / uAspect + 0.5;\r\n\r\n    ny = select(select(ny, -ny, ny < 0.0), 2.0 - ny, ny > 1.0);\r\n\r\n    let dc: vec4<f32> = textureSample(uDisplacementMap, uDisplacementSampler, vec2<f32>(0.5, ny));\r\n\r\n    let displacement: f32 = (dc.r - dc.g) * (uOffset / uInputSize.x);\r\n\r\n    coord = uv + vec2<f32>(cosDir * displacement, sinDir * displacement * uAspect);\r\n\r\n    let fillMode: i32 = i32(glitchUniforms.uFillMode);\r\n\r\n    if (fillMode == CLAMP) {\r\n      coord = clamp(coord, uInputClamp.xy, uInputClamp.zw);\r\n    } else {\r\n      if (coord.x > uInputClamp.z) {\r\n        if (fillMode == TRANSPARENT) {\r\n          discarded = true;\r\n        } else if (fillMode == LOOP) {\r\n          coord.x = coord.x - uInputClamp.z;\r\n        } else if (fillMode == MIRROR) {\r\n          coord.x = uInputClamp.z * 2.0 - coord.x;\r\n        }\r\n      } else if (coord.x < uInputClamp.x) {\r\n        if (fillMode == TRANSPARENT) {\r\n          discarded = true;\r\n        } else if (fillMode == LOOP) {\r\n          coord.x = coord.x + uInputClamp.z;\r\n        } else if (fillMode == MIRROR) {\r\n          coord.x = coord.x * -uInputClamp.z;\r\n        }\r\n      }\r\n\r\n      if (coord.y > uInputClamp.w) {\r\n        if (fillMode == TRANSPARENT) {\r\n          discarded = true;\r\n        } else if (fillMode == LOOP) {\r\n          coord.y = coord.y - uInputClamp.w;\r\n        } else if (fillMode == MIRROR) {\r\n          coord.y = uInputClamp.w * 2.0 - coord.y;\r\n        }\r\n      } else if (coord.y < uInputClamp.y) {\r\n        if (fillMode == TRANSPARENT) {\r\n          discarded = true;\r\n        } else if (fillMode == LOOP) {\r\n          coord.y = coord.y + uInputClamp.w;\r\n        } else if (fillMode == MIRROR) {\r\n          coord.y = coord.y * -uInputClamp.w;\r\n        }\r\n      }\r\n    }\r\n\r\n    let seedR: f32 = 1.0 - uSeed * 0.4;\r\n    let seedG: f32 = 1.0 - uSeed * 0.3;\r\n    let seedB: f32 = 1.0 - uSeed * 0.2;\r\n\r\n    let offsetR: vec2<f32> = vec2(uRed.x * seedR / uInputSize.x, uRed.y * seedR / uInputSize.y);\r\n    let offsetG: vec2<f32> = vec2(uGreen.x * seedG / uInputSize.x, uGreen.y * seedG / uInputSize.y);\r\n    let offsetB: vec2<f32> = vec2(uBlue.x * seedB / uInputSize.x, uBlue.y * seedB / uInputSize.y);\r\n\r\n    let r = textureSample(uTexture, uSampler, coord + offsetR).r;\r\n    let g = textureSample(uTexture, uSampler, coord + offsetG).g;\r\n    let b = textureSample(uTexture, uSampler, coord + offsetB).b;\r\n    let a = textureSample(uTexture, uSampler, coord).a;\r\n\r\n    return select(vec4<f32>(r, g, b, a), vec4<f32>(0.0,0.0,0.0,0.0), discarded);\r\n}\r\n\r\nconst TRANSPARENT: i32 = 0;\r\nconst ORIGINAL: i32 = 1;\r\nconst LOOP: i32 = 2;\r\nconst CLAMP: i32 = 3;\r\nconst MIRROR: i32 = 4;";

exports["default"] = source;
//# sourceMappingURL=glitch.js.map