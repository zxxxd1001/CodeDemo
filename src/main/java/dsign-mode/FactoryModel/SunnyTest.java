package FactoryModel;

import FactoryModel.Hair.Boy;
import FactoryModel.Hair.Girl;
import FactoryModel.Hair.MCFactory;
import FactoryModel.Hair.PersonFactory;

import java.security.Permission;

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
