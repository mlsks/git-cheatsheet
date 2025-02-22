# Utility Functions

## Available Utilities

### String Manipulation

```javascript
// Capitalize string
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Truncate text
const truncate = (str, length) =>
  str.length > length ? str.slice(0, length) + "..." : str;
```

### Array Helpers

```javascript
// Remove duplicates
const unique = (arr) => [...new Set(arr)];

// Group by property
const groupBy = (arr, key) =>
  arr.reduce(
    (acc, item) => ({
      ...acc,
      [item[key]]: [...(acc[item[key]] || []), item],
    }),
    {}
  );
```

### DOM Utilities

```javascript
// Query selector with error handling
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

// Add/remove classes
const addClass = (el, className) => el.classList.add(className);
const removeClass = (el, className) => el.classList.remove(className);
```

## Usage Examples

### String Utils

```javascript
const text = "hello world";
console.log(capitalize(text)); // "Hello world"
console.log(truncate(text, 5)); // "Hello..."
```

### Array Utils

```javascript
const arr = [1, 2, 2, 3, 3, 4];
console.log(unique(arr)); // [1, 2, 3, 4]
```

### DOM Utils

```javascript
const button = $(".button");
addClass(button, "active");
```
