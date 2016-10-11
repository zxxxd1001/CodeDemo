package reflect.code;

/**
 * Created by zhangxd on 2016/6/22.
 */
public class SuperClassDemo {
    public static void main(String[] args) throws  Exception{
        Class c=Class.forName("java.lang.String");
        //获取父类
        Class superClass=c.getSuperclass();
        System.out.println(superClass.getName());
        //获取父接口
        Class[] ins=c.getInterfaces();
        for(Class in:ins){
            System.out.println(in.getName());
        }

    }
}
