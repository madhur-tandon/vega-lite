"use strict";
/**
 * Vega-Lite's singleton logger utility.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var vega_util_1 = require("vega-util");
var util_1 = require("./util");
/**
 * Main (default) Vega Logger instance for Vega-Lite
 */
var main = vega_util_1.logger(vega_util_1.Warn);
var current = main;
/**
 * Logger tool for checking if the code throws correct warning
 */
var LocalLogger = /** @class */ (function () {
    function LocalLogger() {
        this.warns = [];
        this.infos = [];
        this.debugs = [];
    }
    LocalLogger.prototype.level = function () {
        return this;
    };
    LocalLogger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.warns).push.apply(_a, args);
        return this;
        var _a;
    };
    LocalLogger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.infos).push.apply(_a, args);
        return this;
        var _a;
    };
    LocalLogger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.debugs).push.apply(_a, args);
        return this;
        var _a;
    };
    return LocalLogger;
}());
exports.LocalLogger = LocalLogger;
function wrap(f) {
    return function () {
        current = new LocalLogger();
        f(current);
        reset();
    };
}
exports.wrap = wrap;
/**
 * Set the singleton logger to be a custom logger
 */
function set(newLogger) {
    current = newLogger;
    return current;
}
exports.set = set;
/**
 * Reset the main logger to use the default Vega Logger
 */
function reset() {
    current = main;
    return current;
}
exports.reset = reset;
function warn() {
    var _ = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _[_i] = arguments[_i];
    }
    current.warn.apply(current, arguments);
}
exports.warn = warn;
function info() {
    var _ = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _[_i] = arguments[_i];
    }
    current.info.apply(current, arguments);
}
exports.info = info;
function debug() {
    var _ = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _[_i] = arguments[_i];
    }
    current.debug.apply(current, arguments);
}
exports.debug = debug;
/**
 * Collection of all Vega-Lite Error Messages
 */
