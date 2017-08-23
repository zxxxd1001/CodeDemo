package testDeque;

import java.util.*;

/**
 * Created by zhangxuedong on 2017/8/23.
 */
public class testArrayDeque {
    public static void main(String[] args) {
        testArrayDeque();
    }
    private static void testArrayDeque(){
        Deque d=new ArrayDeque();
        d.add("1");
        d.add("3");
        //ArrayDeque不可以插入null元素
//        d.add(null);
        System.out.println(d.size());
        Deque l=new LinkedList();
        l.add("1");
        //LinkedList可以插入null元素
        l.add(null);
        System.out.println(l.size());
        Set s=new HashSet();
        s.add(null);
        System.out.println(s.size());
    }
}
