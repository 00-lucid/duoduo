package com.duoduo.server.Repository;

import lombok.Data;

import java.lang.reflect.Array;
import java.util.ArrayList;

@Data
public class UserListDTO {
    private String username;
    private String nickname;
    private String position;
    private String tier;
    private Integer recent_win;
    private Integer recent_defeat;
    private ArrayList<String> most;
    private Long kda;
    private Integer poro;
    private Integer synergy;
    private Integer total_rate;
    private Integer profileIconId;
    private Integer summonerLevel;
}
