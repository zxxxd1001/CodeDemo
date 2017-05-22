package testSuper;

/**
 *
 */
public class Extension extends Base {
    public Extension() {
        add(2);
    }

    void add(int v){
        i+=v*2;
    }

    static void bogo(Base b){
        b.add(8);
        b.print();
    }

    public static void main(String[] args) {
        bogo(new Extension());
    }
}
