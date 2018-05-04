import * as tslib_1 from "tslib";
import { LATITUDE, LATITUDE2, LONGITUDE, LONGITUDE2, SHAPE } from '../../channel';
import { GEOJSON } from '../../type';
import { duplicate } from '../../util';
import { DataFlowNode } from './dataflow';
var GeoJSONNode = /** @class */ (function (_super) {
    tslib_1.__extends(GeoJSONNode, _super);
    function GeoJSONNode(parent, fields, geojson, signal) {
        var _this = _super.call(this, parent) || this;
        _this.fields = fields;
        _this.geojson = geojson;
        _this.signal = signal;
        return _this;
    }
    GeoJSONNode.prototype.clone = function () {
        return new GeoJSONNode(null, duplicate(this.fields), this.geojson, this.signal);
    };
    GeoJSONNode.parseAll = function (parent, model) {
        var geoJsonCounter = 0;
        [[LONGITUDE, LATITUDE], [LONGITUDE2, LATITUDE2]].forEach(function (coordinates) {
            var pair = coordinates.map(function (channel) { return model.channelHasField(channel) ? model.fieldDef(channel).field : undefined; });
            if (pair[0] || pair[1]) {
                parent = new GeoJSONNode(parent, pair, null, model.getName("geojson_" + geoJsonCounter++));
            }
        });
        if (model.channelHasField(SHAPE)) {
            var fieldDef = model.fieldDef(SHAPE);
            if (fieldDef.type === GEOJSON) {
                parent = new GeoJSONNode(parent, null, fieldDef.field, model.getName("geojson_" + geoJsonCounter++));
            }
        }
        return parent;
    };
    GeoJSONNode.prototype.assemble = function () {
        return tslib_1.__assign({ type: 'geojson' }, (this.fields ? { fields: this.fields } : {}), (this.geojson ? { geojson: this.geojson } : {}), { signal: this.signal });
    };
    return GeoJSONNode;
}(DataFlowNode));
export { GeoJSONNode };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvanNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21waWxlL2RhdGEvZ2VvanNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFxQixRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUdyQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBRXhDO0lBQWlDLHVDQUFZO0lBNEIzQyxxQkFBWSxNQUFvQixFQUFVLE1BQWlCLEVBQVUsT0FBZ0IsRUFBVSxNQUFlO1FBQTlHLFlBQ0Usa0JBQU0sTUFBTSxDQUFDLFNBQ2Q7UUFGeUMsWUFBTSxHQUFOLE1BQU0sQ0FBVztRQUFVLGFBQU8sR0FBUCxPQUFPLENBQVM7UUFBVSxZQUFNLEdBQU4sTUFBTSxDQUFTOztJQUU5RyxDQUFDO0lBN0JNLDJCQUFLLEdBQVo7UUFDRSxPQUFPLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFYSxvQkFBUSxHQUF0QixVQUF1QixNQUFvQixFQUFFLEtBQWdCO1FBQzNELElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQztRQUV2QixDQUFDLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsV0FBaUM7WUFDekYsSUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FDMUIsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUExRSxDQUEwRSxDQUN0RixDQUFDO1lBRUYsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN0QixNQUFNLEdBQUcsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFXLGNBQWMsRUFBSSxDQUFDLENBQUMsQ0FBQzthQUM1RjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hDLElBQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkMsSUFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtnQkFDN0IsTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQVcsY0FBYyxFQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ3RHO1NBQ0Y7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBTU0sOEJBQVEsR0FBZjtRQUNFLDBCQUNFLElBQUksRUFBRSxTQUFTLElBQ1osQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUMxQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQ2hELE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxJQUNuQjtJQUNKLENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUF4Q0QsQ0FBaUMsWUFBWSxHQXdDNUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0dlb1Bvc2l0aW9uQ2hhbm5lbCwgTEFUSVRVREUsIExBVElUVURFMiwgTE9OR0lUVURFLCBMT05HSVRVREUyLCBTSEFQRX0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge0dFT0pTT059IGZyb20gJy4uLy4uL3R5cGUnO1xuaW1wb3J0IHtkdXBsaWNhdGV9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0dlb0pTT05UcmFuc2Zvcm19IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLi91bml0JztcbmltcG9ydCB7RGF0YUZsb3dOb2RlfSBmcm9tICcuL2RhdGFmbG93JztcblxuZXhwb3J0IGNsYXNzIEdlb0pTT05Ob2RlIGV4dGVuZHMgRGF0YUZsb3dOb2RlIHtcbiAgcHVibGljIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgR2VvSlNPTk5vZGUobnVsbCwgZHVwbGljYXRlKHRoaXMuZmllbGRzKSwgdGhpcy5nZW9qc29uLCB0aGlzLnNpZ25hbCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHBhcnNlQWxsKHBhcmVudDogRGF0YUZsb3dOb2RlLCBtb2RlbDogVW5pdE1vZGVsKTogRGF0YUZsb3dOb2RlIHtcbiAgICBsZXQgZ2VvSnNvbkNvdW50ZXIgPSAwO1xuXG4gICAgW1tMT05HSVRVREUsIExBVElUVURFXSwgW0xPTkdJVFVERTIsIExBVElUVURFMl1dLmZvckVhY2goKGNvb3JkaW5hdGVzOiBHZW9Qb3NpdGlvbkNoYW5uZWxbXSkgPT4ge1xuICAgICAgY29uc3QgcGFpciA9IGNvb3JkaW5hdGVzLm1hcChcbiAgICAgICAgY2hhbm5lbCA9PiBtb2RlbC5jaGFubmVsSGFzRmllbGQoY2hhbm5lbCkgPyBtb2RlbC5maWVsZERlZihjaGFubmVsKS5maWVsZCA6IHVuZGVmaW5lZFxuICAgICAgKTtcblxuICAgICAgaWYgKHBhaXJbMF0gfHwgcGFpclsxXSkge1xuICAgICAgICBwYXJlbnQgPSBuZXcgR2VvSlNPTk5vZGUocGFyZW50LCBwYWlyLCBudWxsLCBtb2RlbC5nZXROYW1lKGBnZW9qc29uXyR7Z2VvSnNvbkNvdW50ZXIrK31gKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAobW9kZWwuY2hhbm5lbEhhc0ZpZWxkKFNIQVBFKSkge1xuICAgICAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihTSEFQRSk7XG4gICAgICBpZiAoZmllbGREZWYudHlwZSA9PT0gR0VPSlNPTikge1xuICAgICAgICBwYXJlbnQgPSBuZXcgR2VvSlNPTk5vZGUocGFyZW50LCBudWxsLCBmaWVsZERlZi5maWVsZCwgbW9kZWwuZ2V0TmFtZShgZ2VvanNvbl8ke2dlb0pzb25Db3VudGVyKyt9YCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwYXJlbnQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJlbnQ6IERhdGFGbG93Tm9kZSwgcHJpdmF0ZSBmaWVsZHM/OiBzdHJpbmdbXSwgcHJpdmF0ZSBnZW9qc29uPzogc3RyaW5nLCBwcml2YXRlIHNpZ25hbD86IHN0cmluZykge1xuICAgIHN1cGVyKHBhcmVudCk7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGUoKTogVmdHZW9KU09OVHJhbnNmb3JtIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ2dlb2pzb24nLFxuICAgICAgLi4uKHRoaXMuZmllbGRzID8ge2ZpZWxkczogdGhpcy5maWVsZHN9IDoge30pLFxuICAgICAgLi4uKHRoaXMuZ2VvanNvbiA/IHtnZW9qc29uOiB0aGlzLmdlb2pzb259IDoge30pLFxuICAgICAgc2lnbmFsOiB0aGlzLnNpZ25hbFxuICAgIH07XG4gIH1cbn1cbiJdfQ==