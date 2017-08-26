package testVolatileAndSynchronized;

/**
 * volatile 每次都去主内存中读取数据和写入数据
 */
public class TestVolatileAtomic {
    private volatile static Integer i=0;
    public static void main(String[] args) {
        testI();
    }
    private static void testI(){
        for (int y=0;y<1000;y++) {
            int a=y;
            new Thread(new Runnable() {
                public void run() {
                    try {
                        Thread.sleep(2);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    i=a;
                }
            }).start();
        }
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(i);
    }
}
