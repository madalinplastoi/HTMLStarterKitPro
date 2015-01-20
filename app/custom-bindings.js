/**
 * Created by madalin on 1/20/2015.
 */
define('custom-bindings', ['knockout'], function (ko) {
    ko.bindingHandlers.select2 = {
        init: function (element, valueAccessor) {
            $(element).select2(valueAccessor());
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).select2('destroy');
            });
        },
        update: function (element) {
            $(element).trigger('change');
        }
    };
});