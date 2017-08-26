package testCallableFutureExecutor;

import java.util.concurrent.*;

public class TestFutureAndExecutorService {
    public static void main(String[] args) {
        testFutureAndExecutorService();
    }
    private static void testFutureAndExecutorService(){
        ExecutorService service= Executors.newCachedThreadPool();
        Future<String> t=service.submit(new Callable<String>() {
            public String call() throws Exception {
                return "String";
            }
        });
        service.submit(new Runnable() {
            public void run() {
                System.out.println("开启");
            }
        });
        service.shutdown();
        try {
            System.out.println(t.get());
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
    }
}
