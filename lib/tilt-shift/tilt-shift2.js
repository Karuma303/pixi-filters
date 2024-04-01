'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fragment = "in vec2 vTextureCoord;\r\nout vec4 finalColor;\r\n\r\nuniform sampler2D uTexture;\r\nuniform vec2 uBlur;\r\nuniform vec2 uStart;\r\nuniform vec2 uEnd;\r\nuniform vec2 uDelta;\r\nuniform vec2 uTexSize;\r\n\r\nfloat random(vec3 scale, float seed)\r\n{\r\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\r\n}\r\n\r\nvoid main(void)\r\n{\r\n    vec4 color = vec4(0.0);\r\n    float total = 0.0;\r\n\r\n    float blur = uBlur[0];\r\n    float gradientBlur = uBlur[1];\r\n\r\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\r\n    vec2 normal = normalize(vec2(uStart.y - uEnd.y, uEnd.x - uStart.x));\r\n    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * uTexSize - uStart, normal)) / gradientBlur) * blur;\r\n\r\n    for (float t = -30.0; t <= 30.0; t++)\r\n    {\r\n        float percent = (t + offset - 0.5) / 30.0;\r\n        float weight = 1.0 - abs(percent);\r\n        vec4 sample = texture(uTexture, vTextureCoord + uDelta / uTexSize * percent * radius);\r\n        sample.rgb *= sample.a;\r\n        color += sample * weight;\r\n        total += weight;\r\n    }\r\n\r\n    color /= total;\r\n    color.rgb /= color.a + 0.00001;\r\n\r\n    finalColor = color;\r\n}\r\n";

exports["default"] = fragment;
//# sourceMappingURL=tilt-shift2.js.map
