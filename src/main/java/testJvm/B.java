package testJvm;

/**
 * Created by zhangxuedong on 2017/8/30.
 */
public class B{
    public B() {
        System.out.println("B类构造");
    }

    static {
        System.out.println("B类static静态块");
    }
    public static void inser(){
        System.out.println("B类static静态方法");
    }
    public void update(){
        System.out.println("B类普通方法");
    }
    {
        System.out.println("B类普通块");
    }
}
