import { Filter, deprecation, GpuProgram, GlProgram, Color } from 'pixi.js';
import vertex from '../defaults/default.mjs';
import wgslVertex from '../defaults/default2.mjs';
import fragment from './ascii2.mjs';
import source from './ascii.mjs';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const _AsciiFilter = class _AsciiFilter extends Filter {
  /** @ignore */
  constructor(...args) {
    let options = args[0] ?? {};
    if (typeof options === "number") {
      deprecation("6.0.0", "AsciiFilter constructor params are now options object. See params: { size, color, replaceColor }");
      options = { size: options };
    }
    const replaceColor = options?.color && options.replaceColor !== false;
    options = { ..._AsciiFilter.DEFAULT_OPTIONS, ...options };
    const gpuProgram = GpuProgram.from({
      vertex: {
        source: wgslVertex,
        entryPoint: "mainVertex"
      },
      fragment: {
        source,
        entryPoint: "mainFragment"
      }
    });
    const glProgram = GlProgram.from({
      vertex,
      fragment,
      name: "ascii-filter"
    });
    super({
      gpuProgram,
      glProgram,
      resources: {
        asciiUniforms: {
          uSize: { value: options.size, type: "f32" },
          uColor: { value: new Float32Array(3), type: "vec3<f32>" },
          uReplaceColor: { value: Number(replaceColor), type: "f32" }
        }
      }
    });
    __publicField(this, "uniforms");
    __publicField(this, "_color");
    this.uniforms = this.resources.asciiUniforms.uniforms;
    this._color = new Color();
    this.color = options.color ?? 16777215;
  }
  /**
   * The pixel size used by the filter.
   * @default 8
   */
  get size() {
    return this.uniforms.uSize;
  }
  set size(value) {
    this.uniforms.uSize = value;
  }
  /**
   * The resulting color of the ascii characters, as a 3 component RGB or numerical hex
   * @example [1.0, 1.0, 1.0] = 0xffffff
   * @default 0xffffff
   */
  get color() {
    return this._color.value;
  }
  set color(value) {
    this._color.setValue(value);
    const [r, g, b] = this._color.toArray();
    this.uniforms.uColor[0] = r;
    this.uniforms.uColor[1] = g;
    this.uniforms.uColor[2] = b;
  }
  /**
   * Determine whether or not to replace the source colors with the provided.
   */
  get replaceColor() {
    return this.uniforms.uReplaceColor > 0.5;
  }
  set replaceColor(value) {
    this.uniforms.uReplaceColor = value ? 1 : 0;
  }
};
/** Default values for options. */
__publicField(_AsciiFilter, "DEFAULT_OPTIONS", {
  size: 8,
  color: 16777215,
  replaceColor: false
});
let AsciiFilter = _AsciiFilter;

export { AsciiFilter };
//# sourceMappingURL=AsciiFilter.mjs.map
