package com.duoduo.server.Controller;

import ch.qos.logback.core.encoder.EchoEncoder;
import com.duoduo.server.Entity.CommentEntity;
import com.duoduo.server.Entity.PostEntity;
import com.duoduo.server.Entity.UserEntity;
import com.duoduo.server.Entity.UserPostEntity;
import com.duoduo.server.Repository.*;
import com.duoduo.server.Service.JsonWebTokenService;
import io.jsonwebtoken.ExpiredJwtException;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
public class CommunityController {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserPostRepositoy userPostRepositoy;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommentRepository commentRepository;

    @GetMapping(value = "/community/all/comment")
    private List<CommentEntity> getComments(@RequestParam("postId") Long id) {
        try {
            return commentRepository.findAllByPostId(id);
        } catch (Exception e) {
            return null;
        }
    }

    @GetMapping(value = "/community/all")
    private List<JSONObject> getPost(@RequestParam("page") Long page, @RequestHeader("Authorization") String jwt) {
        try {
            if (jwt != null) {
                System.out.println("PAGE: " +  page);
                JsonWebTokenService jsonWebTokenService = new JsonWebTokenService();
                Long userId = jsonWebTokenService.decodeId(jwt);

                if (page != 0) {
                    System.out.println(page * 10);
                    return postRepository.findMoreTenWithLike(userId,page * 10);
                } else {
                    List postDTOList = postRepository.findRecentTenWithLike(userId);
                    return postDTOList;
                }
            } else {
                System.out.println("비회원");
                if (page != 0) {
                    return postRepository.findMoreTenWithLike(Long.valueOf(0),page * 10);
                } else {
                    List postDTOList = postRepository.findRecentTenWithLike(Long.valueOf(0));
                    return postDTOList;
                }
            }

        } catch (Exception e) {
            System.out.println(e);
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

    @PostMapping(value = "/community/like/1")
    private UserPostEntity createLike(@RequestParam("postId") Long id, @RequestHeader(value = "Authorization") String jwt) {
        try {
            System.out.println("create");
            JsonWebTokenService jsonWebTokenService = new JsonWebTokenService();
            Long userId = jsonWebTokenService.decodeId(jwt);
            Long postId = id;
            UserEntity user = userRepository.findById(userId).get();
            PostEntity post = postRepository.findById(postId).get();

            UserPostEntity userPostEntity = UserPostEntity.builder().user(user).post(post).build();
            userPostRepositoy.save(userPostEntity);

            return userPostEntity;
        } catch (Exception e) {
            return null;
        }
    }

    @DeleteMapping(value = "/community/like/0")
    private String removeLike(@RequestParam("postId") Long id, @RequestHeader("Authorization") String jwt) {
        try {
            System.out.println("remove");
            JsonWebTokenService jsonWebTokenService = new JsonWebTokenService();
            Long userId = jsonWebTokenService.decodeId(jwt);
            Long postId = id;

            System.out.println(userId+ " " +postId);
            // remove logic
            userPostRepositoy.deleteUserPostByUserIdPostId(userId, postId);
            return "success";
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @PostMapping(value = "/community/all/comment")
    private CommentEntity addComment(@RequestBody JSONObject requestBody, @RequestParam("postId") Long id, @RequestHeader("Authorization") String jwt) {
        try {
            JsonWebTokenService jsonWebTokenService = new JsonWebTokenService();
            Long userId = jsonWebTokenService.decodeId(jwt);
            System.out.println(userId);
            UserEntity user = userRepository.findById(userId).get();
            PostEntity post = postRepository.findById(id).get();
            CommentEntity commentEntity = CommentEntity.builder().user(user).post(post).text(requestBody.get("text").toString()).build();
            return commentRepository.save(commentEntity);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @GetMapping(value = "/community/all/best")
    private List<JSONObject> getBestAll() {
        try {
            System.out.println("BEST POSTS");
            return postRepository.findBestAll();
        } catch (Exception e) {
            return null;
        }
    }


}
