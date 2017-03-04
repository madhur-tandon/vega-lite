/**
 * Utility files for producing Vega ValueRef for marks
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var channel_1 = require("../../channel");
var fielddef_1 = require("../../fielddef");
var scale_1 = require("../../scale");
var util_1 = require("../../util");
var common_1 = require("../common");
// TODO: we need to find a way to refactor these so that scaleName is a part of scale
// but that's complicated.  For now, this is a huge step moving forward.
/**
 * @return Vega ValueRef for stackable x or y
 */
function stackable(channel, channelDef, scaleName, scale, stack, defaultRef) {
    if (channelDef && stack && channel === stack.fieldChannel) {
        // x or y use stack_end so that stacked line's point mark use stack_end too.
        return fieldRef(channelDef, scaleName, { suffix: 'end' });
    }
    return midPoint(channel, channelDef, scaleName, scale, defaultRef);
}
exports.stackable = stackable;
/**
 * @return Vega ValueRef for stackable x2 or y2
 */
function stackable2(channel, aFieldDef, a2fieldDef, scaleName, scale, stack, defaultRef) {
    if (aFieldDef && stack &&
        // If fieldChannel is X and channel is X2 (or Y and Y2)
        channel.charAt(0) === stack.fieldChannel.charAt(0)) {
        return fieldRef(aFieldDef, scaleName, { suffix: 'start' });
    }
    return midPoint(channel, a2fieldDef, scaleName, scale, defaultRef);
}
exports.stackable2 = stackable2;
/**
 * Value Ref for binned fields
 */
function bin(fieldDef, scaleName, side, offset) {
    return fieldRef(fieldDef, scaleName, { binSuffix: side }, offset);
}
exports.bin = bin;
function fieldRef(fieldDef, scaleName, opt, offset) {
    var ref = {
        scale: scaleName,
        field: fielddef_1.field(fieldDef, opt),
    };
    if (offset) {
        ref.offset = offset;
    }
    return ref;
}
exports.fieldRef = fieldRef;
function band(scaleName, band) {
    if (band === void 0) { band = true; }
    return {
        scale: scaleName,
        band: band
    };
}
exports.band = band;
function binMidSignal(fieldDef, scaleName) {
    return {
        scale: scaleName,
        signal: '(' + fielddef_1.field(fieldDef, { binSuffix: 'start', datum: true }) + '+' +
            fielddef_1.field(fieldDef, { binSuffix: 'end', datum: true }) + ')/2'
    };
}
exports.binMidSignal = binMidSignal;
/**
 * @returns {VgValueRef} Value Ref for xc / yc or mid point for other channels.
 */
function midPoint(channel, channelDef, scaleName, scale, defaultRef) {
    // TODO: datum support
    if (channelDef) {
        /* istanbul ignore else */
        if (fielddef_1.isFieldDef(channelDef)) {
            if (scale_1.hasDiscreteDomain(scale.type)) {
                if (scale.type === 'band') {
                    // For band, to get mid point, need to offset by half of the band
                    return fieldRef(channelDef, scaleName, { binSuffix: 'range' }, band(scaleName, 0.5));
                }
                return fieldRef(channelDef, scaleName, { binSuffix: 'range' });
            }
            else {
                if (channelDef.bin) {
                    return binMidSignal(channelDef, scaleName);
                }
                else {
                    return fieldRef(channelDef, scaleName, {}); // no need for bin suffix
                }
            }
        }
        else if (channelDef.value) {
            return {
                value: channelDef.value
            };
        }
        else {
            throw new Error('FieldDef without field or value.'); // FIXME add this to log.message
        }
    }
    if (defaultRef === 'zeroOrMin') {
        /* istanbul ignore else */
        if (channel === channel_1.X || channel === channel_1.X2) {
            return zeroOrMinX(scaleName, scale);
        }
        else if (channel === channel_1.Y || channel === channel_1.Y2) {
            return zeroOrMinY(scaleName, scale);
        }
        else {
            throw new Error("Unsupported channel " + channel + " for base function"); // FIXME add this to log.message
        }
    }
    else if (defaultRef === 'zeroOrMax') {
        /* istanbul ignore else */
        if (channel === channel_1.X || channel === channel_1.X2) {
            return zeroOrMaxX(scaleName, scale);
        }
        else if (channel === channel_1.Y || channel === channel_1.Y2) {
            return zeroOrMaxY(scaleName, scale);
        }
        else {
            throw new Error("Unsupported channel " + channel + " for base function"); // FIXME add this to log.message
        }
    }
    return defaultRef;
}
exports.midPoint = midPoint;
function text(textDef, config) {
    // text
    if (textDef) {
        if (fielddef_1.isFieldDef(textDef)) {
            if (textDef.type === 'quantitative') {
                // FIXME: what happens if we have bin?
                var format = common_1.numberFormat(textDef, textDef.format, config, 'text');
                return {
                    signal: "format(" + fielddef_1.field(textDef, { datum: true }) + ", '" + format + "')"
                };
            }
            else if (textDef.type === 'temporal') {
                return {
                    signal: common_1.timeFormatExpression(fielddef_1.field(textDef, { datum: true }), textDef.timeUnit, textDef.format, config.text.shortTimeLabels, config.timeFormat)
                };
            }
            else {
                return { field: textDef.field };
            }
        }
        else if (textDef.value) {
            return { value: textDef.value };
        }
    }
    return { value: config.text.text };
}
exports.text = text;
function midX(config) {
    if (typeof config.scale.rangeStep === 'string') {
        // TODO: For fit-mode, use middle of the width
        throw new Error('midX can not handle string rangeSteps');
    }
    return { value: config.scale.rangeStep / 2 };
}
exports.midX = midX;
function midY(config) {
    if (typeof config.scale.rangeStep === 'string') {
        // TODO: For fit-mode, use middle of the width
        throw new Error('midX can not handle string rangeSteps');
    }
    return { value: config.scale.rangeStep / 2 };
}
exports.midY = midY;
function zeroOrMinX(scaleName, scale) {
    if (scaleName) {
        // Log / Time / UTC scale do not support zero
        if (!util_1.contains([scale_1.ScaleType.LOG, scale_1.ScaleType.TIME, scale_1.ScaleType.UTC], scale.type) &&
            scale.zero !== false) {
            return {
                scale: scaleName,
                value: 0
            };
        }
    }
    // Put the mark on the x-axis
    return { value: 0 };
}
/**
 * @returns {VgValueRef} base value if scale exists and return max value if scale does not exist
 */
