package testJvm;

import java.util.List;

/**
 * Created by zhangxuedong on 2017/8/31.
 */
public class TestClassTree {
    public static void main(String[] args) {
        System.out.println("TestClassTree类加载器"+TestClassTree.class.getClassLoader().getClass().getName());
        System.out.println("System类加载器"+System.class.getClassLoader());
        System.out.println("List类加载器"+List.class.getClassLoader());
        ClassLoader c=TestClassTree.class.getClassLoader();
        while (c!=null){
            System.out.print(c.getClass().getName()+">");
            c=c.getParent();
        }
        System.out.print(c);
        System.out.println();
        try {
            Class.forName("testJvm.E");
//            E e = new E();
//            E e1 = new E();
//            System.out.println(e.i == e1.i);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

class E{
    int i=1;
    private final String s=gett();
    private static final String ss=gettt();
    private String gett(){
        System.out.println("final");
      return "final";
    };
    private static String gettt(){
        System.out.println("static final ");
        return "static final ";
    };
}