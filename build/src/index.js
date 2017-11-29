"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.axis = require("./axis");
exports.aggregate = require("./aggregate");
exports.bin = require("./bin");
exports.channel = require("./channel");
exports.compositeMark = require("./compositemark");
var compile_1 = require("./compile/compile");
exports.compile = compile_1.compile;
exports.config = require("./config");
exports.data = require("./data");
exports.datetime = require("./datetime");
exports.encoding = require("./encoding");
exports.facet = require("./facet");
exports.fieldDef = require("./fielddef");
exports.legend = require("./legend");
exports.mark = require("./mark");
exports.scale = require("./scale");
exports.sort = require("./sort");
exports.spec = require("./spec");
exports.stack = require("./stack");
exports.timeUnit = require("./timeunit");
exports.transform = require("./transform");
exports.type = require("./type");
exports.util = require("./util");
exports.validate = require("./validate");
exports.version = require('../package.json').version;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBdUM7QUFDdkMsMkNBQWlEO0FBQ2pELCtCQUFxQztBQUNyQyx1Q0FBNkM7QUFDN0MsbURBQXlEO0FBQ3pELDZDQUEwQztBQUFsQyw0QkFBQSxPQUFPLENBQUE7QUFDZixxQ0FBMkM7QUFDM0MsaUNBQXVDO0FBQ3ZDLHlDQUErQztBQUMvQyx5Q0FBK0M7QUFDL0MsbUNBQXlDO0FBQ3pDLHlDQUErQztBQUMvQyxxQ0FBMkM7QUFDM0MsaUNBQXVDO0FBQ3ZDLG1DQUF5QztBQUN6QyxpQ0FBdUM7QUFDdkMsaUNBQXVDO0FBQ3ZDLG1DQUF5QztBQUN6Qyx5Q0FBK0M7QUFDL0MsMkNBQWlEO0FBQ2pELGlDQUF1QztBQUN2QyxpQ0FBdUM7QUFDdkMseUNBQStDO0FBRWxDLFFBQUEsT0FBTyxHQUFXLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbXBvcnQgYXhpcyA9IHJlcXVpcmUoJy4vYXhpcycpO1xuZXhwb3J0IGltcG9ydCBhZ2dyZWdhdGUgPSByZXF1aXJlKCcuL2FnZ3JlZ2F0ZScpO1xuZXhwb3J0IGltcG9ydCBiaW4gPSByZXF1aXJlKCcuL2JpbicpO1xuZXhwb3J0IGltcG9ydCBjaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsJyk7XG5leHBvcnQgaW1wb3J0IGNvbXBvc2l0ZU1hcmsgPSByZXF1aXJlKCcuL2NvbXBvc2l0ZW1hcmsnKTtcbmV4cG9ydCB7Y29tcGlsZX0gZnJvbSAnLi9jb21waWxlL2NvbXBpbGUnO1xuZXhwb3J0IGltcG9ydCBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpO1xuZXhwb3J0IGltcG9ydCBkYXRhID0gcmVxdWlyZSgnLi9kYXRhJyk7XG5leHBvcnQgaW1wb3J0IGRhdGV0aW1lID0gcmVxdWlyZSgnLi9kYXRldGltZScpO1xuZXhwb3J0IGltcG9ydCBlbmNvZGluZyA9IHJlcXVpcmUoJy4vZW5jb2RpbmcnKTtcbmV4cG9ydCBpbXBvcnQgZmFjZXQgPSByZXF1aXJlKCcuL2ZhY2V0Jyk7XG5leHBvcnQgaW1wb3J0IGZpZWxkRGVmID0gcmVxdWlyZSgnLi9maWVsZGRlZicpO1xuZXhwb3J0IGltcG9ydCBsZWdlbmQgPSByZXF1aXJlKCcuL2xlZ2VuZCcpO1xuZXhwb3J0IGltcG9ydCBtYXJrID0gcmVxdWlyZSgnLi9tYXJrJyk7XG5leHBvcnQgaW1wb3J0IHNjYWxlID0gcmVxdWlyZSgnLi9zY2FsZScpO1xuZXhwb3J0IGltcG9ydCBzb3J0ID0gcmVxdWlyZSgnLi9zb3J0Jyk7XG5leHBvcnQgaW1wb3J0IHNwZWMgPSByZXF1aXJlKCcuL3NwZWMnKTtcbmV4cG9ydCBpbXBvcnQgc3RhY2sgPSByZXF1aXJlKCcuL3N0YWNrJyk7XG5leHBvcnQgaW1wb3J0IHRpbWVVbml0ID0gcmVxdWlyZSgnLi90aW1ldW5pdCcpO1xuZXhwb3J0IGltcG9ydCB0cmFuc2Zvcm0gPSByZXF1aXJlKCcuL3RyYW5zZm9ybScpO1xuZXhwb3J0IGltcG9ydCB0eXBlID0gcmVxdWlyZSgnLi90eXBlJyk7XG5leHBvcnQgaW1wb3J0IHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbmV4cG9ydCBpbXBvcnQgdmFsaWRhdGUgPSByZXF1aXJlKCcuL3ZhbGlkYXRlJyk7XG5cbmV4cG9ydCBjb25zdCB2ZXJzaW9uOiBzdHJpbmcgPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKS52ZXJzaW9uO1xuIl19