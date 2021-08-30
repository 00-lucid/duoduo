package com.duoduo.server.Controller;

import com.duoduo.server.Entity.UserEntity;
import com.duoduo.server.Repository.LoginDTO;
import com.duoduo.server.Repository.UserRepository;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Date;

@CrossOrigin(value = "*")
@Controller
@RestController
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping(value = "/")
    public String getVoid() {
        return "hello duoduo server";
    }

    @PostMapping(value = "/signin")
    public String signin(@RequestBody(required = true) LoginDTO data) {
        try {
            Date now = new Date();
            // db에 일치하는 유저가 있는 검사
            // TODO: password에 hashing 적용해야 됨
            // TODO: jwt 발급해야 됨
            if (userRepository.findByEmail(data.getEmail()) != null) {
                 UserEntity user = userRepository.findByPassword(data.getPassword());
                return Jwts.builder()
                        .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                        .setIssuer("duoduo")
                        .setIssuedAt(now)
                        .setExpiration(new Date(now.getTime() + Duration.ofMinutes(30).toMillis()))
                        .claim("email", user.getEmail())
                        .signWith(SignatureAlgorithm.HS256, "secret")
                        .compact();
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

}
