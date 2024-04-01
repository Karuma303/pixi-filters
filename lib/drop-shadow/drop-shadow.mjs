var fragment = "precision highp float;\r\nin vec2 vTextureCoord;\r\nout vec4 finalColor;\r\n\r\nuniform sampler2D uTexture;\r\nuniform float uAlpha;\r\nuniform vec3 uColor;\r\nuniform vec2 uOffset;\r\n\r\nuniform vec4 uInputSize;\r\n\r\nvoid main(void){\r\n    vec4 sample = texture(uTexture, vTextureCoord - uOffset * uInputSize.zw);\r\n\r\n    // Premultiply alpha\r\n    sample.rgb = uColor.rgb * sample.a;\r\n\r\n    // alpha user alpha\r\n    sample *= uAlpha;\r\n\r\n    finalColor = sample;\r\n}";

export { fragment as default };
//# sourceMappingURL=drop-shadow.mjs.map
