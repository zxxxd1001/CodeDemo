package dsign.mode.proxy;

/**
 * Created by zhangxd on 2016/6/12.
 */
public class CarTimeProxy implements Moveable {
    private Moveable moveable;

    public CarTimeProxy(Moveable moveable) {
        this.moveable = moveable;
    }
    public void move() {
        long starttime=System.currentTimeMillis();
        System.out.println("汽车开始行驶。。。");
        moveable.move();
        System.out.println("停车。。。");
        long overtime=System.currentTimeMillis();
        System.out.println("（汽车行驶时间：）"+(overtime-starttime)+"毫秒！");
    }
}
