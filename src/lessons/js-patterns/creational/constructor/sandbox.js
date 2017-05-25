function User(options) {
    this.options = options || {};
    this.name = this.options.name || 'Dummy';

    this.sayHi = function () {
        sandbox.log('Hi, I am ' + this.name + '!');
    };

}

User.prototype.sayHello = function () {
    sandbox.log('Hello, I am ' + this.name + '!');
};

const user1 = new User({name: "User1"});
const user2 = new User({name: "User2"});

sandbox.assert(user1.name === 'User1', 'The name property of user1 is \'User1\'');
sandbox.assert(user2.name === 'User2', 'The name property of user2 is \'User2\'');

user1.sayHi();
user2.sayHi();

sandbox.assert(user1.hasOwnProperty('sayHi'), 'user1 has own property \'sayHi\'');
sandbox.assert(user2.hasOwnProperty('sayHi'), 'user2 has own property \'sayHi\'');

user1.sayHello();
user2.sayHello();

sandbox.assert(!user1.hasOwnProperty('sayHello'), 'user1 hasn\'t own property \'sayHello\'');
sandbox.assert(!user2.hasOwnProperty('sayHello'), 'user2 hasn\'t own property \'sayHello\'');

