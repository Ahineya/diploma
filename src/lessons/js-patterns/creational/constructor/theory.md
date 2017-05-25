Constructor
===========

В классических объектно-ориентированных языках
программирования конструктор - это специальный метод,
используемый для инициализации вновь созданного объекта
после выделения памяти. В JavaScript, поскольку почти
всё являются объектами, нас чаще всего интересуют конструкторы объектов.

Конструкторы объектов используются для создания конкретных типов объектов -
включая подготовку объекта к использованию и принятие аргументов,
которые конструктор
может использовать для установки значений свойств и методов членов
при первом создании объекта.


JavaScript не поддерживает концепцию классов, но он поддерживает
специальные функции конструктора, которые работают с объектами.
Просто вызвав функцию-конструктор с ключевым словом «new», мы можем сказать JavaScript, что мы хотели бы, чтобы функция вела себя как конструктор и создавала экземпляр нового объекта с элементами, определенными этой функцией.

Внутри конструктора ключевое слово this ссылается на создаваемый новый объект. Базовый конструктор может выглядеть следующим образом:

```
function Car( model, year, miles ) {

  this.model = model;
  this.year = year;
  this.miles = miles;

  this.toString = function () {
    return this.model + " has done " + this.miles + " miles";
  };
}

// Usage:

// We can create new instances of the car
var civic = new Car( "Honda Civic", 2009, 20000 );
var mondeo = new Car( "Ford Mondeo", 2010, 5000 );

// and then open our browser console to view the
// output of the toString() method being called on
// these objects
console.log( civic.toString() );
console.log( mondeo.toString() );
```

Выше - простая версия шаблона конструктора, но у нее есть некоторые проблемы. Во-первых, это затрудняет наследование, а второе заключается в том, что функции, такие как toString (), переопределяются для каждого из новых объектов, созданных с помощью конструктора Car. Это не очень оптимально, так как в идеале функция должна использоваться всеми экземплярами типа Car.


Конструкторы с прототипами
--------------------------
Функции, как почти все объекты в JavaScript, содержат «прототип» объекта. Когда мы вызываем конструктор JavaScript для создания объекта, все свойства прототипа конструктора становятся доступными для нового объекта. Таким образом могут быть созданы несколько объектов Car, которые обращаются к одному и тому же прототипу. Таким образом, мы можем расширить исходный пример следующим образом:

```
function Car( model, year, miles ) {

  this.model = model;
  this.year = year;
  this.miles = miles;

}


// Note here that we are using Object.prototype.newMethod rather than
// Object.prototype so as to avoid redefining the prototype object
Car.prototype.toString = function () {
  return this.model + " has done " + this.miles + " miles";
};

// Usage:

var civic = new Car( "Honda Civic", 2009, 20000 );
var mondeo = new Car( "Ford Mondeo", 2010, 5000 );

console.log( civic.toString() );
console.log( mondeo.toString() );
```

Теперь один экземпляр toString() теперь будет использоваться всеми объектами Car.