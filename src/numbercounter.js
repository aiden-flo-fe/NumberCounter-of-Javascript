;(function() {
    function NumberCounter(targetElement, options) {
        this.targetElement = document.querySelector(targetElement);

        if (!this.targetElement) {
            return;
        }

        if (options) {
            for (var key in NumberCounter.options) {
                if (options[key] == undefined) {
                    options[key] = NumberCounter.options[key];
                }
            }
        }

        this.options = options;

        this.currentCount = this.options.currentCount;
        this.targetCount = (typeof this.options.targetCount !== 'number') ? Number(this.options.targetCount.replace(/,/g, '')) : this.options.targetCount;
        this.countDiff = this.targetCount - this.currentCount;
        this.countTimer = null;

        this.init();
    };
    NumberCounter.prototype.init = function() {
        if (this.targetCount) {
            this.counter();
        }
    };
    NumberCounter.prototype.getCount = function() {
        return this.currentCount;
    };
    NumberCounter.prototype.setCount = function(setNumber) {
        if (typeof setNumber == 'number') {
            this.targetCount = setNumber;
            this.countDiff = this.targetCount - this.currentCount;
            this.counter();
        }
    };
    NumberCounter.prototype.increaseCount = function(incNumber) {
        if (typeof incNumber == 'number') {
            this.setCount(this.targetCount + incNumber);
        }
    };
    NumberCounter.prototype.decreaseCount = function(decNumber) {
        if (typeof decNumber == 'number') {
            this.setCount(this.targetCount - decNumber);
        }
    };
    NumberCounter.prototype.counter = function() {
        if (!this.countTimer && this.options.onChangeStart && typeof this.options.onChangeStart === 'function') {
            this.options.onChangeStart(this);
        }

        var _this = this,
            quotient = parseInt(this.countDiff / this.options.quotient),
            positiveQuotient = Math.abs(quotient),
            positiveCountDiff = Math.abs(this.targetCount - this.currentCount);

        if (positiveCountDiff >= 0) {
            this.currentCount = (this.currentCount + quotient);
            if (positiveQuotient > positiveCountDiff) {
                this.currentCount = this.targetCount;
            }
        }

        this.targetElement.innerHTML = this.currentCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        if (this.currentCount < this.targetCount || this.currentCount > this.targetCount) {
            this.countTimer = setTimeout(function() {
                _this.counter();
            }, 10);
        } else {
            clearTimeout(this.countTimer);
            this.countTimer = null;
            if (this.options.onChangeEnd && typeof this.options.onChangeEnd === 'function') {
                this.options.onChangeEnd(this);
            }
        }
    };
    NumberCounter.options = {
        currentCount: 0,
        targetCount: 0,
        quotient: 37,
        onChangeStart: false,
        onChangeEnd: false
    };

    window.NumberCounter = NumberCounter;
})();