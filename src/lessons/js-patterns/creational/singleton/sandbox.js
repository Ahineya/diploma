const alerts = (function () {

    let instance;

    function raiseAlert() {

        return {
            raise: function (text) {
                sandbox.log(text);
            }
        };

    }

    function _getInstance(options) {
        if (!instance) {
            instance = raiseAlert();
        }
        return instance;
    }

    return {
        getInstance: _getInstance
    };

})();

const a = alerts.getInstance();
const b = alerts.getInstance();

a.raise('First instance');
b.raise('Second instance');

sandbox.assert(a === b, 'a and b is the same object');
sandbox.assert(a.raise === b.raise, 'a.raise and b.raise are links to the same function');