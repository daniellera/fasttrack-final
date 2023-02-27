package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.services.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {
	
	private final ProjectService projectService;

	// get all the projects

	@GetMapping
	public List<ProjectDto> getAllProjects() {
		return projectService.getAllProjects();
	}

	//get all the projects that are active
	@GetMapping("/active")
	public List<ProjectDto> getAllActiveProjects() {
		return projectService.getAllActiveProjects();
	}

	//get all the projects by a team
	@GetMapping("/team/{id}")
	public Set<ProjectDto> getAllTeamProjects(@PathVariable Long  id){
		return projectService.getAllTeamProjects(id);
	}

	//post a project
//	@GetMapping("/{id}/post")
//	public ProjectDto createProject(@PathVariable Long  id, @RequestBody ) {
//		return projectService.createProject();
//	}

}
