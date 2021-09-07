package com.duoduo.server.Repository;

import com.duoduo.server.Entity.UserNameEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserNameRepository extends JpaRepository<UserNameEntity, Long> {
}
