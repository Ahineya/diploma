Factory
=======

Паттерн "Фабрика" является еще одним порождающим паттерном, связанным с понятием создания объектов. Он отличается от других шаблонов в своей категории тем, что он не требует от нас явного использования конструктора. Вместо этого Factory может предоставить общий интерфейс для создания объектов, где мы можем указать тип фабричного объекта, который мы хотим создать.

Представьте, что у нас есть фабрика пользовательского интерфейса, где нас
попросят создать компонент пользовательского интерфейса. Вместо создания
этого компонента напрямую с помощью оператора "new" или с помощью другого
порождающего паттерна, мы вместо этого запрашиваем объект Factory для нового
компонента. Мы сообщим Фабрике, какой тип объекта требуется
(например, «Кнопка», «Панель»), и он создает экземпляр этого объекта,
возвращая его нам для использования.

Это особенно полезно, если процесс создания объекта является относительно сложным, например,
если он сильно зависит от динамических факторов или конфигурации приложения.

Примеры этого шаблона можно найти в библиотеках пользовательского интерфейса, таких как ExtJS, где методы для создания объектов или компонентов могут быть дополнительно подклассифицированы.

Ниже приведен пример, который основывается на наших предыдущих описаниях, используя логику шаблона Constructor для определения автомобилей. Он демонстрирует, как фабрика автомобилей может быть реализована с использованием шаблона Factory:

```
// A constructor for defining new cars
function Car( options ) {

  // some defaults
  this.doors = options.doors || 4;
  this.state = options.state || "brand new";
  this.color = options.color || "silver";

}

// A constructor for defining new trucks
function Truck( options){

  this.state = options.state || "used";
  this.wheelSize = options.wheelSize || "large";
  this.color = options.color || "blue";
}


// FactoryExample.js

// Define a skeleton vehicle factory
function VehicleFactory() {}

// Define the prototypes and utilities for this factory

// Our default vehicleClass is Car
VehicleFactory.prototype.vehicleClass = Car;

// Our Factory method for creating new Vehicle instances
VehicleFactory.prototype.createVehicle = function ( options ) {

  switch(options.vehicleType){
    case "car":
      this.vehicleClass = Car;
      break;
    case "truck":
      this.vehicleClass = Truck;
      break;
    //defaults to VehicleFactory.prototype.vehicleClass (Car)
  }

  return new this.vehicleClass( options );

};

// Create an instance of our factory that makes cars
var carFactory = new VehicleFactory();
var car = carFactory.createVehicle( {
            vehicleType: "car",
            color: "yellow",
            doors: 6 } );

// Test to confirm our car was created using the vehicleClass/prototype Car

// Outputs: true
console.log( car instanceof Car );

// Outputs: Car object of color "yellow", doors: 6 in a "brand new" state
console.log( car );
```

Когда стоит использовать паттерн "фабрика"?
-------------------------------------------


Шаблон Factory может быть особенно полезен при применении к следующим ситуациям:

* Когда инициализация объекта или компонента связана с высокой степенью сложности
* Когда нам нужно легко создавать разные экземпляры объектов в зависимости от среды, в которой мы находимся
* Когда мы работаем со множеством небольших объектов или компонентов, которые имеют одинаковые свойства
* При компоновке объектов с экземплярами других объектов, которые должны удовлетворять только контракту API (утиная типизация) для работы. Это полезно для обеспечения слабой связанности.

Когда не стоит использовать паттерн "фабрика"?
--------------------------------------------------------------
Когда применяется к неправильному типу проблемы, этот шаблон может ввести
излишне большую сложность в приложение. Если предоставление интерфейса для
создания объектов не является целью для библиотеки или фреймворка,
который мы пишем, стоит придерживаться явных конструкторов,
чтобы избежать ненужных издержек.

В связи с тем, что процесс создания объекта эффективно абстрагируется
за интерфейсом, это также может создавать проблемы с модульным
тестированием.
