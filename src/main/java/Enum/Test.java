package Enum;

/**
 * Created by zhangxd on 2016/7/21.
 */
public class Test {
    public static void main(String[] args) {
        for(EnumTest e:EnumTest.values()){
            System.out.println(e.toString());
        }
        System.out.println("----------------我是分隔线------------------");
        EnumTest enumTest=EnumTest.TUE;
        switch (enumTest){
            case MON:
                System.out.println("今天是星期一");
                break;
            case TUE:
                System.out.println("今天是星期二");
                break;
            case WED:
                System.out.println("今天是星期三");
                break;
            case THU:
                System.out.println("今天是星期四");
                break;
            case FRI:
                System.out.println("今天是星期五");
                break;
            case SAT:
                System.out.println("今天是星期六");
                break;
            case SUN:
                System.out.println("今天是星期日");
                break;
            default:
                System.out.println(enumTest);
                break;
        }

        System.out.println(RcptType.OUTP.getValue());
    }
}
