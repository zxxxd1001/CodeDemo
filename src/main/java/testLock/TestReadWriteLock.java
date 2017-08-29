package testLock;

import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

/**
 * Created by zhangxuedong on 2017/8/29.
 */
public class TestReadWriteLock {
    private ReadWriteLock r=new ReentrantReadWriteLock();
    public static void main(String[] args) {
        TestReadWriteLock t=new TestReadWriteLock();
        new Thread(new Runnable() {
            @Override
            public void run() {
                t.testReadWriteLock();
            }
        }).start();
        new Thread(new Runnable() {
            @Override
            public void run() {
                t.testReadWriteLock();
            }
        }).start();
    }
    private void testReadWriteLock(){
        r.readLock().lock();
        try {
            System.out.println("读取文件");
            Thread.sleep(3000);
            System.out.println("over");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }finally {
            r.readLock().unlock();
        }
    }
}
