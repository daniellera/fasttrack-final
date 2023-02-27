package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.ProjectDto;

import java.util.List;
import java.util.Set;

public interface ProjectService {

    List<ProjectDto> getAllProjects();

    List<ProjectDto> getAllActiveProjects();

    Set<ProjectDto> getAllTeamProjects(Long id);

//    ProjectDto createProject();
}
