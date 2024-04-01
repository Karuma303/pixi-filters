var fragment = "in vec2 vTextureCoord;\r\nout vec4 finalColor;\r\n\r\nuniform sampler2D uTexture;\r\nuniform vec3 uOriginalColor;\r\nuniform vec3 uTargetColor;\r\nuniform float uTolerance;\r\n\r\nvoid main(void) {\r\n    vec4 c = texture(uTexture, vTextureCoord);\r\n    vec3 colorDiff = uOriginalColor - (c.rgb / max(c.a, 0.0000000001));\r\n    float colorDistance = length(colorDiff);\r\n    float doReplace = step(colorDistance, uTolerance);\r\n    finalColor = vec4(mix(c.rgb, (uTargetColor + colorDiff) * c.a, doReplace), c.a);\r\n}\r\n";

export { fragment as default };
//# sourceMappingURL=color-replace.mjs.map
