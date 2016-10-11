package dsign.mode.factory;

import dsign.mode.factory.hair.Boy;
import dsign.mode.factory.hair.MCFactory;
import dsign.mode.factory.hair.PersonFactory;

/**
 * 模拟客户端实现
 */
public class SunnyTest {
    public static void main(String[] args) {
        HarirFactory harirFactory=new HarirFactory();
//        HarirInterface harirInterface=harirFactory.getHair("left");
//        harirInterface.draw();

     //   HarirInterface harirInterface=harirFactory.getHairByClass("FactoryModel.LeftHarir");

        HarirInterface harirInterface=harirFactory.getHairByClass("left");
        harirInterface.draw();
        System.out.println();
        InHarir in= (InHarir) harirFactory.getHairByClass("in");
        in.draw();

//        PersonFactory factory=new MCFactory();
//        Girl girl=factory.getGirl();
//        girl.drawWomen();

        PersonFactory factory=new MCFactory();
        Boy boy=factory.getBoy();
        boy.drawHarir();
    }
}
