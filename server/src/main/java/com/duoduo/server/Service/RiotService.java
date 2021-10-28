package com.duoduo.server.Service;


import org.springframework.beans.factory.annotation.Value;

public class RiotService {
    @Value("${api.key.riot}")
    String API_KEY;

    public String getMatches(String puuid) {
        try {

            String requestURL = "https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/"+puuid+"/ids?start=0&count=20&api_key=" + API_KEY;
            return null;
        } catch (Exception e) {
            return null;
        }
    }

    public String getMatch(String matchId) {
        try {
            return null;
        } catch (Exception e) {
            return null;
        }
    }

    public void getRecentRate() {

    }

    public void getMost() {

    }

    public void getKda() {

    }
}
