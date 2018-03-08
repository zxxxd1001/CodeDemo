package testJava8Interface;

public interface TestInterface {

    /**
     * 在jdk8之前，interface之中可以定义变量和方法，
     *   变量必须是public、static、final的
     *   方法必须是public、abstract的
     *
     *
     */
    public static final int I=0;

    void test();

    /**
     * JDK8及以后，允许我们在接口中定义static方法和default方法。
     */
    static void testStatic(){
        System.out.println(I);
        System.out.println("接口的静态方法");
    }

    default void testDefault(){
        System.out.println("接口的默认方法");
    }
}
