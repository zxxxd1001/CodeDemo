package note.benchmark;

/**
 * @author 张雪冬
 * @date 2016/10/18 20:44
 */
public class ScheduleJob {

    public void autoBilling(){}

    @JobReflect(name = "生成违约记录和预约黑名单")
    public void appointBreachRecordFacade(){}

    @JobReflect(name = "生成违约记录和预约黑名单")
    public void updateBlackListSetExpiredDate(){}

    @JobReflect(name = "回收预约号")
    public void recycleAppointNum(){}
}
