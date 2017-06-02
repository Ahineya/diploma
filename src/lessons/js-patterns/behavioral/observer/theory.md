Observer
========
Спостерігач - це шаблон проектування, в якому об'єкт (званий суб'єктом) веде список об'єктів, що залежать від нього (спостерігачів), автоматично повідомляючи їх про будь-які зміни стану.

Коли суб'єкт повинен повідомляти спостерігачів про щось цікаве, він передає повідомлення спостерігачам (які можуть включати конкретні дані, які стосуються теми повідомлення).

Коли ми більше не хочемо, щоб конкретний спостерігач повідомлявся про зміни суб'єкта, на якого вони зареєстровані, суб'єкт може видалити їх зі списку спостерігачів.

Часто корисно посилатися на опубліковані визначення шаблонів проектування, які не залежать від мови, щоб отримати більш широке уявлення про їх використання та переваги з плином часу. Визначення шаблону спостерігача, представлене в книзі GoF,
«Design Patterns: Elements of Reusable Object-Oriented Software», є наступним:

"Один або кілька спостерігачів цікавляться станом предмета і реєструють свій інтерес до предмету, приєднуючись до нього. Коли щось змінюється в нашій темі, що може зацікавити спостерігача, надсилається повідомлення-повідомлення, яке викликає метод оновлення в кожному спостерігачі. Коли спостерігача більше не цікавить стан суб'єкта, вони можуть просто відокремити себе."

Теперь мы можем расширить то, что мы узнали, для реализации шаблона Observer со следующими компонентами:

* Subject: ведет список наблюдателей, облегчает добавление или удаление наблюдателей
* Observer: предоставляет интерфейс обновления для объектов, которые должны быть уведомлены об изменениях состояния объекта
* ConcreteSubject: отправляет уведомления наблюдателям об изменениях состояния, сохраняет состояние ConcreteObservers
* ConcreteObserver: хранит ссылку на ConcreteSubject, реализует интерфейс обновления для наблюдателя, чтобы гарантировать соответствие состояния объекта Subject

Во-первых, давайте смоделируем список зависимых наблюдателей, которые субъект может иметь:

```
function ObserverList(){
  this.observerList = [];
}

ObserverList.prototype.add = function( obj ){
  return this.observerList.push( obj );
};

ObserverList.prototype.count = function(){
  return this.observerList.length;
};

ObserverList.prototype.get = function( index ){
  if( index > -1 && index < this.observerList.length ){
    return this.observerList[ index ];
  }
};

ObserverList.prototype.indexOf = function( obj, startIndex ){
  var i = startIndex;

  while( i < this.observerList.length ){
    if( this.observerList[i] === obj ){
      return i;
    }
    i++;
  }

  return -1;
};

ObserverList.prototype.removeAt = function( index ){
  this.observerList.splice( index, 1 );
};
```

Далее давайте смоделируем тему и возможность добавлять, удалять или уведомлять наблюдателей в списке.

```
function Subject(){
  this.observers = new ObserverList();
}

Subject.prototype.addObserver = function( observer ){
  this.observers.add( observer );
};

Subject.prototype.removeObserver = function( observer ){
  this.observers.removeAt( this.observers.indexOf( observer, 0 ) );
};

Subject.prototype.notify = function( context ){
  var observerCount = this.observers.count();
  for(var i=0; i < observerCount; i++){
    this.observers.get(i).update( context );
  }
};
```

Затем мы определяем скелет для создания новых наблюдателей. Функция обновления здесь будет перезаписана позже с собственным поведением.

```
// The Observer
function Observer(){
  this.update = function(){
    // ...
  };
}
```

В нашем примере приложения, использующего вышеупомянутые компоненты Observer, мы теперь определяем:

* Кнопка добавления новых заметных флажков на страницу
* Флажок элемента управления, который будет действовать как тема, уведомляя другие флажки, они должны быть проверены
* Добавляется контейнер для добавления новых флажков
Затем мы определяем обработчики ConcreteSubject и ConcreteObserver для добавления
новых наблюдателей на страницу и реализации интерфейса обновления.


