package reflect.code;

import java.lang.reflect.Constructor;

/**
 * Created by zhangxd on 2016/6/22.
 */
public class ConstructorDemo01 {
    public static void main(String[] args)throws  Exception {
        Class c=Class.forName("reflect.code.test");
        Constructor con=c.getDeclaredConstructor(String.class,int.class);
        Object o=con.newInstance("张三",25);
        System.out.println(o.toString());
    }
}

class test{
    private String namg;
    private int age;

    public test(String namg, int age) {
        this.namg = namg;
        this.age = age;
    }
    public String toString() {
        return "namg=" + namg + ", age=" + age;
    }
}
