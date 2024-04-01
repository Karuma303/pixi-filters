var fragment = "in vec2 vTextureCoord;\r\n\r\nout vec4 finalColor;\r\n\r\nuniform sampler2D uTexture;\r\n\r\n// https://en.wikipedia.org/wiki/Luma_(video)\r\nconst vec3 weight = vec3(0.299, 0.587, 0.114);\r\n\r\nvoid main()\r\n{\r\n    vec4 c = texture(uTexture, vTextureCoord);\r\n    finalColor = vec4(\r\n        vec3(c.r * weight.r + c.g * weight.g  + c.b * weight.b),\r\n        c.a\r\n    );\r\n}\r\n";

export { fragment as default };
//# sourceMappingURL=grayscale.mjs.map
