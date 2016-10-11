package dsign.mode.factory.hair;

/**
 * Created by zhangxd on 2016/5/30.
 */
public class HNFactory implements PersonFactory {

    public Boy getBoy() {
        return new HNBoy();
    }


    public Girl getGirl() {
        return new HNGril();
    }
}
