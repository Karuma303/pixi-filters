var fragment = "\r\nin vec2 vTextureCoord;\r\nout vec4 finalColor;\r\n\r\nuniform sampler2D uTexture;\r\nuniform float uThreshold;\r\n\r\nvoid main() {\r\n    vec4 color = texture(uTexture, vTextureCoord);\r\n\r\n    // A simple & fast algorithm for getting brightness.\r\n    // It's inaccuracy , but good enought for this feature.\r\n    float _max = max(max(color.r, color.g), color.b);\r\n    float _min = min(min(color.r, color.g), color.b);\r\n    float brightness = (_max + _min) * 0.5;\r\n\r\n    if(brightness > uThreshold) {\r\n        finalColor = color;\r\n    } else {\r\n        finalColor = vec4(0.0, 0.0, 0.0, 0.0);\r\n    }\r\n}\r\n";

export { fragment as default };
//# sourceMappingURL=extract-brightness2.mjs.map
