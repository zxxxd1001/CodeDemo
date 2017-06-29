package Enum;

import java.util.EnumMap;

/**
 * Created by zhangxuedong on 2017/6/29.
 */
public class TestSE {
    public static void main(String[] args) {
        EnumMap<EnumTest,String> map=new EnumMap(EnumTest.class);
        map.put(EnumTest.MON,"2");
        map.put(EnumTest.THU,"1");
        System.out.println(map);
        System.out.println(map.get(EnumTest.THU));
    }
}
