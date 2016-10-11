package dsign.mode.factory;

import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * Porperties文件读取工具
 */
public class PorpertiesReader {
    public Map<String, String> getProperties() {
        Properties properties = new Properties();
        Map<String, String> map = new HashMap<String, String>();
        InputStream in = getClass().getResourceAsStream("type.properties");
        try {
            properties.load(in);
            Enumeration en =properties.propertyNames();
            while(en.hasMoreElements()){
                String Key= (String) en.nextElement();
                String Value=properties.getProperty(Key);
                map.put(Key,Value);
            }
            return map;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
