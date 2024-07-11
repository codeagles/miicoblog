---
title: Java8的Optional API使用
category:
  - Java

tags:
  - JDK8
  - Optional

order: 2
head:
  - - meta
    - name: keywords
      content: jdk8 Optional
---

## 一、前言

上一篇，我们介绍了Optional能做的事情，以及一些API的使用方式，比如创建Optional的三种方式，map和flatMap的区别和使用场景等等，
本文我们来看看如何使用Optional的API。
<!-- more -->
## 二、Optional API

| 方法        | 描述                                                                   |
| ----------- |----------------------------------------------------------------------|
| empty       | 返回一个空的Optional实例                                                     |
| filter      | 如果值存在且满足提供的谓词，就返回包含该值的optional对象，否则返回一个空的optional对象                  |
| flatMap     | 如果值存在，就对该值执行提供的 mapping 函数调用，返回一个 optional 类型的值，否则就返回一个空的 Optional对象 |
| get         | 如果值存在，就将被 optional 封装的值返回，否则拋出一个 NosuchBlementException 异常           |
| ifPresent   | 如果值存在，就执行使用该值的方法调用，否则什么也不做                                           |
| isPresent   | 如果值存在就返回 true，否则返回 false                                      |
| map         | 如果值存在，就对该值执行提供的 mapping 函数调用                                         |
| of          | 将指定值用Optional 封装之后返回，如果该值为 null，则抛出一个 NullPointerException异常         |
| ofNullable  | 将指定值用optional 封装之后返回，如果该值为 null，则返回一个空的Optional 对象                   |
| orElse      | 如果有值则将其返回，否则返回一个默认值                                                  |
| orElseGet   | 如果有值则将其返回，否则返回一个由指定的 Supplier 接口生成的值                                 |
| orElseThrow | 如果有值则将其返回，否则抛出一个由指定的 Supplier 接口生成的异常                                |


## 三、Optional API使用示例
> 示例采用isPresent来判断断言是否成立，isPresent表示如果值存在就返回 true，否则返回 false

## 1. 创建的三种方式
### 1.1 通过empty()方法创建一个空的对象
```java
    @Test
    public void testEmpty() {
        Optional<String> empty = Optional.empty();
        assertFalse(empty.isPresent());
    }
```
###  1.2 通过of创建一个非空Optional对象
对于name为null的情况，依然会抛出空指针异常，第二个title创建正常。
```java
    @Test
    public void testCreateOptionalOf() {
        String name = null;
        Optional<String> empty = Optional.of(name);
        assertTrue(empty.isPresent());

        String title = "The Story";
        Optional<String> titleOpt = Optional.of(title);
        assertTrue(titleOpt.isPresent());
    }
```
###  1.3 通过ofNullable创建任意值Optional对象
```java
    @Test
    public void testCreateOptionalOfNullable() {
        String name = null;
        Optional<String> empty = Optional.ofNullable(name);
        assertFalse(empty.isPresent());
    
        String title = "The Story";
        Optional<String> titleOpt = Optional.ofNullable(title);
        assertTrue(titleOpt.isPresent());
    }
```

## 2. 带有默认值的方法 
### 2.1 通过orElse创建带有默认值的Optional对象
```java
@Test
    public void testCreateOptionalOrElse() {
        String name = "success";
        String empty = Optional.ofNullable(name).orElse("default");
        assertEquals("success", empty);
    }
```
如果存在，则返回“success”，如果name不存在，则给默认值“default”。

###  2.2 通过orElseGet创建带有默认值的Optional对象
```java
@Test
    public void testCreateOptionalOrElseGet() {
        String name = "success";
        String empty = Optional.ofNullable(name).orElseGet(() ->"default");
        assertEquals("success", empty);
    }
```
如果存在，则返回“success”，如果name不存在，则执行 Supplier 接口生成默认值“default”。
那么这二者有什么区别呢？看起来都一样啊。我们来进一步测试

### 2.3 orElseGet与orElse的区别
我们来看一段代码
```java
    @Test
    public void testCreateOptionalDifferent() {
        String name = null;
        String empty = Optional.ofNullable(name).orElse(this.print());
        assertEquals("success", empty);
        //分割作用
        System.out.println("------------------");
        empty = Optional.ofNullable(name).orElseGet(this::print);
        assertEquals("success", empty);
    }

    private String print() {
        System.out.println("it's working......");
        return "success";
    }
    //控制台输出两次
    //it's working......
    //------------------
    //it's working......
```
当name为空的这两个调用都会调用print方法拿回返回值，看起来没有任何问题。那么我们来测试一下如果name不为空的时候：
```java
    @Test
    public void testCreateOptionalDifferent() {
        String name = "success";
        String empty = Optional.ofNullable(name).orElse(this.print());
        assertEquals("success", empty);
        //分割作用
        System.out.println("------------------");
        empty = Optional.ofNullable(name).orElseGet(this::print);
        assertEquals("success", empty);
    }

    private String print() {
        System.out.println("it's working......");
        return "success";
    }
    //控制台输出1次
    //it's working......
    //------------------
```
会看到第二次"it's working"没有打印，那么就说明orElse执行了print方法，而orElseGet没有执行。这就是他们两个重要的区别。
**orElse：不管包装值是否存在，都会执行orElse中的内容**
**orElseGet：如果包装值存在，则不会执行orElseGet的内容，只有缺失的情况下才会执行orElseGet**