var message;
(function (message) {
    message.INVALID_SPEC = 'Invalid spec';
    // FIT
    message.FIT_NON_SINGLE = 'Autosize "fit" only works for single views and layered views.';
    message.CANNOT_FIX_RANGE_STEP_WITH_FIT = 'Cannot use a fixed value of "rangeStep" when "autosize" is "fit".';
    // SELECTION
    function cannotProjectOnChannelWithoutField(channel) {
        return "Cannot project a selection on encoding channel \"" + channel + "\", which has no field.";
    }
    message.cannotProjectOnChannelWithoutField = cannotProjectOnChannelWithoutField;
    function nearestNotSupportForContinuous(mark) {
        return "The \"nearest\" transform is not supported for " + mark + " marks.";
    }
    message.nearestNotSupportForContinuous = nearestNotSupportForContinuous;
    function selectionNotFound(name) {
        return "Cannot find a selection named \"" + name + "\"";
    }
    message.selectionNotFound = selectionNotFound;
    message.SCALE_BINDINGS_CONTINUOUS = 'Scale bindings are currently only supported for scales with unbinned, continuous domains.';
    // REPEAT
    function noSuchRepeatedValue(field) {
        return "Unknown repeated value \"" + field + "\".";
    }
    message.noSuchRepeatedValue = noSuchRepeatedValue;
    // CONCAT
    message.CONCAT_CANNOT_SHARE_AXIS = 'Axes cannot be shared in concatenated views.';
    // REPEAT
    message.REPEAT_CANNOT_SHARE_AXIS = 'Axes cannot be shared in repeated views.';
    // TITLE
    function cannotSetTitleAnchor(type) {
        return "Cannot set title \"anchor\" for a " + type + " spec";
    }
    message.cannotSetTitleAnchor = cannotSetTitleAnchor;
    // DATA
    function unrecognizedParse(p) {
        return "Unrecognized parse \"" + p + "\".";
    }
    message.unrecognizedParse = unrecognizedParse;
    function differentParse(field, local, ancestor) {
        return "An ancestor parsed field \"" + field + "\" as " + ancestor + " but a child wants to parse the field as " + local + ".";
    }
    message.differentParse = differentParse;
    // TRANSFORMS
    function invalidTransformIgnored(transform) {
        return "Ignoring an invalid transform: " + util_1.stringify(transform) + ".";
    }
    message.invalidTransformIgnored = invalidTransformIgnored;
    message.NO_FIELDS_NEEDS_AS = 'If "from.fields" is not specified, "as" has to be a string that specifies the key to be used for the the data from the secondary source.';
    // ENCODING & FACET
    function primitiveChannelDef(channel, type, value) {
        return "Channel " + channel + " is a " + type + ". Converted to {value: " + util_1.stringify(value) + "}.";
    }
    message.primitiveChannelDef = primitiveChannelDef;
    function invalidFieldType(type) {
        return "Invalid field type \"" + type + "\"";
    }
    message.invalidFieldType = invalidFieldType;
    function invalidFieldTypeForCountAggregate(type, aggregate) {
        return "Invalid field type \"" + type + "\" for aggregate: \"" + aggregate + "\", using \"quantitative\" instead.";
    }
    message.invalidFieldTypeForCountAggregate = invalidFieldTypeForCountAggregate;
    function invalidAggregate(aggregate) {
        return "Invalid aggregation operator \"" + aggregate + "\"";
    }
    message.invalidAggregate = invalidAggregate;
    function emptyOrInvalidFieldType(type, channel, newType) {
        return "Invalid field type \"" + type + "\" for channel \"" + channel + "\", using \"" + newType + "\" instead.";
    }
    message.emptyOrInvalidFieldType = emptyOrInvalidFieldType;
    function emptyFieldDef(fieldDef, channel) {
        return "Dropping " + util_1.stringify(fieldDef) + " from channel \"" + channel + "\" since it does not contain data field or value.";
    }
    message.emptyFieldDef = emptyFieldDef;
    function incompatibleChannel(channel, markOrFacet, when) {
        return channel + " dropped as it is incompatible with \"" + markOrFacet + "\"" + (when ? " when " + when : '') + ".";
    }
    message.incompatibleChannel = incompatibleChannel;
    function facetChannelShouldBeDiscrete(channel) {
        return channel + " encoding should be discrete (ordinal / nominal / binned).";
    }
    message.facetChannelShouldBeDiscrete = facetChannelShouldBeDiscrete;
    function discreteChannelCannotEncode(channel, type) {
        return "Using discrete channel \"" + channel + "\" to encode \"" + type + "\" field can be misleading as it does not encode " + (type === 'ordinal' ? 'order' : 'magnitude') + ".";
    }
    message.discreteChannelCannotEncode = discreteChannelCannotEncode;
    // Mark
    message.BAR_WITH_POINT_SCALE_AND_RANGESTEP_NULL = 'Bar mark should not be used with point scale when rangeStep is null. Please use band scale instead.';
    function unclearOrientContinuous(mark) {
        return "Cannot clearly determine orientation for \"" + mark + "\" since both x and y channel encode continuous fields. In this case, we use vertical by default";
    }
    message.unclearOrientContinuous = unclearOrientContinuous;
    function unclearOrientDiscreteOrEmpty(mark) {
        return "Cannot clearly determine orientation for \"" + mark + "\" since both x and y channel encode discrete or empty fields.";
    }
    message.unclearOrientDiscreteOrEmpty = unclearOrientDiscreteOrEmpty;
    function orientOverridden(original, actual) {
        return "Specified orient \"" + original + "\" overridden with \"" + actual + "\"";
    }
    message.orientOverridden = orientOverridden;
    // SCALE
    message.CANNOT_UNION_CUSTOM_DOMAIN_WITH_FIELD_DOMAIN = 'custom domain scale cannot be unioned with default field-based domain';
    function cannotUseScalePropertyWithNonColor(prop) {
        return "Cannot use the scale property \"" + prop + "\" with non-color channel.";
    }
    message.cannotUseScalePropertyWithNonColor = cannotUseScalePropertyWithNonColor;
    function unaggregateDomainHasNoEffectForRawField(fieldDef) {
        return "Using unaggregated domain with raw field has no effect (" + util_1.stringify(fieldDef) + ").";
    }
    message.unaggregateDomainHasNoEffectForRawField = unaggregateDomainHasNoEffectForRawField;
    function unaggregateDomainWithNonSharedDomainOp(aggregate) {
        return "Unaggregated domain not applicable for \"" + aggregate + "\" since it produces values outside the origin domain of the source data.";
    }
    message.unaggregateDomainWithNonSharedDomainOp = unaggregateDomainWithNonSharedDomainOp;
    function unaggregatedDomainWithLogScale(fieldDef) {
        return "Unaggregated domain is currently unsupported for log scale (" + util_1.stringify(fieldDef) + ").";
    }
    message.unaggregatedDomainWithLogScale = unaggregatedDomainWithLogScale;
    function cannotUseSizeFieldWithBandSize(positionChannel) {
        return "Using size field when " + positionChannel + "-channel has a band scale is not supported.";
    }
    message.cannotUseSizeFieldWithBandSize = cannotUseSizeFieldWithBandSize;
    function cannotApplySizeToNonOrientedMark(mark) {
        return "Cannot apply size to non-oriented mark \"" + mark + "\".";
    }
    message.cannotApplySizeToNonOrientedMark = cannotApplySizeToNonOrientedMark;
    function rangeStepDropped(channel) {
        return "rangeStep for \"" + channel + "\" is dropped as top-level " + (channel === 'x' ? 'width' : 'height') + " is provided.";
    }
    message.rangeStepDropped = rangeStepDropped;
    function scaleTypeNotWorkWithChannel(channel, scaleType, defaultScaleType) {
        return "Channel \"" + channel + "\" does not work with \"" + scaleType + "\" scale. We are using \"" + defaultScaleType + "\" scale instead.";
    }
    message.scaleTypeNotWorkWithChannel = scaleTypeNotWorkWithChannel;
    function scaleTypeNotWorkWithFieldDef(scaleType, defaultScaleType) {
        return "FieldDef does not work with \"" + scaleType + "\" scale. We are using \"" + defaultScaleType + "\" scale instead.";
    }
    message.scaleTypeNotWorkWithFieldDef = scaleTypeNotWorkWithFieldDef;
    function scalePropertyNotWorkWithScaleType(scaleType, propName, channel) {
        return channel + "-scale's \"" + propName + "\" is dropped as it does not work with " + scaleType + " scale.";
    }
    message.scalePropertyNotWorkWithScaleType = scalePropertyNotWorkWithScaleType;
    function scaleTypeNotWorkWithMark(mark, scaleType) {
        return "Scale type \"" + scaleType + "\" does not work with mark \"" + mark + "\".";
    }
    message.scaleTypeNotWorkWithMark = scaleTypeNotWorkWithMark;
    function mergeConflictingProperty(property, propertyOf, v1, v2) {
        return "Conflicting " + propertyOf + " property \"" + property + "\" (" + util_1.stringify(v1) + " and " + util_1.stringify(v2) + ").  Using " + util_1.stringify(v1) + ".";
    }
    message.mergeConflictingProperty = mergeConflictingProperty;
    function independentScaleMeansIndependentGuide(channel) {
        return "Setting the scale to be independent for \"" + channel + "\" means we also have to set the guide (axis or legend) to be independent.";
    }
    message.independentScaleMeansIndependentGuide = independentScaleMeansIndependentGuide;
    function conflictedDomain(channel) {
        return "Cannot set " + channel + "-scale's \"domain\" as it is binned. Please use \"bin\"'s \"extent\" instead.";
    }
    message.conflictedDomain = conflictedDomain;
    function domainSortDropped(sort) {
        return "Dropping sort property " + util_1.stringify(sort) + " as unioned domains only support boolean or op 'count'.";
    }
    message.domainSortDropped = domainSortDropped;
    message.UNABLE_TO_MERGE_DOMAINS = 'Unable to merge domains';
    message.MORE_THAN_ONE_SORT = 'Domains that should be unioned has conflicting sort properties. Sort will be set to true.';
    // AXIS
    message.INVALID_CHANNEL_FOR_AXIS = 'Invalid channel for axis.';
    // STACK
    function cannotStackRangedMark(channel) {
        return "Cannot stack \"" + channel + "\" if there is already \"" + channel + "2\"";
    }
    message.cannotStackRangedMark = cannotStackRangedMark;
    function cannotStackNonLinearScale(scaleType) {
        return "Cannot stack non-linear scale (" + scaleType + ")";
    }
    message.cannotStackNonLinearScale = cannotStackNonLinearScale;
    function stackNonSummativeAggregate(aggregate) {
        return "Stacking is applied even though the aggregate function is non-summative (\"" + aggregate + "\")";
    }
    message.stackNonSummativeAggregate = stackNonSummativeAggregate;
    // TIMEUNIT
    function invalidTimeUnit(unitName, value) {
        return "Invalid " + unitName + ": " + util_1.stringify(value);
    }
    message.invalidTimeUnit = invalidTimeUnit;
    function dayReplacedWithDate(fullTimeUnit) {
        return "Time unit \"" + fullTimeUnit + "\" is not supported. We are replacing it with " + fullTimeUnit.replace('day', 'date') + ".";
    }
    message.dayReplacedWithDate = dayReplacedWithDate;
    function droppedDay(d) {
        return "Dropping day from datetime " + util_1.stringify(d) + " as day cannot be combined with other units.";
    }
    message.droppedDay = droppedDay;
})(message = exports.message || (exports.message = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgsdUNBQXdEO0FBU3hELCtCQUFpQztBQU1qQzs7R0FFRztBQUNILElBQU0sSUFBSSxHQUFHLGtCQUFNLENBQUMsZ0JBQUksQ0FBQyxDQUFDO0FBQzFCLElBQUksT0FBTyxHQUFvQixJQUFJLENBQUM7QUFFcEM7O0dBRUc7QUFDSDtJQUFBO1FBQ1MsVUFBSyxHQUFVLEVBQUUsQ0FBQztRQUNsQixVQUFLLEdBQVUsRUFBRSxDQUFDO1FBQ2xCLFdBQU0sR0FBVSxFQUFFLENBQUM7SUFvQjVCLENBQUM7SUFsQlEsMkJBQUssR0FBWjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU0sMEJBQUksR0FBWDtRQUFZLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQseUJBQWM7O1FBQ3hCLENBQUEsS0FBQSxJQUFJLENBQUMsS0FBSyxDQUFBLENBQUMsSUFBSSxXQUFJLElBQUksRUFBRTtRQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDOztJQUNkLENBQUM7SUFFTSwwQkFBSSxHQUFYO1FBQVksY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCx5QkFBYzs7UUFDeEIsQ0FBQSxLQUFBLElBQUksQ0FBQyxLQUFLLENBQUEsQ0FBQyxJQUFJLFdBQUksSUFBSSxFQUFFO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUM7O0lBQ2QsQ0FBQztJQUVNLDJCQUFLLEdBQVo7UUFBYSxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztRQUN6QixDQUFBLEtBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQSxDQUFDLElBQUksV0FBSSxJQUFJLEVBQUU7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQzs7SUFDZCxDQUFDO0lBQ0gsa0JB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QXFCLHdCQUVwQyxDQUFBO0lBRUQsbUNBQTBDLFNBQW9CO1FBQzVELE1BQU0sQ0FBQyxvQ0FBa0MsU0FBUyxNQUFHLENBQUM7SUFDeEQsQ0FBQztJQUZlLGlDQUF5Qiw0QkFFeEMsQ0FBQTtJQUVELG9DQUEyQyxTQUFpQjtRQUMxRCxNQUFNLENBQUMsZ0ZBQTZFLFNBQVMsUUFBSSxDQUFDO0lBQ3BHLENBQUM7SUFGZSxrQ0FBMEIsNkJBRXpDLENBQUE7SUFFRCxXQUFXO0lBQ1gseUJBQWdDLFFBQWdCLEVBQUUsS0FBc0I7UUFDdEUsTUFBTSxDQUFDLGFBQVcsUUFBUSxVQUFLLGdCQUFTLENBQUMsS0FBSyxDQUFHLENBQUM7SUFDcEQsQ0FBQztJQUZlLHVCQUFlLGtCQUU5QixDQUFBO0lBRUQsNkJBQW9DLFlBQW9CO1FBQ3RELE1BQU0sQ0FBQyxpQkFBYyxZQUFZLHNEQUMvQixZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBRyxDQUFDO0lBQzNDLENBQUM7SUFIZSwyQkFBbUIsc0JBR2xDLENBQUE7SUFFRCxvQkFBMkIsQ0FBMEI7UUFDbkQsTUFBTSxDQUFDLGdDQUE4QixnQkFBUyxDQUFDLENBQUMsQ0FBQyxpREFBOEMsQ0FBQztJQUNsRyxDQUFDO0lBRmUsa0JBQVUsYUFFekIsQ0FBQTtBQUNILENBQUMsRUE3TWdCLE9BQU8sR0FBUCxlQUFPLEtBQVAsZUFBTyxRQTZNdkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFZlZ2EtTGl0ZSdzIHNpbmdsZXRvbiBsb2dnZXIgdXRpbGl0eS5cbiAqL1xuXG5pbXBvcnQge2xvZ2dlciwgTG9nZ2VySW50ZXJmYWNlLCBXYXJufSBmcm9tICd2ZWdhLXV0aWwnO1xuaW1wb3J0IHtBZ2dyZWdhdGVPcH0gZnJvbSAnLi9hZ2dyZWdhdGUnO1xuaW1wb3J0IHtDaGFubmVsfSBmcm9tICcuL2NoYW5uZWwnO1xuaW1wb3J0IHtDb21wb3NpdGVNYXJrfSBmcm9tICcuL2NvbXBvc2l0ZW1hcmsnO1xuaW1wb3J0IHtEYXRlVGltZSwgRGF0ZVRpbWVFeHByfSBmcm9tICcuL2RhdGV0aW1lJztcbmltcG9ydCB7RmllbGREZWZ9IGZyb20gJy4vZmllbGRkZWYnO1xuaW1wb3J0IHtNYXJrfSBmcm9tICcuL21hcmsnO1xuaW1wb3J0IHtTY2FsZVR5cGV9IGZyb20gJy4vc2NhbGUnO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuL3R5cGUnO1xuaW1wb3J0IHtzdHJpbmdpZnl9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge1ZnU29ydEZpZWxkfSBmcm9tICcuL3ZlZ2Euc2NoZW1hJztcblxuXG5leHBvcnQge0xvZ2dlckludGVyZmFjZX0gZnJvbSAndmVnYS11dGlsJztcblxuLyoqXG4gKiBNYWluIChkZWZhdWx0KSBWZWdhIExvZ2dlciBpbnN0YW5jZSBmb3IgVmVnYS1MaXRlXG4gKi9cbmNvbnN0IG1haW4gPSBsb2dnZXIoV2Fybik7XG5sZXQgY3VycmVudDogTG9nZ2VySW50ZXJmYWNlID0gbWFpbjtcblxuLyoqXG4gKiBMb2dnZXIgdG9vbCBmb3IgY2hlY2tpbmcgaWYgdGhlIGNvZGUgdGhyb3dzIGNvcnJlY3Qgd2FybmluZ1xuICovXG5leHBvcnQgY2xhc3MgTG9jYWxMb2dnZXIgaW1wbGVtZW50cyBMb2dnZXJJbnRlcmZhY2Uge1xuICBwdWJsaWMgd2FybnM6IGFueVtdID0gW107XG4gIHB1YmxpYyBpbmZvczogYW55W10gPSBbXTtcbiAgcHVibGljIGRlYnVnczogYW55W10gPSBbXTtcblxuICBwdWJsaWMgbGV2ZWwoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdWJsaWMgd2FybiguLi5hcmdzOiBhbnlbXSkge1xuICAgIHRoaXMud2FybnMucHVzaCguLi5hcmdzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1YmxpYyBpbmZvKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgdGhpcy5pbmZvcy5wdXNoKC4uLmFyZ3MpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHVibGljIGRlYnVnKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgdGhpcy5kZWJ1Z3MucHVzaCguLi5hcmdzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JhcChmOiAobG9nZ2VyOiBMb2NhbExvZ2dlcikgPT4gdm9pZCkge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGN1cnJlbnQgPSBuZXcgTG9jYWxMb2dnZXIoKTtcbiAgICBmKGN1cnJlbnQgYXMgTG9jYWxMb2dnZXIpO1xuICAgIHJlc2V0KCk7XG4gIH07XG59XG5cbi8qKlxuICogU2V0IHRoZSBzaW5nbGV0b24gbG9nZ2VyIHRvIGJlIGEgY3VzdG9tIGxvZ2dlclxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0KG5ld0xvZ2dlcjogTG9nZ2VySW50ZXJmYWNlKSB7XG4gIGN1cnJlbnQgPSBuZXdMb2dnZXI7XG4gIHJldHVybiBjdXJyZW50O1xufVxuXG4vKipcbiAqIFJlc2V0IHRoZSBtYWluIGxvZ2dlciB0byB1c2UgdGhlIGRlZmF1bHQgVmVnYSBMb2dnZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0KCkge1xuICBjdXJyZW50ID0gbWFpbjtcbiAgcmV0dXJuIGN1cnJlbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3YXJuKC4uLl86IGFueVtdKSB7XG4gIGN1cnJlbnQud2Fybi5hcHBseShjdXJyZW50LCBhcmd1bWVudHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5mbyguLi5fOiBhbnlbXSkge1xuICBjdXJyZW50LmluZm8uYXBwbHkoY3VycmVudCwgYXJndW1lbnRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlYnVnKC4uLl86IGFueVtdKSB7XG4gIGN1cnJlbnQuZGVidWcuYXBwbHkoY3VycmVudCwgYXJndW1lbnRzKTtcbn1cblxuLyoqXG4gKiBDb2xsZWN0aW9uIG9mIGFsbCBWZWdhLUxpdGUgRXJyb3IgTWVzc2FnZXNcbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBtZXNzYWdlIHtcbiAgZXhwb3J0IGNvbnN0IElOVkFMSURfU1BFQyA9ICdJbnZhbGlkIHNwZWMnO1xuXG4gIC8vIEZJVFxuICBleHBvcnQgY29uc3QgRklUX05PTl9TSU5HTEUgPSAnQXV0b3NpemUgXCJmaXRcIiBvbmx5IHdvcmtzIGZvciBzaW5nbGUgdmlld3MgYW5kIGxheWVyZWQgdmlld3MuJztcblxuICBleHBvcnQgY29uc3QgQ0FOTk9UX0ZJWF9SQU5HRV9TVEVQX1dJVEhfRklUID0gJ0Nhbm5vdCB1c2UgYSBmaXhlZCB2YWx1ZSBvZiBcInJhbmdlU3RlcFwiIHdoZW4gXCJhdXRvc2l6ZVwiIGlzIFwiZml0XCIuJztcblxuICAvLyBTRUxFQ1RJT05cbiAgZXhwb3J0IGZ1bmN0aW9uIGNhbm5vdFByb2plY3RPbkNoYW5uZWxXaXRob3V0RmllbGQoY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgIHJldHVybiBgQ2Fubm90IHByb2plY3QgYSBzZWxlY3Rpb24gb24gZW5jb2RpbmcgY2hhbm5lbCBcIiR7Y2hhbm5lbH1cIiwgd2hpY2ggaGFzIG5vIGZpZWxkLmA7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbmVhcmVzdE5vdFN1cHBvcnRGb3JDb250aW51b3VzKG1hcms6IHN0cmluZykge1xuICAgIHJldHVybiBgVGhlIFwibmVhcmVzdFwiIHRyYW5zZm9ybSBpcyBub3Qgc3VwcG9ydGVkIGZvciAke21hcmt9IG1hcmtzLmA7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gc2VsZWN0aW9uTm90Rm91bmQobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGBDYW5ub3QgZmluZCBhIHNlbGVjdGlvbiBuYW1lZCBcIiR7bmFtZX1cImA7XG4gIH1cblxuICBleHBvcnQgY29uc3QgU0NBTEVfQklORElOR1NfQ09OVElOVU9VUyA9ICdTY2FsZSBiaW5kaW5ncyBhcmUgY3VycmVudGx5IG9ubHkgc3VwcG9ydGVkIGZvciBzY2FsZXMgd2l0aCB1bmJpbm5lZCwgY29udGludW91cyBkb21haW5zLic7XG5cbiAgLy8gUkVQRUFUXG4gIGV4cG9ydCBmdW5jdGlvbiBub1N1Y2hSZXBlYXRlZFZhbHVlKGZpZWxkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gYFVua25vd24gcmVwZWF0ZWQgdmFsdWUgXCIke2ZpZWxkfVwiLmA7XG4gIH1cblxuICAvLyBDT05DQVRcbiAgZXhwb3J0IGNvbnN0IENPTkNBVF9DQU5OT1RfU0hBUkVfQVhJUyA9ICdBeGVzIGNhbm5vdCBiZSBzaGFyZWQgaW4gY29uY2F0ZW5hdGVkIHZpZXdzLic7XG5cbiAgLy8gUkVQRUFUXG4gIGV4cG9ydCBjb25zdCBSRVBFQVRfQ0FOTk9UX1NIQVJFX0FYSVMgPSAnQXhlcyBjYW5ub3QgYmUgc2hhcmVkIGluIHJlcGVhdGVkIHZpZXdzLic7XG5cbiAgLy8gVElUTEVcbiAgZXhwb3J0IGZ1bmN0aW9uIGNhbm5vdFNldFRpdGxlQW5jaG9yKHR5cGU6IHN0cmluZykge1xuICAgIHJldHVybiBgQ2Fubm90IHNldCB0aXRsZSBcImFuY2hvclwiIGZvciBhICR7dHlwZX0gc3BlY2A7XG4gIH1cblxuICAvLyBEQVRBXG4gIGV4cG9ydCBmdW5jdGlvbiB1bnJlY29nbml6ZWRQYXJzZShwOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gYFVucmVjb2duaXplZCBwYXJzZSBcIiR7cH1cIi5gO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGRpZmZlcmVudFBhcnNlKGZpZWxkOiBzdHJpbmcsIGxvY2FsOiBzdHJpbmcsIGFuY2VzdG9yOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gYEFuIGFuY2VzdG9yIHBhcnNlZCBmaWVsZCBcIiR7ZmllbGR9XCIgYXMgJHthbmNlc3Rvcn0gYnV0IGEgY2hpbGQgd2FudHMgdG8gcGFyc2UgdGhlIGZpZWxkIGFzICR7bG9jYWx9LmA7XG4gIH1cblxuICAvLyBUUkFOU0ZPUk1TXG4gIGV4cG9ydCBmdW5jdGlvbiBpbnZhbGlkVHJhbnNmb3JtSWdub3JlZCh0cmFuc2Zvcm06IGFueSkge1xuICAgIHJldHVybiBgSWdub3JpbmcgYW4gaW52YWxpZCB0cmFuc2Zvcm06ICR7c3RyaW5naWZ5KHRyYW5zZm9ybSl9LmA7XG4gIH1cblxuICBleHBvcnQgY29uc3QgTk9fRklFTERTX05FRURTX0FTID0gJ0lmIFwiZnJvbS5maWVsZHNcIiBpcyBub3Qgc3BlY2lmaWVkLCBcImFzXCIgaGFzIHRvIGJlIGEgc3RyaW5nIHRoYXQgc3BlY2lmaWVzIHRoZSBrZXkgdG8gYmUgdXNlZCBmb3IgdGhlIHRoZSBkYXRhIGZyb20gdGhlIHNlY29uZGFyeSBzb3VyY2UuJztcblxuICAvLyBFTkNPRElORyAmIEZBQ0VUXG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHByaW1pdGl2ZUNoYW5uZWxEZWYoY2hhbm5lbDogQ2hhbm5lbCwgdHlwZTogJ3N0cmluZycgfCAnbnVtYmVyJyB8ICdib29sZWFuJywgdmFsdWU6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gYENoYW5uZWwgJHtjaGFubmVsfSBpcyBhICR7dHlwZX0uIENvbnZlcnRlZCB0byB7dmFsdWU6ICR7c3RyaW5naWZ5KHZhbHVlKX19LmA7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gaW52YWxpZEZpZWxkVHlwZSh0eXBlOiBUeXBlKSB7XG4gICAgcmV0dXJuIGBJbnZhbGlkIGZpZWxkIHR5cGUgXCIke3R5cGV9XCJgO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGludmFsaWRGaWVsZFR5cGVGb3JDb3VudEFnZ3JlZ2F0ZSh0eXBlOiBUeXBlLCBhZ2dyZWdhdGU6IHN0cmluZykge1xuICAgIHJldHVybiBgSW52YWxpZCBmaWVsZCB0eXBlIFwiJHt0eXBlfVwiIGZvciBhZ2dyZWdhdGU6IFwiJHthZ2dyZWdhdGV9XCIsIHVzaW5nIFwicXVhbnRpdGF0aXZlXCIgaW5zdGVhZC5gO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGludmFsaWRBZ2dyZWdhdGUoYWdncmVnYXRlOiBBZ2dyZWdhdGVPcCB8IHN0cmluZykge1xuICAgIHJldHVybiBgSW52YWxpZCBhZ2dyZWdhdGlvbiBvcGVyYXRvciBcIiR7YWdncmVnYXRlfVwiYDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBlbXB0eU9ySW52YWxpZEZpZWxkVHlwZSh0eXBlOiBUeXBlIHwgc3RyaW5nLCBjaGFubmVsOiBDaGFubmVsLCBuZXdUeXBlOiBUeXBlKSB7XG4gICAgcmV0dXJuIGBJbnZhbGlkIGZpZWxkIHR5cGUgXCIke3R5cGV9XCIgZm9yIGNoYW5uZWwgXCIke2NoYW5uZWx9XCIsIHVzaW5nIFwiJHtuZXdUeXBlfVwiIGluc3RlYWQuYDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBlbXB0eUZpZWxkRGVmKGZpZWxkRGVmOiBGaWVsZERlZjxzdHJpbmc+LCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgcmV0dXJuIGBEcm9wcGluZyAke3N0cmluZ2lmeShmaWVsZERlZil9IGZyb20gY2hhbm5lbCBcIiR7Y2hhbm5lbH1cIiBzaW5jZSBpdCBkb2VzIG5vdCBjb250YWluIGRhdGEgZmllbGQgb3IgdmFsdWUuYDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBpbmNvbXBhdGlibGVDaGFubmVsKGNoYW5uZWw6IENoYW5uZWwsIG1hcmtPckZhY2V0OiBNYXJrIHwgJ2ZhY2V0JyB8IENvbXBvc2l0ZU1hcmssIHdoZW4/OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gYCR7Y2hhbm5lbH0gZHJvcHBlZCBhcyBpdCBpcyBpbmNvbXBhdGlibGUgd2l0aCBcIiR7bWFya09yRmFjZXR9XCIke3doZW4gPyBgIHdoZW4gJHt3aGVufWAgOiAnJ30uYDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBmYWNldENoYW5uZWxTaG91bGRCZURpc2NyZXRlKGNoYW5uZWw6IHN0cmluZykge1xuICAgIHJldHVybiBgJHtjaGFubmVsfSBlbmNvZGluZyBzaG91bGQgYmUgZGlzY3JldGUgKG9yZGluYWwgLyBub21pbmFsIC8gYmlubmVkKS5gO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGRpc2NyZXRlQ2hhbm5lbENhbm5vdEVuY29kZShjaGFubmVsOiBDaGFubmVsLCB0eXBlOiBUeXBlKSB7XG4gICAgcmV0dXJuIGBVc2luZyBkaXNjcmV0ZSBjaGFubmVsIFwiJHtjaGFubmVsfVwiIHRvIGVuY29kZSBcIiR7dHlwZX1cIiBmaWVsZCBjYW4gYmUgbWlzbGVhZGluZyBhcyBpdCBkb2VzIG5vdCBlbmNvZGUgJHt0eXBlID09PSAnb3JkaW5hbCcgPyAnb3JkZXInIDogJ21hZ25pdHVkZSd9LmA7XG4gIH1cblxuICAvLyBNYXJrXG4gIGV4cG9ydCBjb25zdCBCQVJfV0lUSF9QT0lOVF9TQ0FMRV9BTkRfUkFOR0VTVEVQX05VTEwgPSAnQmFyIG1hcmsgc2hvdWxkIG5vdCBiZSB1c2VkIHdpdGggcG9pbnQgc2NhbGUgd2hlbiByYW5nZVN0ZXAgaXMgbnVsbC4gUGxlYXNlIHVzZSBiYW5kIHNjYWxlIGluc3RlYWQuJztcblxuICBleHBvcnQgZnVuY3Rpb24gdW5jbGVhck9yaWVudENvbnRpbnVvdXMobWFyazogTWFyaykge1xuICAgIHJldHVybiBgQ2Fubm90IGNsZWFybHkgZGV0ZXJtaW5lIG9yaWVudGF0aW9uIGZvciBcIiR7bWFya31cIiBzaW5jZSBib3RoIHggYW5kIHkgY2hhbm5lbCBlbmNvZGUgY29udGludW91cyBmaWVsZHMuIEluIHRoaXMgY2FzZSwgd2UgdXNlIHZlcnRpY2FsIGJ5IGRlZmF1bHRgO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHVuY2xlYXJPcmllbnREaXNjcmV0ZU9yRW1wdHkobWFyazogTWFyaykge1xuICAgIHJldHVybiBgQ2Fubm90IGNsZWFybHkgZGV0ZXJtaW5lIG9yaWVudGF0aW9uIGZvciBcIiR7bWFya31cIiBzaW5jZSBib3RoIHggYW5kIHkgY2hhbm5lbCBlbmNvZGUgZGlzY3JldGUgb3IgZW1wdHkgZmllbGRzLmA7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gb3JpZW50T3ZlcnJpZGRlbihvcmlnaW5hbDogc3RyaW5nLCBhY3R1YWw6IHN0cmluZykge1xuICAgIHJldHVybiBgU3BlY2lmaWVkIG9yaWVudCBcIiR7b3JpZ2luYWx9XCIgb3ZlcnJpZGRlbiB3aXRoIFwiJHthY3R1YWx9XCJgO1xuICB9XG5cbiAgLy8gU0NBTEVcbiAgZXhwb3J0IGNvbnN0IENBTk5PVF9VTklPTl9DVVNUT01fRE9NQUlOX1dJVEhfRklFTERfRE9NQUlOID0gJ2N1c3RvbSBkb21haW4gc2NhbGUgY2Fubm90IGJlIHVuaW9uZWQgd2l0aCBkZWZhdWx0IGZpZWxkLWJhc2VkIGRvbWFpbic7XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGNhbm5vdFVzZVNjYWxlUHJvcGVydHlXaXRoTm9uQ29sb3IocHJvcDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGBDYW5ub3QgdXNlIHRoZSBzY2FsZSBwcm9wZXJ0eSBcIiR7cHJvcH1cIiB3aXRoIG5vbi1jb2xvciBjaGFubmVsLmA7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gdW5hZ2dyZWdhdGVEb21haW5IYXNOb0VmZmVjdEZvclJhd0ZpZWxkKGZpZWxkRGVmOiBGaWVsZERlZjxzdHJpbmc+KSB7XG4gICAgcmV0dXJuIGBVc2luZyB1bmFnZ3JlZ2F0ZWQgZG9tYWluIHdpdGggcmF3IGZpZWxkIGhhcyBubyBlZmZlY3QgKCR7c3RyaW5naWZ5KGZpZWxkRGVmKX0pLmA7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gdW5hZ2dyZWdhdGVEb21haW5XaXRoTm9uU2hhcmVkRG9tYWluT3AoYWdncmVnYXRlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gYFVuYWdncmVnYXRlZCBkb21haW4gbm90IGFwcGxpY2FibGUgZm9yIFwiJHthZ2dyZWdhdGV9XCIgc2luY2UgaXQgcHJvZHVjZXMgdmFsdWVzIG91dHNpZGUgdGhlIG9yaWdpbiBkb21haW4gb2YgdGhlIHNvdXJjZSBkYXRhLmA7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gdW5hZ2dyZWdhdGVkRG9tYWluV2l0aExvZ1NjYWxlKGZpZWxkRGVmOiBGaWVsZERlZjxzdHJpbmc+KSB7XG4gICAgcmV0dXJuIGBVbmFnZ3JlZ2F0ZWQgZG9tYWluIGlzIGN1cnJlbnRseSB1bnN1cHBvcnRlZCBmb3IgbG9nIHNjYWxlICgke3N0cmluZ2lmeShmaWVsZERlZil9KS5gO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGNhbm5vdFVzZVNpemVGaWVsZFdpdGhCYW5kU2l6ZShwb3NpdGlvbkNoYW5uZWw6ICd4J3wneScpIHtcbiAgICByZXR1cm4gYFVzaW5nIHNpemUgZmllbGQgd2hlbiAke3Bvc2l0aW9uQ2hhbm5lbH0tY2hhbm5lbCBoYXMgYSBiYW5kIHNjYWxlIGlzIG5vdCBzdXBwb3J0ZWQuYDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBjYW5ub3RBcHBseVNpemVUb05vbk9yaWVudGVkTWFyayhtYXJrOiBNYXJrKSB7XG4gICAgcmV0dXJuIGBDYW5ub3QgYXBwbHkgc2l6ZSB0byBub24tb3JpZW50ZWQgbWFyayBcIiR7bWFya31cIi5gO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHJhbmdlU3RlcERyb3BwZWQoY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgIHJldHVybiBgcmFuZ2VTdGVwIGZvciBcIiR7Y2hhbm5lbH1cIiBpcyBkcm9wcGVkIGFzIHRvcC1sZXZlbCAke1xuICAgICAgY2hhbm5lbCA9PT0gJ3gnID8gJ3dpZHRoJyA6ICdoZWlnaHQnfSBpcyBwcm92aWRlZC5gO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHNjYWxlVHlwZU5vdFdvcmtXaXRoQ2hhbm5lbChjaGFubmVsOiBDaGFubmVsLCBzY2FsZVR5cGU6IFNjYWxlVHlwZSwgZGVmYXVsdFNjYWxlVHlwZTogU2NhbGVUeXBlKSB7XG4gICAgcmV0dXJuIGBDaGFubmVsIFwiJHtjaGFubmVsfVwiIGRvZXMgbm90IHdvcmsgd2l0aCBcIiR7c2NhbGVUeXBlfVwiIHNjYWxlLiBXZSBhcmUgdXNpbmcgXCIke2RlZmF1bHRTY2FsZVR5cGV9XCIgc2NhbGUgaW5zdGVhZC5gO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHNjYWxlVHlwZU5vdFdvcmtXaXRoRmllbGREZWYoc2NhbGVUeXBlOiBTY2FsZVR5cGUsIGRlZmF1bHRTY2FsZVR5cGU6IFNjYWxlVHlwZSkge1xuICAgIHJldHVybiBgRmllbGREZWYgZG9lcyBub3Qgd29yayB3aXRoIFwiJHtzY2FsZVR5cGV9XCIgc2NhbGUuIFdlIGFyZSB1c2luZyBcIiR7ZGVmYXVsdFNjYWxlVHlwZX1cIiBzY2FsZSBpbnN0ZWFkLmA7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gc2NhbGVQcm9wZXJ0eU5vdFdvcmtXaXRoU2NhbGVUeXBlKHNjYWxlVHlwZTogU2NhbGVUeXBlLCBwcm9wTmFtZTogc3RyaW5nLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgcmV0dXJuIGAke2NoYW5uZWx9LXNjYWxlJ3MgXCIke3Byb3BOYW1lfVwiIGlzIGRyb3BwZWQgYXMgaXQgZG9lcyBub3Qgd29yayB3aXRoICR7c2NhbGVUeXBlfSBzY2FsZS5gO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHNjYWxlVHlwZU5vdFdvcmtXaXRoTWFyayhtYXJrOiBNYXJrLCBzY2FsZVR5cGU6IFNjYWxlVHlwZSkge1xuICAgIHJldHVybiBgU2NhbGUgdHlwZSBcIiR7c2NhbGVUeXBlfVwiIGRvZXMgbm90IHdvcmsgd2l0aCBtYXJrIFwiJHttYXJrfVwiLmA7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbWVyZ2VDb25mbGljdGluZ1Byb3BlcnR5PFQ+KHByb3BlcnR5OiBzdHJpbmcsIHByb3BlcnR5T2Y6IHN0cmluZywgdjE6IFQsIHYyOiBUKSB7XG4gICAgcmV0dXJuIGBDb25mbGljdGluZyAke3Byb3BlcnR5T2Z9IHByb3BlcnR5IFwiJHtwcm9wZXJ0eX1cIiAoJHtzdHJpbmdpZnkodjEpfSBhbmQgJHtzdHJpbmdpZnkodjIpfSkuICBVc2luZyAke3N0cmluZ2lmeSh2MSl9LmA7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gaW5kZXBlbmRlbnRTY2FsZU1lYW5zSW5kZXBlbmRlbnRHdWlkZShjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgcmV0dXJuIGBTZXR0aW5nIHRoZSBzY2FsZSB0byBiZSBpbmRlcGVuZGVudCBmb3IgXCIke2NoYW5uZWx9XCIgbWVhbnMgd2UgYWxzbyBoYXZlIHRvIHNldCB0aGUgZ3VpZGUgKGF4aXMgb3IgbGVnZW5kKSB0byBiZSBpbmRlcGVuZGVudC5gO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGNvbmZsaWN0ZWREb21haW4oY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgIHJldHVybiBgQ2Fubm90IHNldCAke2NoYW5uZWx9LXNjYWxlJ3MgXCJkb21haW5cIiBhcyBpdCBpcyBiaW5uZWQuIFBsZWFzZSB1c2UgXCJiaW5cIidzIFwiZXh0ZW50XCIgaW5zdGVhZC5gO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGRvbWFpblNvcnREcm9wcGVkKHNvcnQ6IFZnU29ydEZpZWxkKSB7XG4gICAgcmV0dXJuIGBEcm9wcGluZyBzb3J0IHByb3BlcnR5ICR7c3RyaW5naWZ5KHNvcnQpfSBhcyB1bmlvbmVkIGRvbWFpbnMgb25seSBzdXBwb3J0IGJvb2xlYW4gb3Igb3AgJ2NvdW50Jy5gO1xuICB9XG5cbiAgZXhwb3J0IGNvbnN0IFVOQUJMRV9UT19NRVJHRV9ET01BSU5TID0gJ1VuYWJsZSB0byBtZXJnZSBkb21haW5zJztcblxuICBleHBvcnQgY29uc3QgTU9SRV9USEFOX09ORV9TT1JUID0gJ0RvbWFpbnMgdGhhdCBzaG91bGQgYmUgdW5pb25lZCBoYXMgY29uZmxpY3Rpbmcgc29ydCBwcm9wZXJ0aWVzLiBTb3J0IHdpbGwgYmUgc2V0IHRvIHRydWUuJztcblxuICAvLyBBWElTXG4gIGV4cG9ydCBjb25zdCBJTlZBTElEX0NIQU5ORUxfRk9SX0FYSVMgPSAnSW52YWxpZCBjaGFubmVsIGZvciBheGlzLic7XG5cbiAgLy8gU1RBQ0tcbiAgZXhwb3J0IGZ1bmN0aW9uIGNhbm5vdFN0YWNrUmFuZ2VkTWFyayhjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgcmV0dXJuIGBDYW5ub3Qgc3RhY2sgXCIke2NoYW5uZWx9XCIgaWYgdGhlcmUgaXMgYWxyZWFkeSBcIiR7Y2hhbm5lbH0yXCJgO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGNhbm5vdFN0YWNrTm9uTGluZWFyU2NhbGUoc2NhbGVUeXBlOiBTY2FsZVR5cGUpIHtcbiAgICByZXR1cm4gYENhbm5vdCBzdGFjayBub24tbGluZWFyIHNjYWxlICgke3NjYWxlVHlwZX0pYDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBzdGFja05vblN1bW1hdGl2ZUFnZ3JlZ2F0ZShhZ2dyZWdhdGU6IHN0cmluZykge1xuICAgIHJldHVybiBgU3RhY2tpbmcgaXMgYXBwbGllZCBldmVuIHRob3VnaCB0aGUgYWdncmVnYXRlIGZ1bmN0aW9uIGlzIG5vbi1zdW1tYXRpdmUgKFwiJHthZ2dyZWdhdGV9XCIpYDtcbiAgfVxuXG4gIC8vIFRJTUVVTklUXG4gIGV4cG9ydCBmdW5jdGlvbiBpbnZhbGlkVGltZVVuaXQodW5pdE5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IG51bWJlcikge1xuICAgIHJldHVybiBgSW52YWxpZCAke3VuaXROYW1lfTogJHtzdHJpbmdpZnkodmFsdWUpfWA7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gZGF5UmVwbGFjZWRXaXRoRGF0ZShmdWxsVGltZVVuaXQ6IHN0cmluZykge1xuICAgIHJldHVybiBgVGltZSB1bml0IFwiJHtmdWxsVGltZVVuaXR9XCIgaXMgbm90IHN1cHBvcnRlZC4gV2UgYXJlIHJlcGxhY2luZyBpdCB3aXRoICR7XG4gICAgICBmdWxsVGltZVVuaXQucmVwbGFjZSgnZGF5JywgJ2RhdGUnKX0uYDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBkcm9wcGVkRGF5KGQ6IERhdGVUaW1lIHwgRGF0ZVRpbWVFeHByKSB7XG4gICAgcmV0dXJuIGBEcm9wcGluZyBkYXkgZnJvbSBkYXRldGltZSAke3N0cmluZ2lmeShkKX0gYXMgZGF5IGNhbm5vdCBiZSBjb21iaW5lZCB3aXRoIG90aGVyIHVuaXRzLmA7XG4gIH1cbn1cblxuIl19