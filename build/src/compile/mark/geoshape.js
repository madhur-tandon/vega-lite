import * as tslib_1 from "tslib";
import * as mixins from './mixins';
import { isFieldDef, vgField } from '../../fielddef';
import { GEOJSON } from '../../type';
export var geoshape = {
    vgMark: 'shape',
    encodeEntry: function (model) {
        return tslib_1.__assign({}, mixins.baseEncodeEntry(model, { size: 'ignore', orient: 'ignore' }));
    },
    postEncodingTransform: function (model) {
        var encoding = model.encoding;
        var shapeDef = encoding.shape;
        var transform = tslib_1.__assign({ type: 'geoshape', projection: model.projectionName() }, (shapeDef && isFieldDef(shapeDef) && shapeDef.type === GEOJSON ? { field: vgField(shapeDef, { expr: 'datum' }) } : {}));
        return [transform];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vvc2hhcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcGlsZS9tYXJrL2dlb3NoYXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEtBQUssTUFBTSxNQUFNLFVBQVUsQ0FBQztBQUVuQyxPQUFPLEVBQUMsVUFBVSxFQUFFLE9BQU8sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFJbkMsTUFBTSxDQUFDLElBQU0sUUFBUSxHQUFpQjtJQUNwQyxNQUFNLEVBQUUsT0FBTztJQUNmLFdBQVcsRUFBRSxVQUFDLEtBQWdCO1FBQzVCLDRCQUNLLE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFDLENBQUMsRUFDcEU7SUFDSixDQUFDO0lBQ0QscUJBQXFCLEVBQUUsVUFBQyxLQUFnQjtRQUMvQixJQUFBLHlCQUFRLENBQVU7UUFDekIsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUVoQyxJQUFNLFNBQVMsc0JBQ2IsSUFBSSxFQUFFLFVBQVUsRUFDaEIsVUFBVSxFQUFFLEtBQUssQ0FBQyxjQUFjLEVBQUUsSUFFL0IsQ0FBQyxRQUFRLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQ3RILENBQUM7UUFDRixPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckIsQ0FBQztDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi4vdW5pdCc7XG5pbXBvcnQgKiBhcyBtaXhpbnMgZnJvbSAnLi9taXhpbnMnO1xuXG5pbXBvcnQge2lzRmllbGREZWYsIHZnRmllbGR9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7R0VPSlNPTn0gZnJvbSAnLi4vLi4vdHlwZSc7XG5pbXBvcnQge1ZnR2VvU2hhcGVUcmFuc2Zvcm0sIFZnUG9zdEVuY29kaW5nVHJhbnNmb3JtfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5pbXBvcnQge01hcmtDb21waWxlcn0gZnJvbSAnLi9iYXNlJztcblxuZXhwb3J0IGNvbnN0IGdlb3NoYXBlOiBNYXJrQ29tcGlsZXIgPSB7XG4gIHZnTWFyazogJ3NoYXBlJyxcbiAgZW5jb2RlRW50cnk6IChtb2RlbDogVW5pdE1vZGVsKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLm1peGlucy5iYXNlRW5jb2RlRW50cnkobW9kZWwsIHtzaXplOiAnaWdub3JlJywgb3JpZW50OiAnaWdub3JlJ30pXG4gICAgfTtcbiAgfSxcbiAgcG9zdEVuY29kaW5nVHJhbnNmb3JtOiAobW9kZWw6IFVuaXRNb2RlbCk6IFZnUG9zdEVuY29kaW5nVHJhbnNmb3JtW10gPT4ge1xuICAgIGNvbnN0IHtlbmNvZGluZ30gPSBtb2RlbDtcbiAgICBjb25zdCBzaGFwZURlZiA9IGVuY29kaW5nLnNoYXBlO1xuXG4gICAgY29uc3QgdHJhbnNmb3JtOiBWZ0dlb1NoYXBlVHJhbnNmb3JtID0ge1xuICAgICAgdHlwZTogJ2dlb3NoYXBlJyxcbiAgICAgIHByb2plY3Rpb246IG1vZGVsLnByb2plY3Rpb25OYW1lKCksXG4gICAgICAvLyBhczogJ3NoYXBlJyxcbiAgICAgIC4uLihzaGFwZURlZiAmJiBpc0ZpZWxkRGVmKHNoYXBlRGVmKSAmJiBzaGFwZURlZi50eXBlID09PSBHRU9KU09OID8ge2ZpZWxkOiB2Z0ZpZWxkKHNoYXBlRGVmLCB7ZXhwcjogJ2RhdHVtJ30pfSA6IHt9KVxuICAgIH07XG4gICAgcmV0dXJuIFt0cmFuc2Zvcm1dO1xuICB9XG59O1xuIl19