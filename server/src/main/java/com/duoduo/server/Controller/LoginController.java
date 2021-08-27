package com.duoduo.server.Controller;

import com.duoduo.server.Entity.UserEntity;
import com.duoduo.server.Repository.LoginDTO;
import com.duoduo.server.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
    public UserEntity signin(@RequestBody(required = true) LoginDTO data) {
        try {
            // db에 일치하는 유저가 있는 검사
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
