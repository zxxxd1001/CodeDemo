package dsign.mode.factory;

import java.util.Map;

/**
 * 发型工厂
 */
public class HarirFactory {
//    public HarirInterface getHair(String key){
//        if("left".equals(key)){
//            return  new LeftHarir();
//        }else if("right".equals(key)){
//            return  new RightHarir();
//        }else{
//            return null;
//        }
//    }

//    public HarirInterface getHairByClass(String className){
//            try {
//                HarirInterface hair=(HarirInterface)Class.forName(className).newInstance();
//                return  hair;
//            } catch (InstantiationException e) {
//                e.printStackTrace();
//            } catch (IllegalAccessException e) {
//                e.printStackTrace();
//        } catch (ClassNotFoundException e) {
//            e.printStackTrace();
//        }
//        return null;
//    }

    public HarirInterface getHairByClass(String Key) {
        try {
            Map<String,String> map=new PorpertiesReader().getProperties();
            HarirInterface hair = (HarirInterface) Class.forName(map.get(Key)).newInstance();
            return hair;
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }

}
