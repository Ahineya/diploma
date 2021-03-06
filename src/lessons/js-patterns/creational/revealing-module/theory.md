Revealing Module
================

Раскрывающего модуль был создан,
когда Кристиан Хайльманн был разочарован тем фактом, что ему пришлось
повторять имя основного объекта, когда мы хотели вызвать один публичный
метод из другого или получить доступ к общедоступным переменным.
Ему также не нравилось требование паттерна "модуль", связанное с необходимостью
переключаться на литералную нотацию для тех вещей,
которые он хотел сделать публичными.

Результатом его усилий стал обновленный шаблон, в котором мы просто
определяем все наши функции и переменные в частной области и возвращаем
анонимный объект с указателями на частные функции, которые мы хотели бы
раскрыть как общедоступные.

Пример использования шаблона раскрывающегося модуля приведен ниже:

```
var myRevealingModule = (function () {

        var privateVar = "Ben Cherry",
            publicVar = "Hey there!";

        function privateFunction() {
            console.log( "Name:" + privateVar );
        }

        function publicSetName( strName ) {
            privateVar = strName;
        }

        function publicGetName() {
            privateFunction();
        }


        // Reveal public pointers to
        // private functions and properties

        return {
            setName: publicSetName,
            greeting: publicVar,
            getName: publicGetName
        };

    })();

myRevealingModule.setName( "Paul Kinlan" );
```

Преимущества
------------

Этот шаблон предоставляет более согласованный синтаксис наших скриптов.
Он также делает более понятным, какие из наших функций
и переменных могут быть доступны публично, что облегчает чтение.

Недостатки
----------

Недостатком этого шаблона является то, что если приватная функция ссылается на публичную функцию,
эта публичная функция не может быть переопределена, если требуется патч.
Это связано с тем, что приватная функция будет продолжать ссылаться на приватную реализацию,
а паттерн не распространяется на общедоступные члены, а только на функции.

Члены публичного объекта, которые ссылаются на частные переменные, также не могут быть переопределены.

В результате этого модули, созданные с помощью шаблона раскрытия модуля,
могут быть более хрупкими, чем созданные с использованием исходного шаблона модуля,
поэтому следует проявлять осторожность во время использования.
