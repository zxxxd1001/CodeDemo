package reflect.code;

import java.lang.reflect.Field;

/**
 * Created by zhangxd on 2016/6/22.
 */
public class FieldDemo01 {
    public static void main(String[] args) throws  Exception {
        FieldTestClass f=new FieldTestClass();
        f.age=10;
        System.out.println(f.age);

        Class c=Class.forName("reflect.code.FieldTestClass");
        Field age=c.getDeclaredField("age");//获取FieldTestClass对象的age属性
        Field sax=c.getDeclaredField("sax");//获取FieldTestClass对象的sax属性
        Object o=c.newInstance();//调用无参构造创建FieldTestClass对象
        age.set(o,110);//给o的age属性赋值
        System.out.println(age.get(o));
        //打破封装性
        sax.setAccessible(true);//使用反射机制可以打破封装性，导致了java对象的属性不安全。
        sax.set(o,"张三");
        System.out.println(sax.get(o));
    }
}
