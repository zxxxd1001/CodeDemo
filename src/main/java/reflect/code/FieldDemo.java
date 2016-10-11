package reflect.code;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

/**
 * Created by zhangxd on 2016/6/22.
 */
public class FieldDemo {
    public static void main(String[] args)throws Exception {
        Class c=Class.forName("reflect.code.FieldTestClass");
        /*//获取所有public修饰的属性
        Field[] fs=c.getFields();
        System.out.println(fs[0].getName());
        */
        Field[] fs=c.getDeclaredFields();
        /*for(Field field:fs){
            int i=field.getModifiers();
           // System.out.println(i);
            String strModifier=Modifier.toString(i);
            System.out.println(strModifier);
            //            System.out.println(field.getType());
            Class cls=field.getType();
            System.out.println(cls.getSimpleName());
        }*/
        StringBuffer stringBuffer=new StringBuffer();
        stringBuffer.append(Modifier.toString(c.getModifiers())+" class "+c.getSimpleName()+"{");
        for(Field field:fs){
            stringBuffer.append("\n\t");
            stringBuffer.append(Modifier.toString(field.getModifiers())+" ");
            Class type=field.getType();
            stringBuffer.append(type.getSimpleName()+" ");
            stringBuffer.append(field.getName());
        }
        stringBuffer.append("\n}");
        System.out.println(stringBuffer);
    }
}
