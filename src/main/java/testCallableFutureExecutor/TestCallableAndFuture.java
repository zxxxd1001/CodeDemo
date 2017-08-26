package testCallableFutureExecutor;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

/**
 * Created by zhangxuedong on 2017/8/26.
 */
public class TestCallableAndFuture {
    public static void main(String[] args) {
        testCallableAndFuture();
    }
    private static void testCallableAndFuture(){
        FutureTask<String> t=new FutureTask<String>(new Callable(){
            public String call(){
                System.out.println("启动"+Thread.currentThread().getName());
                try {
                    Thread.sleep(3000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                return "执行完成";
            }
        });
        FutureTask<?> c=new FutureTask(new Callable(){
            public Object call() throws Exception{
                System.out.println("启动"+Thread.currentThread().getName());
                throw new Exception("错误信息");
            }
        });
        Thread tt=new Thread(t);
        Thread ttt=new Thread(c);
        tt.start();
        ttt.start();
        try {
            System.out.println(t.get());
            System.out.println(c.get());
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
