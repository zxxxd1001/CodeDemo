package dsign.mode.factory.hair;

/**
 * 圣诞系类加工厂
 * Created by zhangxd on 2016/5/30.
 */
public class MCFactory implements PersonFactory {
    @Override
    public Boy getBoy() {
        return new MCBoy();
    }

    @Override
    public Girl getGirl() {
        return new MCGril();
    }
}
