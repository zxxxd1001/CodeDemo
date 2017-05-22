package testSuper;

/**
 * Created by zhangxuedong on 2017/5/22.
 */
public class Base {
    int i;

    public Base() {
        add(1);
        System.out.println("base-"+i);
    }

    void add(int v){
        i+=v;
    }
    void print(){
        System.out.println(i);
    }
}
