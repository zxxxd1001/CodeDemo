package dsign.mode.factory.hair;

/**
 * 人物的实现接口
 * Created by zhangxd on 2016/5/30.
 */
public interface PersonFactory {
    //男孩接口
    public Boy getBoy();
    //女孩接口
    public Girl getGirl();
}
