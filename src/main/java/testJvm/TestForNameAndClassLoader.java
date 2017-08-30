package testJvm;

public class TestForNameAndClassLoader {
    public static void main(String[] args) {
        try {
            Class cc=Class.forName("testJvm.A");
            Class c=B.class.getClassLoader().loadClass("testJvm.B");
            c.newInstance();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        }
    }

}
