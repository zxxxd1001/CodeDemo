package testJava8Interface;

/**
 * Created by zhangxuedong on 2017/4/11.
 */
public class TestInterfaceImpl implements TestInterface,TestMultipleInterface{

    @Override
    public void test() {

    }

    /**
     * 由于TestInterface 和 TestMultipleInterface 中 testDefault 方法一样,所以这里必须重写
     * 而静态方法只能通过接口类调用接口中的静态方法，所以对编译器来说是可以区分的
     */
    public void testDefault() {
        System.out.println("TestInterfaceImpl实现多个接口但，默认方法名一样必须重写");
    }
}
