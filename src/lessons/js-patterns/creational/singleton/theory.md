Singleton
=========

Шаблон Singleton известен, потому что он ограничивает экземпляр класса до
одного объекта. Классически шаблон Singleton может быть реализован путем создания класса с методом,
который создает новый экземпляр класса, если он не существует.
Если экземпляр уже существует, он просто возвращает ссылку на этот объект.

Синглтоны отличаются от статических классов (или объектов),
поскольку мы можем отложить их инициализацию, как правило, потому,
что они требуют некоторой информации, которая может быть недоступна во время инициализации.

В JavaScript Синглтоны служат пространством имен общих ресурсов,
которые изолируют код реализации от глобального пространства имен, чтобы обеспечить единую точку доступа для функций.

Мы можем реализовать синглтон следующим образом:

```
var mySingleton = (function () {

  // Instance stores a reference to the Singleton
  var instance;

  function init() {

    // Singleton

    // Private methods and variables
    function privateMethod(){
        console.log( "I am private" );
    }

    var privateVariable = "Im also private";

    var privateRandomNumber = Math.random();

    return {

      // Public methods and variables
      publicMethod: function () {
        console.log( "The public can see me!" );
      },

      publicProperty: "I am also public",

      getRandomNumber: function() {
        return privateRandomNumber;
      }

    };

  };

  return {

    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {

      if ( !instance ) {
        instance = init();
      }

      return instance;
    }

  };

})();

var myBadSingleton = (function () {

  // Instance stores a reference to the Singleton
  var instance;

  function init() {

    // Singleton

    var privateRandomNumber = Math.random();

    return {

      getRandomNumber: function() {
        return privateRandomNumber;
      }

    };

  };

  return {

    // Always create a new Singleton instance
    getInstance: function () {

      instance = init();

      return instance;
    }

  };

})();


// Usage:

var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log( singleA.getRandomNumber() === singleB.getRandomNumber() ); // true

var badSingleA = myBadSingleton.getInstance();
var badSingleB = myBadSingleton.getInstance();
console.log( badSingleA.getRandomNumber() !== badSingleB.getRandomNumber() ); // true

// Note: as we are working with random numbers, there is a
// mathematical possibility both numbers will be the same,
// however unlikely. The above example should otherwise still
// be valid.
```

Главное в синглтоне -- это глобальный доступ к экземпляру (как правило,
через MySingleton.getInstance ())

В книге GoF (Gang of Four) применимость шаблона Singleton описывается следующим образом:

* Должен быть только один экземпляр класса, и он должен быть доступен для клиентов из общеизвестной точки доступа.
* Единственный экземпляр должен быть расширяемым посредством подклассификации, а клиенты должны иметь возможность использовать расширенный экземпляр, не изменяя его код.