"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mark_1 = require("./mark");
exports.ERRORBAR = 'error-bar';
/**
 * Registry index for all composite mark's normalizer
 */
var normalizerRegistry = {};
function add(mark, normalizer) {
    normalizerRegistry[mark] = normalizer;
}
exports.add = add;
function remove(mark) {
    delete normalizerRegistry[mark];
}
exports.remove = remove;
/**
 * Transform a unit spec with composite mark into a normal layer spec.
 */
function normalize(
    // This GenericUnitSpec has any as Encoding because unit specs with composite mark can have additional encoding channels.
    spec) {
    var mark = mark_1.isMarkDef(spec.mark) ? spec.mark.type : spec.mark;
    var normalizer = normalizerRegistry[mark];
    if (normalizer) {
        return normalizer(spec);
    }
    throw new Error("Unregistered composite mark " + mark);
}
exports.normalize = normalize;
add(exports.ERRORBAR, function (spec) {
    var _m = spec.mark, encoding = spec.encoding, outerSpec = tslib_1.__rest(spec, ["mark", "encoding"]);
    var _s = encoding.size, encodingWithoutSize = tslib_1.__rest(encoding, ["size"]);
    var _x2 = encoding.x2, _y2 = encoding.y2, encodingWithoutX2Y2 = tslib_1.__rest(encoding, ["x2", "y2"]);
    return tslib_1.__assign({}, outerSpec, { layer: [
            {
                mark: 'rule',
                encoding: encodingWithoutSize
            }, {
                mark: 'tick',
                encoding: encodingWithoutX2Y2
            }, {
                mark: 'tick',
                encoding: tslib_1.__assign({}, encodingWithoutX2Y2, (encoding.x2 ? { x: encoding.x2 } : {}), (encoding.y2 ? { y: encoding.y2 } : {}))
            }
        ] });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9zaXRlbWFyay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NpdGVtYXJrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLCtCQUEwQztBQUc3QixRQUFBLFFBQVEsR0FBZ0IsV0FBVyxDQUFDO0FBS2pEOztHQUVHO0FBQ0gsSUFBTSxrQkFBa0IsR0FBcUMsRUFBRSxDQUFDO0FBRWhFLGFBQW9CLElBQVksRUFBRSxVQUEwQjtJQUMxRCxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUM7QUFDeEMsQ0FBQztBQUZELGtCQUVDO0FBRUQsZ0JBQXVCLElBQVk7SUFDakMsT0FBTyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsQyxDQUFDO0FBRkQsd0JBRUM7QUFFRDs7R0FFRztBQUNIO0lBQ0kseUhBQXlIO0lBQ3pILElBQTRDO0lBRzlDLElBQU0sSUFBSSxHQUFHLGdCQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDL0QsSUFBTSxVQUFVLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNmLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQStCLElBQU0sQ0FBQyxDQUFDO0FBQ3pELENBQUM7QUFaRCw4QkFZQztBQUdELEdBQUcsQ0FBQyxnQkFBUSxFQUFFLFVBQUMsSUFBeUM7SUFDL0MsSUFBQSxjQUFRLEVBQUUsd0JBQWtCLEVBQUUsc0RBQVksQ0FBUztJQUNuRCxJQUFBLGtCQUFRLEVBQUUsd0RBQXNCLENBQWE7SUFDN0MsSUFBQSxpQkFBTyxFQUFFLGlCQUFPLEVBQUUsNERBQXNCLENBQWE7SUFFNUQsTUFBTSxzQkFDRCxTQUFTLElBQ1osS0FBSyxFQUFFO1lBQ0w7Z0JBQ0UsSUFBSSxFQUFFLE1BQU07Z0JBQ1osUUFBUSxFQUFFLG1CQUFtQjthQUM5QixFQUFDO2dCQUNBLElBQUksRUFBRSxNQUFNO2dCQUNaLFFBQVEsRUFBRSxtQkFBbUI7YUFDOUIsRUFBRTtnQkFDRCxJQUFJLEVBQUUsTUFBTTtnQkFDWixRQUFRLHVCQUNILG1CQUFtQixFQUNuQixDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUNyQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUUsQ0FBQyxDQUN6QzthQUNGO1NBQ0YsSUFDRDtBQUNKLENBQUMsQ0FBQyxDQUFDIn0=