package dsign.mode.template;

/**
 *
 */
public abstract class RefreshBeverage {
    public final void prepareBerverageTemplate(){
        boilWater();
        brew();
        pourInCup();
        if(isCustomerWantsCOndiments()) {
            addCondiments();
        }
    }
    protected  Boolean isCustomerWantsCOndiments(){
        return true;
    }
    protected abstract void addCondiments();

    private void pourInCup() {
        System.out.println("将饮料倒入杯子");
    }
    protected abstract void brew();

    private void boilWater(){
        if(isOpen()) {
            boilingPoint();
        }else {
            System.out.println("将水煮沸");
        }
    }
    boolean isOpen(){
        return false;
    }
    protected void boilingPoint() {

    }
}
