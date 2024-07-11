---
title: Java8的中的Optional取代null
category:
  - Java

tags:
  - JDK8
  - Optional

order: 1
head:
  - - meta
    - name: keywords
      content: jdk8 Optional
---

### 一、前言

做为一个Java开发者，几乎都被一个异常所折磨过--NullPointerException(NPE)，而吸取Haskell和Scala的灵感，Java8中引入另一个新的类`java.util.Optional<T>`。Java 8中的Optional是一个可以包含或不可以包含非空值的容器对象，在Stream API中很多地方也都使用到了Optional。我们距离来看看增加这类之后，我们的代码有什么改进，为什么推荐用这个类去做null检测呢？

现有场景，一个用户在阅读一本书，并且要花钱买这本书来看。我们会很容易得写出这样的代码：

```java
public Object getReadBook(Person person) {
  Book book = person.getReadBook();
}
```
<!-- more -->
此时person可能为空，一般person是查库或者从其他方法传递过来的，如果person不存在，那么getReadBook()方法就会报错NPE。那么我们改进一下。

```java
public Object getReadBook(Person person) {
  if (person == null) {
    return "This person does not exist."
  }
  //获取该人的可读书籍
  Book book = person.getReadBook();
  //查询书籍信息，如果book.getBookInfo();
  //这里依然存在NPE的问题,所以继续判断
  if (book == null) {
    return "This book does not exist."
  }
  BookDetail info = book.getBookInfo();
  if (info == null) {
    return "This bookInfo does not exist."
  }
  String bookName = info.getBookName();
}
```

如果对象嵌套，或者一个方法中操作多个对象的话，就要不停地if判断空值问题，方法爆炸不说，维护性也差，代码也不优雅。

### 二、初识Optional

Optional类只是对类的简单封装，变量不存在的时候，null值会被创建成一个“空”的Optional对象，并且用Optional.empty()返回。
使用Optional语义还会增强代码可读性，比如上述代码`Optional<Person>`这样就直接告诉了他人person类是可以为缺失的。我们用Optional重写上面的示例。

```java
class Person {
  public Optional<Book> getReadBook(){};
}
class Book {
 public Optional<BookDetail> getBookInfo(){};
}
class BookDetail {
  private String bookName;
  private String getBookName();
}
```

利用Optional就非常清晰的表达了模型中person可能会有book也可能缺失的情况。不过我们要知道的是，引入Optional不是为了要消除每一个null引用，它的目的是为了让我们能设计出更健壮的代码。

### 三、如何使用Optional

#### 1. 创建Optional对象

1.1 声明空的Optional对象

```java
Optional<Person> optPerson = Optional.empty();
```

1.2 创建非空Optional对象

```java
//如果person为null依然会抛出异常
Optional<Person> optPerson = Optional.of(person);
```

1.3 创建任意值的Optional对象

```java
Optional<Person> optPerson = Optional.ofNullable(person);
```

这个方式其实就是上面二者的结合，不过你应该也猜到了，既然第三种创建了一个可以为空的对象，那我使用的时候不是还要对其进行判断吗？是的，Optional提供了get()方法来获取Optional包装的类，但是如果包装的类还是空，依然还会抛出异常。比如：

```java
Person person = null;
Optional<Person> optionalPerson = Optional.ofNullable(person);
optionalPerson.get().getName();//依然会爆出异常，只不过异常是：java.util.NoSuchElementException: No value present
```

接下来，我们来学习一下如何对Optional进行操作。

#### 2. 使用Map从Optional中获取值以及转换值

对于上面的例子，我们要从一个对象中解析熟悉是很常见的操作。那么就要对操作对象进行判空处理，比如：

```java
//老代码
BookDetail info = book.getBookInfo();
if (info == null) {
  return "This bookInfo does not exist."
}
String bookName = info.getBookName();

//现在改写，多种改法
//第一种，Book类没有变，还是普通类
Optional<BookDetail> bookInfo = Optional.ofNullable(book.getBookInfo());
Optional<String> optionalBookName = bookInfo.map(BookDetail::getBookName);

//第二种，对Book类进行Optional包装
public class Book {
    public Optional<BookDetail> getBookInfo() {
        return Optional.of(new BookDetail());
    }
}
//然后调用
Optional<BookDetail> bookInfo = book.getBookInfo();
Optional<String> optionalBookName = bookInfo.map(BookDetail::getBookName);
```

**可以把Optional对象看成一种特殊的集合，它最多包含一个元素，如果Optional包含一个值，那么函数将该值传递给map进行转换，并应用到 `Optional` 中的值上，返回一个新的 `Optional` 对象。**

> 比如Optional.of("abc"), 则Optional包含了一个值“abc”字符串，然后Optional.of("123").map(String::toUpperCase);把"abc"当做参数传递给map进行转换，
> 最后得到的返回值是一个新的`Option<String>`对象，对象的值是map函数计算后的结果ABC

那么，我们会用map怎么改写之前的代码呢？

```java
//用户类
public class Person {
  public Book getReadBook(){
      return new Book();
  };
}
//图书类
public class Book {
  public BookDetail getBookInfo() {
      return null;
  }
}
//书籍详情类
public class BookDetail {
  private String bookName;
  BookDetail() {
      this.bookName = "The Story";
  }
}
//还记得在【前言】中，我们一顿if判断空，防止出现问题，现在学会了Optional和map的用法
Person person = new Person();
Optional<String> bookName = Optional.of(person)
        .map(Person::getReadBook)
        .map(Book::getBookInfo)
        .map(BookDetail::getBookName);
```

我们仅需要这样链路下去，就可以得到bookName，当然对于上面代码Book我强制返回了null，而这个代码并不会包空指针异常，而是会返回一个Optional.empty空对象，是不是很方便的消除了null的隐患。
当然有人会问，对于【二、初识Optional】中给的代码示例，所有的类都是已经在获取的时候进行了包装，那么用上面的方式是不是也可以。

```java
public class Person {
    public Optional<Book> getReadBook(){
        return Optional.of(new Book());
    };
}
public class Book {
    public Optional<BookDetail> getBookInfo() {
        return Optional.of(new BookDetail());
    }
}
class BookDetail {
  private String bookName;
  private String getBookName();
}
//调用
Person person = new Person();
Optional<String> bookName = Optional.of(person)
        .map(Person::getReadBook)
        .map(Book::getBookInfo)
        .map(BookDetail::getBookName);
```

很抱歉，这段代码编译失败,代码会直接报红，这是因为Optional.of(person)创建了一个Optional的变量，
调用了map方法`getReadBook`获得的是一个`Optional<Book>`类型的对象， 而第二个map相当于操作的是一个`Optional<Optional<Book>>`的类型。
这也是上述所说使用map会生成一个新的optional对象，并包含转换后的值。那怎么解决呢？

#### 3. 使用flatMap链式获取Optional中的值

上述代码改写成这样，就可以通过编译并且成功运行了。`flatMap` 方法也用于对 `Optional` 中的值进行转换，但是不同于map的是，flatMap最终返回一个合并或者扁平化的一个单一的Optional对象。

```java
Person person = new Person();
Optional<String> bookName = Optional.of(person)
        .flatMap(Person::getReadBook)
        .flatMap(Book::getBookInfo)
        .map(BookDetail::getBookName);
```

对于map和flatMap有了简单了解之后，是不是还有点晕，不知道什么时候用什么？

总结：

- 如果是返回的非Optional类型的值，且不涉及嵌套的话，用map
- 如果是返回Optional类型的值，且有多重嵌套的，使用flatMap













