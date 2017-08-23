package testBlockingQueue;

import java.util.Queue;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

/**
 * Created by zhangxuedong on 2017/8/23.
 */
public class TestArrayOrLinkedBlockingQueue {
    public static void main(String[] args) {
        testArrayBlockingQueue();
        try {
            Thread.sleep(3000);
            System.out.println();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("非并发 线程调用是不确定的 都要等待cpu分配时间");
        //先进先出
        testQueue();
        System.out.println();
        testLinked();
    }
    private static void testArrayBlockingQueue(){
        //ArrayBlockingQueue 是一个有界的阻塞队列，其内部实现是将对象放到一个object数组里
        //内部以 先进先出 的顺序对元素进行存储
        BlockingQueue<String> b = new ArrayBlockingQueue<String>(15);
        Thread a = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("a执行了");
                try {
                    for (int i = 0; i < 10; i++) {
                        b.put("第：" + i);
                    }
                } catch (InterruptedException e) {
                    System.out.println("a错误");
                }
            }
        });
        Thread c = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    System.out.println("c执行了");
                    do {
                        System.out.println("blockingQueue阻塞队列  队列为空取元素，队列满了插入元素");
                        System.out.println(b.take());
                    }while (!b.isEmpty());
                } catch (InterruptedException e) {
                    System.out.println("c错误");
                }
            }
        });
        c.start();
        a.start();
    }
    private static void testQueue(){
        Queue<String> q=new ArrayBlockingQueue(100);
        q.add("a");
        q.add("b");
        q.add("c");
        q.add("d");
        System.out.println(q.peek());
        for(String str:q){
            System.out.println(str);
        }
        q.add("e");
        System.out.println(q.peek());
        System.out.println("先进先出，添加的元素在队尾，获取的元素在队头");
    }
    private static void testLinked(){
        try {
            BlockingQueue q=new LinkedBlockingQueue();
            q.put("linked");
            q.put("a");
            System.out.println(q.take());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
