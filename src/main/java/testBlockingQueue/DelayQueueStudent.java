package testBlockingQueue;

import java.util.concurrent.Delayed;
import java.util.concurrent.TimeUnit;

/**
 * Created by zhangxuedong on 2017/8/23.
 */
public class DelayQueueStudent implements Delayed,Runnable {
    private String name;  //姓名
    private long costTime;//做试题的时间
    private long finishedTime;//完成时间

    public DelayQueueStudent(String name, long costTime) {
        this.name = name;
        this.costTime = costTime;
        this.finishedTime = costTime+System.currentTimeMillis();
    }

    @Override
    public long getDelay(TimeUnit unit) {
        return finishedTime - System. currentTimeMillis();
    }

    @Override
    public int compareTo(Delayed o) {
        DelayQueueStudent other = (DelayQueueStudent) o;
        return costTime >= other.getCostTime()?1:-1;
    }

    @Override
    public void run() {
        System. out.println( name + " 交卷,用时" + costTime /1000);
    }

    public long getCostTime() {
        return costTime;
    }
}
