var fragment = "precision highp float;\r\nin vec2 vTextureCoord;\r\nout vec4 finalColor;\r\n\r\nuniform sampler2D uTexture;\r\nuniform float uStrength;\r\n\r\nuniform vec4 uInputSize;\r\n\r\nvoid main(void)\r\n{\r\n\tvec2 onePixel = vec2(1.0 / uInputSize);\r\n\r\n\tvec4 color;\r\n\r\n\tcolor.rgb = vec3(0.5);\r\n\r\n\tcolor -= texture(uTexture, vTextureCoord - onePixel) * uStrength;\r\n\tcolor += texture(uTexture, vTextureCoord + onePixel) * uStrength;\r\n\r\n\tcolor.rgb = vec3((color.r + color.g + color.b) / 3.0);\r\n\r\n\tfloat alpha = texture(uTexture, vTextureCoord).a;\r\n\r\n\tfinalColor = vec4(color.rgb * alpha, alpha);\r\n}\r\n";

export { fragment as default };
//# sourceMappingURL=emboss.mjs.map
