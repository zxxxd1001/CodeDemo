package testVolatileAndSynchronized;

/**
 * 实现同步工作
 */
public class TestJoin {
    public static void main(String[] args) {
        testJoin();
    }
    private static void testJoin(){
        Thread b=new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("B启动");
                try {
                    Thread.sleep(3000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("B结束");
            }
        });
        Thread a=new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("A启动需要等待B线程执行数据");
                try {
                    b.join();
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("A结束");
            }
        });

        Thread c=new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("C启动需要等待A执行数据");
                try {
                    a.join();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("C结束");
            }
        });
        Thread e=new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("E启动");
                System.out.println("E结束");
            }
        });
        Thread d=new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("D启动需要等待A、E执行数据");
                try {
                    a.join();
                    e.join();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("D结束");
            }
        });
        a.start();
        b.start();
        c.start();
        d.start();
        e.start();
    }
}
