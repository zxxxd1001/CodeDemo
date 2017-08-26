package testVolatileAndSynchronized;

/**
 * Created by zhangxuedong on 2017/8/24.
 */
public class TestSynchronized {
    private static int number=20;
    private volatile static boolean flag=true;
    private final static Object o=new Object();
    private static void inc(String s) {
        synchronized (o) {
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            if (number>0) {
                number--;
                System.out.println(s + "拿了一个豆子 ：剩余" + number);
            }else{
                System.out.println("没豆子了");
                flag=false;
            }
        }
    }
    private static void testSynchronized(){
        new Thread(new Runnable() {
            @Override
            public void run() {
                while (flag){
                    inc(Thread.currentThread().getName());
                }
            }
        }).start();
        new Thread(new Runnable() {
            @Override
            public void run() {
                while (flag){
                    inc(Thread.currentThread().getName());
                }
            }
        }).start();
    }
    public static void main(String[] args) {
        testSynchronized();
    }
}
