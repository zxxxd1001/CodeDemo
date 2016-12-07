package com.github.zxxxd.soundsystem;

import org.springframework.stereotype.Component;

/**
 * Created by 张雪冬 on 2016/12/1.
 */
@Component
public class SgtPeppers implements CompactDisc {

    private String title="Sgt Pepper's Lonely Hearts Club Band";
    private String artist="The Beatles";
    public void play() {
        System.out.println("Playing"+title+"by"+artist);
    }
}
