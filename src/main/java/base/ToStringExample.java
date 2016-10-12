package base;

public class ToStringExample {

    public static void main(String[] args) {
        Sex s= Sex.resolve("m");
        System.out.println(s);//在打印时会调用Sex 中重写的 toString()方法
        TestToString testToString=new TestToString();//
        System.out.println(testToString);//如果没有重写toString方法会去调用父类Object方法
        /**
         * System.out.println(xx)括号里面的“xx”如果不是String类型的话，就自动调用xx的toString()方法
         */
    }
}

class Sex{
    private static final Sex M = new Sex(0);

    private static final Sex F = new Sex(1);

    public static final String stringM = "m";

    public static final String stringF = "f";

    public static final String[] sexList = new String[] { stringM, stringF };

    private int sex;

    Sex(int sex) {
        this.sex = sex;
    }
    public  static Sex resolve(String sex) {
        if (stringM.equals(sex)) {
            return Sex.M;
        } else if (stringF.equals(sex)) {
            return Sex.F;
        } else {
            throw new RuntimeException("Sex '" + sex + "' does not exist for Sex Enum");
        }
    }
    public  String getSex() {
        System.out.println(this.sex);
        return sexList[this.sex];
    }
    //在打印是会调用此方法，触发Enum
    public  String toString() {
        return getSex();
    }
    public  boolean equals(Object object) {
        return this == object;
    }
    public  int hashCode() {
        return this.sex;
    }
}

class TestToString{
//    public String toString(){
//        return "TestToString";
//    }
}