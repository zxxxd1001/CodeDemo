package testCallableFutureExecutor;

/**
 * run方法与start方法的区别
 */
public class TestRunAndStart {
    public static void main(String[] args) {
        new Thread(new Runnable() {
            public void run() {
                System.out.println("线程名字:"+Thread.currentThread().getName());
            }
        }).start();
        new Thread(new Runnable() {
            public void run() {
                System.out.println("线程名字;"+Thread.currentThread().getName());
            }
        }).run();
    }
}
