package com.duoduo.server.Controller;

import com.duoduo.server.Entity.UserEntity;
import com.duoduo.server.Repository.UserRepository;
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
    private UserRepository userRepository;

    @PatchMapping(value = "/email")
    public UserEntity configEmail(@RequestBody JSONObject data, @RequestHeader(value = "Authorization") String jwt) {
        Map<String, Object> claimMap = null;
        try {
            //TODO jwt 인증로직 분리하기 인증키는 (이메일 + 시크릿키)
            System.out.println(data);
            Claims claims = Jwts.parser()
                    .setSigningKey("secret")
                    .parseClaimsJws(jwt)
                    .getBody();
            claimMap = claims;
            String preEmail = (String) claimMap.get("email");
            return userRepository.patchNextEmailByPreEmail(preEmail, (String) data.get("nextEmail"));
        } catch (ExpiredJwtException e) {
            System.out.println(e);
            return null;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @PatchMapping(value = "/username")
    public void configUsername() {
        // 소환사명 변경
    }

}
