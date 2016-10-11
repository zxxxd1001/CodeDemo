package dsign.mode.adapter;

/**
 * 二相转三相插座
 */
public class TwoPlugAdapter implements ThreePlugIf {
    private GBTwoPlug gbTwoPlug;

    public TwoPlugAdapter(GBTwoPlug gbTwoPlug) {
        this.gbTwoPlug = gbTwoPlug;
    }

    public void powerWithThree() {
        System.out.println("通过转换");
        gbTwoPlug.powerWithTwo();
    }
}
