"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var vega_util_1 = require("vega-util");
var util_1 = require("./util");
var hits = {
    qq: [8, 19, 13, 21],
    qq_clear: [5, 16],
    bins: [4, 29, 16, 9],
    bins_clear: [18, 7],
    composite: [1, 3, 5, 7, 8, 9]
};
function toggle(key, idx, shiftKey, parent) {
    var fn = key.match('_clear') ? 'clear' : 'pt';
    return "return " + fn + "(" + hits[key][idx] + ", " + vega_util_1.stringValue(parent) + ", " + !!shiftKey + ")";
}
describe('Toggle multi selections at runtime', function () {
    var type = 'multi';
    var embed = util_1.embedFn(browser);
    var testRender = util_1.testRenderFn(browser, 'multi/toggle');
    it('should toggle values into/out of the store', function () {
        embed(util_1.spec('unit', 0, { type: type }));
        browser.execute(toggle('qq', 0, false));
        browser.execute(toggle('qq', 1, true));
        var store = browser.execute(toggle('qq', 2, true)).value;
        chai_1.assert.lengthOf(store, 3);
        testRender('click_0');
        store = browser.execute(toggle('qq', 2, true)).value;
        chai_1.assert.lengthOf(store, 2);
        testRender('click_1');
        store = browser.execute(toggle('qq', 3, false)).value;
        chai_1.assert.lengthOf(store, 1);
        testRender('click_2');
    });
    it('should clear out the store w/o shiftKey', function () {
        embed(util_1.spec('unit', 1, { type: type }));
        browser.execute(toggle('qq', 0, false));
        browser.execute(toggle('qq', 1, true));
        browser.execute(toggle('qq', 2, true));
        browser.execute(toggle('qq', 3, true));
        testRender("clear_0");
        var store = browser.execute(toggle('qq_clear', 0, true)).value;
        chai_1.assert.lengthOf(store, 4);
        testRender("clear_1");
        store = browser.execute(toggle('qq_clear', 1, false)).value;
        chai_1.assert.lengthOf(store, 0);
        testRender("clear_2");
    });
    it('should toggle binned fields', function () {
        embed(util_1.spec('unit', 0, { type: type, encodings: ['x', 'y'] }, { x: { bin: true }, y: { bin: true } }));
        browser.execute(toggle('bins', 0, false));
        browser.execute(toggle('bins', 1, true));
        var store = browser.execute(toggle('bins', 2, true)).value;
        chai_1.assert.lengthOf(store, 3);
        testRender('bins_0');
        store = browser.execute(toggle('bins', 2, true)).value;
        chai_1.assert.lengthOf(store, 2);
        testRender('bins_1');
        store = browser.execute(toggle('bins', 3, false)).value;
        chai_1.assert.lengthOf(store, 1);
        testRender('bins_2');
    });
    util_1.compositeTypes.forEach(function (specType, idx) {
        it("should toggle in " + specType + " views", function () {
            embed(util_1.spec(specType, idx, { type: type, resolve: 'union' }));
            var length = 0;
            for (var i = 0; i < hits.composite.length; i++) {
                var parent_1 = util_1.parentSelector(specType, i % 3);
                var store = browser.execute(toggle('composite', i, true, parent_1)).value;
                chai_1.assert.equal(length = store.length, i + 1);
                if (i % 3 === 2) {
                    testRender(specType + "_" + i);
                }
            }
            for (var i = 0; i < hits.composite.length; i++) {
                var even = i % 2 === 0;
                var parent_2 = util_1.parentSelector(specType, ~~(i / 2));
                var store = browser.execute(toggle('qq_clear', 0, even, parent_2)).value;
                chai_1.assert.lengthOf(store, even ? length : length = length - 2, "iter: " + i);
                if (!even) {
                    testRender(specType + "_clear_" + i);
                }
            }
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0LXJ1bnRpbWUvdG9nZ2xlLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBNEI7QUFDNUIsdUNBQXNDO0FBQ3RDLCtCQUFtRjtBQUVuRixJQUFNLElBQUksR0FBRztJQUNYLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNuQixRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ2pCLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwQixVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ25CLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQzlCLENBQUM7QUFFRixnQkFBZ0IsR0FBVyxFQUFFLEdBQVcsRUFBRSxRQUFpQixFQUFFLE1BQWU7SUFDMUUsSUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDaEQsTUFBTSxDQUFDLFlBQVUsRUFBRSxTQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBSyx1QkFBVyxDQUFDLE1BQU0sQ0FBQyxVQUFLLENBQUMsQ0FBQyxRQUFRLE1BQUcsQ0FBQztBQUNsRixDQUFDO0FBRUQsUUFBUSxDQUFDLG9DQUFvQyxFQUFFO0lBQzdDLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQztJQUNyQixJQUFNLEtBQUssR0FBRyxjQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0IsSUFBTSxVQUFVLEdBQUcsbUJBQVksQ0FBQyxPQUFPLEVB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LE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ3pFLGFBQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsRUFBRSxXQUFTLENBQUcsQ0FBQyxDQUFDO2dCQUMxRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ1YsVUFBVSxDQUFJLFFBQVEsZUFBVSxDQUFHLENBQUMsQ0FBQztnQkFDdkMsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2Fzc2VydH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQge3N0cmluZ1ZhbHVlfSBmcm9tICd2ZWdhLXV0aWwnO1xuaW1wb3J0IHtjb21wb3NpdGVUeXBlcywgZW1iZWRGbiwgcGFyZW50U2VsZWN0b3IsIHNwZWMsIHRlc3RSZW5kZXJGbn0gZnJvbSAnLi91dGlsJztcblxuY29uc3QgaGl0cyA9IHtcbiAgcXE6IFs4LCAxOSwgMTMsIDIxXSxcbiAgcXFfY2xlYXI6IFs1LCAxNl0sXG4gIGJpbnM6IFs0LCAyOSwgMTYsIDldLFxuICBiaW5zX2NsZWFyOiBbMTgsIDddLFxuICBjb21wb3NpdGU6IFsxLCAzLCA1LCA3LCA4LCA5XVxufTtcblxuZnVuY3Rpb24gdG9nZ2xlKGtleTogc3RyaW5nLCBpZHg6IG51bWJlciwgc2hpZnRLZXk6IGJvb2xlYW4sIHBhcmVudD86IHN0cmluZykge1xuICBjb25zdCBmbiA9IGtleS5tYXRjaCgnX2NsZWFyJykgPyAnY2xlYXInIDogJ3B0JztcbiAgcmV0dXJuIGByZXR1cm4gJHtmbn0oJHtoaXRzW2tleV1baWR4XX0sICR7c3RyaW5nVmFsdWUocGFyZW50KX0sICR7ISFzaGlmdEtleX0pYDtcbn1cblxuZGVzY3JpYmUoJ1RvZ2dsZSBtdWx0aSBzZWxlY3Rpb25zIGF0IHJ1bnRpbWUnLCBmdW5jdGlvbigpIHtcbiAgY29uc3QgdHlwZSA9ICdtdWx0aSc7XG4gIGNvbnN0IGVtYmVkID0gZW1iZWRGbihicm93c2VyKTtcbiAgY29uc3QgdGVzdFJlbmRlciA9IHRlc3RSZW5kZXJGbihicm93c2VyLCAnbXVsdGkvdG9nZ2xlJyk7XG5cbiAgaXQoJ3Nob3VsZCB0b2dnbGUgdmFsdWVzIGludG8vb3V0IG9mIHRoZSBzdG9yZScsIGZ1bmN0aW9uKCkge1xuICAgIGVtYmVkKHNwZWMoJ3VuaXQnLCAwLCB7dHlwZX0pKTtcbiAgICBicm93c2VyLmV4ZWN1dGUodG9nZ2xlKCdxcScsIDAsIGZhbHNlKSk7XG4gICAgYnJvd3Nlci5leGVjdXRlKHRvZ2dsZSgncXEnLCAxLCB0cnVlKSk7XG4gICAgbGV0IHN0b3JlID0gYnJvd3Nlci5leGVjdXRlKHRvZ2dsZSgncXEnLCAyLCB0cnVlKSkudmFsdWU7XG4gICAgYXNzZXJ0Lmxlbmd0aE9mKHN0b3JlLCAzKTtcbiAgICB0ZXN0UmVuZGVyKCdjbGlja18wJyk7XG5cbiAgICBzdG9yZSA9IGJyb3dzZXIuZXhlY3V0ZSh0b2dnbGUoJ3FxJywgMiwgdHJ1ZSkpLnZhbHVlO1xuICAgIGFzc2VydC5sZW5ndGhPZihzdG9yZSwgMik7XG4gICAgdGVzdFJlbmRlcignY2xpY2tfMScpO1xuXG4gICAgc3RvcmUgPSBicm93c2VyLmV4ZWN1dGUodG9nZ2xlKCdxcScsIDMsIGZhbHNlKSkudmFsdWU7XG4gICAgYXNzZXJ0Lmxlbmd0aE9mKHN0b3JlLCAxKTtcbiAgICB0ZXN0UmVuZGVyKCdjbGlja18yJyk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgY2xlYXIgb3V0IHRoZSBzdG9yZSB3L28gc2hpZnRLZXknLCBmdW5jdGlvbigpIHtcbiAgICBlbWJlZChzcGVjKCd1bml0JywgMSwge3R5cGV9KSk7XG4gICAgYnJvd3Nlci5leGVjdXRlKHRvZ2dsZSgncXEnLCAwLCBmYWxzZSkpO1xuICAgIGJyb3dzZXIuZXhlY3V0ZSh0b2dnbGUoJ3FxJywgMSwgdHJ1ZSkpO1xuICAgIGJyb3dzZXIuZXhlY3V0ZSh0b2dnbGUoJ3FxJywgMiwgdHJ1ZSkpO1xuICAgIGJyb3dzZXIuZXhlY3V0ZSh0b2dnbGUoJ3FxJywgMywgdHJ1ZSkpO1xuICAgIHRlc3RSZW5kZXIoYGNsZWFyXzBgKTtcblxuICAgIGxldCBzdG9yZSA9IGJyb3dzZXIuZXhlY3V0ZSh0b2dnbGUoJ3FxX2NsZWFyJywgMCwgdHJ1ZSkpLnZhbHVlO1xuICAgIGFzc2VydC5sZW5ndGhPZihzdG9yZSwgNCk7XG4gICAgdGVzdFJlbmRlcihgY2xlYXJfMWApO1xuXG4gICAgc3RvcmUgPSBicm93c2VyLmV4ZWN1dGUodG9nZ2xlKCdxcV9jbGVhcicsIDEsIGZhbHNlKSkudmFsdWU7XG4gICAgYXNzZXJ0Lmxlbmd0aE9mKHN0b3JlLCAwKTtcbiAgICB0ZXN0UmVuZGVyKGBjbGVhcl8yYCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgdG9nZ2xlIGJpbm5lZCBmaWVsZHMnLCBmdW5jdGlvbigpIHtcbiAgICBlbWJlZChzcGVjKCd1bml0JywgMCwge3R5cGUsIGVuY29kaW5nczogWyd4JywgJ3knXX0sXG4gICAgICB7eDoge2JpbjogdHJ1ZX0sIHk6IHtiaW46IHRydWV9fSkpO1xuXG4gICAgYnJvd3Nlci5leGVjdXRlKHRvZ2dsZSgnYmlucycsIDAsIGZhbHNlKSk7XG4gICAgYnJvd3Nlci5leGVjdXRlKHRvZ2dsZSgnYmlucycsIDEsIHRydWUpKTtcbiAgICBsZXQgc3RvcmUgPSBicm93c2VyLmV4ZWN1dGUodG9nZ2xlKCdiaW5zJywgMiwgdHJ1ZSkpLnZhbHVlO1xuICAgIGFzc2VydC5sZW5ndGhPZihzdG9yZSwgMyk7XG4gICAgdGVzdFJlbmRlcignYmluc18wJyk7XG5cbiAgICBzdG9yZSA9IGJyb3dzZXIuZXhlY3V0ZSh0b2dnbGUoJ2JpbnMnLCAyLCB0cnVlKSkudmFsdWU7XG4gICAgYXNzZXJ0Lmxlbmd0aE9mKHN0b3JlLCAyKTtcbiAgICB0ZXN0UmVuZGVyKCdiaW5zXzEnKTtcblxuICAgIHN0b3JlID0gYnJvd3Nlci5leGVjdXRlKHRvZ2dsZSgnYmlucycsIDMsIGZhbHNlKSkudmFsdWU7XG4gICAgYXNzZXJ0Lmxlbmd0aE9mKHN0b3JlLCAxKTtcbiAgICB0ZXN0UmVuZGVyKCdiaW5zXzInKTtcbiAgfSk7XG5cbiAgY29tcG9zaXRlVHlwZXMuZm9yRWFjaChmdW5jdGlvbihzcGVjVHlwZSwgaWR4KSB7XG4gICAgaXQoYHNob3VsZCB0b2dnbGUgaW4gJHtzcGVjVHlwZX0gdmlld3NgLCBmdW5jdGlvbigpIHtcbiAgICAgIGVtYmVkKHNwZWMoc3BlY1R5cGUsIGlkeCwge3R5cGUsIHJlc29sdmU6ICd1bmlvbid9KSk7XG4gICAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGl0cy5jb21wb3NpdGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gcGFyZW50U2VsZWN0b3Ioc3BlY1R5cGUsIGkgJSAzKTtcbiAgICAgICAgY29uc3Qgc3RvcmUgPSBicm93c2VyLmV4ZWN1dGUodG9nZ2xlKCdjb21wb3NpdGUnLCBpLCB0cnVlLCBwYXJlbnQpKS52YWx1ZTtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKGxlbmd0aCA9IHN0b3JlLmxlbmd0aCwgaSArIDEpO1xuICAgICAgICBpZiAoaSAlIDMgPT09IDIpIHtcbiAgICAgICAgICB0ZXN0UmVuZGVyKGAke3NwZWNUeXBlfV8ke2l9YCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoaXRzLmNvbXBvc2l0ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBldmVuID0gaSAlIDIgPT09IDA7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHBhcmVudFNlbGVjdG9yKHNwZWNUeXBlLCB+fihpIC8gMikpO1xuICAgICAgICBjb25zdCBzdG9yZSA9IGJyb3dzZXIuZXhlY3V0ZSh0b2dnbGUoJ3FxX2NsZWFyJywgMCwgZXZlbiwgcGFyZW50KSkudmFsdWU7XG4gICAgICAgIGFzc2VydC5sZW5ndGhPZihzdG9yZSwgZXZlbiA/IGxlbmd0aCA6IGxlbmd0aCA9IGxlbmd0aCAtIDIsIGBpdGVyOiAke2l9YCk7XG4gICAgICAgIGlmICghZXZlbikge1xuICAgICAgICAgIHRlc3RSZW5kZXIoYCR7c3BlY1R5cGV9X2NsZWFyXyR7aX1gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19