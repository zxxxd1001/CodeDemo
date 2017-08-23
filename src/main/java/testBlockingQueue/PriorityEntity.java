package testBlockingQueue;

/**
 * Created by zhangxuedong on 2017/8/23.
 */
public class PriorityEntity implements Comparable<PriorityEntity> {
    private int priority;//定义优先级

    public PriorityEntity(int priority) {
        this.priority = priority;
    }

    public int compareTo(PriorityEntity o) {
        return priority >= o.getPriority() ? 1 : -1;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    @Override
    public String toString() {
        return "PriorityEntity{ priority=" + priority +"}";
    }
}
