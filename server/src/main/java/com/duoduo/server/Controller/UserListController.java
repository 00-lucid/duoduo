package com.duoduo.server.Controller;

import com.duoduo.server.Entity.UserEntity;
import com.duoduo.server.Entity.UserListEntity;
import com.duoduo.server.Repository.MostDTO;
import com.duoduo.server.Repository.UserListDTO;
import com.duoduo.server.Repository.UserListRepository;
import com.duoduo.server.Service.FindService;
import com.duoduo.server.Service.JsonWebTokenService;
import com.duoduo.server.Service.RiotService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpHeaders;
import java.util.*;

@CrossOrigin(value = "*")
@RestController
public class UserListController {

    @Autowired
    private RiotService riotService;

    @Autowired
    private FindService findService;

    @Autowired
    private UserListRepository userListRepository;

    @Autowired
    private JsonWebTokenService jsonWebTokenService;

    @GetMapping(value = "/userlist/infinite")
    public List<HashMap> getUserListInfinite(@RequestHeader("Page") int id) {
        try {
            List<UserListEntity> userListEntities =  userListRepository.findMoreTen(id * 10);
            List<HashMap> result = new ArrayList<>();
            if (userListEntities.size() > 0) {
                for (int i = 0; i < userListEntities.size(); i++) {
                    UserListEntity obj = userListEntities.get(i);
                    String pre = obj.getMost();
                    String[] next = pre.split(" ");
                    HashMap userListResponse = new HashMap(){{
                        put("id", obj.getId());
                        put("username", obj.getUsername());
                        put("nickname", obj.getNickname());
                        put("position", obj.getPosition());
                        put("tier", obj.getTier());
                        put("recent_rate", obj.getRecent_rate());
                        put("most", next);
                        put("total_rate", obj.getTotal_rate());
                        put("profileIconId", obj.getProfileIconId());
                        put("summonerLevel", obj.getSummonerLevel());
                        put("createdAt",obj.getCreatedAt());
                    }};
                    result.add(userListResponse);
                }
                return result;
            } else {
                return null;
            }

        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @GetMapping(value = "/userlist")
    public List<HashMap> getUserList() {
        List<UserListEntity> list = userListRepository.findRecentTen();
        List<HashMap> result = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            int finalI = i;
            UserListEntity obj = list.get(finalI);
            String pre = obj.getMost();
            String[] next = pre.split(" ");
            HashMap userListResponse = new HashMap(){{
                put("id", obj.getId());
                put("username", obj.getUsername());
                put("nickname", obj.getNickname());
                put("position", obj.getPosition());
                put("tier", obj.getTier());
                put("recent_rate", obj.getRecent_rate());
                put("most", next);
                put("total_rate", obj.getTotal_rate());
                put("profileIconId", obj.getProfileIconId());
                put("summonerLevel", obj.getSummonerLevel());
                put("createdAt",obj.getCreatedAt());
            }};
            result.add(userListResponse);
        }
        return result;
    }

    @PostMapping(value = "/userlist")
    public HashMap createUserList(@RequestBody(required = true) UserListDTO userListDTO, @RequestHeader("Authorization") String jwt) {
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
                } else {
                    MostDTO pre = championMost.get(idxChampion);
                    pre.setCount(pre.getCount() + 1);
                    championMost.set(idxChampion, pre);
                }
            }

            System.out.println("championMost: " + championMost.toString());

            // 산출한 모스트를 count 값에 따라서 정렬해줘야 됨
            // TODO:
            Collections.sort(championMost, Collections.reverseOrder());
            List<MostDTO> onlyMost = championMost.subList(0, 3);
            List resultMost = new ArrayList();
            for (int i = 0; i < onlyMost.size(); i++) {
                resultMost.add(onlyMost.get(i).getChampionName());
            }
            String result = String.join(" ", resultMost);

            Long id = jsonWebTokenService.decodeId(jwt);
            UserEntity user = jsonWebTokenService.verifyId(id);

            UserListEntity userList = UserListEntity.builder()
                    .userId(user)
                    .username(userListDTO.getUsername())
                    .nickname(userListDTO.getNickname())
                    .position(userListDTO.getPosition())
                    .tier(userListDTO.getTier())
                    .recent_rate(win * 10)
                    .most(result)
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
                put("id", userList.getId());
                put("username", userListDTO.getUsername());
                put("nickname", userListDTO.getNickname());
                put("position", userListDTO.getPosition());
                put("tier", userListDTO.getTier());
                put("recent_rate", finalWin * 10);
                put("most", resultMost);
                put("total_rate", userListDTO.getTotal_rate());
                put("profileIconId", userListDTO.getProfileIconId());
                put("summonerLevel", userListDTO.getSummonerLevel());
                put("createdAt", userList.getCreatedAt());
            }};

            return userListResponse;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @DeleteMapping(value = "userlist/{id}")
    public UserListEntity removeUserList(@PathVariable("id") Long listId, @RequestHeader("Authorization") String jwt) {
        // TODO: validation
        try {
            Long userId = jsonWebTokenService.decodeId(jwt);
            UserListEntity target = userListRepository.findByIdAndId(userId, listId);
            System.out.println(target.toString());
            userListRepository.delete(target);
            return target;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
}
