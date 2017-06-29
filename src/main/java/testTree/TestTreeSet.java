package testTree;

import java.util.Iterator;
import java.util.TreeMap;
import java.util.TreeSet;

/**
 * Created by zhangxuedong on 2017/5/26.
 */
public class TestTreeSet {
    public static void main(String[] args) {
        TreeSet set=new TreeSet();
        set.add(1);
        set.add(1);
        System.out.println(set);
        TreeMap map=new TreeMap();
        map.put(2,1);
        map.put(1,2);
        map.put(1,3);
        System.out.println(map);

    }
}
