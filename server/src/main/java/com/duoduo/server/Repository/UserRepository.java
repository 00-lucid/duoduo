package com.duoduo.server.Repository;

import com.duoduo.server.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByEmail(String email);
    UserEntity findByNickname(String nickname);
    UserEntity findByPassword(String password);
}