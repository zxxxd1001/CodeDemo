package dsign.mode.proxy;

/**
 * Created by zhangxd on 2016/6/12.
 */
public class CarLogProxy implements Moveable {
    private Moveable moveable;

    public CarLogProxy(Moveable moveable) {
        this.moveable = moveable;
    }
    public void move() {
        long starttime=System.currentTimeMillis();
        System.out.println("日志开始。。。");
        moveable.move();
        System.out.println("日志结束。。。");
    }
}
