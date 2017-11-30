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
     * @return {jQuery}
     */
    jQuery.boot = function (scope, options) {
        options = options || [];
        scope = jQuery(scope || window);

        if (!$.isArray(options)) {
            options = [options];
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
     * @return {jQuery}
     */
    jQuery.fn.boot = function (packages) {
        jQuery.boot(this, packages);

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