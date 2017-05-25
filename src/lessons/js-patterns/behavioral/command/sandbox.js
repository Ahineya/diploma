//Sample data
const data = [
    {
        command: 'expand',
        width: 10
    },
    {
        command: 'squeeze',
        width: 100
    },
    {
        command: 'expandWidth',
        width: 150
    },
];

//Ajax mock
const Ajax = {
    get: function () {
        return data;
    }
};

/**
 * Object with command pattern.
 * Notice that commandObject objects implements same interface
 */
const Visualisation = {
    elem: sandbox.createElement('div'),
    init: function () {
        const elem = this.elem;
        elem.style.width = '100px';
        elem.style.height = '100px';
        elem.style.backgroundColor = '#FACE8D';
    },
    expand: function (length) {
        const sizeW = parseInt(this.elem.style.width, 10) + length + 'px',
            sizeH = parseInt(this.elem.style.height, 10) + length + 'px';
        this.elem.style.width = sizeW;
        this.elem.style.height = sizeH;
        return sizeW + sizeH;
    },
    squeeze: function (length) {
        const sizeW = parseInt(this.elem.style.width, 10) - length + 'px',
            sizeH = parseInt(this.elem.style.height, 10) - length + 'px';
        this.elem.style.width = sizeW;
        this.elem.style.height = sizeH;
        return sizeW + sizeH;
    },
    expandWidth: function (length) {
        const size = parseInt(this.elem.style.width, 10) + length + 'px';
        this.elem.style.width = size;
        return size;
    },

    expandHeight: function (length) {
        const size = parseInt(this.elem.style.height, 10) + length + 'px';
        this.elem.style.height = size;
        return size;
    }

};

Visualisation.execute = function (commandObject) {
    const command = commandObject.command,
        args = [commandObject.width];

    sandbox.log(command + ': ' + args.join(','));
    return Visualisation[command].apply(Visualisation, args);
};

const block = Visualisation;

block.init();

sandbox.assert(block.elem.style.width === '100px', 'Initial width of block is 100px');
sandbox.assert(block.elem.style.height === '100px', 'Initial height of block is 100px');

const commands = Ajax.get('/transformations');

commands.forEach(function (command) {
    block.execute(command);
});

block.execute(commands[0]);
block.execute({command: 'squeeze', width: 10});
block.execute({command: 'expandHeight', width: 100});

sandbox.assert(block.elem.style.width === '160px', 'Width of block after transformations is 160px');
sandbox.assert(block.elem.style.height === '110px', 'Height of block after transformations is 110px');

sandbox.assert(block.execute({command: 'expandWidth', width: 100}) === '260px', 'Executed commands can return values');
