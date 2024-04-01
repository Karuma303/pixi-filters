var wgslFragment = "@group(0) @binding(1) var uTexture: texture_2d<f32>; \r\n@group(0) @binding(2) var uSampler: sampler;\r\n@group(1) @binding(0) var uBackground: texture_2d<f32>; \r\n\r\n@fragment\r\nfn mainFragment(\r\n    @builtin(position) position: vec4<f32>,\r\n    @location(0) uv : vec2<f32>\r\n) -> @location(0) vec4<f32> {\r\n    var front: vec4<f32> = textureSample(uTexture, uSampler, uv);\r\n    var back: vec4<f32> = textureSample(uBackground, uSampler, uv);\r\n    \r\n    if (front.a == 0.0) {\r\n        discard;\r\n    }\r\n\r\n    var color: vec3<f32> = mix(back.rgb, front.rgb / front.a, front.a);\r\n\r\n    return vec4<f32>(color, 1.0);\r\n}";

export { wgslFragment as default };
//# sourceMappingURL=backdrop-blur-blend2.mjs.map
