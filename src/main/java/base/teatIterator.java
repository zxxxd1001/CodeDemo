package base;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.function.Consumer;

/**
 * Created by zhangxd on 2016/10/10.
 */
public class teatIterator {
    public static void main(String[] args) {
        //基本类型
        String[] s = {"zhang", "li", "wang", "zhao"};
        //集合
        List<String> l = new ArrayList();
        l.add("san");
        l.add("si");
        l.add("wu");
        l.add("liu");
        for (Iterator iter = l.iterator(); iter.hasNext(); ) {
            String str = (String) iter.next();
            System.out.println(str);
        }
        System.out.println("--------------------------------");
        //java bean
        User user = new User("男","张三",20);
        try {
            /**
             * 要获取任何JavaBean对象的信息，既可以利用反射，
             * 也可以利用java.beans.Introspector这个工具类来获取一个BeanInfo对象
             */
            BeanInfo beanInfo = Introspector.getBeanInfo(user.getClass());
            PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
            for (PropertyDescriptor propertyDescriptor : propertyDescriptors) {
                Method method= propertyDescriptor.getReadMethod();
                String methodName=method.getName();
                Object propertyValue=method.invoke(user);
                System.out.println(methodName+":"+propertyValue);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("-----------------------------------");
        for(Iterator iter=user.iterator();iter.hasNext();){
            System.out.println(iter.next());
        }
    }

    static class User{
        private String name;
        private int age;
        private String sex;

        public User() {
        }

        public User(String sex, String name, int age) {
            this.sex = sex;
            this.name = name;
            this.age = age;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            this.age = age;
        }

        public String getSex() {
            return sex;
        }

        public void setSex(String sex) {
            this.sex = sex;
        }
        public Iterator<Object> iterator(){
            return new UserPropertyIterator(this);
        }

        private class UserPropertyIterator implements Iterator{
            private int index;
            private Object targetObject;
            PropertyDescriptor[] propertyDescriptors;


            // 通过构造器传入所要遍历的对象，即UserBean的对象
            UserPropertyIterator(Object targetObject) {
                this.targetObject = targetObject;
                try {
                    BeanInfo beanInfo = Introspector.getBeanInfo(targetObject.getClass());
                    propertyDescriptors = beanInfo.getPropertyDescriptors();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            public boolean hasNext() {
                return this.index < this.propertyDescriptors.length;
            }

            public Object next() {
                Object propertyValue = null;
                try {
                    PropertyDescriptor propertyDescriptor = propertyDescriptors[index++];
                    propertyValue= propertyDescriptor.getReadMethod().invoke(targetObject);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                return propertyValue;
            }

            public void remove() {

            }

            public void forEachRemaining(Consumer action) {

            }
        }
    }
}
