package com.duoduo.server.Controller;

import com.duoduo.server.Entity.UserListEntity;
import com.duoduo.server.Repository.MostDTO;
import com.duoduo.server.Repository.UserListDTO;
import com.duoduo.server.Repository.UserListRepository;
import com.duoduo.server.Service.FindService;
import com.duoduo.server.Service.RiotService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(value = "*")
@Controller
@RestController
public class UserListController {

    @Autowired
    private RiotService riotService;

    @Autowired
    private FindService findService;

    @Autowired
    private UserListRepository userListRepository;

    @GetMapping(value = "/userlist")
    public List<UserListEntity> getUserList() {

        List<UserListEntity> list = userListRepository.findAll();

        return list;
    }

    @PostMapping(value = "/userlist")
    public HashMap createUserList(@RequestBody(required = true) UserListDTO userListDTO) {
        ArrayList<MostDTO> championMost = new ArrayList<MostDTO>();
        try {
            int win = 0;
            System.out.println(userListDTO.toString());
            // 모듈 객체를 활용해서 ript api와 http 통신을 진행한 뒤 결과를 userlist에 담아 생성한다.
            JSONArray arrMatches = riotService.getMatches(userListDTO.getPuuid());
            System.out.println(arrMatches.size());

            for (int i = 0; i < arrMatches.size(); i++) {
                String match = arrMatches.get(i).toString();
                System.out.println(match);
                JSONObject objMatch = riotService.getMatch(match);
                // info / teams(2) / win
                JSONObject objMetadata =  (JSONObject) objMatch.get("metadata");
                JSONArray arrPlayer = (JSONArray) objMetadata.get("participants");
                int idxPlayer = arrPlayer.indexOf(userListDTO.getPuuid());
                JSONObject objInfo = (JSONObject) objMatch.get("info");
                JSONArray arrPlayerInfo = (JSONArray) objInfo.get("participants");
                JSONObject player = (JSONObject) arrPlayerInfo.get(idxPlayer);
                boolean isWin = (boolean) player.get("win");
                if (isWin) win++;
                // championId 또는 championName 통한 모스트 산출
                String championName = (String) player.get("championName");
                System.out.println(championName);
                int idxChampion = findService.findChampionMost(championMost, championName);
                System.out.println(idxChampion);
                if (idxChampion == -1) {
                    MostDTO mostDTO = new MostDTO(championName, 1);
                    championMost.add(mostDTO);
                    System.out.println("-1");
                } else {
                    MostDTO pre = championMost.get(idxChampion);
                    pre.setCount(pre.getCount() + 1);
                    championMost.set(idxChampion, pre);
                    System.out.println("1");
                }
            }

            System.out.println("championMost: " + championMost.toString());

            // 산출한 모스트를 count 값에 따라서 정렬해줘야 됨
            // TODO:
            Collections.sort(championMost, Collections.reverseOrder());

            UserListEntity userList = UserListEntity.builder()
                    .username(userListDTO.getUsername())
                    .nickname(userListDTO.getNickname())
                    .position(userListDTO.getPosition())
                    .tier(userListDTO.getTier())
                    .recent_rate(win * 10)
                    .most(championMost)
                    .kda(5)
                    .poro(50)
                    .synergy(50)
                    .total_rate(userListDTO.getTotal_rate())
                    .profileIconId(userListDTO.getProfileIconId())
                    .summonerLevel(userListDTO.getSummonerLevel())
                    .build();

            userListRepository.save(userList);
            int finalWin = win;
            HashMap userListResponse = new HashMap(){{
                put("username", userListDTO.getUsername());
                put("nickname", userListDTO.getNickname());
                put("position", userListDTO.getPosition());
                put("tier", userListDTO.getTier());
                put("recent_rate", finalWin * 10);
                put("most", championMost);
                put("total_rate", userListDTO.getTotal_rate());
                put("profileIconId", userListDTO.getProfileIconId());
                put("summonerLevel", userListDTO.getSummonerLevel());
            }};

            return userListResponse;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

}
