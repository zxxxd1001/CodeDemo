package testLock;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Created by zhangxuedong on 2017/8/29.
 */
public class TestLock {
    private Lock lock=new ReentrantLock();
    public static void main(String[] args) {
        TestLock t=new TestLock();
        Thread tt= new Thread(new Runnable() {
            public void run() {
//                t.testLock();
//                t.testTryLock();
                try {
//                    t.insert();
                    t.testLockInterruptibly();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
        Thread ttt= new Thread(new Runnable() {
            public void run() {
//                t.testLock();
//                t.testTryLock();
                try {
//                    t.insert();
                    t.testLockInterruptibly();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
        ttt.start();
        tt.start();

        ttt.interrupt();

    }
    private void testLock(){
        System.out.println("lock之前out");
        lock.lock();
        try{
            System.out.println(Thread.currentThread().getName()+":得到锁");
            Thread.sleep(1000);
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            lock.unlock();
            System.out.println(Thread.currentThread().getName()+":释放锁");
        }
    }
    private void testTryLock(){
        //tryLock 用于判断是否可以拿到锁，不会阻塞线程。 拿到走if拿不到走else
        System.out.println("tryLock之前out");
        if(lock.tryLock()){
            try{
                System.out.println(Thread.currentThread().getName()+":得到锁");
                Thread.sleep(1000);
            }catch (Exception e){

            }finally {
                lock.unlock();
                System.out.println(Thread.currentThread().getName()+":释放锁");
            }
        }else{
            System.out.println(Thread.currentThread().getName()+":没有得到锁");
        }
    }
    private void insert() throws Exception{
        //tryLock 如果拿不到锁阻塞4秒后在尝试
        System.out.println("tryLock之前out");
        if (lock.tryLock(4, TimeUnit.SECONDS)) {
            try {
                System.out.println(Thread.currentThread().getName() + ":得到锁");
//                Thread.sleep(5000);
                Thread.sleep(2000);
            } catch (Exception e) {
            } finally {
                lock.unlock();
                System.out.println(Thread.currentThread().getName()+":释放锁");
            }
        }else{
            System.out.println(Thread.currentThread().getName()+":没有得到锁");
        }
    }
    private void testLockInterruptibly() throws Exception{
        //注意，如果需要正确中断等待锁的线程，必须将获取锁放在外面，然后将 InterruptedException 抛出
        lock.lockInterruptibly();
        try {
            System.out.println(Thread.currentThread().getName() + ":得到锁");
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            System.out.println(Thread.currentThread().getName()+":释放锁");
            lock.unlock();
        }
    }
}