### 2.4 通过orElseThrow创建缺失包装值抛出自定义异常
```java
    @Test
    public void testCreateOptionalOrElseThrow() {
        String name = null;
        //如果默认异常，则为java.util.NoSuchElementException: No value present
        String empty = Optional.ofNullable(name).orElseThrow();
        //如果自定义异常，则抛出自定义异常
        empty = Optional.ofNullable(name).orElseThrow(RuntimeException::new);
        assertEquals("success", empty);
    }
```
## 3. 操作Optional
### 3.1  使用get获取Optional对象
```java
    @Test
    public void testCreateOptionalGet() {
        String name = "abc";
        Optional<String> opt = Optional.of(name);
        String optString = opt.get();
        assertEquals("baeldung", optString);
    }
```
get只能在包装对象不为 null 时返回值，否则它会抛出java.util.NoSuchElementException: No value present异常，我们在上一问也提到过。

### 3.2 使用filter进行值过滤
我们业务开发中很常见，比如一个实体有一个状态码，要根据状态码的范围或者几个值来决定执行什么业务逻辑。比如：
```java
    //获取状态
    public boolean getBookStatus(Book book ) {
        boolean pass = false;
        Integer status = book.getStatus();
        if(status != null &&
                status > 1 && status < 4) {
            pass = true;
        }
        return pass;
    }
    //书籍实体
    class Book {
        private Integer status;
        Book () {}
        Book(Integer status) {
            this.status = status;
        }
        public Integer getStatus() {
            return status;
        }
    }
    //测试类
    @Test
    public void testCreateOptionalFilter() {
        assertFalse(getBookStatus(new Book(1))); //false
        assertTrue(getBookStatus(new Book(3))); //true
        assertFalse(getBookStatus(new Book(6))); //false
    }
```
如果后续又增加了status的状态判断，又要写无尽的if判断，或者改写成switch方式判断，那么如果用filter如何改写呢？
```java
public boolean getBookStatusV2(Book book) {
        Integer status = book.getStatus();
        boolean pass = Optional.ofNullable(status)
                .filter(s -> s > 1)
                .filter(s -> s < 4)
                .isPresent();
        return pass;
    }

```
这样是不是优雅了许多，如果存在符合条谓词的条件则返回Optional对象，并利用isPresent来判断是否存在值，存在则返回true，如果不符合谓词条件，则会返回一个空的Optional对象，isPresent判断后为false。

在上一文，我们已经对map和flatMap有一个初步的认识，以及它们间的区别。不过代码示例可能有些绕，我们再来几个简单的示例加深一下这两个方法的使用。
### 3.3 使用map进行值转换
对一个list计算一下元素数量
```java
    @Test
    public void testCreateOptionalMap() {
        List<Integer> list = Arrays.asList(1,2,3,4,5,6,7,8,9);
        Integer size = Optional.ofNullable(list)
                .map(List::size)
                .orElse(0);
        assertEquals(10, size);
    }
```
当然我们还可以filter与map一起使用，比如看list元素是否大于5个，也是一个常用的操作。
```java
    @Test
    public void testCreateOptionalMap() {
        List<Integer> list = Arrays.asList(1,2,3,4,5,6,7,8,9);
        boolean present = Optional.of(list)
                .map(List::size)
                .filter(l -> l > 5)
                .isPresent();
        assertTrue(present);
    }
```

### 3.4 使用flatMap进行值转换
使用flatMap不同之处在于，map 仅在解包时才转换值，而 flatMap 采用已包装的值并在转换之前解包。
就是我们上一文中说的map会出现嵌套`Optional<Optional<String>>`的情况。
```java
@Test
    public void testCreateOptionalFlatMap() {
        Person person = new Person();
        Optional<Person> optionalPerson = Optional.of(person);
        //使用map出现了嵌套Optional对象
        Optional<Optional<Book>> optionalBook = optionalPerson.map(Person::getReadBook);
        //先解包，在去获取包装类，结果依然出现嵌套
        Optional<Optional<BookDetail>> bookDetail = optionalBook.map(Optional::get).map(Book::getBookInfo);
        //先解包，在去获取包装类
        String bookName = bookDetail.map(Optional::get).map(BookDetail::getBookName).orElse("not exist");
        assertEquals("book", bookName);
    }

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
    @Data
    class BookDetail {
        private String bookName;
    }
```
如果使用flatMap则不需要先解包在获取包装值
```java
     @Test
public void testCreateOptionalFlatMap() {
    Person person = new Person();
    Optional<Person> optionalPerson = Optional.of(person);
    String bookName1 = optionalPerson
            .flatMap(Person::getReadBook)
            .flatMap(Book::getBookInfo)
            .map(BookDetail::getBookName)
            .orElse("not exist");
    assertEquals("book", bookName1);

}
```
到此我们所有的API都介绍完了，可以尝试使用一下。
