package testBlockingQueue;

import java.util.Random;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.DelayQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by zhangxuedong on 2017/8/23.
 */
public class TestDelayQueue {
    public static void main(String[] args) {
        testDelayQueue();
        testStudent();
    }
    private static void testDelayQueue(){
        BlockingQueue b=new DelayQueue();
        DelayQueueEntity e=new DelayQueueEntity(3000,"cache 3 second");
        try {
            b.put(e);
            System.out.println(b.take());
        } catch (InterruptedException e1) {
            e1.printStackTrace();
        }

    }
    private static void testStudent(){
        Random r = new Random();
        //把所有学生看做一个延迟队列
        DelayQueue<DelayQueueStudent> students = new DelayQueue<DelayQueueStudent>();
        //构造一个线程池用来让学生们“做作业”
        ExecutorService exec = Executors.newFixedThreadPool(20);
        for (int i = 0; i < 20; i++) {
            //初始化学生的姓名和做题时间
            students.put(new DelayQueueStudent("学生" + (i + 1), 3000 + r.nextInt(10000)));
        }
        try {
            //开始做题
            while (!students.isEmpty()) {
                exec.execute(students.take());
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        exec.shutdown();
    }
}
