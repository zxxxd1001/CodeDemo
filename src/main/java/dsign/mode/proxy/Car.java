package dsign.mode.proxy;

import java.util.Random;

/**
 * Created by zhangxd on 2016/6/1.
 */
public class Car implements Moveable {
    public void move(){
        try {
            System.out.println("汽车行驶中。。。");
            Thread.sleep(new Random().nextInt(1000));
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
