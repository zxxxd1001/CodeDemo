package testVolatileAndSynchronized;

/**
 * Created by zhangxuedong on 2017/8/24.
 */
public class TestWait {
    private static Object o=new Object();
    public static void main(String[] args) {
        testWaitAndNotify();
    }
    private static void testWaitAndNotify(){
        for (int i = 0; i < 2; i++) {
            new Thread(new Runnable() {
                @Override
                public void run() {
                    System.out.println("wait测试");
                    synchronized (o) {
                        try {
                            o.wait();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                    System.out.println("wait阻塞线程执行完成：" + Thread.currentThread().getName());
                }
            }).start();
        }
        new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("notify测试 3m后唤醒阻塞线程");
                try {
                    Thread.sleep(3000);
                    synchronized (o) {
                        //notify唤醒单个线程 notifyAll唤醒所有线程
//                        o.notify();
                        o.notifyAll();
                    }
                    System.out.println("唤醒wait阻塞线程");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }
}
