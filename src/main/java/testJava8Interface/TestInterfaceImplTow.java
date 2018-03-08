package testJava8Interface;

public class TestInterfaceImplTow implements TestInterface{

    @Override
    public void test() {

    }

    public void testDefault(){
        System.out.println("TestInterfaceImplTow重写的testDefault方法");
    }
}
