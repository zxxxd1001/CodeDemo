package dsign.mode.proxy.to;

import dsign.mode.proxy.Car;
import dsign.mode.proxy.Moveable;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Proxy;

/**
 * Created by zhangxd on 2016/6/12.
 */
public class Test {
    public static void main(String[] args){
        Car car = new Car();
        InvocationHandler h = new TimeHandler(car);
        Class<?> cls = car.getClass();
        /**
         * loader 类加载器
         * interfaces 实现接口
         * h InvocationHandler
         */
        Moveable Moveable = (Moveable) Proxy.newProxyInstance(cls.getClassLoader(), cls.getInterfaces(), h);
        Moveable.move();
    }
}
