package dsign.mode.template;

/**
 * Created by zhangxd on 2016/6/1.
 */
public class Coffee extends RefreshBeverage {
    protected void addCondiments() {
        System.out.println("加入糖！！");
    }

    protected void brew() {
        System.out.println("用沸水冲泡咖啡！");
    }

}
