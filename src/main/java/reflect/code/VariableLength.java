package reflect.code;

import dsign.mode.proxy.to.TimeHandler;

/**
 * Created by zhangxd on 2016/6/20.
 */
public class VariableLength {
    public VariableLength(){
        System.out.println("Test无参构造函数！");
    }
    public static void main(String[] args) throws ClassNotFoundException {

        Class c=Class.forName("dsign.mode.proxy.to.TimeHandler");
        Class cc=TimeHandler.class;

        System.out.println(cc==c);
        VariableLength test=new VariableLength();
        test.m1(1);
        test.m1(1,2);
        test.m1("可变长",1,2,3);
        test.m1("可变长",1,2,3,4);
        if("asd" instanceof String){
            System.out.println("属于同一对象！");
        }
    }
    public void m1(String str,int... a){
        System.out.println(str+"int...");
    }
    public void m1(int... a){
        System.out.println("int...");
    }
    public void m1(int i){
        System.out.println(i);
    }
}
