import * as tslib_1 from "tslib";
import * as log from '../log';
import { isVConcatSpec } from '../spec';
import { BaseConcatModel } from './baseconcat';
import { buildModel } from './buildmodel';
import { parseConcatLayoutSize } from './layoutsize/parse';
var ConcatModel = /** @class */ (function (_super) {
    tslib_1.__extends(ConcatModel, _super);
    function ConcatModel(spec, parent, parentGivenName, repeater, config) {
        var _this = _super.call(this, spec, parent, parentGivenName, config, repeater, spec.resolve) || this;
        _this.type = 'concat';
        if (spec.resolve && spec.resolve.axis && (spec.resolve.axis.x === 'shared' || spec.resolve.axis.y === 'shared')) {
            log.warn(log.message.CONCAT_CANNOT_SHARE_AXIS);
        }
        _this.isVConcat = isVConcatSpec(spec);
        _this.children = (isVConcatSpec(spec) ? spec.vconcat : spec.hconcat).map(function (child, i) {
            return buildModel(child, _this, _this.getName('concat_' + i), undefined, repeater, config, false);
        });
        return _this;
    }
    ConcatModel.prototype.parseLayoutSize = function () {
        parseConcatLayoutSize(this);
    };
    ConcatModel.prototype.parseAxisGroup = function () {
        return null;
    };
    ConcatModel.prototype.assembleLayout = function () {
        // TODO: allow customization
        return tslib_1.__assign({ padding: { row: 10, column: 10 }, offset: 10 }, (this.isVConcat ? { columns: 1 } : {}), { bounds: 'full', 
            // Use align each so it can work with multiple plots with different size
            align: 'each' });
    };
    return ConcatModel;
}(BaseConcatModel));
export { ConcatModel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uY2F0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBpbGUvY29uY2F0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEtBQUssR0FBRyxNQUFNLFFBQVEsQ0FBQztBQUM5QixPQUFPLEVBQUMsYUFBYSxFQUF1QixNQUFNLFNBQVMsQ0FBQztBQUU1RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFJekQ7SUFBaUMsdUNBQWU7SUFPOUMscUJBQVksSUFBMEIsRUFBRSxNQUFhLEVBQUUsZUFBdUIsRUFBRSxRQUF1QixFQUFFLE1BQWM7UUFBdkgsWUFDRSxrQkFBTSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FXckU7UUFsQmUsVUFBSSxHQUFhLFFBQVEsQ0FBQztRQVN4QyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUMsRUFBRTtZQUMvRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztTQUNoRDtRQUVELEtBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJDLEtBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUUsQ0FBQztZQUMvRSxPQUFPLFVBQVUsQ0FBQyxLQUFLLEVBQUUsS0FBSSxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xHLENBQUMsQ0FBQyxDQUFDOztJQUNMLENBQUM7SUFFTSxxQ0FBZSxHQUF0QjtRQUNFLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFHTSxvQ0FBYyxHQUFyQjtRQUNFLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVNLG9DQUFjLEdBQXJCO1FBQ0UsNEJBQTRCO1FBQzVCLDBCQUNFLE9BQU8sRUFBRSxFQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBQyxFQUM5QixNQUFNLEVBQUUsRUFBRSxJQUNQLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUN2QyxNQUFNLEVBQUUsTUFBTTtZQUNkLHdFQUF3RTtZQUN4RSxLQUFLLEVBQUUsTUFBTSxJQUNiO0lBQ0osQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQXpDRCxDQUFpQyxlQUFlLEdBeUMvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZyc7XG5pbXBvcnQge2lzVkNvbmNhdFNwZWMsIE5vcm1hbGl6ZWRDb25jYXRTcGVjfSBmcm9tICcuLi9zcGVjJztcbmltcG9ydCB7VmdMYXlvdXR9IGZyb20gJy4uL3ZlZ2Euc2NoZW1hJztcbmltcG9ydCB7QmFzZUNvbmNhdE1vZGVsfSBmcm9tICcuL2Jhc2Vjb25jYXQnO1xuaW1wb3J0IHtidWlsZE1vZGVsfSBmcm9tICcuL2J1aWxkbW9kZWwnO1xuaW1wb3J0IHtwYXJzZUNvbmNhdExheW91dFNpemV9IGZyb20gJy4vbGF5b3V0c2l6ZS9wYXJzZSc7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7UmVwZWF0ZXJWYWx1ZX0gZnJvbSAnLi9yZXBlYXRlcic7XG5cbmV4cG9ydCBjbGFzcyBDb25jYXRNb2RlbCBleHRlbmRzIEJhc2VDb25jYXRNb2RlbCB7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlOiAnY29uY2F0JyA9ICdjb25jYXQnO1xuXG4gIHB1YmxpYyByZWFkb25seSBjaGlsZHJlbjogTW9kZWxbXTtcblxuICBwdWJsaWMgcmVhZG9ubHkgaXNWQ29uY2F0OiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHNwZWM6IE5vcm1hbGl6ZWRDb25jYXRTcGVjLCBwYXJlbnQ6IE1vZGVsLCBwYXJlbnRHaXZlbk5hbWU6IHN0cmluZywgcmVwZWF0ZXI6IFJlcGVhdGVyVmFsdWUsIGNvbmZpZzogQ29uZmlnKSB7XG4gICAgc3VwZXIoc3BlYywgcGFyZW50LCBwYXJlbnRHaXZlbk5hbWUsIGNvbmZpZywgcmVwZWF0ZXIsIHNwZWMucmVzb2x2ZSk7XG5cbiAgICBpZiAoc3BlYy5yZXNvbHZlICYmIHNwZWMucmVzb2x2ZS5heGlzICYmIChzcGVjLnJlc29sdmUuYXhpcy54ID09PSAnc2hhcmVkJyB8fCBzcGVjLnJlc29sdmUuYXhpcy55ID09PSAnc2hhcmVkJykpIHtcbiAgICAgIGxvZy53YXJuKGxvZy5tZXNzYWdlLkNPTkNBVF9DQU5OT1RfU0hBUkVfQVhJUyk7XG4gICAgfVxuXG4gICAgdGhpcy5pc1ZDb25jYXQgPSBpc1ZDb25jYXRTcGVjKHNwZWMpO1xuXG4gICAgdGhpcy5jaGlsZHJlbiA9IChpc1ZDb25jYXRTcGVjKHNwZWMpID8gc3BlYy52Y29uY2F0IDogc3BlYy5oY29uY2F0KS5tYXAoKGNoaWxkLCBpKSA9PiB7XG4gICAgICByZXR1cm4gYnVpbGRNb2RlbChjaGlsZCwgdGhpcywgdGhpcy5nZXROYW1lKCdjb25jYXRfJyArIGkpLCB1bmRlZmluZWQsIHJlcGVhdGVyLCBjb25maWcsIGZhbHNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUxheW91dFNpemUoKSB7XG4gICAgcGFyc2VDb25jYXRMYXlvdXRTaXplKHRoaXMpO1xuICB9XG5cblxuICBwdWJsaWMgcGFyc2VBeGlzR3JvdXAoKTogdm9pZCB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVMYXlvdXQoKTogVmdMYXlvdXQge1xuICAgIC8vIFRPRE86IGFsbG93IGN1c3RvbWl6YXRpb25cbiAgICByZXR1cm4ge1xuICAgICAgcGFkZGluZzoge3JvdzogMTAsIGNvbHVtbjogMTB9LFxuICAgICAgb2Zmc2V0OiAxMCxcbiAgICAgIC4uLih0aGlzLmlzVkNvbmNhdCA/IHtjb2x1bW5zOiAxfSA6IHt9KSxcbiAgICAgIGJvdW5kczogJ2Z1bGwnLFxuICAgICAgLy8gVXNlIGFsaWduIGVhY2ggc28gaXQgY2FuIHdvcmsgd2l0aCBtdWx0aXBsZSBwbG90cyB3aXRoIGRpZmZlcmVudCBzaXplXG4gICAgICBhbGlnbjogJ2VhY2gnXG4gICAgfTtcbiAgfVxufVxuIl19