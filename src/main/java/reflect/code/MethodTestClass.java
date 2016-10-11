package reflect.code;

/**
 * Created by zhangxd on 2016/6/22.
 */
public class MethodTestClass {
    public boolean login(String name,String password){
        if("admin".equals(name)&&"1234".equals(password)){
            System.out.println("登录成功！");
            return true;
        }
        System.out.println("登录失败！");
        return false;
    }
    public void login(String name){
        if("admin".equals(name)){
            System.out.println("请输入密码！");
            return;
        }
        System.out.println("无效用户名！");
    }
    public void logout(){
        System.out.println("退出系统");
    }
}
