package com.duoduo.server.Entity;

import lombok.*;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Getter
@Entity(name = "userlist")
@NoArgsConstructor
@ToString
public class UserListEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user")
    private UserEntity userId;

    @Column
    private String username;

    @Column
    private String nickname;

    @Column
    private String position;

    @Column
    private String tier;

    @Column
    private Integer recent_rate;

    @Column
    private String most;

    @Column
    private double kda;

    @Column
    private Integer poro;

    @Column
    private Integer synergy;

    @Column
    private Integer total_rate;

    @Column
    private Integer profileIconId;

    @Column
    private Integer summonerLevel;

    @Column
    private String createdAt;

    @Builder
    public UserListEntity (Long id, UserEntity userId, String username, String nickname, String position, String tier, Integer recent_rate, String most, double kda, Integer poro, Integer synergy, Integer total_rate, Integer profileIconId, Integer summonerLevel){
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.nickname = nickname;
        this.position = position;
        this.tier = tier;
        this.recent_rate = recent_rate;
        this.most = most;
        this.kda = kda;
        this.poro = poro;
        this.synergy = synergy;
        this.total_rate = total_rate;
        this.profileIconId = profileIconId;
        this.summonerLevel = summonerLevel;
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        this.createdAt = simpleDateFormat.format(new Date());
    }

}
