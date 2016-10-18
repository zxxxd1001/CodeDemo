package note.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Java中提供了四种元注解，专门负责注解其他的注解，分别如下
 *  1.@Retention元注解，表示需要在什么级别保存该注释信息（生命周期）。
 *  可选的RetentionPoicy参数包括：
 *      RetentionPolicy.SOURCE: 停留在java源文件，编译器被丢掉
 *      RetentionPolicy.CLASS：停留在class文件中，但会被VM丢弃（默认）
 *      RetentionPolicy.RUNTIME：内存中的字节码，VM将在运行时也保留注解，因此可以通过反射机制读取注解的信息
 * 注解的保留策略是指，注解是只保留在源代码上，还是保留到class文件上，再或者是类在运行时，可以被类加载器加载到内存中。
 * 如果希望注解被反射，那么注解就要保留到运行时，而不是源代码或类文件上
 *
 *
 *  2.@Target元注解，默认值为任何元素，表示该注解用于什么地方。
 *  可用的ElementType参数包括
 *      ElementType.CONSTRUCTOR: 构造器声明
 *      ElementType.FIELD: 成员变量、对象、属性（包括enum实例）
 *      ElementType.LOCAL_VARIABLE: 局部变量声明
 *      ElementType.METHOD: 方法声明
 *      ElementType.PACKAGE: 包声明
 *      ElementType.PARAMETER: 参数声明
 *      ElementType.TYPE: 类、接口（包括注解类型)或enum声明
 *
 *  3.@Documented将注解包含在JavaDoc中
 *
 *  4.@Inheried允许子类继承父类中的注解
 *
 * @author 张雪冬
 * @date 2016/10/18 19:38
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD,ElementType.TYPE})//使用注解时，在给数组属性赋值时的格式：@MyAnn({1,2,3}) || @MyAnn(arr={1,2,3})
@interface MyAnn {
    //注解的属性类型只能是：基本类型、String、Enum、Class、注解类型、以上类型的一维数组类型；
    String color();
    String value() default "我是张雪冬"; //在使用注解时就可以不给带有默认值的属性赋值了。但没有给出默认值的属性还是要赋值的
    int[] array() default {1, 2, 3};//为属性提供默认值,这里不能使用new int[]{1,2,3}
    Gender gender() default Gender.MAN; //添加一个枚举
    MetaAnnotation metaAnnotation() default @MetaAnnotation(birthday="我的出身日期为1995-01-10");
}
