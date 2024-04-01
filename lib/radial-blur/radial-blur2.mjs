var source = "struct RadialBlurUniforms {\r\n  uRadian: f32,\r\n  uCenter: vec2<f32>,\r\n  uKernelSize: f32,\r\n  uRadius: f32,\r\n};\r\n\r\nstruct GlobalFilterUniforms {\r\n  uInputSize:vec4<f32>,\r\n  uInputPixel:vec4<f32>,\r\n  uInputClamp:vec4<f32>,\r\n  uOutputFrame:vec4<f32>,\r\n  uGlobalFrame:vec4<f32>,\r\n  uOutputTexture:vec4<f32>,\r\n};\r\n\r\n@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;\r\n\r\n@group(0) @binding(1) var uTexture: texture_2d<f32>; \r\n@group(0) @binding(2) var uSampler: sampler;\r\n@group(1) @binding(0) var<uniform> radialBlurUniforms : RadialBlurUniforms;\r\n\r\n@fragment\r\nfn mainFragment(\r\n  @builtin(position) position: vec4<f32>,\r\n  @location(0) uv : vec2<f32>\r\n) -> @location(0) vec4<f32> {\r\n  let uRadian = radialBlurUniforms.uRadian;\r\n  let uCenter = radialBlurUniforms.uCenter;\r\n  let uKernelSize = radialBlurUniforms.uKernelSize;\r\n  let uRadius = radialBlurUniforms.uRadius;\r\n  \r\n  var returnColorOnly = false;\r\n\r\n  if (uKernelSize == 0)\r\n  {\r\n    returnColorOnly = true;\r\n  }\r\n\r\n  let aspect: f32 = gfu.uInputSize.y / gfu.uInputSize.x;\r\n  let center: vec2<f32> = uCenter.xy / gfu.uInputSize.xy;\r\n  let gradient: f32 = uRadius / gfu.uInputSize.x * 0.3;\r\n  let radius: f32 = uRadius / gfu.uInputSize.x - gradient * 0.5;\r\n  let k: i32 = i32(uKernelSize - 1);\r\n\r\n  var coord: vec2<f32> = uv;\r\n  let dir: vec2<f32> = vec2<f32>(center - coord);\r\n  let dist: f32 = length(vec2<f32>(dir.x, dir.y * aspect));\r\n\r\n  var radianStep: f32 = uRadian;\r\n  \r\n  if (radius >= 0.0 && dist > radius)\r\n  {\r\n    let delta: f32 = dist - radius;\r\n    let gap: f32 = gradient;\r\n    let scale: f32 = 1.0 - abs(delta / gap);\r\n    if (scale <= 0.0) {\r\n      returnColorOnly = true;\r\n    }\r\n    radianStep *= scale;\r\n  }\r\n\r\n  radianStep /= f32(k);\r\n\r\n  let s: f32 = sin(radianStep);\r\n  let c: f32 = cos(radianStep);\r\n  let rotationMatrix: mat2x2<f32> = mat2x2<f32>(vec2<f32>(c, -s), vec2<f32>(s, c));\r\n  \r\n  var color: vec4<f32> = textureSample(uTexture, uSampler, uv);\r\n  let baseColor = vec4<f32>(color);\r\n\r\n  let minK: i32 = min(i32(uKernelSize) - 1, MAX_KERNEL_SIZE - 1);\r\n\r\n  for(var i: i32 = 0; i < minK; i += 1) \r\n  {\r\n    coord -= center;\r\n    coord.y *= aspect;\r\n    coord = rotationMatrix * coord;\r\n    coord.y /= aspect;\r\n    coord += center;\r\n    let sample: vec4<f32> = textureSample(uTexture, uSampler, coord);\r\n    // switch to pre-multiplied alpha to correctly blur transparent images\r\n    // sample.rgb *= sample.a;\r\n    color += sample;\r\n  }\r\n\r\n  return select(color / f32(uKernelSize), baseColor, returnColorOnly);\r\n}\r\n\r\nconst MAX_KERNEL_SIZE: i32 = 2048;";

export { source as default };
//# sourceMappingURL=radial-blur2.mjs.map