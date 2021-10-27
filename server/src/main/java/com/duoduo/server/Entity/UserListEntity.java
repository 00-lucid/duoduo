package com.duoduo.server.Entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Entity(name = "userlist")
@NoArgsConstructor
@ToString
public class UserListEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @Builder
    public UserListEntity (Long id, String username, String nickname, String position, String tier, Integer recent_rate, String most, double kda, Integer poro, Integer synergy, Integer total_rate, Integer profileIconId, Integer summonerLevel){
        this.id = id;
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
    }
}
