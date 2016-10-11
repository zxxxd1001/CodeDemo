package reflect.code;

import java.lang.reflect.Constructor;
import java.lang.reflect.Modifier;

/**
 * Created by zhangxd on 2016/6/22.
 */
public class ConstructorDemo {
    public static void main(String[] args)throws Exception {
        Class c=Class.forName("java.lang.String");
        Constructor[] cons=c.getDeclaredConstructors();
        StringBuffer sb=new StringBuffer();
        sb.append(Modifier.toString(c.getModifiers())+" class "+c.getSimpleName()+"{");
        for(Constructor con:cons){
            sb.append("\n\t"+Modifier.toString(con.getModifiers())+" "+c.getSimpleName()+"(");
            Class[] parameterTypes=con.getParameterTypes();
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
