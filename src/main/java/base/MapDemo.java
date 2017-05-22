package base;

import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by zhangxuedong on 2017/5/22.
 */
public class MapDemo {
    public static void main(String[] args) {
        ConcurrentHashMap<String,String> map=new ConcurrentHashMap<String,String>();
        map.put("1","1");
        map.put("3","2");
        for(String s:map.keySet()){
            System.out.println("key:"+s);
            System.out.println("value:"+map.get(s));
        }
        Iterator<Map.Entry<String,String>> i=map.entrySet().iterator();
        while (i.hasNext()){
            Map.Entry<String,String> k=i.next();
            System.out.println(k.getKey()+":"+k.getValue());
        }

        ConcurrentHashMap<Integer,Object> o=new ConcurrentHashMap<Integer, Object>();
        o.put(1,"21");
        o.put(2,333);
        for(Integer s:o.keySet()){
            System.out.println("key:"+s);
            System.out.println("value:"+o.get(s));
        }
    }
}
