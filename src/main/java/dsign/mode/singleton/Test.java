package dsign.mode.singleton;

public class Test {
    public static void main(String[] args) {
        //恶汉模式
        Singleton s1= Singleton.getInstance();
        Singleton s2= Singleton.getInstance();
        if(s1==s2){
            System.out.println("s1和s2是同一个实例");
        }else{
            System.out.println("s1和s2不是同一个实例");
        }

        //懒汉模式
        Singleton s3= Singleton.getInstance();
        Singleton s4= Singleton.getInstance();
        if(s1==s2){
            System.out.println("s3和s4是同一个实例");
        }else{
            System.out.println("s3和s4不是同一个实例");
        }
    }
}
