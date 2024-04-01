var source = "struct BulgePinchUniforms {\r\n  uDimensions: vec2<f32>,\r\n  uCenter: vec2<f32>,\r\n  uRadius: f32,\r\n  uStrength: f32,\r\n};\r\n\r\nstruct GlobalFilterUniforms {\r\n  uInputSize:vec4<f32>,\r\n  uInputPixel:vec4<f32>,\r\n  uInputClamp:vec4<f32>,\r\n  uOutputFrame:vec4<f32>,\r\n  uGlobalFrame:vec4<f32>,\r\n  uOutputTexture:vec4<f32>,\r\n};\r\n\r\n@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;\r\n\r\n@group(0) @binding(1) var uTexture: texture_2d<f32>; \r\n@group(0) @binding(2) var uSampler: sampler;\r\n@group(1) @binding(0) var<uniform> bulgePinchUniforms : BulgePinchUniforms;\r\n\r\n@fragment\r\nfn mainFragment(\r\n  @builtin(position) position: vec4<f32>,\r\n  @location(0) uv : vec2<f32>\r\n) -> @location(0) vec4<f32> {\r\n  let dimensions: vec2<f32> = bulgePinchUniforms.uDimensions;\r\n  let center: vec2<f32> = bulgePinchUniforms.uCenter;\r\n  let radius: f32 = bulgePinchUniforms.uRadius;\r\n  let strength: f32 = bulgePinchUniforms.uStrength;\r\n  var coord: vec2<f32> = (uv * gfu.uInputSize.xy) - center * dimensions.xy;\r\n\r\n  let distance: f32 = length(coord);\r\n\r\n  if (distance < radius) {\r\n      let percent: f32 = distance / radius;\r\n      if (strength > 0.0) {\r\n          coord *= mix(1.0, smoothstep(0.0, radius / distance, percent), strength * 0.75);\r\n      } else {\r\n          coord *= mix(1.0, pow(percent, 1.0 + strength * 0.75) * radius / distance, 1.0 - percent);\r\n      }\r\n  }\r\n    coord += (center * dimensions.xy);\r\n    coord /= gfu.uInputSize.xy;\r\n\r\n    let clampedCoord: vec2<f32> = clamp(coord, gfu.uInputClamp.xy, gfu.uInputClamp.zw);\r\n    var color: vec4<f32> = textureSample(uTexture, uSampler, clampedCoord);\r\n    if (coord.x != clampedCoord.x && coord.y != clampedCoord.y) {\r\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\r\n    }\r\n\r\n    return color;\r\n}\r\n\r\nfn compareVec2(x: vec2<f32>, y: vec2<f32>) -> bool\r\n{\r\n  if (x.x == y.x && x.y == y.y)\r\n  {\r\n    return true;\r\n  }\r\n\r\n  return false;\r\n}";

export { source as default };
//# sourceMappingURL=bulge-pinch2.mjs.map
