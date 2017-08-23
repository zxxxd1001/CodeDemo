package testBlockingQueue;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.SynchronousQueue;

public class TestSynchronousQueue{
    public static void main(String[] args) {
        /*
         *   队列内部仅允许容纳一个元素。
         * 当一个线程插入一个元素后会被阻塞，除非这个元素被另一个线程消费。
         */
        testSynchronous();
    }
    private static void testSynchronous(){
        BlockingQueue b=new SynchronousQueue();
        Thread a=new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("a线程启动");
                try {
                    for (int i=0;i<5;i++) {
                        b.put("插入第："+i);
                        Thread.sleep(1000);
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        Thread c=new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("c线程启动");
                try {
                    while(true) {
                        System.out.println(b.take());
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        c.start();
        a.start();
    }
}
