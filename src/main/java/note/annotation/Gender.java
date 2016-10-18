package note.annotation;

/**
 * 枚举，模拟注解中添加枚举属性
 *  @author 张雪冬
 * @date 2016/10/18 20:05
 */
public enum Gender {
    MAN{
        public String getName(){
            return "男";
        }
    },
    WOMEN{
        public String getName(){
            return "女";
        }
    };
    public abstract String getName();
}
