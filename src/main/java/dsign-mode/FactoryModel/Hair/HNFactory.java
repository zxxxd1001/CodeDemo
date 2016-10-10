package FactoryModel.Hair;

/**
 * Created by zhangxd on 2016/5/30.
 */
public class HNFactory implements PersonFactory {
    @Override
    public Boy getBoy() {
        return new HNBoy();
    }

    @Override
    public Girl getGirl() {
        return new HNGril();
    }
}
