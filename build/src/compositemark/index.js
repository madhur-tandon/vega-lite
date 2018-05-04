import * as tslib_1 from "tslib";
import { isMarkDef } from './../mark';
import { BOXPLOT, BOXPLOT_STYLES, normalizeBoxPlot, VL_ONLY_BOXPLOT_CONFIG_PROPERTY_INDEX } from './boxplot';
import { ERRORBAR, normalizeErrorBar } from './errorbar';
/**
 * Registry index for all composite mark's normalizer
 */
var normalizerRegistry = {};
export function add(mark, normalizer) {
    normalizerRegistry[mark] = normalizer;
}
export function remove(mark) {
    delete normalizerRegistry[mark];
}
export var COMPOSITE_MARK_STYLES = BOXPLOT_STYLES;
export var VL_ONLY_COMPOSITE_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX = tslib_1.__assign({}, VL_ONLY_BOXPLOT_CONFIG_PROPERTY_INDEX);
add(BOXPLOT, normalizeBoxPlot);
add(ERRORBAR, normalizeErrorBar);
/**
 * Transform a unit spec with composite mark into a normal layer spec.
 */
export function normalize(
// This GenericUnitSpec has any as Encoding because unit specs with composite mark can have additional encoding channels.
spec, config) {
    var mark = isMarkDef(spec.mark) ? spec.mark.type : spec.mark;
    var normalizer = normalizerRegistry[mark];
    if (normalizer) {
        return normalizer(spec, config);
    }
    throw new Error("Invalid mark type \"" + mark + "\"");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9zaXRlbWFyay9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFVLFNBQVMsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUU3QyxPQUFPLEVBQUMsT0FBTyxFQUFFLGNBQWMsRUFBbUMsZ0JBQWdCLEVBQUUscUNBQXFDLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDNUksT0FBTyxFQUFDLFFBQVEsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLFlBQVksQ0FBQztBQU12RDs7R0FFRztBQUNILElBQU0sa0JBQWtCLEdBQXFDLEVBQUUsQ0FBQztBQUVoRSxNQUFNLGNBQWMsSUFBWSxFQUFFLFVBQTBCO0lBQzFELGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQztBQUN4QyxDQUFDO0FBRUQsTUFBTSxpQkFBaUIsSUFBWTtJQUNqQyxPQUFPLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFRRCxNQUFNLENBQUMsSUFBTSxxQkFBcUIsR0FBRyxjQUFjLENBQUM7QUFLcEQsTUFBTSxDQUFDLElBQU0scURBQXFELHdCQUM3RCxxQ0FBcUMsQ0FDekMsQ0FBQztBQUVGLEdBQUcsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUMvQixHQUFHLENBQUMsUUFBUSxFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFFakM7O0dBRUc7QUFDSCxNQUFNO0FBQ0YseUhBQXlIO0FBQ3pILElBQW1DLEVBQ25DLE1BQWM7SUFHaEIsSUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDL0QsSUFBTSxVQUFVLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsSUFBSSxVQUFVLEVBQUU7UUFDZCxPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDakM7SUFFRCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUFzQixJQUFJLE9BQUcsQ0FBQyxDQUFDO0FBQ2pELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbmZpZ30gZnJvbSAnLi8uLi9jb25maWcnO1xuaW1wb3J0IHtBbnlNYXJrLCBpc01hcmtEZWZ9IGZyb20gJy4vLi4vbWFyayc7XG5pbXBvcnQge0dlbmVyaWNVbml0U3BlYywgTm9ybWFsaXplZExheWVyU3BlY30gZnJvbSAnLi8uLi9zcGVjJztcbmltcG9ydCB7Qk9YUExPVCwgQk9YUExPVF9TVFlMRVMsIEJveFBsb3RDb25maWdNaXhpbnMsIEJveFBsb3REZWYsIG5vcm1hbGl6ZUJveFBsb3QsIFZMX09OTFlfQk9YUExPVF9DT05GSUdfUFJPUEVSVFlfSU5ERVh9IGZyb20gJy4vYm94cGxvdCc7XG5pbXBvcnQge0VSUk9SQkFSLCBub3JtYWxpemVFcnJvckJhcn0gZnJvbSAnLi9lcnJvcmJhcic7XG5cblxuZXhwb3J0IHtCb3hQbG90Q29uZmlnfSBmcm9tICcuL2JveHBsb3QnO1xuZXhwb3J0IHR5cGUgVW5pdE5vcm1hbGl6ZXIgPSAoc3BlYzogR2VuZXJpY1VuaXRTcGVjPGFueSwgYW55PiwgY29uZmlnOiBDb25maWcpPT4gTm9ybWFsaXplZExheWVyU3BlYztcblxuLyoqXG4gKiBSZWdpc3RyeSBpbmRleCBmb3IgYWxsIGNvbXBvc2l0ZSBtYXJrJ3Mgbm9ybWFsaXplclxuICovXG5jb25zdCBub3JtYWxpemVyUmVnaXN0cnk6IHtbbWFyazogc3RyaW5nXTogVW5pdE5vcm1hbGl6ZXJ9ID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGQobWFyazogc3RyaW5nLCBub3JtYWxpemVyOiBVbml0Tm9ybWFsaXplcikge1xuICBub3JtYWxpemVyUmVnaXN0cnlbbWFya10gPSBub3JtYWxpemVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlKG1hcms6IHN0cmluZykge1xuICBkZWxldGUgbm9ybWFsaXplclJlZ2lzdHJ5W21hcmtdO1xufVxuXG5leHBvcnQgdHlwZSBDb21wb3NpdGVNYXJrID0gQk9YUExPVCB8IEVSUk9SQkFSO1xuXG5leHBvcnQgdHlwZSBDb21wb3NpdGVNYXJrRGVmID0gQm94UGxvdERlZjtcblxuZXhwb3J0IHR5cGUgQ29tcG9zaXRlQWdncmVnYXRlID0gQk9YUExPVDtcblxuZXhwb3J0IGNvbnN0IENPTVBPU0lURV9NQVJLX1NUWUxFUyA9IEJPWFBMT1RfU1RZTEVTO1xuZXhwb3J0IHR5cGUgQ29tcG9zaXRlTWFya1N0eWxlID0gdHlwZW9mIENPTVBPU0lURV9NQVJLX1NUWUxFU1swXTtcblxuZXhwb3J0IGludGVyZmFjZSBDb21wb3NpdGVNYXJrQ29uZmlnTWl4aW5zIGV4dGVuZHMgQm94UGxvdENvbmZpZ01peGlucyB7fVxuXG5leHBvcnQgY29uc3QgVkxfT05MWV9DT01QT1NJVEVfTUFSS19TUEVDSUZJQ19DT05GSUdfUFJPUEVSVFlfSU5ERVggPSB7XG4gIC4uLlZMX09OTFlfQk9YUExPVF9DT05GSUdfUFJPUEVSVFlfSU5ERVhcbn07XG5cbmFkZChCT1hQTE9ULCBub3JtYWxpemVCb3hQbG90KTtcbmFkZChFUlJPUkJBUiwgbm9ybWFsaXplRXJyb3JCYXIpO1xuXG4vKipcbiAqIFRyYW5zZm9ybSBhIHVuaXQgc3BlYyB3aXRoIGNvbXBvc2l0ZSBtYXJrIGludG8gYSBub3JtYWwgbGF5ZXIgc3BlYy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZShcbiAgICAvLyBUaGlzIEdlbmVyaWNVbml0U3BlYyBoYXMgYW55IGFzIEVuY29kaW5nIGJlY2F1c2UgdW5pdCBzcGVjcyB3aXRoIGNvbXBvc2l0ZSBtYXJrIGNhbiBoYXZlIGFkZGl0aW9uYWwgZW5jb2RpbmcgY2hhbm5lbHMuXG4gICAgc3BlYzogR2VuZXJpY1VuaXRTcGVjPGFueSwgQW55TWFyaz4sXG4gICAgY29uZmlnOiBDb25maWdcbiAgKTogTm9ybWFsaXplZExheWVyU3BlYyB7XG5cbiAgY29uc3QgbWFyayA9IGlzTWFya0RlZihzcGVjLm1hcmspID8gc3BlYy5tYXJrLnR5cGUgOiBzcGVjLm1hcms7XG4gIGNvbnN0IG5vcm1hbGl6ZXIgPSBub3JtYWxpemVyUmVnaXN0cnlbbWFya107XG4gIGlmIChub3JtYWxpemVyKSB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZXIoc3BlYywgY29uZmlnKTtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBtYXJrIHR5cGUgXCIke21hcmt9XCJgKTtcbn1cbiJdfQ==