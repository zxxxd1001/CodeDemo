package testVolatileAndSynchronized;

public class TestVolatile {
    //volatile 保证可见性、有序性、没有原子性
    private volatile static long count=0;
    //加synchronized 保证原子性
    private synchronized static void inc() {
        try {
            Thread.sleep(2);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        //jvm会 拆分成 count=count+1;  也就是说读取count，对count+1，然后对count赋值
        count++;
    }
    private static void testVolatile(){
        Thread t=null;
        for(int i=0;i<1000;i++){
            t=new Thread(new Runnable() {
                public void run() {
                    inc();
                }
            });
            t.start();
        }
        try {
            Thread.sleep(5000);//需要阻塞显示 for执行完但是线程不一定执行完了
            System.out.println(count);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        testVolatile();
//        TestA.testVolatileAndSynchronized();
    }
}
//没有用volatile
class TestA{
    private static long count=0;
    private static void inc() {
        try {
            Thread.sleep(4);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        count++;
    }
    public static void testVolatile(){
        for(int i=0;i<1000;i++){
            new Thread(new Runnable() {
                public void run() {
                    inc();
                }
            }).start();
        }
        try {
            Thread.sleep(5000);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(count);
    }
}
