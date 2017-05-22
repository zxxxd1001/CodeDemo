package testHash;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;

public class TestHash {
    public static void main(String[] args) {
        /**
         * Coll 没有重写 equals与hashCode
         * Row  重写    equals与hashCode
         */
        Coll c=new Coll(3,3);
        Coll c1=new Coll(3,3);
        Coll c2=new Coll(3,5);
        HashSet<Coll> set=new HashSet<Coll>();
        set.add(c);
        set.add(c);
        set.add(c1);
        set.add(c2);
        System.out.println("Coll HashSet:"+set.size());
        ArrayList<Coll> arr=new ArrayList<Coll>();
        arr.add(c);
        arr.add(c);
        arr.add(c1);
        arr.add(c1);
        arr.add(c2);
        System.out.println("Coll ArrayList:"+arr.size());

        Row r=new Row(3,3);
        Row r1=new Row(3,3);
        Row r2=new Row(3,5);
        HashSet<Row> rowSet=new HashSet<Row>();
        rowSet.add(r);
        rowSet.add(r1);
        rowSet.add(r2);
        System.out.println("Row HashSet:"+rowSet.size());
    }
}
