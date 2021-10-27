package com.duoduo.server.Controller;

import com.duoduo.server.Entity.UserListEntity;
import com.duoduo.server.Repository.UserListDTO;
import com.duoduo.server.Repository.UserListRepository;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@CrossOrigin(value = "*")
@Controller
@RestController
public class UserListController {

    @Autowired
    private UserListRepository userListRepository;

    @GetMapping(value = "/userlist")
    public List<UserListEntity> getUserList() {

        List<UserListEntity> list = userListRepository.findAll();

        return list;
    }

    @PostMapping(value = "/userlist")
    public UserListEntity createUserList(@RequestBody(required = true) UserListDTO userListDTO) {
        try {
            System.out.println(userListDTO.toString());

            UserListEntity userList = UserListEntity.builder()
                    .username(userListDTO.getUsername())
                    .nickname(userListDTO.getNickname())
                    .position(userListDTO.getPosition())
                    .tier(userListDTO.getTier())
                    .recent_rate(70)
                    .most("sindra")
                    .kda(5)
                    .poro(50)
                    .synergy(50)
                    .total_rate(userListDTO.getTotal_rate())
                    .profileIconId(userListDTO.getProfileIconId())
                    .summonerLevel(userListDTO.getSummonerLevel())
                    .build();

            userListRepository.save(userList);

            return userList;
        } catch (Exception e) {
            return null;
        }
    }

}
