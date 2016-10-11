package dsign.mode.adapter;

/**
 * Created by zhangxd on 2016/5/30.
 */
public class NoteBook {
    private ThreePlugIf plug;

    public NoteBook(ThreePlugIf plug) {
        this.plug = plug;
    }

    //
    public void charge() {
        plug.powerWithThree();
    }

    public static void main(String[] args) {
        GBTwoPlug two = new GBTwoPlug();
        ThreePlugIf plug = new TwoPlugAdapter(two);
        NoteBook nb = new NoteBook(plug);
        nb.charge();

        System.out.println();

        plug = new TwoPlugAdapterExtends();
        plug.powerWithThree();
    }
}
