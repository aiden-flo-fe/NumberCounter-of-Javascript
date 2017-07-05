# NumberCounter.js

Simple JavaScript library to number count animation.

## Demo
 [View Demo](http://paolo2000.github.io/number-counter/)

## Quick Start
You only have to include `src/numbercounter.js` or `src/numbercounter.min.js` in your HTML.

```HTML
<script "src/numbercounter.min.js"></script>
```

And create a new NumberCounter

```javascript
var numberCounter = new NumberCounter("#numberCounter", {
    currentCount: 0, // initialize value | @number
    targetCount: 1000, // target count value | @number
    quotient: 37, // animation speed value. default value is 37. The high value is slower more than low value. (ex> 100 is slower than 30) | @number
    onChangeStart: function(_this) {
        // counter action start callback
        console.log("onChangeStart : " + _this);
    },
    onChangeEnd: function(obj) {
        // counter action end callback
        console.log("onChangeEnd : " + obj)
    }
});
```

## Callback Arguments

```
_this.currentCount : current count value | @number
_this.targetCount : target count value | @number
_this.countDiff : Difference between current value and target value (targetCount - currentCount) | @number
```

## License

numbercounter is Free to all.