package dsign.mode.proxy;

/**
 * Created by zhangxd on 2016/6/1.
 */
public class Car3 implements Moveable {
    private Car car;

    public Car3(Car car) {
        this.car = car;
    }

    public void move() {
        long starttime=System.currentTimeMillis();
        System.out.println("汽车开始行驶。。。");
        car.move();
        System.out.println("停车。。。");
        long overtime=System.currentTimeMillis();
        System.out.println("（汽车行驶时间：）"+(overtime-starttime)+"毫秒！");
    }
}
