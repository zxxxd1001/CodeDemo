package reflect.code;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

/**
 * Created by zhangxd on 2016/6/22.
 */
public class MethodDemo {
    public static void main(String[] args)throws Exception {
        Class c=Class.forName("java.lang.Integer");
        Method[] methods=c.getDeclaredMethods();
        StringBuffer sb=new StringBuffer();
        sb.append(Modifier.toString(c.getModifiers())+" class "+c.getName()+"{");
        for(Method method:methods){
            sb.append("\n\t"+Modifier.toString(method.getModifiers())+" ");
            Class type=method.getReturnType();
            sb.append(type.getSimpleName()+" ");
            sb.append(method.getName()+"(");
            Class[] parameterTypes=method.getParameterTypes();
            for(int i =0;i<parameterTypes.length;i++){
                Class parameterType=parameterTypes[i];
                if(i==parameterTypes.length-1){
                    sb.append(parameterType.getSimpleName());
                }else{
                    sb.append(parameterType.getSimpleName()+",");
                }
            }
            sb.append("){}");
        }
        sb.append("\n}");
        System.out.println(sb.toString());
    }
}
