package dsign.mode.template;

/**
 * Created by zhangxd on 2016/6/1.
 */
public class RefreshBeverageTest {
    public static void main(String[] args) {
        System.out.println("制贝咖啡。。。");
        RefreshBeverage refreshBeverage=new Coffee();
        refreshBeverage.prepareBerverageTemplate();
        System.out.println("咖啡好了！");
        System.out.println("\n-------------------------\n");
        System.out.println("制备茶。。。");
        refreshBeverage=new Tea();
        refreshBeverage.prepareBerverageTemplate();
        System.out.println("茶好了！");
    }
}
