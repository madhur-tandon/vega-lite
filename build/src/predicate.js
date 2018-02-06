"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var selection_1 = require("./compile/selection/selection");
var datetime_1 = require("./datetime");
var fielddef_1 = require("./fielddef");
var timeunit_1 = require("./timeunit");
var util_1 = require("./util");
function isSelectionPredicate(predicate) {
    return predicate && predicate['selection'];
}
exports.isSelectionPredicate = isSelectionPredicate;
function isFieldEqualPredicate(predicate) {
    return predicate && !!predicate.field && predicate.equal !== undefined;
}
exports.isFieldEqualPredicate = isFieldEqualPredicate;
function isFieldRangePredicate(predicate) {
    if (predicate && predicate.field) {
        if (util_1.isArray(predicate.range) && predicate.range.length === 2) {
            return true;
        }
    }
    return false;
}
exports.isFieldRangePredicate = isFieldRangePredicate;
function isFieldOneOfPredicate(predicate) {
    return predicate && !!predicate.field && (util_1.isArray(predicate.oneOf) ||
        util_1.isArray(predicate.in) // backward compatibility
    );
}
exports.isFieldOneOfPredicate = isFieldOneOfPredicate;
function isFieldPredicate(predicate) {
    return isFieldOneOfPredicate(predicate) || isFieldEqualPredicate(predicate) || isFieldRangePredicate(predicate);
}
exports.isFieldPredicate = isFieldPredicate;
/**
 * Converts a predicate into an expression.
 */
