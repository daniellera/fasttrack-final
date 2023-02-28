package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.ProjectRequestDto;
import com.cooksys.groupfinal.services.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
	// create a project
	@PostMapping("/create-project")
	public ProjectDto createProject(@RequestBody ProjectRequestDto projectRequestDto){
		return  projectService.createProject(projectRequestDto);
	}

	//edit a project
	@PatchMapping("/update-project/{projectId}")
	public ProjectDto updateProject(@RequestBody ProjectRequestDto projectRequestDto, @PathVariable Long projectId){
		return projectService.updateProject(projectRequestDto, projectId);
	}

}
