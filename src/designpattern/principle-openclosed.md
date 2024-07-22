---
title: 1.七大原则-开闭原则
category:
  - 设计模式
  - 开闭原则
head:
  - - meta
    - name: description
      content: 设计模式七大原则之一开闭原则
---
## 七大设计原则之开闭原则

开闭原则（Open-Closed Principle，简称OCP）是面向对象设计中的一个重要原则，由伯兰特·迈耶(Bertrand Meyer)提出。在面向对象编程领域中，这个原则的核心思想是：软件实体（类、模块、函数等）应该对扩展开放，对修改关闭。即用抽象定义结构，用实现扩展细节。

用通俗的话来说，就是当你需要增加新的功能时，应该通过增加新的代码来实现，而不是修改现有的代码。这样做的好处是，现有的代码已经经过测试和验证，如果修改可能会引入新的错误，而通过扩展来增加新功能则可以避免这种风险。

举个例子，假设你有一个课程售卖程序，可以卖语言课和软件课程。现在你想要增加对软件课程打折的功能。根据开闭原则，你应该创建一个新的软件课程打折类，并在课程类中增加对软件课程打折的支持，而不是修改现有的语言课程和软件课程类。

这样做的好处是：

1. **稳定性**：现有的课程类的代码不会被修改，因此不会引入新的错误。
2. **可扩展性**：未来如果需要增加其他课程，只需要创建新的类并扩展课程程序即可，不需要修改现有的代码。

这样可以保持系统的稳定性和可扩展性。 我们来看示例：

### 示例

**1、需求一**

我们有一个需求，课程商城中售卖英语课和设计模式的课程，课程提供一些操作方法，如获得课程id，课程名称和课程价格。我们会先创建一个接口类用于定义课程相关的信息获取方法。

```java
public interface ICourse {
    public Integer getCourseId();
    public String getCourseName();
    public Double getCoursePrice();
}
```

创建英语课程类和设计模式课程类并实现课程公共接口：

```java
public class EnglishCourse implements ICourse{

    private Integer id;
    private String name;
    private Double price;

    public EnglishCourse(Integer id, String name, Double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    @Override
    public Integer getCourseId() {
        return this.id;
    }

    @Override
    public String getCourseName() {
        return this.name;
    }

    @Override
    public Double getCoursePrice() {
        return this.price;
    }
}
```

```java
public class DesignPatternCourse implements ICourse{

    private Integer id;
    private String name;
    private Double price;

    public DesignPatternCourse(Integer id, String name, Double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    @Override
    public Integer getCourseId() {
        return this.id;
    }

    @Override
    public String getCourseName() {
        return this.name;
    }

    @Override
    public Double getCoursePrice() {
        return this.price;
    }
}
```

测试课程输出：

```java
public class DesignPatternCourseTest {
    public static void main(String[] args) {
        ICourse designPatternCourse = new DesignPatternCourse(1, "设计模式课程", 299d);
        ICourse englishCourse = new EnglishCourse(2, "英语速记课程", 199d);

        System.out.println("课程id:" + designPatternCourse.getCourseId()
                + " 课程名称："+ designPatternCourse.getCourseName()
                + " 课程价格："+ designPatternCourse.getCoursePrice());

        System.out.println("课程id:" + englishCourse.getCourseId()
                + " 课程名称："+englishCourse.getCourseName()
                + " 课程价格："+ englishCourse.getCoursePrice());
}
```

很简单的我们就完成了上述需求的实现。

**2、需求二**

赶上了电商大促打折，仅对设计模式课程进行7折销售，并要显示原价。

违背的方式是，在ICourse接口中增加一个获取打折后的方法，这样我们可以想一下，那么英语课不打折是不是也要实现这个方法，如果要有100个课程呢？那么每个都要实现这个非必要的方法，显然不是很好的方式。

依据开闭原则，我们可以对设计模式课程类进行扩展。

```java
public class DesignPatternDiscountCourse extends DesignPatternCourse{

    public DesignPatternDiscountCourse(Integer id, String name, Double price) {
        super(id, name, price);
    }

    @Override
    public Double getCoursePrice() {
        return super.getCoursePrice() * 0.7;
    }

    public Double getOriginalPrice() {
        return super.getCoursePrice();
    }
}
```

我们对设计模式课程扩展一个子类DesignPatternDiscountCourse用于打折促销使用，并且按照需求提供一个获取折扣价和原始价的方法，这样对原始两个类都没有改动。

测试改造后的代码：

```java
public class DesignPatternCourseTest {

    public static void main(String[] args) {
        ICourse iCourse = new DesignPatternDiscountCourse(1, "设计模式课程", 299d);
        //因为用的是父类接口，所以iCourse一定没有子类的getOriginalPrice方法，所以要转成子类才可以
        DesignPatternDiscountCourse designPatternDiscountCourse = (DesignPatternDiscountCourse) iCourse;
        System.out.println("课程id:" + designPatternDiscountCourse.getCourseId()
                + " 课程名称："+designPatternDiscountCourse.getCourseName()
                + " 课程原价价格："+ designPatternDiscountCourse.getOriginalPrice()
                + " 课程折后价格："+ designPatternDiscountCourse.getCoursePrice());
    }
}
```

开闭原则也可以理解为面相抽象编程。