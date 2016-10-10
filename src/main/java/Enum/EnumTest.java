package Enum;

/**
 * Created by zhangxd on 2016/7/21.
 */
public enum EnumTest {
    //这段代码实际上调用了7次 Enum(String name, int ordinal)
    MON, TUE, WED, THU, FRI, SAT, SUN;
    /**
     * 创建枚举类型要使用 enum 关键字，
     * 隐含了所创建的类型都是 java.lang.Enum 类的子类（java.lang.Enum 是一个抽象类）。
     * 枚举类型符合通用模式 Class Enum<E extends Enum<E>>，而 E 表示枚举类型的名称。
     * 枚举类型的每一个值都将映射到 protected Enum(String name, int ordinal) 构造函数中，
     * 在这里，每个值的名称都被转换成一个字符串，并且序数设置表示了此设置被创建的顺序。
     */
}
