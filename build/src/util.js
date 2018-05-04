import * as stableStringify_ from 'json-stable-stringify';
import { isArray, isNumber, isString, splitAccessPath, stringValue } from 'vega-util';
import { isLogicalAnd, isLogicalNot, isLogicalOr } from './logical';
var stableStringify = stableStringify_['default'] || stableStringify_;
/**
 * Creates an object composed of the picked object properties.
 *
 * Example:  (from lodash)
 *
 * var object = {'a': 1, 'b': '2', 'c': 3};
 * pick(object, ['a', 'c']);
 * // → {'a': 1, 'c': 3}
 *
 */
export function pick(obj, props) {
    var copy = {};
    for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
        var prop = props_1[_i];
        if (obj.hasOwnProperty(prop)) {
            copy[prop] = obj[prop];
        }
    }
    return copy;
}
/**
 * The opposite of _.pick; this method creates an object composed of the own
 * and inherited enumerable string keyed properties of object that are not omitted.
 */
export function omit(obj, props) {
    var copy = duplicate(obj);
    for (var _i = 0, props_2 = props; _i < props_2.length; _i++) {
        var prop = props_2[_i];
        delete copy[prop];
    }
    return copy;
}
/**
 * Converts any object into a string representation that can be consumed by humans.
 */
export var stringify = stableStringify;
/**
 * Converts any object into a string of limited size, or a number.
 */
export function hash(a) {
    if (isNumber(a)) {
        return a;
    }
    var str = isString(a) ? a : stableStringify(a);
    // short strings can be used as hash directly, longer strings are hashed to reduce memory usage
    if (str.length < 100) {
        return str;
    }
    // from http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
    var h = 0;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        h = ((h << 5) - h) + char;
        h = h & h; // Convert to 32bit integer
    }
    return h;
}
export function contains(array, item) {
    return array.indexOf(item) > -1;
}
/** Returns the array without the elements in item */
export function without(array, excludedItems) {
    return array.filter(function (item) { return !contains(excludedItems, item); });
}
export function union(array, other) {
    return array.concat(without(other, array));
}
/**
 * Returns true if any item returns true.
 */
export function some(arr, f) {
    var i = 0;
    for (var k = 0; k < arr.length; k++) {
        if (f(arr[k], k, i++)) {
            return true;
        }
    }
    return false;
}
/**
 * Returns true if all items return true.
 */
export function every(arr, f) {
    var i = 0;
    for (var k = 0; k < arr.length; k++) {
        if (!f(arr[k], k, i++)) {
            return false;
        }
    }
    return true;
}
export function flatten(arrays) {
    return [].concat.apply([], arrays);
}
/**
 * recursively merges src into dest
 */
export function mergeDeep(dest) {
    var src = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        src[_i - 1] = arguments[_i];
    }
    for (var _a = 0, src_1 = src; _a < src_1.length; _a++) {
        var s = src_1[_a];
        dest = deepMerge_(dest, s);
    }
    return dest;
}
// recursively merges src into dest
function deepMerge_(dest, src) {
    if (typeof src !== 'object' || src === null) {
        return dest;
    }
    for (var p in src) {
        if (!src.hasOwnProperty(p)) {
            continue;
        }
        if (src[p] === undefined) {
            continue;
        }
        if (typeof src[p] !== 'object' || isArray(src[p]) || src[p] === null) {
            dest[p] = src[p];
        }
        else if (typeof dest[p] !== 'object' || dest[p] === null) {
            dest[p] = mergeDeep(isArray(src[p].constructor) ? [] : {}, src[p]);
        }
        else {
            mergeDeep(dest[p], src[p]);
        }
    }
    return dest;
}
export function unique(values, f) {
    var results = [];
    var u = {};
    var v;
    for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
        var val = values_1[_i];
        v = f(val);
        if (v in u) {
            continue;
        }
        u[v] = 1;
        results.push(val);
    }
    return results;
}
/**
 * Returns true if the two dictionaries disagree. Applies only to defined values.
 */
