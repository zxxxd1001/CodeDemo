package base;

import java.math.BigDecimal;
import java.text.DecimalFormat;

/**
 * Created by 张雪冬 on 2016/12/1.
 */
public class BigDecimalDemo {
    // 进行加法运算
    public static double add(double d1, double d2) {
        BigDecimal b1 = new BigDecimal(d1);
        BigDecimal b2 = new BigDecimal(d2);
        return b1.add(b2).doubleValue();
    }
    // 进行减法运算
    public static double sub(double d1, double d2) {
        BigDecimal b1 = new BigDecimal(d1);
        BigDecimal b2 = new BigDecimal(d2);
        return b1.subtract(b2).doubleValue();
    }
    // 进行乘法运算
    public static double mul(double d1, double d2) {
        BigDecimal b1 = new BigDecimal(d1);
        BigDecimal b2 = new BigDecimal(d2);
        return b1.multiply(b2).doubleValue();
    }
    // 进行除法运算
    public static double div(double d1, double d2, int len) {
        BigDecimal b1 = new BigDecimal(d1);
        BigDecimal b2 = new BigDecimal(d2);
        return b1.divide(b2, len, BigDecimal.ROUND_HALF_UP).doubleValue();
    }
    // 进行四舍五入 操作
    public static double round(double d, int len) {

        BigDecimal b1 = new BigDecimal(d);
        BigDecimal b2 = new BigDecimal(1);
        // 任何一个数字除以1都是原数字
        // ROUND_HALF_UP是BigDecimal的一个常量，表示进行四舍五入的操作
        return b1.divide(b2, len, BigDecimal.ROUND_HALF_UP).doubleValue();
    }

    public static void main(String[] args) {
        System.out.println("加法运算：" + round(add(10.345, 3.333), 1));
        System.out.println("乘法运算：" + round(mul(10.345, 3.333), 3));
        System.out.println("除法运算：" + div(10.345, 3.333, 3));
        System.out.println("减法运算：" + round(sub(10.345, 3.333), 3));

        DecimalFormat df   = new DecimalFormat("######0.00");
        double d1 = 3.23456;
        double d2 = 0.0;
        double d3 = 2.0;
        System.out.println(df.format(d1));
        System.out.println(df.format(d2));
        System.out.println(df.format(d3));

        DecimalFormat dff=new DecimalFormat(".##");
        double d=1252.2563;
        String st=dff.format(d);
        System.out.println(st);

        testCompareTo();
    }

    public static void testCompareTo(){
        BigDecimal b=BigDecimal.ZERO,
                o=BigDecimal.ONE,
                c=BigDecimal.TEN;
        System.out.println("testCompareTo："+b+","+o);
        System.out.println("compareTo："+b.compareTo(o));
        System.out.println("compareTo："+c.compareTo(b));
    }
}
