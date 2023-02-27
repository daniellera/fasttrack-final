package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.services.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final TeamRepository teamRepository;

    @Override
    public List<ProjectDto> getAllProjects() {
        List <Project> projects = projectRepository.findAll();
        return projectMapper.entitiesToDtos(projects);
    }

    @Override
    public List<ProjectDto> getAllActiveProjects() {
        List <Project> projects = projectRepository.findAll();
        List <Project> activeProjects = projectRepository.findAll();
        for(Project project : projects){
            if(project.isActive()) activeProjects.add(project);
        }
        return projectMapper.entitiesToDtos(activeProjects);
    }

    @Override
    public Set<ProjectDto> getAllTeamProjects(Long id) {
        Optional<Team> team = teamRepository.findById(id);
        if(team.isEmpty()) throw new NotFoundException("Invalid ID");
        Set<Project> projects = team.get().getProjects();
        return projectMapper.entitiesToDtos(projects);
    }

//    @Override
//    public ProjectDto createProject() {
//        return null;
//    }
}
