package igrejavidanova.com.igrejavidanova.repository;

import igrejavidanova.com.igrejavidanova.entities.PlaylistEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistRepository extends JpaRepository<PlaylistEntity, Integer> {
}
