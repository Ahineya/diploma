const MessageTemplate = (function () {
    let templateString = "";
    let builtTemplate = "";

    function build(model) {
        for (let key in model) {
            const regex = new RegExp('{' + key + '}');
            templateString = templateString.replace(regex, model[key]);
        }
        builtTemplate = templateString.replace(/{.*}/, '');
    }

    function place(id) {
        sandbox.log(builtTemplate);
    }

    return {
        setFromString: function (str) {
            templateString = str.trim();
            return this;
        },
        setFromDom: function (id) {
            templateString = document.getElementById(id).innerHTML;
            return this;
        },
        place: function (model) {
            build(model);
            place();
            return this;
        }
    };

})();

MessageTemplate
    .setFromString('{name}: {message}{time}')
    .place({
        name: 'User',
        message: 'Hello'
    }, 'log');

sandbox.assert(
    MessageTemplate.hasOwnProperty('setFromString'),
    'MessageTemplate has public property \'setFromString\''
);

sandbox.assert(
    !MessageTemplate.hasOwnProperty('build'),
    'build function is a private method in MessageTemplate'
);

