package dsign.mode.template;

/**
 * Created by zhangxd on 2016/6/1.
 */
public class Tea extends RefreshBeverage {
    @Override
    protected void addCondiments() {
        System.out.println("加入柠檬！");
    }
    protected  Boolean isCustomerWantsCOndiments(){
        return false;
    }
    @Override
    protected void brew() {
        System.out.println("用热水浸泡5分钟！");
    }
    boolean isOpen(){
        return true;
    }
    protected void boilingPoint() {
        System.out.println("将水煮至80度的！");
    }
}
