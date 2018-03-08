package testJava8Interface;

public interface TestMultipleInterface {
    static void testStatic(){
        System.out.println("TestMultipleInterface接口的静态方法");
    }

    default void testDefault(){
        System.out.println("接口的默认方法");
    }
}
