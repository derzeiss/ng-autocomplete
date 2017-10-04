# angular-autocomplete
AngularJS 1.5+ autocomplete component.

## Getting started
1. Download the repo and include either `ng-autocomplete.js` or `ng-autocomplete.min.js` 
from the `dist` folder in your HTML.  
If you want the default styling also include one of the stylesheets found in `dist`.
2. Add the `ngAutocomplete` dependency to your angular module dependencies.
3. Voilá; you can now use the `<autocomplete>` tag in your app.

You may also check out the [working examples][example-index]

### Basic usage
```html
<autocomplete data="data"></autocomplete>
```
If you just want the thing to work you don't need to pass anything than the data array.
See [`options.data`](#optionsdata) for more information on how to format your data.  
There's a [working example][example-basic] for basic usage.

### Advanced usage
```html
<autocomplete options="$ctrl.options"></autocomplete>
```
Usually you also want to pass some options to the autocomplete. 
You can do that with the options attribute. You can even pass the data inside the options object.
There's a [working example][example-advanced] for advanced usage.

## Features
- easy to use / state-of-the-art angular autocomplete
- highly customizable while backed by thoughtful defaults

## Configuration
All configuration options are optional.  
`options.data` and all callbacks (`onFocus`, `onBlur`, etc.) 
can also be passed as html attributes of the `autocomplete` element, but will only be used
if not set in options.

````javascript
ctrl.options = {
    data: Array,
    minLength: int,
    maxItems: int,
    emptyState: String,
    input: {
        id: String,
        class: String,
        placeholder: String,
        value: String
    },
    list: {
        id: String,
        class: String,
        classVisible: String
    },
    item: {
        class: String,
        classActive: String,
        classHighlight: String,
    },
    onFocus: fn(ctrl),
    onBlur: fn(ctrl),
    onType: fn(ctrl),
    onSelect: fn(ctrl, item),
}
````

#### options.data
Type: `array`  
Default: `[]`

Autocomplete data. Must be a list of objects, each having at least a `label` property  

**Example:**
```javascript
data = [
  { label: 'displayed label in autocomplete', foo: 'bar' },
  { label: 'another item...' }
]
```

#### options.minLength
Type: `int`  
Default: `2`

Minimum input length before the autocomplete shows up.

#### options.maxItems
Type: `int`  
Default: `5`

Maximum items in suggestion list.


#### options.emptyState
Type: `String`  
Default: `'No results found...'`

Message shown when there are no items matching the search query.  
Pass `null` to disable empty state and show nothing

#### options.input
Type: `object`  
Default: `{}`

HTML-Attributes applied to the input field. Supported attributes are:
 - `id`
 - `class`
 - `placeholder`
 - `value`


#### options.list
Type: `object`  
Default: `{}`

HTML-Attributes applied to the suggestion list. Supported attributes are:
 - `id`
 - `class`
 - `classVisible`
 
#### options.list.classVisible
Type: `String`  
Default: `'autocomplete__list_visible'`

Added when the autocomplete list is visible.


#### options.item
Type: `object`  
Default: `{}`

HTML-Attributes applied to suggestion items. Supported attributes are:
 - `class`
 - `classActive`
 - `classHighlight`

#### options.item.classActive
Type: `String`  
Default: `'autocomplete__item_active'`

Added to the currently active item (hovered / selected with keyboard).

#### options.item.classHighlight
Type: `String`  
Default: `'autocomplete__item_highlight'`

Added to the parts of the item label that matches the query.
 
**Example:**  
`query` ba  
`result` foo **ba**r


### Callbacks

#### options.onFocus
Type: `function(ctrl)`  
Default: `doNothing()`

Fired when the autocomplete gets focused.  
The controller will be passed to the callback.


#### options.onBlur
Type: `function(ctrl)`  
Default: `doNothing()`

Fired when the autocomplete looses focus.  
The controller will be passed to the callback.


#### options.onType
Type: `function(ctrl)`  
Default: `doNothing()`

Fired when the autocomplete value changes.  
The controller will be passed to the callback.


#### options.onSelect
Type: `function(ctrl, item)`  
Default: `doNothing()`

Fired when a list item is selected (clicked or by keyboard).  
The controller & the complete object passed to `options.data` will be passed to the callback.

**Example:**
```javascript
options.onSelect = (ctrl, item) => {
    console.log(item)  // -> { label: 'displayed label in autocomplete', foo: 'bar' }
} 
```

## Styling
All CSS classes follow the [BEM-Methodology][bem].

You can either pass your own classes with the `options` object, or modify the existing ones.
Here's a reduced overview over the used HTML:
```html
<autocomplete>
    <input class="autocomplete__input">
    <div class="autocomplete__list">
    
        <div class="autocomplete__item">displayed label in autocomplete</div>
        <div class="autocomplete__item">another item...</div>
        ...
        
    </div>
</autocomplete>
```

**Conditional classes:**  
- `autocomplete__list`
  - `autocomplete__list_visible` - [options.list.classVisible](#optionslistclassvisible)
- `autocomplete__item`
  - `autocomplete__item_active` - [options.item.classActive](#optionsitemclassactive)
  - `autocomplete__item_highlight` - [options.item.classHighlight](#optionsitemclasshighlight)

## Contributing
If you'd like to contribute, please fork the repository and make changes as
you'd like. Pull requests are warmly welcome.
If there are any problems feel free to [open an issue][issues].

## Licensing
The code in this project is licensed under MIT license. 
See the [LICENSE](LICENSE) for more info.


[example-index]:https://derzeiss.github.io/ng-autocomplete/
[example-basic]:https://derzeiss.github.io/ng-autocomplete/basic/
[example-advanced]:https://derzeiss.github.io/ng-autocomplete/advanced/
[bem]:https://en.bem.info/methodology/
[issues]:https://github.com/derzeiss/ng-autocomplete/issues/new
