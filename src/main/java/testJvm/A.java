package testJvm;

/**
 * Created by zhangxuedong on 2017/8/30.
 */
public class A {
    public A() {
        System.out.println("A类构造");
    }

    static {
        System.out.println("A类static静态块");
    }
    {
        System.out.println("A类普通块");
    }
    public static void inser(){
        System.out.println("A类static静态方法");
    }
    public void update(){
        System.out.println("A类普通方法");
    }
}
