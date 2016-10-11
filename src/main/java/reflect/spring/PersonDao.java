package reflect.spring;

public class PersonDao {
    public int add(Object o) {
        System.out.println(o);
        System.out.println("dao autowird ok ");
        return 0;
    }
}
