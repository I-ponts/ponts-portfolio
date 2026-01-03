/* global Vue, Hammer, $ */

Vue.directive("swipeleft", {
    bind(el, binding) {
        if (typeof binding.value === "function") {
            const mc = new Hammer(el);
            mc.get("swipe").set({ direction: Hammer.DIRECTION_LEFT });
            mc.on("swipe", binding.value);
        }
    }
});

Vue.directive("swiperight", {
    bind(el, binding) {
        if (typeof binding.value === "function") {
            const mc = new Hammer(el);
            mc.get("swipe").set({ direction: Hammer.DIRECTION_RIGHT });
            mc.on("swipe", binding.value);
        }
    }
});

var app = new Vue({
    el: '#myApp',
    data: {
        message1: "Use buttons or swipe left/right",
        projects: [],
        currentOffset: 0
    },
    methods: {
        onSwipeLeft() {
            this.scrollNext();
        },
        onSwipeRight() {
            this.scrollPrevious();
        },
        scrollPrevious() {
            this.currentOffset -= 310;

            // 🔁 wrap to end if before start
            if (this.currentOffset < 0) {
                this.currentOffset = (this.projects.length * 310) - 300;
            }

            $('.holder ul').css('left', -this.currentOffset + 'px');
        },
        scrollNext() {
            const maxOffset = (this.projects.length * 310) - 300;
            this.currentOffset += 310;

            // 🔁 wrap back to start
            if (this.currentOffset > maxOffset) {
                this.currentOffset = 0;
            }

            $('.holder ul').css('left', -this.currentOffset + 'px');
        }
    }
});

// Local data
$.getJSON('data.json', function(data) {
    app.projects = data;
});

// Buttons
$('#leftBtn').click(() => app.scrollPrevious());
$('#rightBtn').click(() => app.scrollNext());