// model is only used for selection filters.
function expression(model, filterOp, node) {
    return util_1.logicalExpr(filterOp, function (predicate) {
        if (util_1.isString(predicate)) {
            return predicate;
        }
        else if (isSelectionPredicate(predicate)) {
            return selection_1.selectionPredicate(model, predicate.selection, node);
        }
        else {
            return fieldFilterExpression(predicate);
        }
    });
}
exports.expression = expression;
// This method is used by Voyager.  Do not change its behavior without changing Voyager.
function fieldFilterExpression(predicate, useInRange) {
    if (useInRange === void 0) { useInRange = true; }
    var fieldExpr = predicate.timeUnit ?
        // For timeUnit, cast into integer with time() so we can use ===, inrange, indexOf to compare values directly.
        // TODO: We calculate timeUnit on the fly here. Consider if we would like to consolidate this with timeUnit pipeline
        // TODO: support utc
        ('time(' + timeunit_1.fieldExpr(predicate.timeUnit, predicate.field) + ')') :
        fielddef_1.vgField(predicate, { expr: 'datum' });
    if (isFieldEqualPredicate(predicate)) {
        return fieldExpr + '===' + valueExpr(predicate.equal, predicate.timeUnit);
    }
    else if (isFieldOneOfPredicate(predicate)) {
        // "oneOf" was formerly "in" -- so we need to add backward compatibility
        var oneOf = predicate.oneOf || predicate['in'];
        return 'indexof([' +
            oneOf.map(function (v) { return valueExpr(v, predicate.timeUnit); }).join(',') +
            '], ' + fieldExpr + ') !== -1';
    }
    else if (isFieldRangePredicate(predicate)) {
        var lower = predicate.range[0];
        var upper = predicate.range[1];
        if (lower !== null && upper !== null && useInRange) {
            return 'inrange(' + fieldExpr + ', [' +
                valueExpr(lower, predicate.timeUnit) + ', ' +
                valueExpr(upper, predicate.timeUnit) + '])';
        }
        var exprs = [];
        if (lower !== null) {
            exprs.push(fieldExpr + " >= " + valueExpr(lower, predicate.timeUnit));
        }
        if (upper !== null) {
            exprs.push(fieldExpr + " <= " + valueExpr(upper, predicate.timeUnit));
        }
        return exprs.length > 0 ? exprs.join(' && ') : 'true';
    }
    /* istanbul ignore next: it should never reach here */
    throw new Error("Invalid field predicate: " + JSON.stringify(predicate));
}
exports.fieldFilterExpression = fieldFilterExpression;
function valueExpr(v, timeUnit) {
    if (datetime_1.isDateTime(v)) {
        var expr = datetime_1.dateTimeExpr(v, true);
        return 'time(' + expr + ')';
    }
    if (timeunit_1.isLocalSingleTimeUnit(timeUnit)) {
        var datetime = {};
        datetime[timeUnit] = v;
        var expr = datetime_1.dateTimeExpr(datetime, true);
        return 'time(' + expr + ')';
    }
    else if (timeunit_1.isUtcSingleTimeUnit(timeUnit)) {
        return valueExpr(v, timeunit_1.getLocalTimeUnit(timeUnit));
    }
    return JSON.stringify(v);
}
function normalizePredicate(f) {
    if (isFieldPredicate(f) && f.timeUnit) {
        return __assign({}, f, { timeUnit: timeunit_1.normalizeTimeUnit(f.timeUnit) });
    }
    return f;
}
exports.normalizePredicate = normalizePredicate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZGljYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ByZWRpY2F0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRUEsMkRBQWlFO0FBQ2pFLHVDQUE4RDtBQUM5RCx1Q0FBbUM7QUFFbkMsdUNBQXFKO0FBQ3JKLCtCQUFzRDtBQXNCdEQsOEJBQXFDLFNBQW9DO0lBQ3ZFLE1BQU0sQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzdDLENBQUM7QUFGRCxvREFFQztBQXNCRCwrQkFBc0MsU0FBYztJQUNsRCxNQUFNLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO0FBQ3pFLENBQUM7QUFGRCxzREFFQztBQXlCRCwrQkFBc0MsU0FBYztJQUNsRCxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDakMsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDZixDQUFDO0FBUEQsc0RBT0M7QUF1QkQsK0JBQXNDLFNBQWM7SUFDbEQsTUFBTSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxDQUN2QyxjQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUN4QixjQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLHlCQUF5QjtLQUNoRCxDQUFDO0FBQ0osQ0FBQztBQUxELHNEQUtDO0FBRUQsMEJBQWlDLFNBQW9CO0lBQ25ELE1BQU0s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QztRQUN2QixJQUFNLElBQUksR0FBRyx1QkFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7SUFDOUIsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyw4QkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsMkJBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0IsQ0FBQztBQUVELDRCQUFtQyxDQUFZO0lBQzdDLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sY0FDRCxDQUFDLElBQ0osUUFBUSxFQUFFLDRCQUFpQixDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFDdkM7SUFDSixDQUFDO0lBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNYLENBQUM7QUFSRCxnREFRQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGF0YUZsb3dOb2RlfSBmcm9tICcuL2NvbXBpbGUvZGF0YS9kYXRhZmxvdyc7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuL2NvbXBpbGUvbW9kZWwnO1xuaW1wb3J0IHtzZWxlY3Rpb25QcmVkaWNhdGV9IGZyb20gJy4vY29tcGlsZS9zZWxlY3Rpb24vc2VsZWN0aW9uJztcbmltcG9ydCB7RGF0ZVRpbWUsIGRhdGVUaW1lRXhwciwgaXNEYXRlVGltZX0gZnJvbSAnLi9kYXRldGltZSc7XG5pbXBvcnQge3ZnRmllbGR9IGZyb20gJy4vZmllbGRkZWYnO1xuaW1wb3J0IHtMb2dpY2FsT3BlcmFuZH0gZnJvbSAnLi9sb2dpY2FsJztcbmltcG9ydCB7ZmllbGRFeHByIGFzIHRpbWVVbml0RmllbGRFeHByLCBnZXRMb2NhbFRpbWVVbml0LCBpc0xvY2FsU2luZ2xlVGltZVVuaXQsIGlzVXRjU2luZ2xlVGltZVVuaXQsIG5vcm1hbGl6ZVRpbWVVbml0LCBUaW1lVW5pdH0gZnJvbSAnLi90aW1ldW5pdCc7XG5pbXBvcnQge2lzQXJyYXksIGlzU3RyaW5nLCBsb2dpY2FsRXhwcn0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IHR5cGUgUHJlZGljYXRlID1cbiAgLy8gYSkgRmllbGRQcmVjaWRhdGUgKGJ1dCB3ZSBkb24ndCB0eXBlIEZpZWxkRmlsdGVyIGhlcmUgc28gdGhlIHNjaGVtYSBoYXMgbm8gbmVzdGluZ1xuICAvLyBhbmQgdGh1cyB0aGUgZG9jdW1lbnRhdGlvbiBzaG93cyBhbGwgb2YgdGhlIHR5cGVzIGNsZWFybHkpXG4gIEZpZWxkRXF1YWxQcmVkaWNhdGUgfCBGaWVsZFJhbmdlUHJlZGljYXRlIHwgRmllbGRPbmVPZlByZWRpY2F0ZSB8XG4gIC8vIGIpIFNlbGVjdGlvbiBQcmVkaWNhdGVcbiAgU2VsZWN0aW9uUHJlZGljYXRlIHxcbiAgLy8gYykgVmVnYSBFeHByZXNzaW9uIHN0cmluZ1xuICBzdHJpbmc7XG5cblxuXG5leHBvcnQgdHlwZSBGaWVsZFByZWRpY2F0ZSA9IEZpZWxkRXF1YWxQcmVkaWNhdGUgfCBGaWVsZFJhbmdlUHJlZGljYXRlIHwgRmllbGRPbmVPZlByZWRpY2F0ZTtcblxuZXhwb3J0IGludGVyZmFjZSBTZWxlY3Rpb25QcmVkaWNhdGUge1xuICAvKipcbiAgICogRmlsdGVyIHVzaW5nIGEgc2VsZWN0aW9uIG5hbWUuXG4gICAqL1xuICBzZWxlY3Rpb246IExvZ2ljYWxPcGVyYW5kPHN0cmluZz47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NlbGVjdGlvblByZWRpY2F0ZShwcmVkaWNhdGU6IExvZ2ljYWxPcGVyYW5kPFByZWRpY2F0ZT4pOiBwcmVkaWNhdGUgaXMgU2VsZWN0aW9uUHJlZGljYXRlIHtcbiAgcmV0dXJuIHByZWRpY2F0ZSAmJiBwcmVkaWNhdGVbJ3NlbGVjdGlvbiddO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkRXF1YWxQcmVkaWNhdGUge1xuICAvLyBUT0RPOiBzdXBwb3J0IGFnZ3JlZ2F0ZVxuXG4gIC8qKlxuICAgKiBUaW1lIHVuaXQgZm9yIHRoZSBmaWVsZCB0byBiZSBmaWx0ZXJlZC5cbiAgICovXG4gIHRpbWVVbml0PzogVGltZVVuaXQ7XG5cbiAgLyoqXG4gICAqIEZpZWxkIHRvIGJlIGZpbHRlcmVkLlxuICAgKi9cbiAgZmllbGQ6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHZhbHVlIHRoYXQgdGhlIGZpZWxkIHNob3VsZCBiZSBlcXVhbCB0by5cbiAgICovXG4gIGVxdWFsOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHwgRGF0ZVRpbWU7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRmllbGRFcXVhbFByZWRpY2F0ZShwcmVkaWNhdGU6IGFueSk6IHByZWRpY2F0ZSBpcyBGaWVsZEVxdWFsUHJlZGljYXRlIHtcbiAgcmV0dXJuIHByZWRpY2F0ZSAmJiAhIXByZWRpY2F0ZS5maWVsZCAmJiBwcmVkaWNhdGUuZXF1YWwgIT09IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWVsZFJhbmdlUHJlZGljYXRlIHtcbiAgLy8gVE9ETzogc3VwcG9ydCBhZ2dyZWdhdGVcblxuICAvKipcbiAgICogdGltZSB1bml0IGZvciB0aGUgZmllbGQgdG8gYmUgZmlsdGVyZWQuXG4gICAqL1xuICB0aW1lVW5pdD86IFRpbWVVbml0O1xuXG4gIC8qKlxuICAgKiBGaWVsZCB0byBiZSBmaWx0ZXJlZFxuICAgKi9cbiAgZmllbGQ6IHN0cmluZztcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgaW5jbHVzaXZlIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVzXG4gICAqIGZvciBhIGZpZWxkIHZhbHVlIG9mIGEgZGF0YSBpdGVtIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBmaWx0ZXJlZCBkYXRhLlxuICAgKiBAbWF4SXRlbXMgMlxuICAgKiBAbWluSXRlbXMgMlxuICAgKi9cbiAgcmFuZ2U6IChudW1iZXJ8RGF0ZVRpbWV8bnVsbClbXTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGaWVsZFJhbmdlUHJlZGljYXRlKHByZWRpY2F0ZTogYW55KTogcHJlZGljYXRlIGlzIEZpZWxkUmFuZ2VQcmVkaWNhdGUge1xuICBpZiAocHJlZGljYXRlICYmIHByZWRpY2F0ZS5maWVsZCkge1xuICAgIGlmIChpc0FycmF5KHByZWRpY2F0ZS5yYW5nZSkgJiYgcHJlZGljYXRlLnJhbmdlLmxlbmd0aCA9PT0gMikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWVsZE9uZU9mUHJlZGljYXRlIHtcbiAgLy8gVE9ETzogc3VwcG9ydCBhZ2dyZWdhdGVcblxuICAvKipcbiAgICogdGltZSB1bml0IGZvciB0aGUgZmllbGQgdG8gYmUgZmlsdGVyZWQuXG4gICAqL1xuICB0aW1lVW5pdD86IFRpbWVVbml0O1xuXG4gIC8qKlxuICAgKiBGaWVsZCB0byBiZSBmaWx0ZXJlZFxuICAgKi9cbiAgZmllbGQ6IHN0cmluZztcblxuICAvKipcbiAgICogQSBzZXQgb2YgdmFsdWVzIHRoYXQgdGhlIGBmaWVsZGAncyB2YWx1ZSBzaG91bGQgYmUgYSBtZW1iZXIgb2YsXG4gICAqIGZvciBhIGRhdGEgaXRlbSBpbmNsdWRlZCBpbiB0aGUgZmlsdGVyZWQgZGF0YS5cbiAgICovXG4gIG9uZU9mOiBzdHJpbmdbXSB8IG51bWJlcltdIHwgYm9vbGVhbltdIHwgRGF0ZVRpbWVbXTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGaWVsZE9uZU9mUHJlZGljYXRlKHByZWRpY2F0ZTogYW55KTogcHJlZGljYXRlIGlzIEZpZWxkT25lT2ZQcmVkaWNhdGUge1xuICByZXR1cm4gcHJlZGljYXRlICYmICEhcHJlZGljYXRlLmZpZWxkICYmIChcbiAgICBpc0FycmF5KHByZWRpY2F0ZS5vbmVPZikgfHxcbiAgICBpc0FycmF5KHByZWRpY2F0ZS5pbikgLy8gYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGaWVsZFByZWRpY2F0ZShwcmVkaWNhdGU6IFByZWRpY2F0ZSk6IHByZWRpY2F0ZSBpcyBGaWVsZE9uZU9mUHJlZGljYXRlIHwgRmllbGRFcXVhbFByZWRpY2F0ZSB8IEZpZWxkUmFuZ2VQcmVkaWNhdGUge1xuICByZXR1cm4gaXNGaWVsZE9uZU9mUHJlZGljYXRlKHByZWRpY2F0ZSkgfHwgaXNGaWVsZEVxdWFsUHJlZGljYXRlKHByZWRpY2F0ZSkgfHwgaXNGaWVsZFJhbmdlUHJlZGljYXRlKHByZWRpY2F0ZSk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYSBwcmVkaWNhdGUgaW50byBhbiBleHByZXNzaW9uLlxuICovXG4vLyBtb2RlbCBpcyBvbmx5IHVzZWQgZm9yIHNlbGVjdGlvbiBmaWx0ZXJzLlxuZXhwb3J0IGZ1bmN0aW9uIGV4cHJlc3Npb24obW9kZWw6IE1vZGVsLCBmaWx0ZXJPcDogTG9naWNhbE9wZXJhbmQ8UHJlZGljYXRlPiwgbm9kZT86IERhdGFGbG93Tm9kZSk6IHN0cmluZyB7XG4gIHJldHVybiBsb2dpY2FsRXhwcihmaWx0ZXJPcCwgKHByZWRpY2F0ZTogUHJlZGljYXRlKSA9PiB7XG4gICAgaWYgKGlzU3RyaW5nKHByZWRpY2F0ZSkpIHtcbiAgICAgIHJldHVybiBwcmVkaWNhdGU7XG4gICAgfSBlbHNlIGlmIChpc1NlbGVjdGlvblByZWRpY2F0ZShwcmVkaWNhdGUpKSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uUHJlZGljYXRlKG1vZGVsLCBwcmVkaWNhdGUuc2VsZWN0aW9uLCBub2RlKTtcbiAgICB9IGVsc2UgeyAvLyBGaWx0ZXIgT2JqZWN0XG4gICAgICByZXR1cm4gZmllbGRGaWx0ZXJFeHByZXNzaW9uKHByZWRpY2F0ZSk7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gVGhpcyBtZXRob2QgaXMgdXNlZCBieSBWb3lhZ2VyLiAgRG8gbm90IGNoYW5nZSBpdHMgYmVoYXZpb3Igd2l0aG91dCBjaGFuZ2luZyBWb3lhZ2VyLlxuZXhwb3J0IGZ1bmN0aW9uIGZpZWxkRmlsdGVyRXhwcmVzc2lvbihwcmVkaWNhdGU6IEZpZWxkUHJlZGljYXRlLCB1c2VJblJhbmdlPXRydWUpIHtcbiAgY29uc3QgZmllbGRFeHByID0gcHJlZGljYXRlLnRpbWVVbml0ID9cbiAgICAvLyBGb3IgdGltZVVuaXQsIGNhc3QgaW50byBpbnRlZ2VyIHdpdGggdGltZSgpIHNvIHdlIGNhbiB1c2UgPT09LCBpbnJhbmdlLCBpbmRleE9mIHRvIGNvbXBhcmUgdmFsdWVzIGRpcmVjdGx5LlxuICAgICAgLy8gVE9ETzogV2UgY2FsY3VsYXRlIHRpbWVVbml0IG9uIHRoZSBmbHkgaGVyZS4gQ29uc2lkZXIgaWYgd2Ugd291bGQgbGlrZSB0byBjb25zb2xpZGF0ZSB0aGlzIHdpdGggdGltZVVuaXQgcGlwZWxpbmVcbiAgICAgIC8vIFRPRE86IHN1cHBvcnQgdXRjXG4gICAgKCd0aW1lKCcgKyB0aW1lVW5pdEZpZWxkRXhwcihwcmVkaWNhdGUudGltZVVuaXQsIHByZWRpY2F0ZS5maWVsZCkgKyAnKScpIDpcbiAgICB2Z0ZpZWxkKHByZWRpY2F0ZSwge2V4cHI6ICdkYXR1bSd9KTtcblxuICBpZiAoaXNGaWVsZEVxdWFsUHJlZGljYXRlKHByZWRpY2F0ZSkpIHtcbiAgICByZXR1cm4gZmllbGRFeHByICsgJz09PScgKyB2YWx1ZUV4cHIocHJlZGljYXRlLmVxdWFsLCBwcmVkaWNhdGUudGltZVVuaXQpO1xuICB9IGVsc2UgaWYgKGlzRmllbGRPbmVPZlByZWRpY2F0ZShwcmVkaWNhdGUpKSB7XG4gICAgLy8gXCJvbmVPZlwiIHdhcyBmb3JtZXJseSBcImluXCIgLS0gc28gd2UgbmVlZCB0byBhZGQgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgIGNvbnN0IG9uZU9mOiBGaWVsZE9uZU9mUHJlZGljYXRlW10gPSBwcmVkaWNhdGUub25lT2YgfHwgcHJlZGljYXRlWydpbiddO1xuICAgIHJldHVybiAnaW5kZXhvZihbJyArXG4gICAgICBvbmVPZi5tYXAoKHYpID0+IHZhbHVlRXhwcih2LCBwcmVkaWNhdGUudGltZVVuaXQpKS5qb2luKCcsJykgK1xuICAgICAgJ10sICcgKyBmaWVsZEV4cHIgKyAnKSAhPT0gLTEnO1xuICB9IGVsc2UgaWYgKGlzRmllbGRSYW5nZVByZWRpY2F0ZShwcmVkaWNhdGUpKSB7XG4gICAgY29uc3QgbG93ZXIgPSBwcmVkaWNhdGUucmFuZ2VbMF07XG4gICAgY29uc3QgdXBwZXIgPSBwcmVkaWNhdGUucmFuZ2VbMV07XG5cbiAgICBpZiAobG93ZXIgIT09IG51bGwgJiYgdXBwZXIgIT09IG51bGwgJiYgdXNlSW5SYW5nZSkge1xuICAgICAgcmV0dXJuICdpbnJhbmdlKCcgKyBmaWVsZEV4cHIgKyAnLCBbJyArXG4gICAgICAgIHZhbHVlRXhwcihsb3dlciwgcHJlZGljYXRlLnRpbWVVbml0KSArICcsICcgK1xuICAgICAgICB2YWx1ZUV4cHIodXBwZXIsIHByZWRpY2F0ZS50aW1lVW5pdCkgKyAnXSknO1xuICAgIH1cblxuICAgIGNvbnN0IGV4cHJzID0gW107XG4gICAgaWYgKGxvd2VyICE9PSBudWxsKSB7XG4gICAgICBleHBycy5wdXNoKGAke2ZpZWxkRXhwcn0gPj0gJHt2YWx1ZUV4cHIobG93ZXIsIHByZWRpY2F0ZS50aW1lVW5pdCl9YCk7XG4gICAgfVxuICAgIGlmICh1cHBlciAhPT0gbnVsbCkge1xuICAgICAgZXhwcnMucHVzaChgJHtmaWVsZEV4cHJ9IDw9ICR7dmFsdWVFeHByKHVwcGVyLCBwcmVkaWNhdGUudGltZVVuaXQpfWApO1xuICAgIH1cblxuICAgIHJldHVybiBleHBycy5sZW5ndGggPiAwID8gZXhwcnMuam9pbignICYmICcpIDogJ3RydWUnO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IGl0IHNob3VsZCBuZXZlciByZWFjaCBoZXJlICovXG4gIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBmaWVsZCBwcmVkaWNhdGU6ICR7SlNPTi5zdHJpbmdpZnkocHJlZGljYXRlKX1gKTtcbn1cblxuZnVuY3Rpb24gdmFsdWVFeHByKHY6IGFueSwgdGltZVVuaXQ6IFRpbWVVbml0KTogc3RyaW5nIHtcbiAgaWYgKGlzRGF0ZVRpbWUodikpIHtcbiAgICBjb25zdCBleHByID0gZGF0ZVRpbWVFeHByKHYsIHRydWUpO1xuICAgIHJldHVybiAndGltZSgnICsgZXhwciArICcpJztcbiAgfVxuICBpZiAoaXNMb2NhbFNpbmdsZVRpbWVVbml0KHRpbWVVbml0KSkge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBEYXRlVGltZSA9IHt9O1xuICAgIGRhdGV0aW1lW3RpbWVVbml0XSA9IHY7XG4gICAgY29uc3QgZXhwciA9IGRhdGVUaW1lRXhwcihkYXRldGltZSwgdHJ1ZSk7XG4gICAgcmV0dXJuICd0aW1lKCcgKyBleHByICsgJyknO1xuICB9IGVsc2UgaWYgKGlzVXRjU2luZ2xlVGltZVVuaXQodGltZVVuaXQpKSB7XG4gICAgcmV0dXJuIHZhbHVlRXhwcih2LCBnZXRMb2NhbFRpbWVVbml0KHRpbWVVbml0KSk7XG4gIH1cbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplUHJlZGljYXRlKGY6IFByZWRpY2F0ZSk6IFByZWRpY2F0ZSB7XG4gIGlmIChpc0ZpZWxkUHJlZGljYXRlKGYpICYmIGYudGltZVVuaXQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uZixcbiAgICAgIHRpbWVVbml0OiBub3JtYWxpemVUaW1lVW5pdChmLnRpbWVVbml0KVxuICAgIH07XG4gIH1cbiAgcmV0dXJuIGY7XG59XG4iXX0=