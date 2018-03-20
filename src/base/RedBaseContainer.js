"use strict";
var RedBaseContainer;
(function () {
    RedBaseContainer = function () { }
    RedBaseContainer.prototype = {
        addChild: function (v) {
            if (this.children.indexOf(v) == -1) this.children.push(v)
        },
        addChildAt: function (v) {
            // TODO:
        },
        removeChild: function (v) {
            // TODO:
        },
        removeChildAt: function (v) {
            // TODO:
        },
        getChildAt: function (v) {
            // TODO: 
        },
        getChildIndex: function (v) {
            // TODO: 
        },
        getChildByName: function () {

        },
        setChildIndex: function (v) {
            // TODO: 
        },
        numChildren: function (v) {
            // TODO: 
        }
    };
    Object.freeze(RedBaseContainer);
})();
