var fragment = "\r\nprecision highp float;\r\nin vec2 vTextureCoord;\r\nout vec4 finalColor;\r\n\r\nuniform sampler2D uTexture;\r\nuniform vec2 uCenter;\r\nuniform float uTime;\r\nuniform float uSpeed;\r\nuniform vec4 uWave;\r\n\r\nuniform vec4 uInputSize;\r\nuniform vec4 uInputClamp;\r\n\r\nconst float PI = 3.14159;\r\n\r\nvoid main()\r\n{\r\n    float uAmplitude = uWave[0];\r\n    float uWavelength = uWave[1];\r\n    float uBrightness = uWave[2];\r\n    float uRadius = uWave[3];\r\n\r\n    float halfWavelength = uWavelength * 0.5 / uInputSize.x;\r\n    float maxRadius = uRadius / uInputSize.x;\r\n    float currentRadius = uTime * uSpeed / uInputSize.x;\r\n\r\n    float fade = 1.0;\r\n\r\n    if (maxRadius > 0.0) {\r\n        if (currentRadius > maxRadius) {\r\n            finalColor = texture(uTexture, vTextureCoord);\r\n            return;\r\n        }\r\n        fade = 1.0 - pow(currentRadius / maxRadius, 2.0);\r\n    }\r\n\r\n    vec2 dir = vec2(vTextureCoord - uCenter / uInputSize.xy);\r\n    dir.y *= uInputSize.y / uInputSize.x;\r\n    float dist = length(dir);\r\n\r\n    if (dist <= 0.0 || dist < currentRadius - halfWavelength || dist > currentRadius + halfWavelength) {\r\n        finalColor = texture(uTexture, vTextureCoord);\r\n        return;\r\n    }\r\n\r\n    vec2 diffUV = normalize(dir);\r\n\r\n    float diff = (dist - currentRadius) / halfWavelength;\r\n\r\n    float p = 1.0 - pow(abs(diff), 2.0);\r\n\r\n    // float powDiff = diff * pow(p, 2.0) * ( amplitude * fade );\r\n    float powDiff = 1.25 * sin(diff * PI) * p * ( uAmplitude * fade );\r\n\r\n    vec2 offset = diffUV * powDiff / uInputSize.xy;\r\n\r\n    // Do clamp :\r\n    vec2 coord = vTextureCoord + offset;\r\n    vec2 clampedCoord = clamp(coord, uInputClamp.xy, uInputClamp.zw);\r\n    vec4 color = texture(uTexture, clampedCoord);\r\n    if (coord != clampedCoord) {\r\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\r\n    }\r\n\r\n    // No clamp :\r\n    // finalColor = texture(uTexture, vTextureCoord + offset);\r\n\r\n    color.rgb *= 1.0 + (uBrightness - 1.0) * p * fade;\r\n\r\n    finalColor = color;\r\n}\r\n";

export { fragment as default };
//# sourceMappingURL=shockwave2.mjs.map