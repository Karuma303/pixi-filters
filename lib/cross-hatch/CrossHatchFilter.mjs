import { Filter, GpuProgram, GlProgram } from 'pixi.js';
import vertex from '../defaults/default.mjs';
import wgslVertex from '../defaults/default2.mjs';
import fragment from './crosshatch2.mjs';
import source from './crosshatch.mjs';

class CrossHatchFilter extends Filter {
  constructor() {
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
      name: "cross-hatch-filter"
    });
    super({
      gpuProgram,
      glProgram,
      resources: {}
    });
  }
}

export { CrossHatchFilter };
//# sourceMappingURL=CrossHatchFilter.mjs.map
