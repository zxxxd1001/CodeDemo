package testBlockingQueue;

import java.util.Random;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.PriorityBlockingQueue;

/**
 * Created by zhangxuedong on 2017/8/23.
 */
public class TestPriorityBlockingQueue {
    public static void main(String[] args) {
       BlockingQueue<PriorityEntity> b=new PriorityBlockingQueue<>();
        try {
            for(int i=0;i<5;i++){
                Random r=new Random();
                b.put(new PriorityEntity(r.nextInt(10)));
            }
            while (!b.isEmpty()) {
                System.out.println(b.take());
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
