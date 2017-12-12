package testJava8Lambda;

import java.lang.reflect.Array;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by zhangxuedong on 2017/11/21.
 * 第一次使用java8的lambda特性
 * Java 8也添加了一个包，叫做 java.util.function。它包含了很多类，用来支持Java的函数式编程。
 * Runnable 被定义了@FunctionalInterface
 * Predicate<T>——接收T对象并返回boolean
 * Consumer<T>——接收T对象，不返回值
 * Function<T, R>——接收T对象，返回R对象
 * Supplier<T>——提供T对象（例如工厂），不接收值
 * UnaryOperator<T>——接收T对象，返回T对象
 * BinaryOperator<T>——接收两个T对象，返回T对象
 * IntSupplier，LongBinaryOperator——原始类型（Primitive type）的特化（Specialization）函数式接口
 * BiFunction<T, U, R>——接收T对象和U对象，返回R对象
 *
 *lambda表达式有个限制，那就是只能引用 final 或 final 局部变量，这就是说不能在lambda内部修改定义在域外的变量。
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
//        List l = new ArrayList();
//        l.add("1");
//        l.add("2");
//        l.forEach(System.out::println);
        //----------------------------------------------
        List s = new ArrayList();
        s.add("1");
        s.add("2");
        s.forEach(item -> {
//            System.out.println(item);
        });
        testMap();
    }

    private static void testMap(){
        // 不使用lambda表达式为每个订单加上12%的税
        List<Integer> costBeforeTax = Arrays.asList(100, 200, 300, 400, 500);
        for (Integer cost : costBeforeTax) {
            double price = cost + .12*cost;
            System.out.println(price);
        }
        System.out.println();
        // 使用lambda表达式
        costBeforeTax = Arrays.asList(100, 200, 300, 400, 500);
        costBeforeTax.stream().map((cost) -> cost + .12*cost).forEach(System.out::println);

        //流提供了一个 filter() 方法，接受一个 Predicate 对象，即可以传入一个lambda表达式作为过滤逻辑。
        //下面的例子是用lambda表达式过滤Java集合，将帮助理解
        //另外，关于 filter() 方法有个常见误解。在现实生活中，做过滤的时候，通常会丢弃部分，
        //但使用filter()方法则是获得一个新的列表，且其每个元素符合过滤原则。
        List<String> strList= Arrays.asList("12","123","4444","1234");
        List<String> filtered = strList.stream().filter(x -> x.length()> 2).collect(Collectors.toList());
        System.out.printf("Original List : %s, filtered list : %s %n", strList, filtered);

        // 将字符串换成大写并用逗号链接起来
        List<String> G7 = Arrays.asList("USA", "Japan", "France", "Germany", "Italy", "U.K.","Canada");
        String G7Countries = G7.stream().map(x -> x.toUpperCase()).collect(Collectors.joining(", "));
        System.out.println(G7Countries);

        //本例展示了如何利用流的 distinct() 方法来对集合进行去重。
        List<Integer> numbers = Arrays.asList(9, 10, 3, 4, 7, 3, 4);
        List<Integer> distinct = numbers.stream().map( i -> i*i).distinct().collect(Collectors.toList());
        System.out.printf("Original List : %s,  Square Without duplicates : %s %n", numbers, distinct);

        //获取数字的个数、最小值、最大值、总和以及平均值
        //IntStream、LongStream 和 DoubleStream 等流的类中，有个非常有用的方法叫做 summaryStatistics()。
        //可以返回 IntSummaryStatistics、LongSummaryStatistics 或者 DoubleSummaryStatistic s，描述流中元素的各种摘要数据。
        //在本例中，我们用这个方法来计算列表的最大值和最小值。它也有 getSum() 和 getAverage() 方法来获得列表的所有元素的总和及平均值。
        List<Integer> primes = Arrays.asList(2, 3, 5, 7, 11, 13, 17, 19, 23, 29);
        IntSummaryStatistics stats = primes.stream().mapToInt((x) -> x).summaryStatistics();
        System.out.println("Highest prime number in List : " + stats.getMax());
        System.out.println("Lowest prime number in List : " + stats.getMin());
        System.out.println("Sum of all prime numbers : " + stats.getSum());
        System.out.println("Average of all prime numbers : " + stats.getAverage());
    }
}
