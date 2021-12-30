package com.duoduo.server.Entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity(name = "post")
@Getter
@NoArgsConstructor
@ToString
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column
    private String nickname;

    @Column
    private String body;

    @Column
    private String createdAt;

    @Builder
    public PostEntity(String title, String nickname, String body) {
        this.title = title;
        this.nickname = nickname;
        this.body = body;
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        this.createdAt = simpleDateFormat.format(new Date());
    }
}
