var linkCart = document.querySelector(".js-cart-button");
var popupCart = document.querySelector(".basket-form");
var closeCart = document.querySelector(".js-close-modal");

linkCart.addEventListener("click", function (evt) {
    evt.preventDefault();
    linkCart.classList.add("full-backet-mouseover");
    popupCart.classList.add("modal-show");
    closeCart.style.display = "block";

});
closeCart.addEventListener("click", function (evt) {
    evt.preventDefault();
    this.style.display = "none";
    popupCart.classList.remove("modal-show");
    linkCart.classList.remove("full-backet-mouseover");
});

(function () {
    "use strict";

    var supportsMultiple = self.HTMLInputElement && "valueLow" in HTMLInputElement.prototype;

    var descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");

    self.multirange = function (input) {
        if (supportsMultiple || input.classList.contains("multirange")) {
            return;
        }

        var value = input.getAttribute("value");
        var values = value === null ? [] : value.split(",");
        var min = +(input.min || 0);
        var max = +(input.max || 100);
        var ghost = input.cloneNode();
        var lowPrice = document.querySelector('.js-low-price');
        var highPrice = document.querySelector('.js-high-price');

        input.classList.add("multirange");
        input.classList.add("original");
        ghost.classList.add("multirange");
        ghost.classList.add("ghost");

        input.value = values[0] || min + (max - min) / 2;
        ghost.value = values[1] || min + (max - min) / 2;

        input.parentNode.insertBefore(ghost, input.nextSibling);

        Object.defineProperty(input, "originalValue", descriptor.get ? descriptor : {
            get: function () { return this.value; },
            set: function (v) { this.value = v; }
        });

        Object.defineProperties(input, {
            valueLow: {
                get: function () { return Math.min(this.originalValue, ghost.value); },
                set: function (v) { this.originalValue = v; },
                enumerable: true
            },
            valueHigh: {
                get: function () { return Math.max(this.originalValue, ghost.value); },
                set: function (v) { ghost.value = v; },
                enumerable: true
            }
        });

        if (descriptor.get) {
            Object.defineProperty(input, "value", {
                get: function () { return this.valueLow + "," + this.valueHigh; },
                set: function (v) {
                    var values = v.split(",");
                    this.valueLow = values[0];
                    this.valueHigh = values[1];
                    update();
                },
                enumerable: true
            });
        }

        if (typeof input.oninput === "function") {
            ghost.oninput = input.oninput.bind(input);
        }

        function update() {
            var lowPercent = 100 * ((input.valueLow - min) / (max - min));
            var highProcent = 100 * ((input.valueHigh - min) / (max - min));
            ghost.style.setProperty("--low", lowPercent + "%");
            ghost.style.setProperty("--high", highProcent + "%");
            lowPrice.innerHTML = Math.round(lowPercent * max / 100);
            highPrice.innerHTML = Math.round(highProcent * max / 100);
        }

        input.addEventListener("input", update);
        ghost.addEventListener("input", update);

        update();
    }

    multirange.init = function () {
        [].slice.call(document.querySelectorAll("input[type=range][multiple]:not(.multirange)")).forEach(multirange);
    }

    if (document.readyState == "loading") {
        document.addEventListener("DOMContentLoaded", multirange.init);
    }
    else {
        multirange.init();
    }

})();