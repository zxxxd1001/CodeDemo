package note.annotation;

/**
 * @author 张雪冬
 * @date 2016/10/18 19:59
 */
@MyAnn(color="红色")//注解的属性后面要有一对圆括号，没有属性可以不传。就像是无参的方法一样；
public class AnnotationTest {
    public static void main(String[] args) {
        //检查类AnnotationTest是否含有@MyAnnotation注解
        if(AnnotationTest.class.isAnnotationPresent(MyAnn.class)){
            //若存在就获取注解
            MyAnn myAnn=AnnotationTest.class.getAnnotation(MyAnn.class);
            //@note.annotation.MyAnn(gender=MAN, metaAnnotation=@note.annotation.MetaAnnotation(birthday=我的出身日期为1988-2-18),
            //                                                                          value=我是张雪冬, array=[1, 2, 3], color=红色)
            System.out.println(myAnn);
            //获取注解属性
            System.out.println(myAnn.color());//红色
            System.out.println(myAnn.value());//我是张雪冬
            int [] array=myAnn.array();
            for(int i=0;i<array.length;i++){
                System.out.println(array[i]);//1,2,3
            }
            Gender gender=myAnn.gender();
            System.out.println("性别:"+gender);//性别:MAN
            MetaAnnotation meta=myAnn.metaAnnotation();
            System.out.println(meta.birthday());//我的出身日期为1995-01-10
        }
    }
}
