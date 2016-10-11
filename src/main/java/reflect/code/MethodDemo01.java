package reflect.code;

import java.lang.reflect.Method;

/**
 * Created by zhangxd on 2016/6/22.
 */
public class MethodDemo01 {
    public static void main(String[] args) throws Exception{
        Class c=Class.forName("reflect.code.MethodTestClass");
        Method  method = c.getDeclaredMethod("login", String.class, String.class);

        Object o=c.newInstance();
        method.invoke(o,"admin","1234");

        Method m=c.getDeclaredMethod("logout");
        Thread.sleep(3000);
        m.invoke(o);
    }
}
