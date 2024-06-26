'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pixi_js = require('pixi.js');
var colorGradient$2 = require('./color-gradient.js');
var colorGradient$1 = require('./color-gradient2.js');
var colorGradient = require('./color-gradient3.js');
var CssGradientParser = require('./CssGradientParser.js');

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const ANGLE_OFFSET = 90;
function sortColorStops(stops) {
  return [...stops].sort((a, b) => a.offset - b.offset);
}
const _ColorGradientFilter = class _ColorGradientFilter extends pixi_js.Filter {
  /**
   * @param options - Options for the ColorGradientFilter constructor.
   */
  constructor(options) {
    if (options && "css" in options) {
      options = {
        ...CssGradientParser.parseCssGradient(options.css || ""),
        alpha: options.alpha ?? _ColorGradientFilter.defaults.alpha,
        maxColors: options.maxColors ?? _ColorGradientFilter.defaults.maxColors
      };
    } else {
      options = { ..._ColorGradientFilter.defaults, ...options };
    }
    if (!options.stops || options.stops.length < 2) {
      throw new Error("ColorGradientFilter requires at least 2 color stops.");
    }
    const gpuProgram = pixi_js.GpuProgram.from({
      vertex: {
        source: colorGradient["default"],
        entryPoint: "mainVertex"
      },
      fragment: {
        source: colorGradient["default"],
        entryPoint: "mainFragment"
      }
    });
    const glProgram = pixi_js.GlProgram.from({
      vertex: colorGradient$1["default"],
      fragment: colorGradient$2["default"],
      name: "color-gradient-filter"
    });
    const maxStops = 32;
    super({
      gpuProgram,
      glProgram,
      resources: {
        baseUniforms: {
          uOptions: {
            value: [
              // Gradient Type
              options.type,
              // Gradient Angle
              options.angle ?? ANGLE_OFFSET,
              // Master Alpha
              options.alpha,
              // Replace Base Color
              options.replace ? 1 : 0
            ],
            type: "vec4<f32>"
          },
          uCounts: {
            value: [
              // Number of Stops
              options.stops.length,
              // Max Gradient Colors
              options.maxColors
            ],
            type: "vec2<f32>"
          }
        },
        stopsUniforms: {
          uColors: { value: new Float32Array(maxStops * 3), type: "vec3<f32>", size: maxStops },
          // We only need vec2, but we need to pad to eliminate the WGSL warning, TODO: @Mat ?
          uStops: { value: new Float32Array(maxStops * 4), type: "vec4<f32>", size: maxStops }
        }
      }
    });
    __publicField(this, "baseUniforms");
    __publicField(this, "stopsUniforms");
    __publicField(this, "_stops", []);
    this.baseUniforms = this.resources.baseUniforms.uniforms;
    this.stopsUniforms = this.resources.stopsUniforms.uniforms;
    Object.assign(this, options);
  }
  get stops() {
    return this._stops;
  }
  set stops(stops) {
    const sortedStops = sortColorStops(stops);
    const color = new pixi_js.Color();
    let r;
    let g;
    let b;
    for (let i = 0; i < sortedStops.length; i++) {
      color.setValue(sortedStops[i].color);
      const indexStart = i * 3;
      [r, g, b] = color.toArray();
      this.stopsUniforms.uColors[indexStart] = r;
      this.stopsUniforms.uColors[indexStart + 1] = g;
      this.stopsUniforms.uColors[indexStart + 2] = b;
      this.stopsUniforms.uStops[i * 4] = sortedStops[i].offset;
      this.stopsUniforms.uStops[i * 4 + 1] = sortedStops[i].alpha;
    }
    this.baseUniforms.uCounts[0] = sortedStops.length;
    this._stops = sortedStops;
  }
  /**
  * The type of gradient
  * @default ColorGradientFilter.LINEAR
  */
  get type() {
    return this.baseUniforms.uOptions[0];
  }
  set type(value) {
    this.baseUniforms.uOptions[0] = value;
  }
  /**
  * The angle of the gradient in degrees
  * @default 90
  */
  get angle() {
    return this.baseUniforms.uOptions[1] + ANGLE_OFFSET;
  }
  set angle(value) {
    this.baseUniforms.uOptions[1] = value - ANGLE_OFFSET;
  }
  /**
  * The alpha value of the gradient (0-1)
  * @default 1
  */
  get alpha() {
    return this.baseUniforms.uOptions[2];
  }
  set alpha(value) {
    this.baseUniforms.uOptions[2] = value;
  }
  /**
  * The maximum number of colors to render (0 = no limit)
  * @default 0
  */
  get maxColors() {
    return this.baseUniforms.uCounts[1];
  }
  set maxColors(value) {
    this.baseUniforms.uCounts[1] = value;
  }
  /**
   * If true, the gradient will replace the existing color, otherwise it
   * will be multiplied with it
   * @default false
   */
  get replace() {
    return this.baseUniforms.uOptions[3] > 0.5;
  }
  set replace(value) {
    this.baseUniforms.uOptions[3] = value ? 1 : 0;
  }
};
/** Gradient types */
__publicField(_ColorGradientFilter, "LINEAR", 0);
__publicField(_ColorGradientFilter, "RADIAL", 1);
__publicField(_ColorGradientFilter, "CONIC", 2);
/** Default constructor options */
__publicField(_ColorGradientFilter, "defaults", {
  type: _ColorGradientFilter.LINEAR,
  stops: [
    { offset: 0, color: 16711680, alpha: 1 },
    { offset: 1, color: 255, alpha: 1 }
  ],
  alpha: 1,
  angle: 90,
  maxColors: 0,
  replace: false
});
let ColorGradientFilter = _ColorGradientFilter;

exports.ColorGradientFilter = ColorGradientFilter;
//# sourceMappingURL=ColorGradientFilter.js.map
