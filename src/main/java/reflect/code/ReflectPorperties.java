package reflect.code;

import java.io.File;
import java.io.FileReader;
import java.util.Properties;

/**
 * Created by zhangxd on 2016/6/21.
 */
public class ReflectPorperties {
    public static void main(String[] args) throws Exception {
        Properties p=new Properties();
        FileReader reader=new FileReader("src/main/java/reflect/code/a.properties");
        p.load(reader);
        reader.close();
        Class c=Class.forName(p.getProperty("className"));
        Object o=c.newInstance();
        System.out.println(o);
    }
}
