package note.benchmark;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * @author 张雪冬
 * @date 2016/10/18 20:43
 */
@Retention(RetentionPolicy.RUNTIME)
public @interface JobReflect {
    String name();
}
