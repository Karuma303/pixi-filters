'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fragment = "in vec2 vTextureCoord;\r\nout vec4 finalColor;\r\n\r\nuniform sampler2D uTexture;\r\nuniform vec3 uHsl;\r\nuniform float uAlpha;\r\nuniform float uColorize;\r\n\r\n// https://en.wikipedia.org/wiki/Luma_(video)\r\nconst vec3 weight = vec3(0.299, 0.587, 0.114);\r\n\r\nfloat getWeightedAverage(vec3 rgb) {\r\n    return rgb.r * weight.r + rgb.g * weight.g + rgb.b * weight.b;\r\n}\r\n\r\n// https://gist.github.com/mairod/a75e7b44f68110e1576d77419d608786?permalink_comment_id=3195243#gistcomment-3195243\r\nconst vec3 k = vec3(0.57735, 0.57735, 0.57735);\r\n\r\nvec3 hueShift(vec3 color, float angle) {\r\n    float cosAngle = cos(angle);\r\n    return vec3(\r\n    color * cosAngle +\r\n    cross(k, color) * sin(angle) +\r\n    k * dot(k, color) * (1.0 - cosAngle)\r\n    );\r\n}\r\n\r\nvoid main()\r\n{\r\n    vec4 color = texture(uTexture, vTextureCoord);\r\n    vec3 resultRGB = color.rgb;\r\n\r\n    float hue = uHsl[0];\r\n    float saturation = uHsl[1];\r\n    float lightness = uHsl[2];\r\n\r\n    // colorize\r\n    if (uColorize > 0.5) {\r\n        resultRGB = vec3(getWeightedAverage(resultRGB), 0., 0.);\r\n    }\r\n\r\n    // hue\r\n    resultRGB = hueShift(resultRGB, hue);\r\n\r\n    // saturation\r\n    // https://github.com/evanw/glfx.js/blob/master/src/filters/adjust/huesaturation.js\r\n    float average = (resultRGB.r + resultRGB.g + resultRGB.b) / 3.0;\r\n\r\n    if (saturation > 0.) {\r\n        resultRGB += (average - resultRGB) * (1. - 1. / (1.001 - saturation));\r\n    } else {\r\n        resultRGB -= (average - resultRGB) * saturation;\r\n    }\r\n\r\n    // lightness\r\n    resultRGB = mix(resultRGB, vec3(ceil(lightness)) * color.a, abs(lightness));\r\n\r\n    // alpha\r\n    finalColor = mix(color, vec4(resultRGB, color.a), uAlpha);\r\n}\r\n";

exports["default"] = fragment;
//# sourceMappingURL=hsladjustment.js.map