# Utils.js Code Explanation

## Overview
The utils.js file serves as a comprehensive utility library that provides a collection of helper functions, common operations, and shared functionality used throughout the application. This modular approach to common functionality promotes code reuse, maintains consistency, and reduces redundancy across the codebase.

## Core Utility Categories

### 1. Performance Utilities

#### Debounce Implementation
```javascript
const PerformanceUtils = {
    debounce(func, wait, immediate = false) {
        let timeout;
        return function executedFunction(...args) {
            const context = this;
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
};
```
Use cases:
- Search input handling
- Window resize events
- Scroll event handling
- Form validation

Example usage:
```javascript
// Search implementation
const searchInput = document.querySelector('.search-input');
const debouncedSearch = PerformanceUtils.debounce((event) => {
    performSearch(event.target.value);
}, 300);

searchInput.addEventListener('input', debouncedSearch);
```

#### Throttle Implementation
```javascript
const throttle(func, limit) {
    let inThrottle;
    let lastFunc;
    let lastRan;
    
    return function executedFunction(...args) {
        const context = this;
        
        if (!inThrottle) {
            func.apply(context, args);
            lastRan = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}
```
Use cases:
- Infinite scrolling
- Game loop updates
- Real-time data updates
- Animation frame control

Example usage:
```javascript
// Scroll handler
const scrollHandler = throttle(() => {
    updateScrollPosition();
    checkInfiniteScroll();
}, 100);

window.addEventListener('scroll', scrollHandler);
```

#### Memoization System
```javascript
const memoize = {
    create(func, resolver) {
        const cache = new Map();
        
        return (...args) => {
            const key = resolver ? resolver(...args) : JSON.stringify(args);
            if (cache.has(key)) return cache.get(key);
            
            const result = func.apply(this, args);
            cache.set(key, result);
            return result;
        };
    },
    
    clearCache(memoizedFunc) {
        if (memoizedFunc.cache instanceof Map) {
            memoizedFunc.cache.clear();
        }
    }
};
```
Use cases:
- Expensive calculations
- API response caching
- Complex data transformations
- Recursive functions

Example usage:
```javascript
// Fibonacci with memoization
const fibonacci = memoize.create((n) => {
    if (n < 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
});
```

### 2. DOM Manipulation Utilities

#### Enhanced Element Creation
```javascript
const DOMUtils = {
    createElement(tag, options = {}) {
        const {
            attributes = {},
            styles = {},
            children = [],
            events = {},
            dataset = {},
            className = '',
            id = ''
        } = options;

        const element = document.createElement(tag);

        // Set attributes
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });

        // Set styles
        Object.entries(styles).forEach(([property, value]) => {
            element.style[property] = value;
        });

        // Set classes
        if (className) {
            element.className = className;
        }

        // Set ID
        if (id) {
            element.id = id;
        }

        // Set dataset
        Object.entries(dataset).forEach(([key, value]) => {
            element.dataset[key] = value;
        });

        // Add event listeners
        Object.entries(events).forEach(([event, handler]) => {
            element.addEventListener(event, handler);
        });

        // Append children
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else {
                element.appendChild(child);
            }
        });

        return element;
    }
};
```
Use cases:
- Dynamic component creation
- Form generation
- List rendering
- Modal construction

Example usage:
```javascript
// Create a button with multiple properties
const button = DOMUtils.createElement('button', {
    className: 'btn btn-primary',
    attributes: {
        type: 'submit',
        'aria-label': 'Submit form'
    },
    styles: {
        backgroundColor: '#007bff',
        padding: '10px 20px'
    },
    events: {
        click: (e) => handleClick(e)
    },
    dataset: {
        action: 'submit',
        form: 'mainForm'
    },
    children: [
        'Submit',
        DOMUtils.createElement('span', {
            className: 'icon',
            children: ['→']
        })
    ]
});
```

#### Element Traversal
```javascript
const DOMTraversal = {
    closest(element, selector) {
        if (!element) return null;
        if (element.matches(selector)) return element;
        return element.closest(selector);
    },

    siblings(element) {
        return Array.from(element.parentNode.children)
            .filter(child => child !== element);
    },

    nextUntil(element, selector) {
        const siblings = [];
        let next = element.nextElementSibling;

        while (next && !next.matches(selector)) {
            siblings.push(next);
            next = next.nextElementSibling;
        }

        return siblings;
    },

    prevUntil(element, selector) {
        const siblings = [];
        let prev = element.previousElementSibling;

        while (prev && !prev.matches(selector)) {
            siblings.push(prev);
            prev = prev.previousElementSibling;
        }

        return siblings;
    }
};
```

### 3. Advanced Event Handling

