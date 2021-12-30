package com.duoduo.server.Controller;

import com.duoduo.server.Entity.PostEntity;
import com.duoduo.server.Repository.PostRepository;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class CommunityController {

    @Autowired
    private PostRepository postRepository;

    @GetMapping(value = "/community/all")
    private List<PostEntity> getPost(@RequestParam("page") int page) {
        try {
            System.out.println(page);
            if (page != 0) {
                return postRepository.findMoreTen(page * 10);
            } else {
                return postRepository.findRecentTen();
            }

        } catch (Exception e) {
            return null;
        }
    }

    @PostMapping(value = "/community")
    private PostEntity createPost(@RequestBody JSONObject requestBody) {
        try {
            System.out.println(requestBody.toString());
            PostEntity post = PostEntity.builder()
                            .title(requestBody.get("title").toString())
                            .nickname(requestBody.get("nickname").toString())
                            .body(requestBody.get("body").toString())
                            .build();
            postRepository.save(post);
            return post;
        } catch (Exception e) {
            return null;
        }
    }

}
