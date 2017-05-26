Decorator
=========

Декораторы представляют собой структурный шаблон проектирования, целью которого является содействие повторному использованию кода. Подобно Mixins, их можно считать еще одной жизнеспособной альтернативой подклассу объектов.

Классически Decorators предложили возможность динамически добавлять поведение в существующие классы в системе. Идея заключалась в том, что само по себе декорирование не имело существенного значения для базовых функциональных возможностей класса, иначе оно было бы добавлено в самом суперклассе.

Их можно использовать для модификации существующих систем, когда мы хотим добавить дополнительные возможности
к объектам без необходимости сильно изменять базовый код.
Общая причина, по которой их используют разработчики, - их приложения могут содержать функции,
требующие большого количества различных типов объектов.
Представьте, что вам нужно определить сотни различных конструкторов объектов, скажем, JavaScript-игру.

Конструкторы объектов могут представлять различные типы игроков, каждый с разными возможностями. Для игры «Властелин Колец» могут потребоваться конструкторы для Хоббита, Эльфа, Орка, Мастера, Горного Гиганта, Каменного Гиганта и т. Д., Но их могло бы быть сотнями. Если мы затем учитываем возможности, представьте, что вам нужно создавать подклассы для каждой комбинации типа возможностей, например HobbitWithRing, HobbitWithSword, HobbitWithRingAndSword и т. Д. Это не очень практично и, конечно, не поддается управлению, когда мы учитываем растущее число разных способностей.

Паттерн Decorator не привязан к объектам, а скорее фокусируется на проблеме расширения их функциональности.
Вместо того, чтобы полагаться только на прототипное наследование, мы работаем с одним базовым объектом и постепенно добавляем объекты декоратора, которые предоставляют дополнительные возможности. Идея состоит в том, что вместо подклассификации мы добавляем (декорируем) свойства или методы к базовому объекту, чтобы он был немного более упорядочен.

Добавление новых атрибутов к объектам в JavaScript - очень простой процесс, поэтому, имея в виду это, очень простой декоратор может быть реализован следующим образом:

```
// A vehicle constructor
function Vehicle( vehicleType ){

    // some sane defaults
    this.vehicleType = vehicleType || "car";
    this.model = "default";
    this.license = "00000-000";

}

// Test instance for a basic vehicle
var testInstance = new Vehicle( "car" );
console.log( testInstance );

// Outputs:
// vehicle: car, model:default, license: 00000-000

// Lets create a new instance of vehicle, to be decorated
var truck = new Vehicle( "truck" );

// New functionality we're decorating vehicle with
truck.setModel = function( modelName ){
    this.model = modelName;
};

truck.setColor = function( color ){
    this.color = color;
};

// Test the value setters and value assignment works correctly
truck.setModel( "CAT" );
truck.setColor( "blue" );

console.log( truck );

// Outputs:
// vehicle:truck, model:CAT, color: blue

// Demonstrate "vehicle" is still unaltered
var secondInstance = new Vehicle( "car" );
console.log( secondInstance );

// Outputs:
// vehicle: car, model:default, license: 00000-000
```

Этот тип упрощенной реализации является функциональным, но на самом деле он не демонстрирует всех преимуществ, которые предлагает Decorators.

```
// The constructor to decorate
function MacBook() {

  this.cost = function () { return 997; };
  this.screenSize = function () { return 11.6; };

}

// Decorator 1
function memory( macbook ) {

  var v = macbook.cost();
  macbook.cost = function() {
    return v + 75;
  };

}

// Decorator 2
function engraving( macbook ){

  var v = macbook.cost();
  macbook.cost = function(){
    return v + 200;
  };

}

// Decorator 3
function insurance( macbook ){

  var v = macbook.cost();
  macbook.cost = function(){
     return v + 250;
  };

}

var mb = new MacBook();
memory( mb );
engraving( mb );
insurance( mb );

// Outputs: 1522
console.log( mb.cost() );

// Outputs: 11.6
console.log( mb.screenSize() );
```

В приведенном выше примере наши декораторы переопределяют функцию .cost() класса MacBook(),
чтобы вернуть текущую цену Macbook и стоимость указанного обновления.

Это считается декорированием, поскольку исходные методы конструктора объектов Macbook,
которые не переопределяются (например, screenSize()), а также любые другие свойства,
которые мы можем определить как часть Macbook, остаются неизменными.

На самом деле в приведенном выше примере нет определенного интерфейса, и мы
перекладываем ответственность за обеспечение соответствия объекта интерфейсу при переходе от создателя к получателю.