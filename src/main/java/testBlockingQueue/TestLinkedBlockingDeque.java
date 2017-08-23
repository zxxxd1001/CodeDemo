package testBlockingQueue;

import java.util.concurrent.LinkedBlockingDeque;

/**
 * Created by zhangxuedong on 2017/8/23.
 */
public class TestLinkedBlockingDeque {
    public static void main(String[] args) {
        testLinkedBlockingQueue();
    }
    private static void testLinkedBlockingQueue(){
        LinkedBlockingDeque d=new LinkedBlockingDeque(3);
        Thread t=new Thread(new Runnable() {
            public void run() {
                try {
                    for(int i=0;i<3;i++){
                        for(int y=0;y<5;y++){
                            d.put(i+":"+y);
                        }
                        Thread.sleep(2000);
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        Thread a=new Thread(new Runnable() {
            public void run() {
                try {
                    for(int i=0;i<5;i++){
                        for(int y=0;y<3;y++){
                            System.out.println(d.take());
                        }
                        Thread.sleep(3000);
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        t.start();
        a.start();
    }
}