export function differ(dict, other) {
    for (var key in dict) {
        if (dict.hasOwnProperty(key)) {
            if (other[key] && dict[key] && other[key] !== dict[key]) {
                return true;
            }
        }
    }
    return false;
}
export function hasIntersection(a, b) {
    for (var key in a) {
        if (key in b) {
            return true;
        }
    }
    return false;
}
export function isNumeric(num) {
    return !isNaN(num);
}
export function differArray(array, other) {
    if (array.length !== other.length) {
        return true;
    }
    array.sort();
    other.sort();
    for (var i = 0; i < array.length; i++) {
        if (other[i] !== array[i]) {
            return true;
        }
    }
    return false;
}
// This is a stricter version of Object.keys but with better types. See https://github.com/Microsoft/TypeScript/pull/12253#issuecomment-263132208
export var keys = Object.keys;
export function vals(x) {
    var _vals = [];
    for (var k in x) {
        if (x.hasOwnProperty(k)) {
            _vals.push(x[k]);
        }
    }
    return _vals;
}
export function flagKeys(f) {
    return keys(f);
}
export function duplicate(obj) {
    return JSON.parse(JSON.stringify(obj));
}
export function isBoolean(b) {
    return b === true || b === false;
}
/**
 * Convert a string into a valid variable name
 */
export function varName(s) {
    // Replace non-alphanumeric characters (anything besides a-zA-Z0-9_) with _
    var alphanumericS = s.replace(/\W/g, '_');
    // Add _ if the string has leading numbers.
    return (s.match(/^\d+/) ? '_' : '') + alphanumericS;
}
export function logicalExpr(op, cb) {
    if (isLogicalNot(op)) {
        return '!(' + logicalExpr(op.not, cb) + ')';
    }
    else if (isLogicalAnd(op)) {
        return '(' + op.and.map(function (and) { return logicalExpr(and, cb); }).join(') && (') + ')';
    }
    else if (isLogicalOr(op)) {
        return '(' + op.or.map(function (or) { return logicalExpr(or, cb); }).join(') || (') + ')';
    }
    else {
        return cb(op);
    }
}
/**
 * Delete nested property of an object, and delete the ancestors of the property if they become empty.
 */
export function deleteNestedProperty(obj, orderedProps) {
    if (orderedProps.length === 0) {
        return true;
    }
    var prop = orderedProps.shift();
    if (deleteNestedProperty(obj[prop], orderedProps)) {
        delete obj[prop];
    }
    return Object.keys(obj).length === 0;
}
export function titlecase(s) {
    return s.charAt(0).toUpperCase() + s.substr(1);
}
/**
 * Converts a path to an access path with datum.
 * @param path The field name.
 * @param datum The string to use for `datum`.
 */
export function accessPathWithDatum(path, datum) {
    if (datum === void 0) { datum = 'datum'; }
    var pieces = splitAccessPath(path);
    var prefixes = [];
    for (var i = 1; i <= pieces.length; i++) {
        var prefix = "[" + pieces.slice(0, i).map(stringValue).join('][') + "]";
        prefixes.push("" + datum + prefix);
    }
    return prefixes.join(' && ');
}
/**
 * Return access with datum to the falttened field.
 * @param path The field name.
 * @param datum The string to use for `datum`.
 */
export function flatAccessWithDatum(path, datum) {
    if (datum === void 0) { datum = 'datum'; }
    return datum + "[" + stringValue(splitAccessPath(path).join('.')) + "]";
}
/**
 * Replaces path accesses with access to non-nested field.
 * For example, `foo["bar"].baz` becomes `foo\\.bar\\.baz`.
 */
export function replacePathInField(path) {
    return "" + splitAccessPath(path).map(function (p) { return p.replace('.', '\\.'); }).join('\\.');
}
/**
 * Remove path accesses with access from field.
 * For example, `foo["bar"].baz` becomes `foo.bar.baz`.
 */
