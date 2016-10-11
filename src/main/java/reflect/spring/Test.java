package reflect.spring;

public class Test {
    public static void main(String[] args) {
        ServiceImpl impl = (ServiceImpl) BeanContainer.getBean("service");
        String name = "test";
        impl.addPerson(name);
    }
}
