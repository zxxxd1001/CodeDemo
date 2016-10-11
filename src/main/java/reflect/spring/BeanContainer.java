package reflect.spring;

import java.lang.reflect.Field;

public class BeanContainer {
    public static Object getBean(String name) {
        System.out.println(name);
        try {
            Class<?> clazz = Class.forName("reflect.spring.ServiceImpl");
            Object bean = clazz.newInstance();
            Field[] fileds = clazz.getDeclaredFields();
            for (Field f : fileds) {
                if (f.isAnnotationPresent(Autowired.class)) {
                    // 基于类型注入
                    Class<?> c = f.getType();
                    Object value = c.newInstance();
                    //允许访问private字段
                    f.setAccessible(true);
                    //把引用对象注入属性
                    f.set(bean, value);
                }
            }
            return bean;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
