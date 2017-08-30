package testJvm;
public class StaticTest {
    static StaticTest st = new StaticTest();
    public static void main(String[] args) {
        staticFunction();
        System.out.println("new对象是初始化，不属于类加载，也就是new对象不会更改静态变量值；");
        NewStaticTest t=new NewStaticTest();
        System.out.println("第一次new："+t.s);//初始值
        t.s="修改后";
        NewStaticTest tt=new NewStaticTest();
        System.out.println("第二次new："+tt.s);//修改后
    }
    static {
        System.out.println("static");//3
    }
    {
        System.out.println("普通块");//1
    }

    public StaticTest() {
        System.out.println("构造");//2
    }
    public static void staticFunction(){
        System.out.println("4");//4
    }

}

class NewStaticTest {
    public static String s="初始值";
}