#### Event Delegation System
```javascript
const EventSystem = {
    delegateEvent(container, eventType, selector, handler) {
        const wrappedHandler = (e) => {
            const target = e.target.closest(selector);
            if (target && container.contains(target)) {
                handler.call(target, e, target);
            }
        };
        
        container.addEventListener(eventType, wrappedHandler);
        
        // Return cleanup function
        return () => container.removeEventListener(eventType, wrappedHandler);
    },

    createEventBus() {
        const subscribers = new Map();

        return {
            subscribe(event, callback) {
                if (!subscribers.has(event)) {
                    subscribers.set(event, new Set());
                }
                subscribers.get(event).add(callback);
                
                // Return unsubscribe function
                return () => {
                    const callbacks = subscribers.get(event);
                    callbacks.delete(callback);
                    if (callbacks.size === 0) {
                        subscribers.delete(event);
                    }
                };
            },

            publish(event, data) {
                if (subscribers.has(event)) {
                    subscribers.get(event).forEach(callback => callback(data));
                }
            }
        };
    }
};
```

### 4. Data Structure Utilities

#### Deep Object Operations
```javascript
const ObjectUtils = {
    deepFreeze(obj) {
        Object.keys(obj).forEach(prop => {
            if (obj[prop] && typeof obj[prop] === 'object') {
                ObjectUtils.deepFreeze(obj[prop]);
            }
        });
        return Object.freeze(obj);
    },

    deepMerge(target, ...sources) {
        if (!sources.length) return target;
        const source = sources.shift();

        if (target && source && typeof target === 'object' && typeof source === 'object') {
            Object.keys(source).forEach(key => {
                if (source[key] instanceof Array) {
                    if (!target[key]) target[key] = [];
                    target[key] = [...target[key], ...source[key]];
                } else if (source[key] && typeof source[key] === 'object') {
                    if (!target[key]) target[key] = {};
                    ObjectUtils.deepMerge(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            });
        }

        return ObjectUtils.deepMerge(target, ...sources);
    },

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => 
            current && current[key] !== undefined ? current[key] : undefined, obj);
    },

    setNestedValue(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((current, key) => {
            if (!(key in current)) current[key] = {};
            return current[key];
        }, obj);
        target[lastKey] = value;
        return obj;
    }
};
```

### 5. Advanced String Manipulation

#### Template Engine
```javascript
const StringUtils = {
    template(str, data) {
        return str.replace(/\${(.*?)}/g, (match, key) => {
            return ObjectUtils.getNestedValue(data, key.trim()) || '';
        });
    },

    formatNumber(num, options = {}) {
        const {
            decimals = 2,
            thousandsSeparator = ',',
            decimalSeparator = '.'
        } = options;

        const parts = Number(num).toFixed(decimals).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
        return parts.join(decimalSeparator);
    },

    pluralize(count, singular, plural) {
        return count === 1 ? singular : (plural || `${singular}s`);
    },

    truncateHTML(html, maxLength) {
        const div = document.createElement('div');
        div.innerHTML = html;
        const text = div.textContent;
        return text.length > maxLength ? 
            text.substr(0, maxLength) + '...' : text;
    }
};
```

### 6. Validation and Type Checking

#### Enhanced Validation System
```javascript
const ValidationUtils = {
    rules: {
        required: value => value !== undefined && value !== null && value !== '',
        email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        url: value => {
            try {
                new URL(value);
                return true;
            } catch {
                return false;
            }
        },
        minLength: (value, min) => String(value).length >= min,
        maxLength: (value, max) => String(value).length <= max,
        pattern: (value, pattern) => pattern.test(value),
        custom: (value, validatorFn) => validatorFn(value)
    },

    validate(value, validations) {
        const errors = [];
        
        Object.entries(validations).forEach(([rule, ruleValue]) => {
            if (this.rules[rule]) {
                const isValid = this.rules[rule](value, ruleValue);
                if (!isValid) {
                    errors.push({
                        rule,
                        value,
                        message: this.getErrorMessage(rule, ruleValue)
                    });
                }
            }
        });

        return {
            isValid: errors.length === 0,
            errors
        };
    },

    getErrorMessage(rule, ruleValue) {
        const messages = {
            required: 'This field is required',
            email: 'Please enter a valid email address',
            url: 'Please enter a valid URL',
            minLength: `Minimum length is ${ruleValue} characters`,
            maxLength: `Maximum length is ${ruleValue} characters`,
            pattern: 'Please match the requested format'
        };
        return messages[rule] || 'Invalid value';
    }
};
```

### 7. Async Utilities

