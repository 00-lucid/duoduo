package com.duoduo.server.Controller;

import com.duoduo.server.Entity.UserEntity;
import com.duoduo.server.Entity.UserNameEntity;
import com.duoduo.server.Repository.LoginDTO;
import com.duoduo.server.Repository.UserNameRepository;
import com.duoduo.server.Repository.UserRepository;
import io.jsonwebtoken.*;
import org.json.simple.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Date;
import java.util.HashMap;

@CrossOrigin(value = "*")
@Controller
@RestController
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserNameRepository userNameRepository;

    @GetMapping(value = "/")
    public String getVoid() {
        return "hello duoduo server";
    }

    @PostMapping(value = "/signin")
    public JSONObject signin(@RequestBody(required = true) LoginDTO data) {
        try {
            Date now = new Date();
            // TODO: password에 hashing 적용해야 됨
            if (userRepository.findByEmail(data.getEmail()) != null) {
                UserEntity user = userRepository.findByPassword(data.getPassword());

                JSONObject jsonObject = new JSONObject();

                String jwt =  Jwts.builder()
                        .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                        .setIssuer("duoduo")
                        .setIssuedAt(now)
                        .setExpiration(new Date(now.getTime() + Duration.ofMinutes(60).toMillis()))
                        .claim("email", user.getEmail())
                        .signWith(SignatureAlgorithm.HS256, "secret")
                        .compact();
                jsonObject.put("token", jwt);
                jsonObject.put("nickname", user.getNickname());
                System.out.println(jsonObject);

                return jsonObject;
            }
            return null;
        } catch (Exception e) {
            return null;
        }
    }

    @PostMapping(value = "/signup")
    public UserEntity signup(@RequestBody(required = true) LoginDTO data) {
        try {

            // 중복계정의 조건
            // 1. 같은 이메일
            // 2. 같은 닉네임
            if (userRepository.findByEmail(data.getEmail()) != null || userRepository.findByNickname(data.getNickname()) != null) {
                return null;
            }

            UserEntity user = UserEntity.builder()
                    .email(data.getEmail())
                    .password(data.getPassword())
                    .nickname(data.getNickname())
                    .build();

            return userRepository.save(user);
        } catch (Exception e) {
            return null;
        }
    }

    @PostMapping(value = "/username")
    public UserNameEntity createUsername(@RequestBody(required = true) HashMap<String, String> map, @RequestHeader("Authorization") String data) {
        try{
            String jwt = data.substring(7);
            Claims claims = Jwts.parser().setSigningKey("secret").parseClaimsJws(jwt).getBody();
            System.out.println(claims);
            System.out.println(claims.get("email"));
            String decodedEmail = claims.get("email").toString();
            // createusernameentity
            UserEntity findUser = userRepository.findByEmail(decodedEmail);
            UserNameEntity userName =  UserNameEntity.builder()
                            .userId(findUser)
                            .username(map.get("username"))
                            .build();
            userNameRepository.save(userName);
            return userName;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

}
