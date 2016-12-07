package com.github.zxxxd.soundsystemTest;

import static org.junit.Assert.*;

import com.github.zxxxd.soundsystem.CDPlayerConfig;
import com.github.zxxxd.soundsystem.CompactDisc;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = CDPlayerConfig.class)
public class CDPlayerTest {
    @Autowired
    private CompactDisc cd;

    @Test
    public void play() {
        cd.play();
        System.out.println(cd);
    }
}  