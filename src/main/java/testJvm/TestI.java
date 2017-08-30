package testJvm;

/**
 * Created by zhangxuedong on 2017/8/30.
 */
public class TestI {
    public static void main(String[] args) {
        SingleTon singleTon = SingleTon.getInstance();
        System.out.println("count1=" + singleTon.i);//1
        System.out.println("count2=" + singleTon.y);//0
    }
}

/**
 * 1:SingleTon singleTon = SingleTon.getInstance();调用了类的SingleTon调用了类的静态方法，触发类的初始化
 * 2:类加载的时候在准备过程中为类的静态变量分配内存并初始化默认值 singleton=null count1=0,count2=0
 * 3:类初始化化，为类的静态变量赋值和执行静态代码快。singleton赋值为new SingleTon()调用类的构造方法
 * 4:调用类的构造方法后count=1;count2=1
 * 5:继续为count1与count2赋值,此时count1没有赋值操作,所有count1为1,但是count2执行赋值操作就变为0
 */
class SingleTon{
    private static SingleTon singleTon=new SingleTon();
    //jvm在初始化 基本类型时如果没有赋值 int byte short long=0; double float=0.0; char=[];String=null; boolean=false;
    public static int i;
    public static int y=0;

    public SingleTon() {
        i++;
        y++;
    }
    public static SingleTon getInstance(){
        return singleTon;
    }
}
