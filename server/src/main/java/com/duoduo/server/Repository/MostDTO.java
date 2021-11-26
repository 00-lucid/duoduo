package com.duoduo.server.Repository;

import lombok.Data;

@Data
public class MostDTO implements Comparable<MostDTO>{
    private String championName;
    private int count;

    public MostDTO(String championName, int count) {
        this.championName = championName;
        this.count = count;
    }

    @Override
    public int compareTo(MostDTO o) {
        if (o.count < count) {
            return 1;
        } else if (o.count > count) {
            return -1;
        }

        return 0;
    }
}
