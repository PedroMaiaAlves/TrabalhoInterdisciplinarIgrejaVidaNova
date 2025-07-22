package igrejavidanova.com.igrejavidanova.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import igrejavidanova.com.igrejavidanova.entities.FuncaoEntity;

import java.util.Optional;

public interface FuncaoRepository extends JpaRepository<FuncaoEntity, Integer> {
}