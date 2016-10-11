package dsign.mode.proxy;

/**
 * Created by zhangxd on 2016/6/1.
 */
public class Client {
    public static void main(String[] args) {
//        Car car=new Car();
//        car.move();

        //继承实现代理
//        Moveable car2=new Car2();
//        car2.move();

        //聚合实现代理  比继承好
//        Car car=new Car();
//        Moveable car3=new Car3(car);
//        car3.move();
//        Class<?> cla=car.getClass();
//        System.out.println(cla);

//        Car car=new Car();
//        CarTimeProxy carTimeProxy=new CarTimeProxy(car);
//        CarLogProxy carLogProxy=new CarLogProxy(carTimeProxy);
//        carLogProxy.move();

        Car car=new Car();
        CarLogProxy carLogProxy=new CarLogProxy(car);
        CarTimeProxy carTimeProxy=new CarTimeProxy(carLogProxy);
        carTimeProxy.move();
    }
}
