package com.duoduo.server.Controller;

import com.duoduo.server.Entity.UserEntity;
import com.duoduo.server.Entity.UserNameEntity;
import com.duoduo.server.Repository.UserNameRepository;
import com.duoduo.server.Repository.UserRepository;
import com.duoduo.server.Service.JsonWebTokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(value = "*")
@RestController
public class MyPageController {

    @Autowired
    private JsonWebTokenService jsonWebTokenService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserNameRepository userNameRepository;

    @GetMapping(value = "/mypage")
    public JSONObject getMypage(@RequestHeader(value = "Authorization") String jwt) {
        try {
            // TODO: JsonWebTokenService 객체가 싱글톤인지, 만약 싱글톤이라면 상태를 가져서 문제가 되지 않는지 체크 필요!
            String decodeEmail = jsonWebTokenService.decodeEmail(jwt);

            return null;
        } catch (Exception e) {
            return null;
        }
    }

    @PatchMapping(value = "/email")
    public String configEmail(@RequestBody JSONObject data, @RequestHeader(value = "Authorization") String jwt) {
        try {
            String preEmail = jsonWebTokenService.decodeEmail(jwt);
            String nextEmail = (String) data.get("nextEmail");
            userRepository.patchNextEmailByPreEmail(nextEmail, preEmail);
            return nextEmail;
        } catch (ExpiredJwtException e) {
            System.out.println(e);
            return null;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @PatchMapping(value = "/username")
    public String configUsername(@RequestBody JSONObject data, @RequestHeader(value = "Authorization") String jwt) {
        // 소환사명 변경
        try {
            String decodeEmail = jsonWebTokenService.decodeEmail(jwt);
            String nextUserName = (String) data.get("nextUserName");
            UserEntity user = userRepository.findByEmail(decodeEmail);
            Long userId = user.getId();
            userNameRepository.patchNextUserNameByPreUserName(nextUserName, userId);
            return nextUserName;
        } catch (ExpiredJwtException e) {
            System.out.println(e);
            return null;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

}
