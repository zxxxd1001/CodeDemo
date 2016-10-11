package dsign.mode.proxy.to;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

/**
 * Created by zhangxd on 2016/6/12.
 */
public class TimeHandler implements InvocationHandler {
    public TimeHandler(){
        System.out.println("TimeHandler无参构造！");
    }
    private Object target;
    public TimeHandler(Object target){
        this.target=target;
    }
    /**
     * 参数：
     * proxy 被代理对象
     * method 被代理对象的方法
     * args 方法参数
     *
     * 返回值
     * Object 方法返回值
     */
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        long starttime=System.currentTimeMillis();
        System.out.println("汽车开始行驶。。。");
        method.invoke(target);
        System.out.println("停车。。。");
        long overtime=System.currentTimeMillis();
        System.out.println("（汽车行驶时间：）"+(overtime-starttime)+"毫秒！");
        return null;
    }
}
