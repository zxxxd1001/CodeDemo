package testJava8Interface;

public class JunitInterface {
    public static void main(String[] args) {
        TestInterface.testStatic();
        TestInterface t=new TestInterfaceImpl();
        t.testDefault();

        TestInterface tt=new TestInterfaceImplTow();
        tt.testDefault();
    }
}
