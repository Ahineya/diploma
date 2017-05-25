const ItemList = function () {
    const items = [];

    function _add(item) {
        items.push(item);
    }

    function _get() {
        return {
            items: items,
            count: items.length
        };
    }

    function _build() {
        const data = _get();

        return data.items.map(i => {
            const li = document.createElement('li');
            li.innerText = i;
            return li;
        });
    }

    return {
        add: _add,
        getNodes: _build
    };
}();

ItemList.add('Lemon');
ItemList.add('Apple');
ItemList.add('Tomato');

const container = sandbox.createElement('ul');

ItemList.getNodes().forEach(item => container.appendChild(item));

sandbox.assert(ItemList.hasOwnProperty('add'), 'ItemList has public property \'add\'');
sandbox.assert(!ItemList.hasOwnProperty('_add'), 'ItemList has private property \'_add\'');
