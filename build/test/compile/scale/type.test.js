"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var channel_1 = require("../../../src/channel");
var type_1 = require("../../../src/compile/scale/type");
var config_1 = require("../../../src/config");
var log = require("../../../src/log");
var mark_1 = require("../../../src/mark");
var scale_1 = require("../../../src/scale");
var timeunit_1 = require("../../../src/timeunit");
var type_2 = require("../../../src/type");
var util = require("../../../src/util");
var defaultScaleConfig = config_1.defaultConfig.scale;
describe('compile/scale', function () {
    describe('type()', function () {
        it('should return null for channel without scale', function () {
            chai_1.assert.deepEqual(type_1.scaleType(undefined, 'detail', { type: 'temporal', timeUnit: 'yearmonth' }, 'point', defaultScaleConfig), null);
        });
        it('should show warning if users try to override the scale and use bin', log.wrap(function (localLogger) {
            chai_1.assert.deepEqual(type_1.scaleType('point', 'color', { type: 'quantitative', bin: true }, 'point', defaultScaleConfig), scale_1.ScaleType.BIN_ORDINAL);
            chai_1.assert.equal(localLogger.warns[0], log.message.scaleTypeNotWorkWithFieldDef(scale_1.ScaleType.POINT, scale_1.ScaleType.BIN_ORDINAL));
        }));
        describe('nominal/ordinal', function () {
            describe('color', function () {
                it('should return ordinal scale for nominal data by default.', function () {
                    chai_1.assert.equal(type_1.scaleType(undefined, 'color', { type: 'nominal' }, 'point', defaultScaleConfig), scale_1.ScaleType.ORDINAL);
                });
                it('should return ordinal scale for ordinal data.', function () {
                    chai_1.assert.equal(type_1.scaleType(undefined, 'color', { type: 'nominal' }, 'point', defaultScaleConfig), scale_1.ScaleType.ORDINAL);
                });
            });
            describe('discrete channel (shape)', function () {
                it('should return ordinal for nominal field', function () {
                    chai_1.assert.deepEqual(type_1.scaleType(undefined, 'shape', { type: 'nominal' }, 'point', defaultScaleConfig), scale_1.ScaleType.ORDINAL);
                });
                it('should return ordinal even if other type is specified', log.wrap(function (localLogger) {
                    [scale_1.ScaleType.LINEAR, scale_1.ScaleType.BAND, scale_1.ScaleType.POINT].forEach(function (badScaleType) {
                        chai_1.assert.deepEqual(type_1.scaleType(badScaleType, 'shape', { type: 'nominal' }, 'point', defaultScaleConfig), scale_1.ScaleType.ORDINAL);
                        var warns = localLogger.warns;
                        chai_1.assert.equal(warns[warns.length - 1], log.message.scaleTypeNotWorkWithChannel('shape', badScaleType, 'ordinal'));
                    });
                }));
                it('should return ordinal for an ordinal field and throw a warning.', log.wrap(function (localLogger) {
                    chai_1.assert.deepEqual(type_1.scaleType(undefined, 'shape', { type: 'ordinal' }, 'point', defaultScaleConfig), scale_1.ScaleType.ORDINAL);
                    chai_1.assert.equal(localLogger.warns[0], log.message.discreteChannelCannotEncode('shape', 'ordinal'));
                }));
            });
            describe('continuous', function () {
                it('should return point scale for ordinal X,Y for marks others than rect, rule, and bar', function () {
                    mark_1.PRIMITIVE_MARKS.forEach(function (mark) {
                        if (util.contains(['bar', 'rule', 'rect'], mark)) {
                            return;
                        }
                        [type_2.ORDINAL, type_2.NOMINAL].forEach(function (t) {
                            [channel_1.X, channel_1.Y].forEach(function (channel) {
                                chai_1.assert.equal(type_1.scaleType(undefined, channel, { type: t }, mark, defaultScaleConfig), scale_1.ScaleType.POINT);
                            });
                        });
                    });
                });
                it('should return band scale for ordinal X,Y when mark is rect, rule, bar', function () {
                    [type_2.ORDINAL, type_2.NOMINAL].forEach(function (t) {
                        [channel_1.X, channel_1.Y].forEach(function (channel) {
                            ['bar', 'rule', 'rect'].forEach(function (mark) {
                                chai_1.assert.equal(type_1.scaleType(undefined, channel, { type: t }, 'rect', defaultScaleConfig), scale_1.ScaleType.BAND);
                            });
                        });
                    });
                });
                it('should return point scale for X,Y when mark is point', function () {
                    [type_2.ORDINAL, type_2.NOMINAL].forEach(function (t) {
                        [channel_1.X, channel_1.Y].forEach(function (channel) {
                            chai_1.assert.equal(type_1.scaleType(undefined, channel, { type: t }, 'point', defaultScaleConfig), scale_1.ScaleType.POINT);
                        });
                    });
                });
                it('should return point scale for X,Y when mark is point when ORDINAL SCALE TYPE is specified and throw warning', log.wrap(function (localLogger) {
                    [type_2.ORDINAL, type_2.NOMINAL].forEach(function (t) {
                        [channel_1.X, channel_1.Y].forEach(function (channel) {
                            chai_1.assert.equal(type_1.scaleType('ordinal', channel, { type: t }, 'point', defaultScaleConfig), scale_1.ScaleType.POINT);
                            var warns = localLogger.warns;
                            chai_1.assert.equal(warns[warns.length - 1], log.message.scaleTypeNotWorkWithChannel(channel, 'ordinal', 'point'));
                        });
                    });
                }));
                it('should return point scale for ordinal/nominal fields for continuous channels other than x and y.', function () {
                    var OTHER_CONTINUOUS_CHANNELS = channel_1.SCALE_CHANNELS.filter(function (c) { return channel_1.rangeType(c) === 'continuous' && !util.contains([channel_1.X, channel_1.Y], c); });
                    mark_1.PRIMITIVE_MARKS.forEach(function (mark) {
                        [type_2.ORDINAL, type_2.NOMINAL].forEach(function (t) {
                            OTHER_CONTINUOUS_CHANNELS.forEach(function (channel) {
                                chai_1.assert.equal(type_1.scaleType(undefined, channel, { type: t }, mark, defaultScaleConfig), scale_1.ScaleType.POINT, channel + ", " + mark + ", " + t + " " + type_1.scaleType(undefined, channel, { type: t }, mark, defaultScaleConfig));
                            });
                        });
                    });
                });
            });
        });
        describe('temporal', function () {
            it('should return sequential scale for temporal color field by default.', function () {
                chai_1.assert.equal(type_1.scaleType(undefined, 'color', { type: 'temporal' }, 'point', defaultScaleConfig), scale_1.ScaleType.SEQUENTIAL);
            });
            it('should return ordinal for temporal field and throw a warning.', log.wrap(function (localLogger) {
                chai_1.assert.deepEqual(type_1.scaleType(undefined, 'shape', { type: 'temporal', timeUnit: 'yearmonth' }, 'point', defaultScaleConfig), scale_1.ScaleType.ORDINAL);
                chai_1.assert.equal(localLogger.warns[0], log.message.discreteChannelCannotEncode('shape', 'temporal'));
            }));
            it('should return time for all time units.', function () {
                for (var _i = 0, TIMEUNITS_1 = timeunit_1.TIMEUNITS; _i < TIMEUNITS_1.length; _i++) {
                    var timeUnit = TIMEUNITS_1[_i];
                    chai_1.assert.deepEqual(type_1.scaleType(undefined, channel_1.Y, { type: 'temporal', timeUnit: timeUnit }, 'point', defaultScaleConfig), scale_1.ScaleType.TIME);
                }
            });
        });
        describe('quantitative', function () {
            it('should return sequential scale for quantitative color field by default.', function () {
                chai_1.assert.equal(type_1.scaleType(undefined, 'color', { type: 'quantitative' }, 'point', defaultScaleConfig), scale_1.ScaleType.SEQUENTIAL);
            });
            it('should return ordinal bin scale for quantitative color field with binning.', function () {
                chai_1.assert.equal(type_1.scaleType(undefined, 'color', { type: 'quantitative', bin: true }, 'point', defaultScaleConfig), scale_1.ScaleType.BIN_ORDINAL);
            });
            it('should return ordinal for encoding quantitative field with a discrete channel and throw a warning.', log.wrap(function (localLogger) {
                chai_1.assert.deepEqual(type_1.scaleType(undefined, 'shape', { type: 'quantitative' }, 'point', defaultScaleConfig), scale_1.ScaleType.ORDINAL);
                chai_1.assert.equal(localLogger.warns[0], log.message.discreteChannelCannotEncode('shape', 'quantitative'));
            }));
            it('should return linear scale for quantitative by default.', function () {
                chai_1.assert.equal(type_1.scaleType(undefined, 'x', { type: 'quantitative' }, 'point', defaultScaleConfig), scale_1.ScaleType.LINEAR);
            });
            it('should return bin linear scale for quantitative by default.', function () {
                chai_1.assert.equal(type_1.scaleType(undefined, 'opacity', { type: 'quantitative', bin: true }, 'point', defaultScaleConfig), scale_1.ScaleType.BIN_LINEAR);
            });
            it('should return linear scale for quantitative x and y.', function () {
                chai_1.assert.equal(type_1.scaleType(undefined, 'x', { type: 'quantitative', bin: true }, 'point', defaultScaleConfig), scale_1.ScaleType.LINEAR);
            });
        });
        describe('dataTypeMatchScaleType()', function () {
            it('should return specified value if datatype is ordinal or nominal and specified scale type is the ordinal or nominal', function () {
                chai_1.assert.equal(type_1.scaleType(scale_1.ScaleType.ORDINAL, 'shape', { type: 'ordinal' }, 'point', defaultScaleConfig), scale_1.ScaleType.ORDINAL);
            });
            it('should return default scale type if data type is temporal but specified scale type is not time or utc', function () {
                chai_1.assert.equal(type_1.scaleType(scale_1.ScaleType.LINEAR, 'x', { type: 'temporal', timeUnit: 'year' }, 'point', defaultScaleConfig), scale_1.ScaleType.TIME);
                chai_1.assert.equal(type_1.scaleType(scale_1.ScaleType.LINEAR, 'color', { type: 'temporal', timeUnit: 'year' }, 'point', defaultScaleConfig), scale_1.ScaleType.SEQUENTIAL);
            });
            it('should return time if data type is temporal but specified scale type is discrete', function () {
                chai_1.assert.equal(type_1.scaleType(scale_1.ScaleType.POINT, 'x', { type: 'temporal', timeUnit: 'year' }, 'point', defaultScaleConfig), scale_1.ScaleType.TIME);
            });
            it('should return default scale type if data type is temporal but specified scale type is time or utc or any discrete type', function () {
                chai_1.assert.equal(type_1.scaleType(scale_1.ScaleType.LINEAR, 'x', { type: 'temporal', timeUnit: 'year' }, 'point', defaultScaleConfig), scale_1.ScaleType.TIME);
            });
            it('should return default scale type if data type is quantative but scale type do not support quantative', function () {
                chai_1.assert.equal(type_1.scaleType(scale_1.ScaleType.TIME, 'color', { type: 'quantitative' }, 'point', defaultScaleConfig), scale_1.ScaleType.SEQUENTIAL);
            });
            it('should return default scale type if data type is quantative and scale type supports quantative', function () {
                chai_1.assert.equal(type_1.scaleType(scale_1.ScaleType.TIME, 'x', { type: 'quantitative' }, 'point', defaultScaleConfig), scale_1.ScaleType.LINEAR);
            });
            it('should return default scale type if data type is quantative and scale type supports quantative', function () {
                chai_1.assert.equal(type_1.scaleType(scale_1.ScaleType.TIME, 'x', { type: 'temporal' }, 'point', defaultScaleConfig), scale_1.ScaleType.TIME);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGVzdC9jb21waWxlL3NjYWxlL3R5cGUudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE0QjtBQUM1QixnREFBcUU7QUFDckUsd0RBQTBEO0FBQzFELDhDQUFrRDtBQUNsRCxzQ0FBd0M7QUFDeEMsMENBQWtEO0FBQ2xELDRDQUE2QztBQUM3QyxrREFBZ0Q7QUFDaEQsMENBQW1EO0FBQ25ELHdDQUEwQztBQUUxQyxJQUFNLGtCQUFrQixHQUFHLHNCQUFhLENBQUMsS0FBSyxDQUFDO0FBRS9DLFFBQVEsQ0FBQyxlQUFlLEVBQUU7SUFDeEIsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUNqQixFQUFFLENBQUMsOENBQThDLEVBQUU7WUFDakQsYUFBTSxDQUFDLFNBQVMsQ0FDZCxnQkFBUyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUMsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLENBQUMsRUFDdEcsSUFBSSxDQUNMLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxvRUFBb0UsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQUMsV0FBVztZQUM1RixhQUFNLENBQUMsU0FBUyxDQUNkLGdCQUFTLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxFQUMzRixpQkFBUyxDQUFDLFdBQVcsQ0FDdEIsQ0FBQztZQUNGLGFBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDLGlCQUFTLENBQUMsS0FBSyxFQUFFLGlCQUFTLENBQUMs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QUFJLEVBQUUsR0FBRyxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxFQUMvRSxpQkFBUyxDQUFDLElBQUksQ0FDZixDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2Fzc2VydH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQge3JhbmdlVHlwZSwgU0NBTEVfQ0hBTk5FTFMsIFgsIFl9IGZyb20gJy4uLy4uLy4uL3NyYy9jaGFubmVsJztcbmltcG9ydCB7c2NhbGVUeXBlfSBmcm9tICcuLi8uLi8uLi9zcmMvY29tcGlsZS9zY2FsZS90eXBlJztcbmltcG9ydCB7ZGVmYXVsdENvbmZpZ30gZnJvbSAnLi4vLi4vLi4vc3JjL2NvbmZpZyc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vLi4vLi4vc3JjL2xvZyc7XG5pbXBvcnQge1BSSU1JVElWRV9NQVJLU30gZnJvbSAnLi4vLi4vLi4vc3JjL21hcmsnO1xuaW1wb3J0IHtTY2FsZVR5cGV9IGZyb20gJy4uLy4uLy4uL3NyYy9zY2FsZSc7XG5pbXBvcnQge1RJTUVVTklUU30gZnJvbSAnLi4vLi4vLi4vc3JjL3RpbWV1bml0JztcbmltcG9ydCB7Tk9NSU5BTCwgT1JESU5BTH0gZnJvbSAnLi4vLi4vLi4vc3JjL3R5cGUnO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tICcuLi8uLi8uLi9zcmMvdXRpbCc7XG5cbmNvbnN0IGRlZmF1bHRTY2FsZUNvbmZpZyA9IGRlZmF1bHRDb25maWcuc2NhbGU7XG5cbmRlc2NyaWJlKCdjb21waWxlL3NjYWxlJywgKCkgPT4ge1xuICBkZXNjcmliZSgndHlwZSgpJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIG51bGwgZm9yIGNoYW5uZWwgd2l0aG91dCBzY2FsZScsIGZ1bmN0aW9uKCkge1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgc2NhbGVUeXBlKHVuZGVmaW5lZCwgJ2RldGFpbCcsIHt0eXBlOiAndGVtcG9yYWwnLCB0aW1lVW5pdDogJ3llYXJtb250aCd9LCAncG9pbnQnLCBkZWZhdWx0U2NhbGVDb25maWcpLFxuICAgICAgICBudWxsXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzaG93IHdhcm5pbmcgaWYgdXNlcnMgdHJ5IHRvIG92ZXJyaWRlIHRoZSBzY2FsZSBhbmQgdXNlIGJpbicsIGxvZy53cmFwKChsb2NhbExvZ2dlcikgPT4ge1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgc2NhbGVUeXBlKCdwb2ludCcsICdjb2xvcicsIHt0eXBlOiAncXVhbnRpdGF0aXZlJywgYmluOiB0cnVlfSwgJ3BvaW50JywgZGVmYXVsdFNjYWxlQ29uZmlnKSxcbiAgICAgICAgU2NhbGVUeXBlLkJJTl9PUkRJTkFMXG4gICAgICApO1xuICAgICAgYXNzZXJ0LmVxdWFsKGxvY2FsTG9nZ2VyLndhcm5zWzBdLCBsb2cubWVzc2FnZS5zY2FsZVR5cGVOb3RXb3JrV2l0aEZpZWxkRGVmKFNjYWxlVHlwZS5QT0lOVCwgU2NhbGVUeXBlLkJJTl9PUkRJTkFMKSk7XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ25vbWluYWwvb3JkaW5hbCcsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdjb2xvcicsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gb3JkaW5hbCBzY2FsZSBmb3Igbm9taW5hbCBkYXRhIGJ5IGRlZmF1bHQuJywgKCkgPT4ge1xuICAgICAgICAgIGFzc2VydC5lcXVhbChcbiAgICAgICAgICAgIHNjYWxlVHlwZSh1bmRlZmluZWQsICdjb2xvcicsIHt0eXBlOiAnbm9taW5hbCd9LCAncG9pbnQnLCBkZWZhdWx0U2NhbGVDb25maWcpLFxuICAgICAgICAgICAgU2NhbGVUeXBlLk9SRElOQUxcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBvcmRpbmFsIHNjYWxlIGZvciBvcmRpbmFsIGRhdGEuJywgKCkgPT4ge1xuICAgICAgICAgIGFzc2VydC5lcXVhbChcbiAgICAgICAgICAgIHNjYWxlVHlwZSh1bmRlZmluZWQsICdjb2xvcicsIHt0eXBlOiAnbm9taW5hbCd9LCAncG9pbnQnLCBkZWZhdWx0U2NhbGVDb25maWcpLFxuICAgICAgICAgICAgU2NhbGVUeXBlLk9SRElOQUxcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnZGlzY3JldGUgY2hhbm5lbCAoc2hhcGUpJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBvcmRpbmFsIGZvciBub21pbmFsIGZpZWxkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgICAgIHNjYWxlVHlwZSh1bmRlZmluZWQsICdzaGFwZScsIHt0eXBlOiAnbm9taW5hbCd9LCAncG9pbnQnLCBkZWZhdWx0U2NhbGVDb25maWcpLFxuICAgICAgICAgICAgU2NhbGVUeXBlLk9SRElOQUxcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBvcmRpbmFsIGV2ZW4gaWYgb3RoZXIgdHlwZSBpcyBzcGVjaWZpZWQnLCBsb2cud3JhcCgobG9jYWxMb2dnZXIpID0+IHtcbiAgICAgICAgICBbU2NhbGVUeXBlLkxJTkVBUiwgU2NhbGVUeXBlLkJBTkQsIFNjYWxlVHlwZS5QT0lOVF0uZm9yRWFjaCgoYmFkU2NhbGVUeXBlKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICAgICAgICBzY2FsZVR5cGUoYmFkU2NhbGVUeXBlLCAnc2hhcGUnLCB7dHlwZTogJ25vbWluYWwnfSwgJ3BvaW50JywgZGVmYXVsdFNjYWxlQ29uZmlnKSxcbiAgICAgICAgICAgICAgU2NhbGVUeXBlLk9SRElOQUxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCB3YXJucyA9IGxvY2FsTG9nZ2VyLndhcm5zO1xuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKHdhcm5zW3dhcm5zLmxlbmd0aC0xXSwgbG9nLm1lc3NhZ2Uuc2NhbGVUeXBlTm90V29ya1dpdGhDaGFubmVsKCdzaGFwZScsIGJhZFNjYWxlVHlwZSwgJ29yZGluYWwnKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBvcmRpbmFsIGZvciBhbiBvcmRpbmFsIGZpZWxkIGFuZCB0aHJvdyBhIHdhcm5pbmcuJywgbG9nLndyYXAoKGxvY2FsTG9nZ2VyKSA9PiB7XG4gICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgICAgIHNjYWxlVHlwZSh1bmRlZmluZWQsICdzaGFwZScsIHt0eXBlOiAnb3JkaW5hbCd9LCAncG9pbnQnLCBkZWZhdWx0U2NhbGVDb25maWcpLFxuICAgICAgICAgICAgU2NhbGVUeXBlLk9SRElOQUxcbiAgICAgICAgICApO1xuICAgICAgICAgIGFzc2VydC5lcXVhbChsb2NhbExvZ2dlci53YXJuc1swXSwgbG9nLm1lc3NhZ2UuZGlzY3JldGVDaGFubmVsQ2Fubm90RW5jb2RlKCdzaGFwZScsICdvcmRpbmFsJykpO1xuICAgICAgICB9KSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ2NvbnRpbnVvdXMnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHBvaW50IHNjYWxlIGZvciBvcmRpbmFsIFgsWSBmb3IgbWFya3Mgb3RoZXJzIHRoYW4gcmVjdCwgcnVsZSwgYW5kIGJhcicsICgpID0+IHtcbiAgICAgICAgICBQUklNSVRJVkVfTUFSS1MuZm9yRWFjaCgobWFyaykgPT4ge1xuICAgICAgICAgICAgaWYgKHV0aWwuY29udGFpbnMoWydiYXInLCAncnVsZScsICdyZWN0J10sIG1hcmspKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgW09SRElOQUwsIE5PTUlOQUxdLmZvckVhY2goKHQpID0+IHtcbiAgICAgICAgICAgICAgW1gsIFldLmZvckVhY2goKGNoYW5uZWwpID0+IHtcbiAgICAgICAgICAgICAgICBhc3NlcnQuZXF1YWwoXG4gICAgICAgICAgICAgICAgICBzY2FsZVR5cGUodW5kZWZpbmVkLCBjaGFubmVsLCB7dHlwZTogdH0sIG1hcmssIGRlZmF1bHRTY2FsZUNvbmZpZyksXG4gICAgICAgICAgICAgICAgICBTY2FsZVR5cGUuUE9JTlRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBiYW5kIHNjYWxlIGZvciBvcmRpbmFsIFgsWSB3aGVuIG1hcmsgaXMgcmVjdCwgcnVsZSwgYmFyJywgKCkgPT4ge1xuICAgICAgICAgIFtPUkRJTkFMLCBOT01JTkFMXS5mb3JFYWNoKCh0KSA9PiB7XG4gICAgICAgICAgICBbWCwgWV0uZm9yRWFjaCgoY2hhbm5lbCkgPT4ge1xuICAgICAgICAgICAgICBbJ2JhcicsICdydWxlJywgJ3JlY3QnXS5mb3JFYWNoKChtYXJrKSA9PiB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKFxuICAgICAgICAgICAgICAgICAgc2NhbGVUeXBlKHVuZGVmaW5lZCwgY2hhbm5lbCwge3R5cGU6IHR9LCAncmVjdCcsIGRlZmF1bHRTY2FsZUNvbmZpZyksXG4gICAgICAgICAgICAgICAgICBTY2FsZVR5cGUuQkFORFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHBvaW50IHNjYWxlIGZvciBYLFkgd2hlbiBtYXJrIGlzIHBvaW50JywgKCkgPT4ge1xuICAgICAgICAgIFtPUkRJTkFMLCBOT01JTkFMXS5mb3JFYWNoKCh0KSA9PiB7XG4gICAgICAgICAgICBbWCwgWV0uZm9yRWFjaCgoY2hhbm5lbCkgPT4ge1xuICAgICAgICAgICAgICBhc3NlcnQuZXF1YWwoc2NhbGVUeXBlKHVuZGVmaW5lZCwgY2hhbm5lbCwge3R5cGU6IHR9LCAncG9pbnQnLCBkZWZhdWx0U2NhbGVDb25maWcpLCBTY2FsZVR5cGUuUE9JTlQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHBvaW50IHNjYWxlIGZvciBYLFkgd2hlbiBtYXJrIGlzIHBvaW50IHdoZW4gT1JESU5BTCBTQ0FMRSBUWVBFIGlzIHNwZWNpZmllZCBhbmQgdGhyb3cgd2FybmluZycsIGxvZy53cmFwKChsb2NhbExvZ2dlcikgPT4ge1xuICAgICAgICAgIFtPUkRJTkFMLCBOT01JTkFMXS5mb3JFYWNoKCh0KSA9PiB7XG4gICAgICAgICAgICBbWCwgWV0uZm9yRWFjaCgoY2hhbm5lbCkgPT4ge1xuICAgICAgICAgICAgICBhc3NlcnQuZXF1YWwoc2NhbGVUeXBlKCdvcmRpbmFsJywgY2hhbm5lbCwge3R5cGU6IHR9LCAncG9pbnQnLCBkZWZhdWx0U2NhbGVDb25maWcpLCBTY2FsZVR5cGUuUE9JTlQpO1xuICAgICAgICAgICAgICBjb25zdCB3YXJucyA9IGxvY2FsTG9nZ2VyLndhcm5zO1xuICAgICAgICAgICAgICBhc3NlcnQuZXF1YWwod2FybnNbd2FybnMubGVuZ3RoLTFdLCBsb2cubWVzc2FnZS5zY2FsZVR5cGVOb3RXb3JrV2l0aENoYW5uZWwoY2hhbm5lbCwgJ29yZGluYWwnLCAncG9pbnQnKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHBvaW50IHNjYWxlIGZvciBvcmRpbmFsL25vbWluYWwgZmllbGRzIGZvciBjb250aW51b3VzIGNoYW5uZWxzIG90aGVyIHRoYW4geCBhbmQgeS4nLCAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgT1RIRVJfQ09OVElOVU9VU19DSEFOTkVMUyA9IFNDQUxFX0NIQU5ORUxTLmZpbHRlcigoYykgPT4gcmFuZ2VUeXBlKGMpID09PSAnY29udGludW91cycgJiYgIXV0aWwuY29udGFpbnMoW1gsIFldLCBjKSk7XG4gICAgICAgICAgUFJJTUlUSVZFX01BUktTLmZvckVhY2goKG1hcmspID0+IHtcbiAgICAgICAgICAgIFtPUkRJTkFMLCBOT01JTkFMXS5mb3JFYWNoKCh0KSA9PiB7XG4gICAgICAgICAgICAgIE9USEVSX0NPTlRJTlVPVVNfQ0hBTk5FTFMuZm9yRWFjaCgoY2hhbm5lbCkgPT4ge1xuICAgICAgICAgICAgICAgIGFzc2VydC5lcXVhbChcbiAgICAgICAgICAgICAgICAgIHNjYWxlVHlwZSh1bmRlZmluZWQsIGNoYW5uZWwsIHt0eXBlOiB0fSwgbWFyaywgZGVmYXVsdFNjYWxlQ29uZmlnKSxcbiAgICAgICAgICAgICAgICAgIFNjYWxlVHlwZS5QT0lOVCxcbiAgICAgICAgICAgICAgICAgIGAke2NoYW5uZWx9LCAke21hcmt9LCAke3R9IGAgKyBzY2FsZVR5cGUodW5kZWZpbmVkLCBjaGFubmVsLCB7dHlwZTogdH0sIG1hcmssIGRlZmF1bHRTY2FsZUNvbmZpZylcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3RlbXBvcmFsJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gc2VxdWVudGlhbCBzY2FsZSBmb3IgdGVtcG9yYWwgY29sb3IgZmllbGQgYnkgZGVmYXVsdC4nLCAoKSA9PiB7XG4gICAgICAgIGFzc2VydC5lcXVhbChcbiAgICAgICAgICBzY2FsZVR5cGUodW5kZWZpbmVkLCAnY29sb3InLCB7dHlwZTogJ3RlbXBvcmFsJ30sICdwb2ludCcsIGRlZmF1bHRTY2FsZUNvbmZpZyksXG4gICAgICAgICAgU2NhbGVUeXBlLlNFUVVFTlRJQUxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBvcmRpbmFsIGZvciB0ZW1wb3JhbCBmaWVsZCBhbmQgdGhyb3cgYSB3YXJuaW5nLicsIGxvZy53cmFwKChsb2NhbExvZ2dlcikgPT4ge1xuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICAgIHNjYWxlVHlwZSh1bmRlZmluZWQsICdzaGFwZScsIHt0eXBlOiAndGVtcG9yYWwnLCB0aW1lVW5pdDogJ3llYXJtb250aCd9LCAncG9pbnQnLCBkZWZhdWx0U2NhbGVDb25maWcpLFxuICAgICAgICAgIFNjYWxlVHlwZS5PUkRJTkFMXG4gICAgICAgICk7XG4gICAgICAgIGFzc2VydC5lcXVhbChsb2NhbExvZ2dlci53YXJuc1swXSwgbG9nLm1lc3NhZ2UuZGlzY3JldGVDaGFubmVsQ2Fubm90RW5jb2RlKCdzaGFwZScsICd0ZW1wb3JhbCcpKTtcbiAgICAgIH0pKTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdGltZSBmb3IgYWxsIHRpbWUgdW5pdHMuJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAoY29uc3QgdGltZVVuaXQgb2YgVElNRVVOSVRTKSB7XG4gICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgICAgIHNjYWxlVHlwZSh1bmRlZmluZWQsIFksIHt0eXBlOiAndGVtcG9yYWwnLCB0aW1lVW5pdDogdGltZVVuaXR9LCAncG9pbnQnLCBkZWZhdWx0U2NhbGVDb25maWcpLFxuICAgICAgICAgICAgU2NhbGVUeXBlLlRJTUVcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgncXVhbnRpdGF0aXZlJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gc2VxdWVudGlhbCBzY2FsZSBmb3IgcXVhbnRpdGF0aXZlIGNvbG9yIGZpZWxkIGJ5IGRlZmF1bHQuJywgKCkgPT4ge1xuICAgICAgICBhc3NlcnQuZXF1YWwoXG4gICAgICAgICAgc2NhbGVUeXBlKHVuZGVmaW5lZCwgJ2NvbG9yJywge3R5cGU6ICdxdWFudGl0YXRpdmUnfSwgJ3BvaW50JywgZGVmYXVsdFNjYWxlQ29uZmlnKSxcbiAgICAgICAgICBTY2FsZVR5cGUuU0VRVUVOVElBTFxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIG9yZGluYWwgYmluIHNjYWxlIGZvciBxdWFudGl0YXRpdmUgY29sb3IgZmllbGQgd2l0aCBiaW5uaW5nLicsICgpID0+IHtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKFxuICAgICAgICAgIHNjYWxlVHlwZSh1bmRlZmluZWQsICdjb2xvcicsIHt0eXBlOiAncXVhbnRpdGF0aXZlJywgYmluOiB0cnVlfSwgJ3BvaW50JywgZGVmYXVsdFNjYWxlQ29uZmlnKSxcbiAgICAgICAgICBTY2FsZVR5cGUuQklOX09SRElOQUxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBvcmRpbmFsIGZvciBlbmNvZGluZyBxdWFudGl0YXRpdmUgZmllbGQgd2l0aCBhIGRpc2NyZXRlIGNoYW5uZWwgYW5kIHRocm93IGEgd2FybmluZy4nLCBsb2cud3JhcCgobG9jYWxMb2dnZXIpID0+IHtcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgICBzY2FsZVR5cGUodW5kZWZpbmVkLCAnc2hhcGUnLCB7dHlwZTogJ3F1YW50aXRhdGl2ZSd9LCAncG9pbnQnLCBkZWZhdWx0U2NhbGVDb25maWcpLFxuICAgICAgICAgIFNjYWxlVHlwZS5PUkRJTkFMXG4gICAgICAgICk7XG4gICAgICAgIGFzc2VydC5lcXVhbChsb2NhbExvZ2dlci53YXJuc1swXSwgbG9nLm1lc3NhZ2UuZGlzY3JldGVDaGFubmVsQ2Fubm90RW5jb2RlKCdzaGFwZScsICdxdWFudGl0YXRpdmUnKSk7XG4gICAgICB9KSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGxpbmVhciBzY2FsZSBmb3IgcXVhbnRpdGF0aXZlIGJ5IGRlZmF1bHQuJywgKCkgPT4ge1xuICAgICAgICBhc3NlcnQuZXF1YWwoXG4gICAgICAgICAgc2NhbGVUeXBlKHVuZGVmaW5lZCwgJ3gnLCB7dHlwZTogJ3F1YW50aXRhdGl2ZSd9LCAncG9pbnQnLCBkZWZhdWx0U2NhbGVDb25maWcpLFxuICAgICAgICAgIFNjYWxlVHlwZS5MSU5FQVJcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBiaW4gbGluZWFyIHNjYWxlIGZvciBxdWFudGl0YXRpdmUgYnkgZGVmYXVsdC4nLCAoKSA9PiB7XG4gICAgICAgIGFzc2VydC5lcXVhbChcbiAgICAgICAgICBzY2FsZVR5cGUodW5kZWZpbmVkLCAnb3BhY2l0eScsIHt0eXBlOiAncXVhbnRpdGF0aXZlJywgYmluOiB0cnVlfSwgJ3BvaW50JywgZGVmYXVsdFNjYWxlQ29uZmlnKSxcbiAgICAgICAgICBTY2FsZVR5cGUuQklOX0xJTkVBUlxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGxpbmVhciBzY2FsZSBmb3IgcXVhbnRpdGF0aXZlIHggYW5kIHkuJywgKCkgPT4ge1xuICAgICAgICBhc3NlcnQuZXF1YWwoXG4gICAgICAgICAgc2NhbGVUeXBlKHVuZGVmaW5lZCwgJ3gnLCB7dHlwZTogJ3F1YW50aXRhdGl2ZScsIGJpbjogdHJ1ZX0sICdwb2ludCcsIGRlZmF1bHRTY2FsZUNvbmZpZyksXG4gICAgICAgICAgU2NhbGVUeXBlLkxJTkVBUlxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZGF0YVR5cGVNYXRjaFNjYWxlVHlwZSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gc3BlY2lmaWVkIHZhbHVlIGlmIGRhdGF0eXBlIGlzIG9yZGluYWwgb3Igbm9taW5hbCBhbmQgc3BlY2lmaWVkIHNjYWxlIHR5cGUgaXMgdGhlIG9yZGluYWwgb3Igbm9taW5hbCcsICgpID0+IHtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKFxuICAgICAgICAgIHNjYWxlVHlwZShTY2FsZVR5cGUuT1JESU5BTCwgJ3NoYXBlJywge3R5cGU6ICdvcmRpbmFsJ30sICdwb2ludCcsIGRlZmF1bHRTY2FsZUNvbmZpZyksXG4gICAgICAgICAgU2NhbGVUeXBlLk9SRElOQUxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBkZWZhdWx0IHNjYWxlIHR5cGUgaWYgZGF0YSB0eXBlIGlzIHRlbXBvcmFsIGJ1dCBzcGVjaWZpZWQgc2NhbGUgdHlwZSBpcyBub3QgdGltZSBvciB1dGMnLCAoKSA9PiB7XG4gICAgICAgIGFzc2VydC5lcXVhbChcbiAgICAgICAgICBzY2FsZVR5cGUoU2NhbGVUeXBlLkxJTkVBUiwgJ3gnLCB7dHlwZTogJ3RlbXBvcmFsJywgdGltZVVuaXQ6ICd5ZWFyJ30sICdwb2ludCcsIGRlZmF1bHRTY2FsZUNvbmZpZyksXG4gICAgICAgICAgU2NhbGVUeXBlLlRJTUVcbiAgICAgICAgKTtcblxuICAgICAgICBhc3NlcnQuZXF1YWwoXG4gICAgICAgICAgc2NhbGVUeXBlKFNjYWxlVHlwZS5MSU5FQVIsICdjb2xvcicsIHt0eXBlOiAndGVtcG9yYWwnLCB0aW1lVW5pdDogJ3llYXInfSwgJ3BvaW50JywgZGVmYXVsdFNjYWxlQ29uZmlnKSxcbiAgICAgICAgICBTY2FsZVR5cGUuU0VRVUVOVElBTFxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRpbWUgaWYgZGF0YSB0eXBlIGlzIHRlbXBvcmFsIGJ1dCBzcGVjaWZpZWQgc2NhbGUgdHlwZSBpcyBkaXNjcmV0ZScsICgpID0+IHtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKFxuICAgICAgICAgIHNjYWxlVHlwZShTY2FsZVR5cGUuUE9JTlQsICd4Jywge3R5cGU6ICd0ZW1wb3JhbCcsIHRpbWVVbml0OiAneWVhcid9LCAncG9pbnQnLCBkZWZhdWx0U2NhbGVDb25maWcpLFxuICAgICAgICAgIFNjYWxlVHlwZS5USU1FXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZGVmYXVsdCBzY2FsZSB0eXBlIGlmIGRhdGEgdHlwZSBpcyB0ZW1wb3JhbCBidXQgc3BlY2lmaWVkIHNjYWxlIHR5cGUgaXMgdGltZSBvciB1dGMgb3IgYW55IGRpc2NyZXRlIHR5cGUnLCAoKSA9PiB7XG4gICAgICAgIGFzc2VydC5lcXVhbChcbiAgICAgICAgICBzY2FsZVR5cGUoU2NhbGVUeXBlLkxJTkVBUiwgJ3gnLCB7dHlwZTogJ3RlbXBvcmFsJywgdGltZVVuaXQ6ICd5ZWFyJ30sICdwb2ludCcsIGRlZmF1bHRTY2FsZUNvbmZpZyksXG4gICAgICAgICAgU2NhbGVUeXBlLlRJTUVcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBkZWZhdWx0IHNjYWxlIHR5cGUgaWYgZGF0YSB0eXBlIGlzIHF1YW50YXRpdmUgYnV0IHNjYWxlIHR5cGUgZG8gbm90IHN1cHBvcnQgcXVhbnRhdGl2ZScsICgpID0+IHtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKFxuICAgICAgICAgIHNjYWxlVHlwZShTY2FsZVR5cGUuVElNRSwgJ2NvbG9yJywge3R5cGU6ICdxdWFudGl0YXRpdmUnfSwgJ3BvaW50JywgZGVmYXVsdFNjYWxlQ29uZmlnKSxcbiAgICAgICAgICBTY2FsZVR5cGUuU0VRVUVOVElBTFxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGRlZmF1bHQgc2NhbGUgdHlwZSBpZiBkYXRhIHR5cGUgaXMgcXVhbnRhdGl2ZSBhbmQgc2NhbGUgdHlwZSBzdXBwb3J0cyBxdWFudGF0aXZlJywgKCkgPT4ge1xuICAgICAgICBhc3NlcnQuZXF1YWwoXG4gICAgICAgICAgc2NhbGVUeXBlKFNjYWxlVHlwZS5USU1FLCAneCcsIHt0eXBlOiAncXVhbnRpdGF0aXZlJ30sICdwb2ludCcsIGRlZmF1bHRTY2FsZUNvbmZpZyksXG4gICAgICAgICAgU2NhbGVUeXBlLkxJTkVBUlxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGRlZmF1bHQgc2NhbGUgdHlwZSBpZiBkYXRhIHR5cGUgaXMgcXVhbnRhdGl2ZSBhbmQgc2NhbGUgdHlwZSBzdXBwb3J0cyBxdWFudGF0aXZlJywgKCkgPT4ge1xuICAgICAgICBhc3NlcnQuZXF1YWwoXG4gICAgICAgICAgc2NhbGVUeXBlKFNjYWxlVHlwZS5USU1FLCAneCcsIHt0eXBlOiAndGVtcG9yYWwnfSwgJ3BvaW50JywgZGVmYXVsdFNjYWxlQ29uZmlnKSxcbiAgICAgICAgICBTY2FsZVR5cGUuVElNRVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXX0=