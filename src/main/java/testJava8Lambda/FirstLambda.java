package testJava8Lambda;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by zhangxuedong on 2017/11/21.
 * 第一次使用java8的lambda特性
 * Java 8也添加了一个包，叫做 java.util.function。它包含了很多类，用来支持Java的函数式编程。
 */
public class FirstLambda {
    public static void main(String[] args) {
        new Thread(new Runnable() {
            public void run() {
                System.out.println(Thread.currentThread());
            }
        }).start();
        new Thread(() -> System.out.println(Thread.currentThread())).start();
        new Thread(() -> {
            System.out.println("{lambda");
            System.out.println("lambda1}");
        }).start();
        List list = Arrays.asList("1", "2", "3");
        list.forEach(str -> {
            System.out.println(str);
        });
        //-----------------::是什么鬼--------------------
        List l = new ArrayList();
        l.add("1");
        l.add("2");
        l.forEach(System.out::println);
        //----------------------------------------------
        List s = new ArrayList();
        s.add("1");
        s.add("2");
        s.forEach(item -> {
            System.out.println(item);
        });
    }
}
