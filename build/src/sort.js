import { isArray, isString } from 'vega-util';
export function isSortField(sort) {
    return !!sort && (sort['op'] === 'count' || !!sort['field']) && !!sort['op'];
}
export function isSortArray(sort) {
    return !!sort && isArray(sort) && sort.every(function (s) { return isString(s); });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBNkI1QyxNQUFNLHNCQUF5QixJQUF5QztJQUN0RSxPQUFPLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssT0FBTyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9FLENBQUM7QUFFRCxNQUFNLHNCQUF5QixJQUF5QztJQUN0RSxPQUFPLENBQUMsQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQVgsQ0FBVyxDQUFDLENBQUM7QUFDakUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWdncmVnYXRlT3B9IGZyb20gJ3ZlZ2EnO1xuaW1wb3J0IHtpc0FycmF5LCBpc1N0cmluZ30gZnJvbSAndmVnYS11dGlsJztcblxuaW1wb3J0IHtWZ0NvbXBhcmF0b3JPcmRlcn0gZnJvbSAnLi92ZWdhLnNjaGVtYSc7XG5cblxuZXhwb3J0IHR5cGUgU29ydE9yZGVyID0gVmdDb21wYXJhdG9yT3JkZXIgfCBudWxsO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNvcnRGaWVsZDxGPiB7XG4gIC8qKlxuICAgKiBUaGUgZGF0YSBbZmllbGRdKGZpZWxkLmh0bWwpIHRvIHNvcnQgYnkuXG4gICAqXG4gICAqIF9fRGVmYXVsdCB2YWx1ZTpfXyBJZiB1bnNwZWNpZmllZCwgZGVmYXVsdHMgdG8gdGhlIGZpZWxkIHNwZWNpZmllZCBpbiB0aGUgb3V0ZXIgZGF0YSByZWZlcmVuY2UuXG4gICAqL1xuICBmaWVsZD86IEY7XG4gIC8qKlxuICAgKiBBbiBbYWdncmVnYXRlIG9wZXJhdGlvbl0oYWdncmVnYXRlLmh0bWwjb3BzKSB0byBwZXJmb3JtIG9uIHRoZSBmaWVsZCBwcmlvciB0byBzb3J0aW5nIChlLmcuLCBgXCJjb3VudFwiYCwgYFwibWVhblwiYCBhbmQgYFwibWVkaWFuXCJgKS5cbiAgICogVGhpcyBwcm9wZXJ0eSBpcyByZXF1aXJlZCBpbiBjYXNlcyB3aGVyZSB0aGUgc29ydCBmaWVsZCBhbmQgdGhlIGRhdGEgcmVmZXJlbmNlIGZpZWxkIGRvIG5vdCBtYXRjaC5cbiAgICogVGhlIGlucHV0IGRhdGEgb2JqZWN0cyB3aWxsIGJlIGFnZ3JlZ2F0ZWQsIGdyb3VwZWQgYnkgdGhlIGVuY29kZWQgZGF0YSBmaWVsZC5cbiAgICpcbiAgICogRm9yIGEgZnVsbCBsaXN0IG9mIG9wZXJhdGlvbnMsIHBsZWFzZSBzZWUgdGhlIGRvY3VtZW50YXRpb24gZm9yIFthZ2dyZWdhdGVdKGFnZ3JlZ2F0ZS5odG1sI29wcykuXG4gICAqL1xuICBvcDogQWdncmVnYXRlT3A7XG5cbiAgLyoqXG4gICAqIFRoZSBzb3J0IG9yZGVyLiBPbmUgb2YgYFwiYXNjZW5kaW5nXCJgIChkZWZhdWx0KSwgYFwiZGVzY2VuZGluZ1wiYCwgb3IgYG51bGxgIChubyBub3Qgc29ydCkuXG4gICAqL1xuICBvcmRlcj86IFNvcnRPcmRlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU29ydEZpZWxkPEY+KHNvcnQ6IHN0cmluZ1tdIHwgU29ydE9yZGVyIHwgU29ydEZpZWxkPEY+KTogc29ydCBpcyBTb3J0RmllbGQ8Rj4ge1xuICByZXR1cm4gISFzb3J0ICYmIChzb3J0WydvcCddID09PSAnY291bnQnIHx8ICEhc29ydFsnZmllbGQnXSkgJiYgISFzb3J0WydvcCddO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTb3J0QXJyYXk8Rj4oc29ydDogc3RyaW5nW10gfCBTb3J0T3JkZXIgfCBTb3J0RmllbGQ8Rj4pOiBzb3J0IGlzIHN0cmluZ1tdIHtcbiAgcmV0dXJuICEhc29ydCAmJiBpc0FycmF5KHNvcnQpICYmIHNvcnQuZXZlcnkocyA9PiBpc1N0cmluZyhzKSk7XG59XG4iXX0=