package note.benchmark;

import java.lang.reflect.Method;
import java.util.*;

/**
 * @author 张雪冬
 * @date 2016/10/18 20:46
 */
public class AnnotationReflectBenchmark {
    public static void main(String[] args) {
        List<Map> list=getMethod();
        for(Map map:list){
            System.out.println(map.get("describe")+":"+map.get("name"));
        }
        //生成违约记录和预约黑名单:appointBreachRecordFacade
        //生成违约记录和预约黑名单:updateBlackListSetExpiredDate
        //回收预约号:recycleAppointNum
    }
    private static List<Map> getMethod(){
        List<Map> methodNameList = new ArrayList();
        Method[] methodLists = ScheduleJob.class.getDeclaredMethods();
        for(Method method:methodLists){
            Map<String, String> map = new HashMap();
            //如果存在该元素的指定类型的注释，则返回这些注释，否则返回 null。
            JobReflect hrJob = method.getDeclaredAnnotation(JobReflect.class);
            if(hrJob!=null){
                map.put("name", method.getName());
                map.put("describe", hrJob.name());
                methodNameList.add(map);
            }
        }
        return methodNameList;
    }
}
