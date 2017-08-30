package testJvm;

/**
 * Created by zhangxuedong on 2017/8/30.
 */
public class TestExtends {
    public static void main(String[] args) {
        new TestExtendsB();
    }
}
class TestExtendsA{
    public TestExtendsA() {
        System.out.println("TestExtendsA类构造");
        System.out.println(a);
    }
    private String a="a";
    static {
        System.out.println("TestExtendsA类static静态块");
    }
    {
        System.out.println("TestExtendsA类普通块");
    }
    private String s=getS();
    public static void inser(){
        System.out.println("TestExtendsA类static静态方法");
    }
    public void update(){
        System.out.println("TestExtendsA类普通方法");
    }
    private String getS(){
        System.out.println("TestExtendsA普通成员赋值");
        return "sss";
    }
}
class TestExtendsB extends TestExtendsA {
    private String s=getS();
    public static String ss="213";
    public TestExtendsB() {
        System.out.println("TestExtendsB类构造");
    }

    static {
        System.out.println("TestExtendsB类static静态块");
    }
    {
        System.out.println("TestExtendsB类普通块");
    }
    public static void inser(){
        System.out.println("TestExtendsB类static静态方法");
    }
    public void update(){
        System.out.println("TestExtendsB类普通方法");
    }
    private String getS(){
        System.out.println("TestExtendsB普通成员赋值");
        return "sss";
    }
}

