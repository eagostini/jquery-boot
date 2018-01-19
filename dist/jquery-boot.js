+function (exports) {
    if (typeof window === 'undefined') {
        module.exports = exports;
    } else {
        return exports(window.jQuery);
    }
}(function (jQuery) {
    var pipeline = {};

    /**
     * @param {String|jQuery|Object} [scope]
     * @param {Array} [options]
     * @param {Boolean} [unbind]
     * @return {jQuery}
     */
    jQuery.boot = function (scope, options, unbind) {
        options = options || [];
        scope = jQuery(scope || document);

        if (!$.isArray(options)) {
            options = [options];
        }

        if (unbind) {
            scope.unbind();
        }

        for (var name in pipeline) {
            if (!options.length || options.indexOf(name) >= 0) {
                pipeline[name].call(scope, jQuery);
            }
        }

        return jQuery;
    };

    /**
     * @param {Array} [packages]
     * @param {Boolean} [unbind]
     * @return {jQuery}
     */
    jQuery.fn.boot = function (packages, unbind) {
        jQuery.boot(this, packages, unbind);

        return this;
    };

    /**
     * @param {String} name
     * @param {Function} job
     * @return {jQuery}
     */
    jQuery.register = function (name, job) {
        pipeline[name] = job;

        return jQuery;
    };

    jQuery(function ($) {
        $.boot();
    });
});