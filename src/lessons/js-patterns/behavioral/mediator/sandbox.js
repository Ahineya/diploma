const PubSub = function () {

    let subToken = 0;
    const topics = {};

    this.publish = function (topic, obj) {

        if (!topics[topic]) {
            return false;
        }

        topics[topic].forEach(function (item) {
            item.func(obj);
        });


    };

    this.subscribe = function (topic, callback) {
        if (!topics[topic]) {
            topics[topic] = [];
        }

        const token = ++subToken;

        topics[topic].push({
            token: token,
            func: callback
        });

        return token;
    };

    this.unsubscribe = function (token) {
        for (let m in topics) {
            if (topics[m]) {
                for (let i = 0, l = topics[m].length; i < l; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice(i, 1);
                    }
                }
            }
        }
    };

    this.applyTo = function (obj) {
        if (typeof obj !== 'undefined') {
            obj.publish = this.publish;
            obj.subscribe = this.subscribe;
        }
    };

};

window.pubsub = new PubSub();

function Mediator() {
    pubsub.applyTo(this);
    const self = this;

    const modules = {
        counter: new Counter(),
        taskStorage: new TaskStorage(),
        taskInput: new TaskInput(),
        taskOutput: new TaskOutput()
    };

    modules.taskInput.addButton.onclick = function () {
        self.publish('app/task:add', modules.taskInput.taskField.value);
    };

    this.subscribe('app/task:add', function (data) {
        modules.taskStorage.add(data);
        modules.taskOutput.reload();
        modules.counter.reload();
    });

    this.subscribe('app/taskOutput:reload', function () {
        modules.taskOutput.set(modules.taskStorage.getTasks());
    });

    this.subscribe('app/counter:reload', function () {
        modules.counter.set(modules.taskStorage.count());
    });

    modules.taskOutput.reload();
    modules.counter.reload();

}

function Counter() {
    pubsub.applyTo(this);
    const self = this;

    const elem = sandbox.createElement('div');

    const _reload = () => {
        self.publish('app/counter:reload');
    };

    const _set = value => {
        elem.innerHTML = 'Task count:' + value;
    };

    _set(0);

    return {
        set: _set,
        reload: _reload
    };

}

function TaskStorage() {
    pubsub.applyTo(this);
    const self = this;

    const tasks = [
        'First task',
        'Second task'
    ];

    const _add = task => {
        if ((task.trim() !== '') && (!~tasks.indexOf(task))) {
            tasks.push(task);
        }
    };

    const _count = () => tasks.length;
    const _getTasks = () => tasks;

    return {
        add: _add,
        count: _count,
        getTasks: _getTasks
    };

}

function TaskInput() {
    pubsub.applyTo(this);

    const _addButton = sandbox.createElement('button');
    _addButton.innerText = 'Add task';

    const _taskField = sandbox.createElement('input');

    return {
        addButton: _addButton,
        taskField: _taskField
    };
}

function TaskOutput() {
    pubsub.applyTo(this);
    const self = this;

    const output = sandbox.createElement('ul');

    const _reload = () => {
        this.publish('app/taskOutput:reload');
    };

    const _set = tasks => {
        output.innerHTML = '';

        tasks.forEach(task => {
            output.innerHTML += `<li>${task}</li>`;
        });
    };

    return {
        reload: _reload,
        set: _set
    };

}

const app = new Mediator();
