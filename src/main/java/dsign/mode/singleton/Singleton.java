package dsign.mode.singleton;

/**
 * 单利模式Singleton
 * 作用：保证整个应用程序中某个实例且只有一个
 */
public class Singleton {
    //构造方法私有化，不允许外部直接创建对象
    private Singleton(){

    }
    //创建类的唯一实例
    //饿汉模式： 类加载会自动加载instance实例
   private static Singleton instance=new Singleton();
    //提供一个获取实例的方法
    public static Singleton getInstance(){
        return instance;
    }
}
