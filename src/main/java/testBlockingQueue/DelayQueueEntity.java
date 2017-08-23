package testBlockingQueue;

import java.util.Date;
import java.util.concurrent.Delayed;
import java.util.concurrent.TimeUnit;

/**
 * Created by zhangxuedong on 2017/8/23.
 */
public class DelayQueueEntity implements Delayed {
    private long expired;
    private long delay;
    private String name;

    public DelayQueueEntity(long delay, String name) {
        this.expired = ( delay + System. currentTimeMillis());
        this.delay = delay;
        this.name = name;
    }

    public long getDelay(TimeUnit unit) {
        /*
         * 方法的返回值就是队列元素被释放前的保持时间，
         * 如果返回0或者一个负值，就意味着该元素已经到期需要被释放，
         * 此时DelayedQueue会通过其take()方法释放此对象。
         */
        return expired-System.currentTimeMillis();
    }

    @Override
    public int compareTo(Delayed o) {
        /*
         *  从上面Delayed 接口定义可以看到，它还继承了Comparable接口，
         *  这是因为DelayedQueue中的元素需要进行排序，
         *  一般情况，我们都是按元素过期时间的优先级进行排序
         */
        DelayQueueEntity e=(DelayQueueEntity)o;
        return e.getExpired()>expired?1:-1;
    }

    public long getExpired() {
        return expired;
    }

    @Override
    public String toString() {
        return "DelayQueueEntity{" +
                "expired=" + new Date(expired) +
                ", delay=" + delay +
                ", name='" + name + '\'' +
                '}';
    }
}
