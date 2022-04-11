# SOLID之里氏替换原则(LSP)

###### 41911030 谢融

##  一、SOLID简介

SOLID解释为六大设计原则：

+ Single Responsibility Principle：单一职责原则
+ Open Closed Principle：开闭原则
+ Liskov Substitution Principle：里氏替换原则
+ Law of Demeter：迪米特法则
+ Interface Segregation Principle：接口隔离原则
+ Dependence Inversion Principle：依赖倒置原则

把这六个原则的首字母连起来，就是SOLID（稳定的），代表了这六个原则结合使用的好处：建立稳定、灵活的设计。

## 二、LSP定义

> Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it.
>
> 所有引用基类的地方必须能够透明的使用其他子类的对象

## 三、LSP——弥补继承的缺陷

​	里氏替换原则的意思是，所有基类在的地方，都可以换成子类，程序还可以正常运行。这个原则是与面向对象语言的继承特性密切相关的。

​	在学习java类的继承时，我们知道继承有一些优点，即子类拥有父类的所有方法和属性，从而可以减少创建类的工作量；提高了代码的重用性；提高了代码的扩展性，子类不但包括了父类的所有功能，还可以添加自己的功能。

​	但是类的继承同样存在不少缺点。首先，继承是有侵入性的，只要继承，就必须拥有父类的所有属性和方法；其次，继承降低了代码的灵活性，因为继承时，父类会对子类产生约束；最后，继承增强了代码的耦合性，当需要对父类代码进行修改时，必须考虑到对子类产生的影响。

​	为了弥补上述的一些缺陷，则可以引入里氏替换原则。

## 四、LSP——对继承进行约束

里氏替换原则对继承进行了规则上的约束，这种约束主要体现在四个方面：

+ 子类必须实现父类的抽象方法，但不得重写或覆盖父类的非抽象(已实现)的方法
+ 子类中可以增加自己特有的方法
+ 子类覆盖或实现父类的方法时，方法的前置条件要比父类方法的输入参数更宽松，即只能重载不能重写
+ 当子类的方法实现父类的抽象方法时，方法的后置条件要比父类更严格

***

### 下面，我们对四个约束的含义进行详细的阐述。

#### 4.1子类必须实现父类的抽象方法，但不得重写或覆盖父类的非抽象(已实现)的方法

​	在我们做系统设计时，经常会设计接口或抽象类，然后由子类来实现抽象方法，这里使用的其实就是里氏替换原则。若子类不完全对父类的方法进行实例化，那么子类就不能被实例化，那么这个接口或抽象类就毫无存在的意义了。

​	里氏替换原则规定，子类不能覆写父类已实现的方法。父类中已实现的方法其实是一种已定好的规范和契约，如果我们随意的修改了它，那么可能会带来意想不到的错误。下面举例说明一下子类覆写了父类方法带来的后果。

```java
public class Father {
    public void fun(int a, int b) {
        System.out.println(a + "+" + b + "=" + (a + b));
    }
}

public class Son extends Father {
    @Override
    public void fun(int a, int b) {
        System.out.println(a + "-" + b + "=" + (a - b));
    }
}

public class Client {
    public static void main(String[] args) {
        Father father = new Father();
        father.fun(1, 2);

        // 父类存在的地方，可以用子类替代
        // 子类Son替代父类Father
        System.out.println("子类替代父类后的运行结果");
                Son son = new Son();
                son.fun(1, 2);
    }
}
```

运行结果：

```
1+2=3
子类替代父类后的运行结果
1-2=-1
```

​	我们想要的结果是“1+2=3”。可以看到，方法重写后结果就不是了我们想要的结果了，也就是这个程序中子类B不能替代父类A。这违反了里氏替换原则，从而给程序造成了错误。

​	我们可以给父类的非抽象(已实现)方法加final修饰，这样就在语法层面控制了父类非抽象方法被子类重写而违反里氏替换原则。有时候父类有多个子类(Son1、Son2)，但在这些子类中有一个特例(Son2)。要想满足里氏替换原则，又想满足这个子类的功能时，有的伙伴可能会修改父类(Father)的方法。但是，修改了父类的方法又会对其他的子类造成影响，产生更多的错误。这是怎么办呢？我们可以为这个特例(Son2)创建一个新的父类(Father2)，这个新的父类拥有原父类的部分功能(Father2并不继承Father,而是持有Father的一个引用，组合Father,调用Father里的功能)，又有不同的功能。这样既满足了里氏替换原则，又满足了这个特例的需求。

#### 4.2子类中可以增加自己特有的方法

​	子类继承了父类，拥有了父类和方法，同时还可以定义自己有，而父类没有的方法。这是在继承父类方法的基础上进行功能的扩展，符合里氏替换原则。

#### 4.3子类覆盖或实现父类的方法时，方法的前置条件要比父类方法的输入参数更宽松，即只能重载不能重写

```java
public class Father {
    public void fun(HashMap map){
        System.out.println("父类被执行...");
    }
}

public class Son extends Father {
    public void fun(Map map){
        System.out.println("子类被执行...");
    }
}

public class Client {
    public static void main(String[] args) {
        System.out.print("父类的运行结果：");
        Father father=new Father();
        HashMap map=new HashMap();
        father.fun(map);
        
        //父类存在的地方，可以用子类替代
        //子类B替代父类A
        System.out.print("子类替代父类后的运行结果：");
        Son sun=new Son();
        son.fun(map);
    }
}

//运行结果：
//父类的运行结果：父类被执行...
//子类替代父类后的运行结果：父类被执行...
```

​	要注意，子类并非重写了父类的方法，而是重载了父类的方法。因为子类和父类的方法的输入参数是不同的。子类方法的参数Map比父类方法的参数HashMap的范围要大，所以当参数输入为HashMap类型时，只会执行父类的方法，不会执行子类的重载方法。这符合里氏替换原则。下面，将子类方法的参数范围缩小。

```java
public class Father {
    public void fun(Map map){
        System.out.println("父类被执行...");
    }
}

public class Son extends Father {
    public void fun(HashMap map){
        System.out.println("子类被执行...");
    }
}

public class Client {
    public static void main(String[] args) {
        System.out.print("父类的运行结果：");
        Father father=new Father();
        HashMap map=new HashMap();
        father.fun(map);
        
        //父类存在的地方，可以用子类替代
        //子类B替代父类A
        System.out.print("子类替代父类后的运行结果：");
        Son son=new Son();
        son.fun(map);
    }
}

//运行结果：
//父类的运行结果：父类被执行...
//子类替代父类后的运行结果：子类被执行...
```

​	在父类方法没有被重写的情况下，子方法被执行了，这样就引起了程序逻辑的混乱。所以子类中方法的前置条件必须与父类中被覆写的方法的前置条件相同或者更宽松。

#### 4.4当子类的方法实现父类的抽象方法时，方法的后置条件要比父类更严格

```java
public abstract class Father {
    public abstract Map fun();
}

public class Son extends Father {
    @Override
    public HashMap fun() {
        System.out.println("子类被执行...");
        return null;
    }
}

public class Client {
    public static void main(String[] args) {
        Father father=new Son();
        father.fun();
    }
}
```

​	要注意是实现父类的抽象方法，而不是父类的非抽象（已实现）方法，不然就违法了第一条。若在继承时，子类的方法返回值类型范围比父类的方法返回值类型范围大，在子类重写该方法时编译器会报错。

## 五、参考

[六大设计原则(SOLID)](https://www.jianshu.com/p/3268264ae581)

[六大设计原则之里氏替换原则(LSP)](https://www.jianshu.com/p/dfcdcd5d9ece)

