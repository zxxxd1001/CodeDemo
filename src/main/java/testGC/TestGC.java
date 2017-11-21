package testGC;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by zhangxuedong on 2017/9/5.
 */
public class TestGC {
    private static TestGC c =null;

    /**
     * 对象的finalize()方法确实被GC收集器触发过,并且在被收集前成功逃脱了。
     * 另外一个值得注意的地方是,代码中有两段完全一样的代码片段,
     * 执行结果却是一次逃脱成功,一次失败,这是因为任何一个对象的finalize()方法都只会被系统自动调用一次,
     * 如果对象面临下一次回收,它的finalize()方法不会被再次执行,因此第二段代码的自救行动失败了。
     * 因为finalize()方法已经被虚拟机调用过,虚拟机都视为“没有必要执行”。(即意味着直接回收)
     * @param args
     */
    public static void main(String[] args) {
        System.out.println(9%3);
        try {
            c = new TestGC();
            // 对象第一次成功拯救自己
            c = null;
            System.gc();
            // 因为finalize方法优先级很低,所以暂停0.5秒以等待它
            Thread.sleep(500);
            if (c != null) {
                c.isAlive();
            } else {
                System.out.println("no,i am dead:(");
            }
            // 下面这段代码与上面的完全相同,但是这次自救却失败了
            c = null;
            System.gc();
            // 因为finalize方法优先级很低,所以暂停0.5秒以等待它
            Thread.sleep(500);
            if (c != null) {
                c.isAlive();
            } else {
                System.out.println("no,i am dead:(");
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void finalize() throws Throwable {
        super.finalize();
        System.out.println("finalize mehtod executed!");
        TestGC.c = this;
    }
    public void isAlive() {
        System.out.println("yes,i am still alive:)");
    }
}