#### Promise Handlers
```javascript
const AsyncUtils = {
    retry(fn, retries = 3, delay = 1000) {
        return new Promise((resolve, reject) => {
            const attempt = async (attemptsLeft) => {
                try {
                    const result = await fn();
                    resolve(result);
                } catch (error) {
                    if (attemptsLeft <= 1) {
                        reject(error);
                        return;
                    }
                    setTimeout(() => attempt(attemptsLeft - 1), delay);
                }
            };
            attempt(retries);
        });
    },

    timeout(promise, ms) {
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Operation timed out')), ms);
        });
        return Promise.race([promise, timeoutPromise]);
    },

    queue(tasks, concurrency = 1) {
        const results = [];
        let running = 0;
        let index = 0;

        return new Promise((resolve) => {
            const runTask = async () => {
                if (index >= tasks.length) {
                    if (running === 0) resolve(results);
                    return;
                }

                const taskIndex = index++;
                running++;

                try {
                    results[taskIndex] = await tasks[taskIndex]();
                } catch (error) {
                    results[taskIndex] = { error };
                }

                running--;
                runTask();
            };

            for (let i = 0; i < concurrency; i++) {
                runTask();
            }
        });
    }
};
```

## Best Practices and Usage Guidelines

### 1. Performance Optimization
- Use memoization for expensive calculations
- Implement debouncing for frequent events
- Apply throttling for continuous operations
- Cache DOM queries and computation results

### 2. Memory Management
```javascript
const MemoryUtils = {
    clearEventListeners(element) {
        const clone = element.cloneNode(true);
        element.parentNode.replaceChild(clone, element);
        return clone;
    },

    disposeObject(obj) {
        Object.keys(obj).forEach(key => {
            obj[key] = null;
            delete obj[key];
        });
    }
};
```

### 3. Error Handling
```javascript
const ErrorUtils = {
    try(fn) {
        try {
            return { result: fn(), error: null };
        } catch (error) {
            return { result: null, error };
        }
    },

    async tryAsync(fn) {
        try {
            const result = await fn();
            return { result, error: null };
        } catch (error) {
            return { result: null, error };
        }
    }
};
```

## Security Considerations

### 1. XSS Prevention
```javascript
const SecurityUtils = {
    escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    sanitizeURL(url) {
        try {
            const parsed = new URL(url);
            return ['http:', 'https:'].includes(parsed.protocol) ? url : '';
        } catch {
            return '';
        }
    }
};
```

### 2. Data Validation
```javascript
const DataValidation = {
    isValidJSON(str) {
        try {
            JSON.parse(str);
            return true;
        } catch {
            return false;
        }
    },

    sanitizeInput(input) {
        return input.replace(/[<>]/g, '');
    }
};
```

## Browser Compatibility

### Feature Detection
```javascript
const BrowserUtils = {
    supports: {
        localStorage: () => {
            try {
                localStorage.setItem('test', 'test');
                localStorage.removeItem('test');
                return true;
            } catch {
                return false;
            }
        },
        
        webP: () => {
            const elem = document.createElement('canvas');
            return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        },
        
        touchEvents: () => {
            return 'ontouchstart' in window || 
                   navigator.maxTouchPoints > 0;
        }
    }
};
```

## Mobile Optimization

### Touch Event Handling
```javascript
const TouchUtils = {
    swipeDetect(element, callbacks) {
        let touchstart = { x: 0, y: 0, time: 0 };
        const threshold = { distance: 50, time: 300 };
        
        element.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            touchstart = {
                x: touch.clientX,
                y: touch.clientY,
                time: Date.now()
            };
        });

        element.addEventListener('touchend', (e) => {
            const touch = e.changedTouches[0];
            const distanceX = touch.clientX - touchstart.x;
            const distanceY = touch.clientY - touchstart.y;
            const elapsedTime = Date.now() - touchstart.time;

            if (elapsedTime <= threshold.time) {
                if (Math.abs(distanceX) >= threshold.distance) {
                    callbacks[distanceX > 0 ? 'right' : 'left']?.();
                }
                if (Math.abs(distanceY) >= threshold.distance) {
                    callbacks[distanceY > 0 ? 'down' : 'up']?.();
                }
            }
        });
    }
};
```

## Usage Examples

### Practical Applications
```javascript
// Form validation
const validateForm = (formData) => {
    const validations = {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minLength: 8,
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        }
    };

    const errors = {};
    Object.entries(formData).forEach(([field, value]) => {
        if (validations[field]) {
            const result = ValidationUtils.validate(value, validations[field]);
            if (!result.isValid) {
                errors[field] = result.errors;
            }
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Async operation with retry
const fetchWithRetry = async (url) => {
    return AsyncUtils.retry(
        async () => {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Request failed');
            return response.json();
        },
        3,
        1000
    );
};

// Event delegation for dynamic content
const tableHandler = EventSystem.delegateEvent(
    document.querySelector('table'),
    'click',
    'td',
    (e, target) => {
        console.log('Cell clicked:', target.textContent);
    }
);
```

This expanded explanation provides a more comprehensive look at the utility functions, their implementations, and practical usage examples. Each section includes detailed code samples and real-world applications to demonstrate how these utilities can be effectively used in your application.