package com.duoduo.server.Repository;

import com.duoduo.server.Entity.PostEntity;
import com.duoduo.server.Entity.UserListEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<PostEntity, Long> {
    @Query(value = "SELECT * FROM post ORDER BY id DESC limit 10 offset 0", nativeQuery = true)
    List<PostEntity> findRecentTen();

    @Query(value = "SELECT * FROM post ORDER BY id DESC limit 10 offset :page", nativeQuery = true)
    List<PostEntity> findMoreTen(@Param("page") int page);
}