export function removePathFromField(path) {
    return "" + splitAccessPath(path).join('.');
}
/**
 * Count the depth of the path. Returns 1 for fields that are not nested.
 */
export function accessPathDepth(path) {
    return splitAccessPath(path).length;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxnQkFBZ0IsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNwRixPQUFPLEVBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQWlCLE1BQU0sV0FBVyxDQUFDO0FBRWxGLElBQU0sZUFBZSxHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxJQUFJLGdCQUFnQixDQUFDO0FBRXhFOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sZUFBZSxHQUFXLEVBQUUsS0FBZTtJQUMvQyxJQUFNLElBQUksR0FBRyxFQUFFLENBQUM7SUFDaEIsS0FBbUIsVUFBSyxFQUFMLGVBQUssRUFBTCxtQkFBSyxFQUFMLElBQUs7UUFBbkIsSUFBTSxJQUFJLGNBQUE7UUFDYixJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4QjtLQUNGO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxlQUFlLEdBQVcsRUFBRSxLQUFlO0lBQy9DLElBQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixLQUFtQixVQUFLLEVBQUwsZUFBSyxFQUFMLG1CQUFLLEVBQUwsSUFBSztRQUFuQixJQUFNLElBQUksY0FBQTtRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ25CO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsSUFBTSxTQUFTLEdB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Q3BFLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBRyxLQUFLLEdBQUcsTUFBUSxDQUFDLENBQUM7S0FDcEM7SUFDRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLDhCQUE4QixJQUFZLEVBQUUsS0FBYTtJQUFiLHNCQUFBLEVBQUEsZUFBYTtJQUM3RCxPQUFVLEtBQUssU0FBSSxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFHLENBQUM7QUFDckUsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sNkJBQTZCLElBQVk7SUFDN0MsT0FBTyxLQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBckIsQ0FBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUcsQ0FBQztBQUNoRixDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSw4QkFBOEIsSUFBWTtJQUM5QyxPQUFPLEtBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUcsQ0FBQztBQUM5QyxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLDBCQUEwQixJQUFZO0lBQzFDLE9BQU8sZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUN0QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgc3RhYmxlU3RyaW5naWZ5XyBmcm9tICdqc29uLXN0YWJsZS1zdHJpbmdpZnknO1xuaW1wb3J0IHtpc0FycmF5LCBpc051bWJlciwgaXNTdHJpbmcsIHNwbGl0QWNjZXNzUGF0aCwgc3RyaW5nVmFsdWV9IGZyb20gJ3ZlZ2EtdXRpbCc7XG5pbXBvcnQge2lzTG9naWNhbEFuZCwgaXNMb2dpY2FsTm90LCBpc0xvZ2ljYWxPciwgTG9naWNhbE9wZXJhbmR9IGZyb20gJy4vbG9naWNhbCc7XG5cbmNvbnN0IHN0YWJsZVN0cmluZ2lmeSA9IHN0YWJsZVN0cmluZ2lmeV9bJ2RlZmF1bHQnXSB8fCBzdGFibGVTdHJpbmdpZnlfO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gb2JqZWN0IGNvbXBvc2VkIG9mIHRoZSBwaWNrZWQgb2JqZWN0IHByb3BlcnRpZXMuXG4gKlxuICogRXhhbXBsZTogIChmcm9tIGxvZGFzaClcbiAqXG4gKiB2YXIgb2JqZWN0ID0geydhJzogMSwgJ2InOiAnMicsICdjJzogM307XG4gKiBwaWNrKG9iamVjdCwgWydhJywgJ2MnXSk7XG4gKiAvLyDihpIgeydhJzogMSwgJ2MnOiAzfVxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBpY2sob2JqOiBvYmplY3QsIHByb3BzOiBzdHJpbmdbXSkge1xuICBjb25zdCBjb3B5ID0ge307XG4gIGZvciAoY29uc3QgcHJvcCBvZiBwcm9wcykge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgIGNvcHlbcHJvcF0gPSBvYmpbcHJvcF07XG4gICAgfVxuICB9XG4gIHJldHVybiBjb3B5O1xufVxuXG4vKipcbiAqIFRoZSBvcHBvc2l0ZSBvZiBfLnBpY2s7IHRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gb2JqZWN0IGNvbXBvc2VkIG9mIHRoZSBvd25cbiAqIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydGllcyBvZiBvYmplY3QgdGhhdCBhcmUgbm90IG9taXR0ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvbWl0KG9iajogb2JqZWN0LCBwcm9wczogc3RyaW5nW10pIHtcbiAgY29uc3QgY29weSA9IGR1cGxpY2F0ZShvYmopO1xuICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcHMpIHtcbiAgICBkZWxldGUgY29weVtwcm9wXTtcbiAgfVxuICByZXR1cm4gY29weTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhbnkgb2JqZWN0IGludG8gYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gdGhhdCBjYW4gYmUgY29uc3VtZWQgYnkgaHVtYW5zLlxuICovXG5leHBvcnQgY29uc3Qgc3RyaW5naWZ5ID0gc3RhYmxlU3RyaW5naWZ5O1xuXG4vKipcbiAqIENvbnZlcnRzIGFueSBvYmplY3QgaW50byBhIHN0cmluZyBvZiBsaW1pdGVkIHNpemUsIG9yIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzaChhOiBhbnkpIHtcbiAgaWYgKGlzTnVtYmVyKGEpKSB7XG4gICAgcmV0dXJuIGE7XG4gIH1cblxuICBjb25zdCBzdHIgPSBpc1N0cmluZyhhKSA/IGEgOiBzdGFibGVTdHJpbmdpZnkoYSk7XG5cbiAgLy8gc2hvcnQgc3RyaW5ncyBjYW4gYmUgdXNlZCBhcyBoYXNoIGRpcmVjdGx5LCBsb25nZXIgc3RyaW5ncyBhcmUgaGFzaGVkIHRvIHJlZHVjZSBtZW1vcnkgdXNhZ2VcbiAgaWYgKHN0ci5sZW5ndGggPCAxMDApIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgLy8gZnJvbSBodHRwOi8vd2VyeGx0ZC5jb20vd3AvMjAxMC8wNS8xMy9qYXZhc2NyaXB0LWltcGxlbWVudGF0aW9uLW9mLWphdmFzLXN0cmluZy1oYXNoY29kZS1tZXRob2QvXG4gIGxldCBoID0gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGFyID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgaCA9ICgoaDw8NSktaCkrY2hhcjtcbiAgICBoID0gaCAmIGg7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICB9XG4gIHJldHVybiBoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnM8VD4oYXJyYXk6IFRbXSwgaXRlbTogVCkge1xuICByZXR1cm4gYXJyYXkuaW5kZXhPZihpdGVtKSA+IC0xO1xufVxuXG4vKiogUmV0dXJucyB0aGUgYXJyYXkgd2l0aG91dCB0aGUgZWxlbWVudHMgaW4gaXRlbSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpdGhvdXQ8VD4oYXJyYXk6IFRbXSwgZXhjbHVkZWRJdGVtczogVFtdKSB7XG4gIHJldHVybiBhcnJheS5maWx0ZXIoaXRlbSA9PiAhY29udGFpbnMoZXhjbHVkZWRJdGVtcywgaXRlbSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5pb248VD4oYXJyYXk6IFRbXSwgb3RoZXI6IFRbXSkge1xuICByZXR1cm4gYXJyYXkuY29uY2F0KHdpdGhvdXQob3RoZXIsIGFycmF5KSk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGFueSBpdGVtIHJldHVybnMgdHJ1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNvbWU8VD4oYXJyOiBUW10sIGY6IChkOiBULCBrPzogYW55LCBpPzogYW55KSA9PiBib29sZWFuKSB7XG4gIGxldCBpID0gMDtcbiAgZm9yIChsZXQgayA9IDA7IGs8YXJyLmxlbmd0aDsgaysrKSB7XG4gICAgaWYgKGYoYXJyW2tdLCBrLCBpKyspKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhbGwgaXRlbXMgcmV0dXJuIHRydWUuXG4gKi9cbiBleHBvcnQgZnVuY3Rpb24gZXZlcnk8VD4oYXJyOiBUW10sIGY6IChkOiBULCBrPzogYW55LCBpPzogYW55KSA9PiBib29sZWFuKSB7XG4gIGxldCBpID0gMDtcbiAgZm9yIChsZXQgayA9IDA7IGs8YXJyLmxlbmd0aDsgaysrKSB7XG4gICAgaWYgKCFmKGFycltrXSwgaywgaSsrKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4oYXJyYXlzOiBhbnlbXSkge1xuICByZXR1cm4gW10uY29uY2F0LmFwcGx5KFtdLCBhcnJheXMpO1xufVxuXG4vKipcbiAqIHJlY3Vyc2l2ZWx5IG1lcmdlcyBzcmMgaW50byBkZXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZURlZXA8VD4oZGVzdDogVCwgLi4uc3JjOiBQYXJ0aWFsPFQ+W10pOiBUIHtcbiAgZm9yIChjb25zdCBzIG9mIHNyYykge1xuICAgIGRlc3QgPSBkZWVwTWVyZ2VfKGRlc3QsIHMpO1xuICB9XG4gIHJldHVybiBkZXN0O1xufVxuXG4vLyByZWN1cnNpdmVseSBtZXJnZXMgc3JjIGludG8gZGVzdFxuZnVuY3Rpb24gZGVlcE1lcmdlXyhkZXN0OiBhbnksIHNyYzogYW55KSB7XG4gIGlmICh0eXBlb2Ygc3JjICE9PSAnb2JqZWN0JyB8fCBzcmMgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZGVzdDtcbiAgfVxuXG4gIGZvciAoY29uc3QgcCBpbiBzcmMpIHtcbiAgICBpZiAoIXNyYy5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChzcmNbcF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygc3JjW3BdICE9PSAnb2JqZWN0JyB8fCBpc0FycmF5KHNyY1twXSkgfHwgc3JjW3BdID09PSBudWxsKSB7XG4gICAgICBkZXN0W3BdID0gc3JjW3BdO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlc3RbcF0gIT09ICdvYmplY3QnIHx8IGRlc3RbcF0gPT09IG51bGwpIHtcbiAgICAgIGRlc3RbcF0gPSBtZXJnZURlZXAoaXNBcnJheShzcmNbcF0uY29uc3RydWN0b3IpID8gW10gOiB7fSwgc3JjW3BdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVyZ2VEZWVwKGRlc3RbcF0sIHNyY1twXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBkZXN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5pcXVlPFQ+KHZhbHVlczogVFtdLCBmOiAoaXRlbTogVCkgPT4gc3RyaW5nIHwgbnVtYmVyKTogVFtdIHtcbiAgY29uc3QgcmVzdWx0czogYW55W10gPSBbXTtcbiAgY29uc3QgdSA9IHt9O1xuICBsZXQgdjogc3RyaW5nIHwgbnVtYmVyO1xuICBmb3IgKGNvbnN0IHZhbCBvZiB2YWx1ZXMpIHtcbiAgICB2ID0gZih2YWwpO1xuICAgIGlmICh2IGluIHUpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICB1W3ZdID0gMTtcbiAgICByZXN1bHRzLnB1c2godmFsKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEaWN0PFQ+IHtcbiAgW2tleTogc3RyaW5nXTogVDtcbn1cblxuZXhwb3J0IHR5cGUgU3RyaW5nU2V0ID0gRGljdDx0cnVlPjtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHR3byBkaWN0aW9uYXJpZXMgZGlzYWdyZWUuIEFwcGxpZXMgb25seSB0byBkZWZpbmVkIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpZmZlcjxUPihkaWN0OiBEaWN0PFQ+LCBvdGhlcjogRGljdDxUPikge1xuICBmb3IgKGNvbnN0IGtleSBpbiBkaWN0KSB7XG4gICAgaWYgKGRpY3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgaWYgKG90aGVyW2tleV0gJiYgZGljdFtrZXldICYmIG90aGVyW2tleV0gIT09IGRpY3Rba2V5XSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzSW50ZXJzZWN0aW9uKGE6IFN0cmluZ1NldCwgYjogU3RyaW5nU2V0KSB7XG4gIGZvciAoY29uc3Qga2V5IGluIGEpIHtcbiAgICBpZiAoa2V5IGluIGIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bWVyaWMobnVtOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgcmV0dXJuICFpc05hTihudW0gYXMgYW55KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpZmZlckFycmF5PFQ+KGFycmF5OiBUW10sIG90aGVyOiBUW10pIHtcbiAgaWYgKGFycmF5Lmxlbmd0aCAhPT0gb3RoZXIubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhcnJheS5zb3J0KCk7XG4gIG90aGVyLnNvcnQoKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKG90aGVyW2ldICE9PSBhcnJheVtpXSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBUaGlzIGlzIGEgc3RyaWN0ZXIgdmVyc2lvbiBvZiBPYmplY3Qua2V5cyBidXQgd2l0aCBiZXR0ZXIgdHlwZXMuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvcHVsbC8xMjI1MyNpc3N1ZWNvbW1lbnQtMjYzMTMyMjA4XG5leHBvcnQgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzIGFzIDxUPihvOiBUKSA9PiAoa2V5b2YgVClbXTtcblxuZXhwb3J0IGZ1bmN0aW9uIHZhbHM8VD4oeDoge1trZXk6IHN0cmluZ106IFR9KTogVFtdIHtcbiAgY29uc3QgX3ZhbHM6IFRbXSA9IFtdO1xuICBmb3IgKGNvbnN0IGsgaW4geCkge1xuICAgIGlmICh4Lmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICBfdmFscy5wdXNoKHhba10pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gX3ZhbHM7XG59XG5cbi8vIFVzaW5nIG1hcHBlZCB0eXBlIHRvIGRlY2xhcmUgYSBjb2xsZWN0IG9mIGZsYWdzIGZvciBhIHN0cmluZyBsaXRlcmFsIHR5cGUgU1xuLy8gaHR0cHM6Ly93d3cudHlwZXNjcmlwdGxhbmcub3JnL2RvY3MvaGFuZGJvb2svYWR2YW5jZWQtdHlwZXMuaHRtbCNtYXBwZWQtdHlwZXNcbmV4cG9ydCB0eXBlIEZsYWc8UyBleHRlbmRzIHN0cmluZz4gPSB7XG4gIFtLIGluIFNdOiAxXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZmxhZ0tleXM8UyBleHRlbmRzIHN0cmluZz4oZjogRmxhZzxTPik6IFNbXSB7XG4gIHJldHVybiBrZXlzKGYpIGFzIFNbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGR1cGxpY2F0ZTxUPihvYmo6IFQpOiBUIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4oYjogYW55KTogYiBpcyBib29sZWFuIHtcbiAgcmV0dXJuIGIgPT09IHRydWUgfHwgYiA9PT0gZmFsc2U7XG59XG5cbi8qKlxuICogQ29udmVydCBhIHN0cmluZyBpbnRvIGEgdmFsaWQgdmFyaWFibGUgbmFtZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFyTmFtZShzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAvLyBSZXBsYWNlIG5vbi1hbHBoYW51bWVyaWMgY2hhcmFjdGVycyAoYW55dGhpbmcgYmVzaWRlcyBhLXpBLVowLTlfKSB3aXRoIF9cbiAgY29uc3QgYWxwaGFudW1lcmljUyA9IHMucmVwbGFjZSgvXFxXL2csICdfJyk7XG5cbiAgLy8gQWRkIF8gaWYgdGhlIHN0cmluZyBoYXMgbGVhZGluZyBudW1iZXJzLlxuICByZXR1cm4gKHMubWF0Y2goL15cXGQrLykgPyAnXycgOiAnJykgKyBhbHBoYW51bWVyaWNTO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9naWNhbEV4cHI8VD4ob3A6IExvZ2ljYWxPcGVyYW5kPFQ+LCBjYjogRnVuY3Rpb24pOiBzdHJpbmcge1xuICBpZiAoaXNMb2dpY2FsTm90KG9wKSkge1xuICAgIHJldHVybiAnISgnICsgbG9naWNhbEV4cHIob3Aubm90LCBjYikgKyAnKSc7XG4gIH0gZWxzZSBpZiAoaXNMb2dpY2FsQW5kKG9wKSkge1xuICAgIHJldHVybiAnKCcgKyBvcC5hbmQubWFwKChhbmQ6IExvZ2ljYWxPcGVyYW5kPFQ+KSA9PiBsb2dpY2FsRXhwcihhbmQsIGNiKSkuam9pbignKSAmJiAoJykgKyAnKSc7XG4gIH0gZWxzZSBpZiAoaXNMb2dpY2FsT3Iob3ApKSB7XG4gICAgcmV0dXJuICcoJyArIG9wLm9yLm1hcCgob3I6IExvZ2ljYWxPcGVyYW5kPFQ+KSA9PiBsb2dpY2FsRXhwcihvciwgY2IpKS5qb2luKCcpIHx8ICgnKSArICcpJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY2Iob3ApO1xuICB9XG59XG5cbi8vIE9taXQgZnJvbSBodHRwOi8vaWRlYXNpbnRvc29mdHdhcmUuY29tL3R5cGVzY3JpcHQtYWR2YW5jZWQtdHJpY2tzL1xuZXhwb3J0IHR5cGUgRGlmZjxUIGV4dGVuZHMgc3RyaW5nLCBVIGV4dGVuZHMgc3RyaW5nPiA9ICh7W1AgaW4gVF06IFAgfSAmIHtbUCBpbiBVXTogbmV2ZXIgfSAmIHsgW3g6IHN0cmluZ106IG5ldmVyIH0pW1RdO1xuZXhwb3J0IHR5cGUgT21pdDxULCBLIGV4dGVuZHMga2V5b2YgVD4gPSB7W1AgaW4gRGlmZjxrZXlvZiBULCBLPl06IFRbUF19O1xuXG4vKipcbiAqIERlbGV0ZSBuZXN0ZWQgcHJvcGVydHkgb2YgYW4gb2JqZWN0LCBhbmQgZGVsZXRlIHRoZSBhbmNlc3RvcnMgb2YgdGhlIHByb3BlcnR5IGlmIHRoZXkgYmVjb21lIGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlTmVzdGVkUHJvcGVydHkob2JqOiBhbnksIG9yZGVyZWRQcm9wczogc3RyaW5nW10pIHtcbiAgaWYgKG9yZGVyZWRQcm9wcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBjb25zdCBwcm9wID0gb3JkZXJlZFByb3BzLnNoaWZ0KCk7XG4gIGlmIChkZWxldGVOZXN0ZWRQcm9wZXJ0eShvYmpbcHJvcF0sIG9yZGVyZWRQcm9wcykpIHtcbiAgICBkZWxldGUgb2JqW3Byb3BdO1xuICB9XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopLmxlbmd0aCA9PT0gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpdGxlY2FzZShzOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnN1YnN0cigxKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhIHBhdGggdG8gYW4gYWNjZXNzIHBhdGggd2l0aCBkYXR1bS5cbiAqIEBwYXJhbSBwYXRoIFRoZSBmaWVsZCBuYW1lLlxuICogQHBhcmFtIGRhdHVtIFRoZSBzdHJpbmcgdG8gdXNlIGZvciBgZGF0dW1gLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWNjZXNzUGF0aFdpdGhEYXR1bShwYXRoOiBzdHJpbmcsIGRhdHVtPSdkYXR1bScpIHtcbiAgY29uc3QgcGllY2VzID0gc3BsaXRBY2Nlc3NQYXRoKHBhdGgpO1xuICBjb25zdCBwcmVmaXhlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMTsgaSA8PSBwaWVjZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBwcmVmaXggPSBgWyR7cGllY2VzLnNsaWNlKDAsaSkubWFwKHN0cmluZ1ZhbHVlKS5qb2luKCddWycpfV1gO1xuICAgIHByZWZpeGVzLnB1c2goYCR7ZGF0dW19JHtwcmVmaXh9YCk7XG4gIH1cbiAgcmV0dXJuIHByZWZpeGVzLmpvaW4oJyAmJiAnKTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYWNjZXNzIHdpdGggZGF0dW0gdG8gdGhlIGZhbHR0ZW5lZCBmaWVsZC5cbiAqIEBwYXJhbSBwYXRoIFRoZSBmaWVsZCBuYW1lLlxuICogQHBhcmFtIGRhdHVtIFRoZSBzdHJpbmcgdG8gdXNlIGZvciBgZGF0dW1gLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmxhdEFjY2Vzc1dpdGhEYXR1bShwYXRoOiBzdHJpbmcsIGRhdHVtPSdkYXR1bScpIHtcbiAgcmV0dXJuIGAke2RhdHVtfVske3N0cmluZ1ZhbHVlKHNwbGl0QWNjZXNzUGF0aChwYXRoKS5qb2luKCcuJykpfV1gO1xufVxuXG4vKipcbiAqIFJlcGxhY2VzIHBhdGggYWNjZXNzZXMgd2l0aCBhY2Nlc3MgdG8gbm9uLW5lc3RlZCBmaWVsZC5cbiAqIEZvciBleGFtcGxlLCBgZm9vW1wiYmFyXCJdLmJhemAgYmVjb21lcyBgZm9vXFxcXC5iYXJcXFxcLmJhemAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlUGF0aEluRmllbGQocGF0aDogc3RyaW5nKSB7XG4gIHJldHVybiBgJHtzcGxpdEFjY2Vzc1BhdGgocGF0aCkubWFwKHAgPT4gcC5yZXBsYWNlKCcuJywgJ1xcXFwuJykpLmpvaW4oJ1xcXFwuJyl9YDtcbn1cblxuLyoqXG4gKiBSZW1vdmUgcGF0aCBhY2Nlc3NlcyB3aXRoIGFjY2VzcyBmcm9tIGZpZWxkLlxuICogRm9yIGV4YW1wbGUsIGBmb29bXCJiYXJcIl0uYmF6YCBiZWNvbWVzIGBmb28uYmFyLmJhemAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVQYXRoRnJvbUZpZWxkKHBhdGg6IHN0cmluZykge1xuICByZXR1cm4gYCR7c3BsaXRBY2Nlc3NQYXRoKHBhdGgpLmpvaW4oJy4nKX1gO1xufVxuXG4vKipcbiAqIENvdW50IHRoZSBkZXB0aCBvZiB0aGUgcGF0aC4gUmV0dXJucyAxIGZvciBmaWVsZHMgdGhhdCBhcmUgbm90IG5lc3RlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFjY2Vzc1BhdGhEZXB0aChwYXRoOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHNwbGl0QWNjZXNzUGF0aChwYXRoKS5sZW5ndGg7XG59XG4iXX0=