function zeroOrMaxX(scaleName, scale) {
    if (scaleName) {
        // Log / Time / UTC scale do not support zero
        if (!util_1.contains([scale_1.ScaleType.LOG, scale_1.ScaleType.TIME, scale_1.ScaleType.UTC], scale.type) &&
            scale.zero !== false) {
            return {
                scale: scaleName,
                value: 0
            };
        }
    }
    return { field: { group: 'width' } };
}
function zeroOrMinY(scaleName, scale) {
    if (scaleName) {
        // Log / Time / UTC scale do not support zero
        if (!util_1.contains([scale_1.ScaleType.LOG, scale_1.ScaleType.TIME, scale_1.ScaleType.UTC], scale.type) &&
            scale.zero !== false) {
            return {
                scale: scaleName,
                value: 0
            };
        }
    }
    // Put the mark on the y-axis
    return { field: { group: 'height' } };
}
/**
 * @returns {VgValueRef} base value if scale exists and return max value if scale does not exist
 */
function zeroOrMaxY(scaleName, scale) {
    if (scaleName) {
        // Log / Time / UTC scale do not support zero
        if (!util_1.contains([scale_1.ScaleType.LOG, scale_1.ScaleType.TIME, scale_1.ScaleType.UTC], scale.type) &&
            scale.zero !== false) {
            return {
                scale: scaleName,
                value: 0
            };
        }
    }
    // Put the mark on the y-axis
    return { value: 0 };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsdWVyZWYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcGlsZS9tYXJrL3ZhbHVlcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHOzs7QUFFSCx5Q0FBb0Q7QUFFcEQsMkNBQStHO0FBQy9HLHFDQUFnRTtBQUVoRSxtQ0FBb0M7QUFFcEMsb0NBQTZEO0FBRTdELHFGQUFxRjtBQUNyRix3RUFBd0U7QUFFeEU7O0dBRUc7QUFDSCxtQkFBMEIsT0FBa0IsRUFBRSxVQUFzQixFQUFFLFNBQWlCLEVBQUUsS0FBWSxFQUNqRyxLQUFzQixFQUFFLFVBQXNCO0lBQ2hELEVBQUUsQ0FBQyxDQUFDLFVBQVUsSUFBSSxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQzFELDRFQUE0RTtRQUM1RSxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDckUsQ0FBQztBQVBELDhCQU9DO0FBRUQ7O0dBRUc7QUFDSCxvQkFBMkIsT0FBb0IsRUFBRSxTQUFtQixFQUFFLFVBQW9CLEVBQUUsU0FBaUIsRUFBRSxLQUFZLEVBQ3ZILEtBQXNCLEVBQUUsVUFBc0I7SUFDaEQsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLEtBQUs7UUFDbEIsdURBQXVEO1FBQ3ZELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUNqRCxDQUFDLENBQUMsQ0FBQztRQUNMLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFDLE1BQU0s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