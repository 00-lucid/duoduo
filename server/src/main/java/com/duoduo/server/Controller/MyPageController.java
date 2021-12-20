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
import java.util.Optional;

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
        JSONObject jsonObject = new JSONObject();
        try {
            // TODO: JsonWebTokenService 객체가 싱글톤인지, 만약 싱글톤이라면 상태를 가져서 문제가 되지 않는지 체크 필요!
            Long id = jsonWebTokenService.decodeId(jwt);
            // TODO: delete password
            UserEntity user = jsonWebTokenService.verifyId(id);
            jsonObject.put("email", user.getEmail());

            Optional<UserNameEntity> optionalUserName = userNameRepository.findById(id);
            UserNameEntity userNameEntity = optionalUserName.get();
            jsonObject.put("username", userNameEntity.getUsername());
            return jsonObject;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @PatchMapping(value = "/email")
    public String configEmail(@RequestBody JSONObject data, @RequestHeader(value = "Authorization") String jwt) {
        try {
            Long id = jsonWebTokenService.decodeId(jwt);
            String nextEmail = (String) data.get("nextEmail");
            userRepository.patchNextEmailByPreEmail(nextEmail, id);
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
            String nextUserName = (String) data.get("nextUserName");
            Long id = jsonWebTokenService.decodeId(jwt);
            System.out.println("nextUserName: " + nextUserName);
            userNameRepository.patchNextUserNameByPreUserName(nextUserName, id);
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
