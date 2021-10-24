package com.duoduo.server.Repository;

import com.duoduo.server.Entity.UserListEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserListRepository extends JpaRepository<UserListEntity, Long> {
}
